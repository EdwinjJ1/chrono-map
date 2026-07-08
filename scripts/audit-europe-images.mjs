#!/usr/bin/env node
/**
 * Audit image coverage for the European location dataset. For every location,
 * check that its referenced modernImage / historicalImage files exist on disk
 * and are a plausible size. Prints a summary and the list of gaps.
 *
 * Run: node --experimental-strip-types scripts/audit-europe-images.mjs
 */
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const dataFiles = [
  ["locations-de.ts", "locationsDe"],
  ["locations-fr.ts", "locationsFr"],
  ["locations-it.ts", "locationsIt"],
  ["locations-es.ts", "locationsEs"],
  ["locations-ch-ee.ts", "locationsChEe"],
  ["locations-cz.ts", "locationsCz"],
  ["locations-pl.ts", "locationsPl"],
  ["locations-hu.ts", "locationsHu"],
];

const MIN_BYTES = 15_000;

function toRel(publicPath) {
  if (typeof publicPath !== "string" || !publicPath) return null;
  const trimmed = publicPath.replace(/^\/+/, "");
  return trimmed.startsWith("public/") ? trimmed : `public/${trimmed}`;
}

function check(publicPath) {
  const rel = toRel(publicPath);
  if (!rel) return "no-path";
  const abs = path.join(projectRoot, rel);
  if (!existsSync(abs)) return "missing";
  if (statSync(abs).size < MIN_BYTES) return "tiny";
  return "ok";
}

const missing = [];
const tiny = [];
let total = 0;
let modernOk = 0;
let historicalOk = 0;
const byRegion = {};

for (const [file, exportName] of dataFiles) {
  const url = new URL(`../src/data/${file}`, import.meta.url).href;
  let mod;
  try {
    mod = await import(url);
  } catch {
    continue;
  }
  const locs = mod[exportName];
  if (!Array.isArray(locs)) continue;

  for (const loc of locs) {
    total += 1;
    const region = loc.region ?? "?";
    byRegion[region] = byRegion[region] ?? { total: 0, modernMissing: 0, historicalMissing: 0 };
    byRegion[region].total += 1;

    const m = check(loc.modernImage);
    if (m === "ok") modernOk += 1;
    else {
      byRegion[region].modernMissing += 1;
      (m === "tiny" ? tiny : missing).push(`${region} · ${loc.name} [modern] ${loc.modernImage}`);
    }

    const h = check(loc.historicalImage);
    if (h === "ok") historicalOk += 1;
    else {
      byRegion[region].historicalMissing += 1;
      (h === "tiny" ? tiny : missing).push(`${region} · ${loc.name} [historical] ${loc.historicalImage}`);
    }
  }
}

console.log(`Locations audited: ${total}`);
console.log(`Modern images OK:     ${modernOk}/${total}`);
console.log(`Historical images OK: ${historicalOk}/${total}`);
console.log("");
console.log("By region (missing modern / missing historical):");
for (const [r, s] of Object.entries(byRegion)) {
  console.log(`  ${r}: ${s.total} locs — ${s.modernMissing} modern gaps, ${s.historicalMissing} historical gaps`);
}
if (missing.length) {
  console.log(`\nMISSING (${missing.length}):`);
  for (const x of missing.slice(0, 60)) console.log("  " + x);
  if (missing.length > 60) console.log(`  ... and ${missing.length - 60} more`);
}
if (tiny.length) {
  console.log(`\nTINY (<${MIN_BYTES}B) (${tiny.length}):`);
  for (const x of tiny.slice(0, 30)) console.log("  " + x);
}
