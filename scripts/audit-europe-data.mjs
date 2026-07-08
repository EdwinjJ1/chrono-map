#!/usr/bin/env node
/**
 * Data-quality audit for the European location dataset. Flags entries missing
 * required bilingual fields, short narratives, missing imageQueries, or
 * out-of-range coordinates. Prints a per-file summary and specific problems.
 *
 * Run: node --experimental-strip-types scripts/audit-europe-data.mjs
 */
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

const problems = [];
const allIds = new Map();
let total = 0;

for (const [file, exportName] of dataFiles) {
  const url = new URL(`../src/data/${file}`, import.meta.url).href;
  let mod;
  try {
    mod = await import(url);
  } catch (e) {
    problems.push(`${file}: IMPORT FAILED — ${e.message.split("\n")[0]}`);
    continue;
  }
  const locs = mod[exportName];
  if (!Array.isArray(locs)) {
    problems.push(`${file}: export ${exportName} is not an array`);
    continue;
  }

  for (const loc of locs) {
    total += 1;
    const tag = `${file}#${loc.id} ${loc.name ?? "(no name)"}`;

    // Duplicate ID across files
    if (allIds.has(loc.id)) {
      problems.push(`DUP ID ${loc.id}: ${tag} vs ${allIds.get(loc.id)}`);
    } else {
      allIds.set(loc.id, tag);
    }

    // Required bilingual fields
    for (const f of ["name", "nameZh", "description", "descriptionZh", "fullDescription", "fullDescriptionZh", "address", "addressZh"]) {
      if (!loc[f] || String(loc[f]).trim() === "") problems.push(`${tag}: missing ${f}`);
    }
    // facts
    if (!Array.isArray(loc.facts) || loc.facts.length < 3) problems.push(`${tag}: <3 facts`);
    if (!Array.isArray(loc.factsZh) || loc.factsZh.length < 3) problems.push(`${tag}: <3 factsZh`);
    if (Array.isArray(loc.facts) && Array.isArray(loc.factsZh) && loc.facts.length !== loc.factsZh.length) {
      problems.push(`${tag}: facts/factsZh length mismatch (${loc.facts.length} vs ${loc.factsZh.length})`);
    }
    // narrative length
    if (typeof loc.fullDescription === "string" && loc.fullDescription.split(/\s+/).length < 40) {
      problems.push(`${tag}: fullDescription short (<40 words)`);
    }
    // coordinates
    const c = loc.coordinates;
    if (!c || typeof c.lat !== "number" || typeof c.lng !== "number") {
      problems.push(`${tag}: bad coordinates`);
    } else if (c.lat < 35 || c.lat > 72 || c.lng < -25 || c.lng > 50) {
      problems.push(`${tag}: coords outside Europe (${c.lat}, ${c.lng})`);
    }
    // image paths
    if (!loc.modernImage) problems.push(`${tag}: no modernImage path`);
    if (!loc.historicalImage) problems.push(`${tag}: no historicalImage path`);
    // imageQueries
    if (!loc.imageQueries || !Array.isArray(loc.imageQueries.modern) || loc.imageQueries.modern.length === 0) {
      problems.push(`${tag}: missing imageQueries.modern`);
    }
    // region
    if (!loc.region) problems.push(`${tag}: missing region`);
  }
}

console.log(`Total European entries: ${total}`);
console.log(`Unique IDs: ${allIds.size}`);
console.log(`Problems found: ${problems.length}`);
if (problems.length) {
  console.log("");
  for (const p of problems.slice(0, 80)) console.log("  " + p);
  if (problems.length > 80) console.log(`  ... and ${problems.length - 80} more`);
}
