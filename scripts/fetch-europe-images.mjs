#!/usr/bin/env node

/**
 * Fetch modern + historical images for the European location dataset.
 *
 * Reads a task manifest produced by `build-europe-image-tasks.mjs` (which is
 * generated from the `imageQueries` on each Location) and downloads one usable
 * image per destination via the Serper image API, converting to JPEG locally.
 *
 * Usage:
 *   node scripts/fetch-europe-images.mjs [--limit=N] [--only=<substring>]
 *
 * Env: SERPER_API_KEY (from .env.local / .env)
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
  console.error("SERPER_API_KEY is required. Add it to .env.local.");
  process.exit(1);
}

const args = process.argv.slice(2);
const limitArg = args.find((a) => a.startsWith("--limit="));
const onlyArg = args.find((a) => a.startsWith("--only="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;
const only = onlyArg ? onlyArg.split("=")[1].toLowerCase() : null;

const manifestPath = path.join(__dirname, "europe-image-tasks.json");
if (!existsSync(manifestPath)) {
  console.error(
    `Manifest not found: ${manifestPath}\nRun: node scripts/build-europe-image-tasks.mjs`
  );
  process.exit(1);
}

/** @type {{destination:string,label:string,queries:string[]}[]} */
let tasks = JSON.parse(readFileSync(manifestPath, "utf8"));
if (only) tasks = tasks.filter((t) => t.label.toLowerCase().includes(only));

const minimumBytes = 15_000;
const results = [];
let processed = 0;

for (const task of tasks) {
  if (processed >= limit) break;

  const absoluteDestination = path.join(projectRoot, task.destination);

  if (await isUsableFile(absoluteDestination)) {
    results.push({ task, status: "skipped" });
    continue;
  }

  processed += 1;
  console.log(`FETCH ${task.label} -> ${task.destination}`);
  await mkdir(path.dirname(absoluteDestination), { recursive: true });

  const seenUrls = new Set();
  const candidates = [];

  for (const query of task.queries) {
    try {
      const images = await searchImages(query);
      for (const image of images) {
        const url = image.imageUrl?.trim();
        if (!isCandidateUsable(url, image, seenUrls)) continue;
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
      console.log(`  saved (${fileStats.size} bytes) via "${candidate.query}"`);
      results.push({ task, status: "saved" });
      saved = true;
      break;
    } catch (error) {
      lastError = formatError(error);
    }
  }

  if (!saved) {
    results.push({ task, status: "failed", error: lastError });
    console.error(`  FAILED ${task.label}: ${lastError}`);
  }
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
    console.log(`- ${result.task.label}: ${result.error}`);
  }
  process.exitCode = 1;
}

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const content = readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/u)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) continue;
    const key = line.slice(0, separatorIndex).trim();
    const value = stripOuterQuotes(line.slice(separatorIndex + 1).trim());
    if (!(key in process.env)) process.env[key] = value;
  }
}

function stripOuterQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

async function isUsableFile(filePath) {
  try {
    const fileStats = await stat(filePath);
    return fileStats.size >= minimumBytes;
  } catch {
    return false;
  }
}

async function searchImages(query) {
  const response = await fetch("https://google.serper.dev/images", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-KEY": serperApiKey },
    body: JSON.stringify({ q: query, num: 10 }),
  });
  if (!response.ok) throw new Error(`Serper ${response.status}`);
  const payload = await response.json();
  return Array.isArray(payload.images) ? payload.images : [];
}

function isCandidateUsable(url, image, seenUrls) {
  if (!url || seenUrls.has(url)) return false;
  if (!/^https?:\/\//u.test(url)) return false;
  const lowered = url.toLowerCase();
  if (
    lowered.endsWith(".svg") ||
    lowered.endsWith(".gif") ||
    lowered.includes("placeholder") ||
    lowered.includes("logo")
  ) {
    return false;
  }
  if (image.imageWidth && image.imageWidth < 600) return false;
  if (image.imageHeight && image.imageHeight < 400) return false;
  return true;
}

async function downloadAndConvert(url, destination) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
    redirect: "follow",
  });
  if (!response.ok) throw new Error(`download ${response.status}`);

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < minimumBytes) {
    throw new Error(`file too small (${bytes.length} bytes)`);
  }

  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  const scratchDir = await mkdtemp(path.join(os.tmpdir(), "chrono-map-eu-"));
  const sourcePath = path.join(scratchDir, guessSourceName(contentType, url));

  try {
    await writeFile(sourcePath, bytes);
    if (contentType.includes("jpeg") || /\.jpe?g(?:$|\?)/iu.test(url)) {
      await writeFile(destination, bytes);
    } else {
      execFileSync(
        "/usr/bin/sips",
        ["-s", "format", "jpeg", sourcePath, "--out", destination],
        { stdio: "ignore" }
      );
    }
    const outputStats = await stat(destination);
    if (outputStats.size < minimumBytes) {
      throw new Error(`converted file too small (${outputStats.size} bytes)`);
    }
  } finally {
    await rm(scratchDir, { force: true, recursive: true });
  }
}

function guessSourceName(contentType, url) {
  if (contentType.includes("png")) return "source.png";
  if (contentType.includes("webp")) return "source.webp";
  if (contentType.includes("heic") || contentType.includes("heif")) return "source.heic";
  if (contentType.includes("tiff")) return "source.tiff";
  if (contentType.includes("jpeg") || /\.jpe?g(?:$|\?)/iu.test(url)) return "source.jpg";
  if (/\.png(?:$|\?)/iu.test(url)) return "source.png";
  if (/\.webp(?:$|\?)/iu.test(url)) return "source.webp";
  return "source.img";
}

function formatError(error) {
  return error instanceof Error ? error.message : String(error);
}
