#!/usr/bin/env node

/**
 * Build the image-fetch manifest (scripts/europe-image-tasks.json) from the
 * European country data files. For each Location it emits one task per image
 * slot (modern + optional historical) using the location's `imageQueries`.
 *
 * Run with Node >= 22.6 (uses --experimental-strip-types to import the .ts data):
 *   node --experimental-strip-types scripts/build-europe-image-tasks.mjs
 */

import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Country data modules to include. `import type` of Location is stripped, so
// these import standalone without pulling in the giant locations.ts.
const dataFiles = [
  { file: "locations-de.ts", exportName: "locationsDe" },
  { file: "locations-fr.ts", exportName: "locationsFr" },
  { file: "locations-it.ts", exportName: "locationsIt" },
  { file: "locations-es.ts", exportName: "locationsEs" },
  { file: "locations-ch-ee.ts", exportName: "locationsChEe" },
];

/** Convert a "/images/..." public path to a repo-relative "public/images/..." path. */
function toRelPath(publicPath) {
  if (typeof publicPath !== "string" || publicPath.length === 0) return null;
  const trimmed = publicPath.replace(/^\/+/, "");
  return trimmed.startsWith("public/") ? trimmed : `public/${trimmed}`;
}

function slugify(name) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .toLowerCase()
    .replace(/['’.,()]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const tasks = [];
let missingQueries = 0;

for (const { file, exportName } of dataFiles) {
  const modUrl = new URL(`../src/data/${file}`, import.meta.url).href;
  let mod;
  try {
    mod = await import(modUrl);
  } catch (error) {
    console.warn(`Skipping ${file}: ${error.message}`);
    continue;
  }

  const locs = mod[exportName];
  if (!Array.isArray(locs)) {
    console.warn(`Skipping ${file}: export ${exportName} is not an array`);
    continue;
  }

  for (const loc of locs) {
    const slug = slugify(loc.name);
    const modernQueries = loc.imageQueries?.modern ?? [];
    const historicalQueries = loc.imageQueries?.historical ?? [];

    if (modernQueries.length === 0) {
      missingQueries += 1;
    }

    // Derive destinations from the location's OWN image paths so fetched files
    // land exactly where the UI references them. Fall back to a computed slug
    // only if the entry didn't set a path.
    const modernDest = toRelPath(loc.modernImage) ?? `public/images/locations/${slug}.jpg`;

    tasks.push({
      label: `${loc.region ?? "?"} · ${loc.name} (modern)`,
      destination: modernDest,
      queries: modernQueries.length > 0 ? modernQueries : [loc.name],
    });

    if (historicalQueries.length > 0) {
      const historicalDest =
        toRelPath(loc.historicalImage) ??
        `public/images/locations/historical/${slug}-historical.jpg`;
      tasks.push({
        label: `${loc.region ?? "?"} · ${loc.name} (historical)`,
        destination: historicalDest,
        queries: historicalQueries,
      });
    }
  }
}

const outPath = path.join(__dirname, "europe-image-tasks.json");
writeFileSync(outPath, JSON.stringify(tasks, null, 2));

console.log(`Wrote ${tasks.length} image tasks to ${path.relative(projectRoot, outPath)}`);
if (missingQueries > 0) {
  console.log(`(${missingQueries} locations had no modern imageQueries; used name as fallback)`);
}
