#!/usr/bin/env node

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

const tasks = [
  {
    id: 101,
    label: "Bennelong modern",
    destination: "public/images/locations/bennelong.jpg",
    queries: [
      "Bennelong restaurant Sydney Opera House interior",
      "Bennelong Sydney Opera House dining room",
    ],
  },
  {
    id: 102,
    label: "Quay modern",
    destination: "public/images/locations/quay.jpg",
    queries: [
      "Quay restaurant Sydney harbour dining room",
      "Quay Sydney restaurant interior Opera House view",
    ],
  },
  {
    id: 103,
    label: "Aria modern",
    destination: "public/images/locations/aria.jpg",
    queries: [
      "Aria restaurant Sydney Opera House view",
      "Aria Sydney dining room Circular Quay",
    ],
  },
  {
    id: 104,
    label: "Beppi's modern",
    destination: "public/images/locations/beppis.jpg",
    queries: [
      "Beppi's restaurant Sydney interior",
      "Beppi's Yurong Street Sydney dining room",
    ],
  },
  {
    id: 105,
    label: "Pancakes on the Rocks modern",
    destination: "public/images/locations/pancakes-on-the-rocks.jpg",
    queries: [
      "Pancakes on the Rocks Sydney exterior",
      "Pancakes on the Rocks Sydney restaurant interior",
    ],
  },
  {
    id: 108,
    label: "Cafe Sydney modern",
    destination: "public/images/locations/cafe-sydney.jpg",
    queries: [
      "Cafe Sydney rooftop restaurant Circular Quay",
      "Cafe Sydney harbour bridge restaurant",
    ],
  },
  {
    id: 109,
    label: "Mr. Wong modern",
    destination: "public/images/locations/mr-wong.jpg",
    queries: [
      "Mr Wong Sydney restaurant interior",
      "Mr Wong Sydney dining room",
    ],
  },
  {
    id: 110,
    label: "The Boathouse Palm Beach modern",
    destination: "public/images/locations/boathouse-palm-beach.jpg",
    queries: [
      "The Boathouse Palm Beach restaurant waterfront",
      "Boathouse Palm Beach Sydney exterior",
    ],
  },
  {
    id: 111,
    label: "Ripples Milsons Point modern",
    destination: "public/images/locations/ripples-milsons-point.jpg",
    queries: [
      "Ripples Milsons Point restaurant harbour bridge",
      "Ripples Milsons Point Sydney waterfront dining",
    ],
  },
  {
    id: 112,
    label: "Doyles on the Beach modern",
    destination: "public/images/locations/doyles-watsons-bay.jpg",
    queries: [
      "Doyles on the Beach Watsons Bay restaurant",
      "Doyles Watsons Bay seafood restaurant exterior",
    ],
  },
  {
    id: 113,
    label: "Flower Drum modern",
    destination: "public/images/locations/flower-drum.jpg",
    queries: [
      "Flower Drum Melbourne restaurant interior",
      "Flower Drum Melbourne dining room",
    ],
  },
  {
    id: 114,
    label: "Florentino modern",
    destination: "public/images/locations/florentino.jpg",
    queries: [
      "Florentino Melbourne Mural Room",
      "Florentino restaurant Melbourne interior",
    ],
  },
  {
    id: 115,
    label: "France-Soir modern",
    destination: "public/images/locations/france-soir.jpg",
    queries: [
      "France-Soir Melbourne restaurant interior",
      "France Soir South Yarra dining room",
    ],
  },
  {
    id: 116,
    label: "Pellegrini's modern",
    destination: "public/images/locations/pellegrinis.jpg",
    queries: [
      "Pellegrini's Espresso Bar Melbourne interior",
      "Pellegrinis Espresso Bar Bourke Street",
    ],
  },
  {
    id: 117,
    label: "Young & Jackson modern",
    destination: "public/images/locations/young-jackson.jpg",
    queries: [
      "Young and Jackson Melbourne hotel exterior",
      "Young & Jackson Melbourne pub interior",
    ],
  },
  {
    id: 118,
    label: "Vue de monde modern",
    destination: "public/images/locations/vue-de-monde.jpg",
    queries: [
      "Vue de monde Melbourne restaurant interior",
      "Vue de monde Rialto Melbourne dining room",
    ],
  },
  {
    id: 119,
    label: "Attica modern",
    destination: "public/images/locations/attica.jpg",
    queries: [
      "Attica Melbourne restaurant interior",
      "Attica Ripponlea dining room",
    ],
  },
  {
    id: 120,
    label: "Waterfront Southgate modern",
    destination: "public/images/locations/waterfront-southgate.jpg",
    queries: [
      "Waterfront Southgate Melbourne restaurant Yarra River",
      "Waterfront Southgate Southbank restaurant exterior",
    ],
  },
  {
    id: 10,
    label: "Mrs Macquarie's Chair historical",
    destination: "public/images/locations/historical/mrs-macquaries-chair-historical.jpg",
    queries: [
      "Mrs Macquarie's Chair Sydney historical photograph",
      "Mrs Macquarie's Chair old photo Sydney",
    ],
  },
  {
    id: 13,
    label: "Hero of Waterloo Hotel historical",
    destination: "public/images/locations/historical/hero-of-waterloo-historical.jpg",
    queries: [
      "Hero of Waterloo Hotel The Rocks historical photo",
      "Hero of Waterloo Sydney old photograph",
    ],
  },
  {
    id: 34,
    label: "Experiment Farm Cottage historical",
    destination: "public/images/locations/historical/experiment-farm-historical.jpg",
    queries: [
      "Experiment Farm Cottage Parramatta historical photo",
      "Experiment Farm Cottage old photograph",
    ],
  },
  {
    id: 36,
    label: "St John's Cathedral historical",
    destination: "public/images/locations/historical/st-johns-cathedral-historical.jpg",
    queries: [
      "St John's Cathedral Parramatta historical photo",
      "St Johns Cathedral Parramatta old photograph",
    ],
  },
  {
    id: 39,
    label: "Camperdown Cemetery historical",
    destination: "public/images/locations/historical/camperdown-cemetery-historical.jpg",
    queries: [
      "Camperdown Cemetery Sydney historical photograph",
      "Camperdown Cemetery old photo Sydney",
    ],
  },
  {
    id: 41,
    label: "The Block historical",
    destination: "public/images/locations/historical/the-block-historical.jpg",
    queries: [
      "The Block Redfern historical photo",
      "The Block Redfern 1970s photograph",
    ],
  },
  {
    id: 69,
    label: "Gordon Dam & Lake Pedder historical",
    destination: "public/images/locations/historical/gordon-dam-tasmania-historical.jpg",
    queries: [
      "original Lake Pedder historical photograph Tasmania",
      "Gordon Dam construction historical photo Tasmania",
    ],
  },

  // ==================== WOLLONGONG / KIAMA / ILLAWARRA ====================

  {
    id: 121,
    label: "Wollongong Harbour modern",
    destination: "public/images/locations/wollongong-harbour.jpg",
    queries: [
      "Wollongong Harbour lighthouse Belmore Basin",
      "Wollongong Breakwater Lighthouse harbour view",
    ],
  },
  {
    id: 122,
    label: "Kiama Blowhole modern",
    destination: "public/images/locations/kiama-blowhole.jpg",
    queries: [
      "Kiama Blowhole aerial view water erupting",
      "Kiama Blowhole lighthouse NSW",
    ],
  },
  {
    id: 123,
    label: "Nan Tien Temple modern",
    destination: "public/images/locations/nan-tien-temple.jpg",
    queries: [
      "Nan Tien Temple Wollongong exterior",
      "Nan Tien Buddhist Temple Berkeley NSW",
    ],
  },
  {
    id: 124,
    label: "Mount Kembla Memorial modern",
    destination: "public/images/locations/mount-kembla-memorial.jpg",
    queries: [
      "Mount Kembla Mine Disaster Memorial",
      "Mount Kembla Heritage Centre NSW",
    ],
  },
  {
    id: 124,
    label: "Mount Kembla Memorial historical",
    destination: "public/images/locations/historical/mount-kembla-memorial-historical.jpg",
    queries: [
      "Mount Kembla mine disaster 1902 historical photo",
      "Mount Kembla coal mine explosion 1902 photograph",
    ],
  },
  {
    id: 125,
    label: "Sea Cliff Bridge modern",
    destination: "public/images/locations/sea-cliff-bridge.jpg",
    queries: [
      "Sea Cliff Bridge Illawarra aerial view",
      "Sea Cliff Bridge Clifton NSW ocean curved bridge",
    ],
  },
  {
    id: 126,
    label: "Port Kembla Hill 60 modern",
    destination: "public/images/locations/port-kembla-hill-60.jpg",
    queries: [
      "Hill 60 Port Kembla lookout view",
      "Port Kembla Hill 60 coastal defence gun emplacement",
    ],
  },
  {
    id: 126,
    label: "Port Kembla Hill 60 historical",
    destination: "public/images/locations/historical/port-kembla-hill-60-historical.jpg",
    queries: [
      "Port Kembla steelworks historical photograph",
      "Port Kembla WWII coastal defence guns historical photo",
    ],
  },
  {
    id: 127,
    label: "Mount Keira modern",
    destination: "public/images/locations/mount-keira.jpg",
    queries: [
      "Mount Keira Wollongong summit lookout view",
      "Mount Keira escarpment Illawarra aerial",
    ],
  },
  {
    id: 127,
    label: "Mount Keira historical",
    destination: "public/images/locations/historical/mount-keira-historical.jpg",
    queries: [
      "Mount Keira coal mine historical photo Wollongong",
      "Kemira mine 1982 strike historical photograph",
    ],
  },
  {
    id: 128,
    label: "Bulli Mine Memorial modern",
    destination: "public/images/locations/bulli-mine-memorial.jpg",
    queries: [
      "Bulli Mine Disaster Memorial NSW",
      "Bulli Heritage Hotel NSW",
    ],
  },
  {
    id: 129,
    label: "Thirroul D.H. Lawrence modern",
    destination: "public/images/locations/thirroul-dh-lawrence.jpg",
    queries: [
      "Thirroul Beach NSW Illawarra escarpment",
      "Anita's Theatre Thirroul exterior",
    ],
  },
  {
    id: 130,
    label: "Bass Point Reserve modern",
    destination: "public/images/locations/bass-point-reserve.jpg",
    queries: [
      "Bass Point Reserve Shellharbour aerial view",
      "Bushrangers Bay Shellharbour NSW",
    ],
  },
  {
    id: 131,
    label: "Austinmer Hicks Point modern",
    destination: "public/images/locations/austinmer-hicks-point.jpg",
    queries: [
      "Austinmer Beach rock pool NSW",
      "Headland Hotel Austinmer NSW ocean pool",
    ],
  },
  {
    id: 132,
    label: "Shellharbour Village modern",
    destination: "public/images/locations/shellharbour-village.jpg",
    queries: [
      "Shellharbour Village harbour NSW",
      "Shellharbour Village beach heritage",
    ],
  },
  {
    id: 133,
    label: "Lawrence Hargrave Stanwell Park modern",
    destination: "public/images/locations/lawrence-hargrave-stanwell-park.jpg",
    queries: [
      "Bald Hill Lookout Stanwell Park hang glider",
      "Lawrence Hargrave memorial Stanwell Park Beach",
    ],
  },
  {
    id: 134,
    label: "Wollongong Steel Industry modern",
    destination: "public/images/locations/wollongong-steel-industry.jpg",
    queries: [
      "BlueScope Steel Port Kembla aerial",
      "Port Kembla steelworks Wollongong",
    ],
  },
  {
    id: 134,
    label: "Wollongong Steel Industry historical",
    destination: "public/images/locations/historical/wollongong-steel-industry-historical.jpg",
    queries: [
      "Port Kembla steelworks BHP historical photograph",
      "Australian Iron Steel Port Kembla historical photo",
    ],
  },
  {
    id: 135,
    label: "Kiama Heritage Precinct modern",
    destination: "public/images/locations/kiama-heritage-precinct.jpg",
    queries: [
      "Kiama Collins Street terraces wooden heritage",
      "Kiama Pilot's Cottage Museum heritage building",
    ],
  },
];

