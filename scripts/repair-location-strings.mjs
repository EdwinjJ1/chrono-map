#!/usr/bin/env node
/**
 * Deterministic repair for the European location data files. Fixes the two
 * string-literal bugs the generation agents kept introducing:
 *   1. Full-width quotes “ ” used as the OUTER string delimiter.
 *   2. Straight ASCII " used as content INSIDE a "..."-delimited string.
 *
 * Strategy: for each line that is a JS string value (optionally `key: "..."`,
 * an array item `"...",`, or with a trailing comma), re-derive it so the OUTER
 * delimiter is ASCII " and any inner ASCII " become full-width “ ” (alternating).
 * Lines it cannot confidently classify are left untouched and reported.
 *
 * Usage: node scripts/repair-location-strings.mjs [file1.ts file2.ts ...]
 */
import { readFileSync, writeFileSync } from "node:fs";

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("Usage: node scripts/repair-location-strings.mjs <file...>");
  process.exit(1);
}

const LQ = "“"; // “
const RQ = "”"; // ”

/** Any of the four quote glyphs that might wrongly serve as an outer delimiter. */
const QUOTE_CLASS = `"${LQ}${RQ}`;

// Value line: leading ws, optional `key: `, an opening quote glyph, the body,
// a closing quote glyph, optional trailing comma. Body captured lazily.
const VALUE_RE = new RegExp(
  `^(\\s*)([A-Za-z][A-Za-z0-9]*:\\s)?[${QUOTE_CLASS}](.*)[${QUOTE_CLASS}](,?)\\s*$`
);

function repairBody(body) {
  // Convert any ASCII double-quote in the body to full-width, alternating.
  let open = true;
  let out = "";
  for (const ch of body) {
    if (ch === '"') {
      out += open ? LQ : RQ;
      open = !open;
    } else {
      out += ch;
    }
  }
  return out;
}

let grandFixed = 0;
for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  let fixed = 0;
  const out = lines.map((line) => {
    const m = line.match(VALUE_RE);
    if (!m) return line;
    const [, indent, key = "", rawBody, trailing] = m;
    const body = repairBody(rawBody);
    const rebuilt = `${indent}${key}"${body}"${trailing}`;
    if (rebuilt !== line) fixed += 1;
    return rebuilt;
  });
  writeFileSync(file, out.join("\n"));
  grandFixed += fixed;
  console.log(`${file}: repaired ${fixed} value lines`);
}
console.log(`Total repaired: ${grandFixed}`);
