#!/usr/bin/env node

/**
 * Fetch photography spot images from Serper API.
 * Usage: node scripts/fetch-photography-images.mjs [--start N] [--end N]
 *
 * --start N  Start from task index N (default 0)
 * --end N    End at task index N (default: all)
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, mkdtemp, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

loadEnvFile(path.join(projectRoot, ".env.local"));
loadEnvFile(path.join(projectRoot, ".env"));

const serperApiKey = process.env.SERPER_API_KEY;

if (!serperApiKey) {
  console.error("SERPER_API_KEY is required. Add it to .env.local or your shell environment.");
  process.exit(1);
}

// Parse CLI args
const args = process.argv.slice(2);
let startIdx = 0;
let endIdx = Infinity;
let forceOverwrite = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--start" && args[i + 1]) startIdx = parseInt(args[i + 1], 10);
  if (args[i] === "--end" && args[i + 1]) endIdx = parseInt(args[i + 1], 10);
  if (args[i] === "--force") forceOverwrite = true;
}

// Load tasks from the generated JSON
const tasksPath = path.join(projectRoot, "scripts", "photography-image-tasks.json");
if (!existsSync(tasksPath)) {
  console.error("Run generate-photography-tasks.mjs first to create photography-image-tasks.json");
  process.exit(1);
}

const allTasks = JSON.parse(readFileSync(tasksPath, "utf8"));
const tasks = allTasks.slice(startIdx, endIdx);

console.log(`Processing tasks ${startIdx} to ${Math.min(startIdx + tasks.length, allTasks.length) - 1} of ${allTasks.length}`);
console.log("");

const minimumBytes = 15_000;
const results = [];

for (const task of tasks) {
  if (!task.destination) {
    results.push({ task, status: "failed", error: "no destination path" });
    console.error(`SKIP ${task.id}: ${task.label} (no destination)`);
    continue;
  }

  const absoluteDestination = path.join(projectRoot, task.destination);

  if (!forceOverwrite && await isUsableFile(absoluteDestination)) {
    results.push({ task, status: "skipped" });
    console.log(`SKIP ${task.id}: ${task.label} (already exists)`);
    continue;
  }

  console.log(`FETCH ${task.id}: ${task.label}`);
  await mkdir(path.dirname(absoluteDestination), { recursive: true });

  const seenUrls = new Set();
  const candidates = [];

  for (const query of task.queries) {
    try {
      const images = await searchImages(query);
      for (const image of images) {
        const url = image.imageUrl?.trim();
        if (!isCandidateUsable(url, image, seenUrls)) {
          continue;
        }
        seenUrls.add(url);
        candidates.push({ url, query });
      }
    } catch (error) {
      console.warn(`  query failed: ${query} (${formatError(error)})`);
    }
  }

  let saved = false;
  let lastError = "no candidate image returned";

  for (const candidate of candidates) {
    try {
      await downloadAndConvert(candidate.url, absoluteDestination);
      const fileStats = await stat(absoluteDestination);
      console.log(`  saved ${path.basename(task.destination)} from "${candidate.query}" (${fileStats.size} bytes)`);
      results.push({ task, status: "saved" });
      saved = true;
      break;
    } catch (error) {
      lastError = formatError(error);
      console.warn(`  candidate failed: ${candidate.url} (${lastError})`);
    }
  }

  if (!saved) {
    results.push({ task, status: "failed", error: lastError });
    console.error(`  FAILED ${task.id}: ${lastError}`);
  }

  // Rate limit: 1 second between requests
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

const savedCount = results.filter((r) => r.status === "saved").length;
const skippedCount = results.filter((r) => r.status === "skipped").length;
const failed = results.filter((r) => r.status === "failed");

console.log("");
console.log(`Saved:   ${savedCount}`);
console.log(`Skipped: ${skippedCount}`);
console.log(`Failed:  ${failed.length}`);

if (failed.length > 0) {
  for (const result of failed) {
    console.log(`- ${result.task.id} ${result.task.label}: ${result.error}`);
  }
  process.exitCode = 1;
}

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const content = readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/u)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const sepIdx = line.indexOf("=");
    if (sepIdx === -1) continue;
    const key = line.slice(0, sepIdx).trim();
    const value = stripOuterQuotes(line.slice(sepIdx + 1).trim());
    if (!(key in process.env)) process.env[key] = value;
  }
}

function stripOuterQuotes(v) {
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1);
  return v;
}

async function isUsableFile(filePath) {
  try {
    const s = await stat(filePath);
    return s.size >= minimumBytes;
  } catch {
    return false;
  }
}

async function searchImages(query) {
  const response = await fetch("https://google.serper.dev/images", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-KEY": serperApiKey },
    body: JSON.stringify({ q: query, num: 8 }),
  });
  if (!response.ok) throw new Error(`Serper ${response.status}`);
  const payload = await response.json();
  return Array.isArray(payload.images) ? payload.images : [];
}

function isCandidateUsable(url, image, seenUrls) {
  if (!url || seenUrls.has(url)) return false;
  if (!/^https?:\/\//u.test(url)) return false;
  const lowered = url.toLowerCase();
  if (lowered.endsWith(".svg") || lowered.endsWith(".gif") || lowered.includes("placeholder") || lowered.includes("logo")) return false;
  if (image.imageWidth && image.imageWidth < 600) return false;
  if (image.imageHeight && image.imageHeight < 400) return false;
  return true;
}

async function downloadAndConvert(url, destination) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
    redirect: "follow",
  });
  if (!response.ok) throw new Error(`download ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < minimumBytes) throw new Error(`file too small (${bytes.length} bytes)`);
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  const scratchDir = await mkdtemp(path.join(os.tmpdir(), "chrono-photos-"));
  const sourcePath = path.join(scratchDir, guessSourceName(contentType, url));
  try {
    await writeFile(sourcePath, bytes);
    if (contentType.includes("jpeg") || /\.jpe?g(?:$|\?)/iu.test(url)) {
      await writeFile(destination, bytes);
    } else if (contentType.includes("avif") || /\.avif(?:$|\?)/iu.test(url)) {
      // macOS sips does not support AVIF; use ffmpeg or convert via sharp
      // Try using macOS built-in affinity or fall through to sips
      try {
        execFileSync("/opt/homebrew/bin/ffmpeg", ["-y", "-i", sourcePath, "-q:v", "2", destination], { stdio: "ignore" });
      } catch {
        // Fallback: try sips (may fail for AVIF)
        execFileSync("/usr/bin/sips", ["-s", "format", "jpeg", sourcePath, "--out", destination], { stdio: "ignore" });
      }
    } else {
      execFileSync("/usr/bin/sips", ["-s", "format", "jpeg", sourcePath, "--out", destination], { stdio: "ignore" });
    }
    const outputStats = await stat(destination);
    if (outputStats.size < minimumBytes) throw new Error(`converted file too small (${outputStats.size} bytes)`);
  } finally {
    await rm(scratchDir, { force: true, recursive: true });
  }
}

function guessSourceName(contentType, url) {
  if (contentType.includes("png")) return "source.png";
  if (contentType.includes("webp")) return "source.webp";
  if (contentType.includes("avif")) return "source.avif";
  if (contentType.includes("heic") || contentType.includes("heif")) return "source.heic";
  if (contentType.includes("tiff")) return "source.tiff";
  if (contentType.includes("jpeg") || /\.jpe?g(?:$|\?)/iu.test(url)) return "source.jpg";
  if (/\.png(?:$|\?)/iu.test(url)) return "source.png";
  if (/\.webp(?:$|\?)/iu.test(url)) return "source.webp";
  if (/\.avif(?:$|\?)/iu.test(url)) return "source.avif";
  return "source.img";
}

function formatError(error) {
  return error instanceof Error ? error.message : String(error);
}