const minimumBytes = 15_000;
const results = [];

for (const task of tasks) {
  const absoluteDestination = path.join(projectRoot, task.destination);

  if (await isUsableFile(absoluteDestination)) {
    results.push({ task, status: "skipped" });
    console.log(`SKIP ${task.id}: ${task.label}`);
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
}

const savedCount = results.filter((result) => result.status === "saved").length;
const skippedCount = results.filter((result) => result.status === "skipped").length;
const failed = results.filter((result) => result.status === "failed");

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
  if (!existsSync(filePath)) {
    return;
  }

  const content = readFileSyncUtf8(filePath);
  for (const rawLine of content.split(/\r?\n/u)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = stripOuterQuotes(line.slice(separatorIndex + 1).trim());
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function readFileSyncUtf8(filePath) {
  return readFileSync(filePath, "utf8");
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
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": serperApiKey,
    },
    body: JSON.stringify({ q: query, num: 8 }),
  });

  if (!response.ok) {
    throw new Error(`Serper ${response.status}`);
  }

  const payload = await response.json();
  return Array.isArray(payload.images) ? payload.images : [];
}

function isCandidateUsable(url, image, seenUrls) {
  if (!url || seenUrls.has(url)) {
    return false;
  }

  if (!/^https?:\/\//u.test(url)) {
    return false;
  }

  const lowered = url.toLowerCase();
  if (
    lowered.endsWith(".svg") ||
    lowered.endsWith(".gif") ||
    lowered.includes("placeholder") ||
    lowered.includes("logo")
  ) {
    return false;
  }

  if (image.imageWidth && image.imageWidth < 600) {
    return false;
  }

  if (image.imageHeight && image.imageHeight < 400) {
    return false;
  }

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

  if (!response.ok) {
    throw new Error(`download ${response.status}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < minimumBytes) {
    throw new Error(`file too small (${bytes.length} bytes)`);
  }

  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  const scratchDir = await mkdtemp(path.join(os.tmpdir(), "chrono-map-images-"));
  const sourcePath = path.join(scratchDir, guessSourceName(contentType, url));

  try {
    await writeFile(sourcePath, bytes);

    if (contentType.includes("jpeg") || /\.jpe?g(?:$|\?)/iu.test(url)) {
      await writeFile(destination, bytes);
    } else {
      execFileSync("/usr/bin/sips", ["-s", "format", "jpeg", sourcePath, "--out", destination], {
        stdio: "ignore",
      });
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
  if (contentType.includes("png")) {
    return "source.png";
  }

  if (contentType.includes("webp")) {
    return "source.webp";
  }

  if (contentType.includes("heic") || contentType.includes("heif")) {
    return "source.heic";
  }

  if (contentType.includes("tiff")) {
    return "source.tiff";
  }

  if (contentType.includes("jpeg") || /\.jpe?g(?:$|\?)/iu.test(url)) {
    return "source.jpg";
  }

  if (/\.png(?:$|\?)/iu.test(url)) {
    return "source.png";
  }

  if (/\.webp(?:$|\?)/iu.test(url)) {
    return "source.webp";
  }

  return "source.img";
}

function formatError(error) {
  return error instanceof Error ? error.message : String(error);
}
