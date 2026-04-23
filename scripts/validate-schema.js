#!/usr/bin/env node
/**
 * Post-build schema validation — per 06-TECHNICAL-SEO.md mandate.
 * Extracts every JSON-LD <script> block from every generated HTML file in dist/
 * and validates each as valid JSON. Build pipeline fails if any schema is malformed.
 * Run after Eleventy: npm run validate:schema
 */

const fs = require("fs");
const path = require("path");
const { parse } = require("node-html-parser");

const DIST_DIR = path.join(__dirname, "../dist");

let files = 0;
let blocks = 0;
let errors = 0;

function walkHtml(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, results);
    else if (entry.name.endsWith(".html")) results.push(full);
  }
  return results;
}

console.log("\n=== Post-Build: JSON-LD Schema Validation ===\n");

if (!fs.existsSync(DIST_DIR)) {
  console.error("FATAL: dist/ does not exist. Run `npm run build` first.");
  process.exit(1);
}

const htmlFiles = walkHtml(DIST_DIR);
console.log(`Scanning ${htmlFiles.length} HTML files...\n`);

for (const filePath of htmlFiles) {
  const html = fs.readFileSync(filePath, "utf8");
  const root = parse(html);
  const scripts = root.querySelectorAll('script[type="application/ld+json"]');

  if (scripts.length === 0) continue;

  files++;
  const rel = path.relative(DIST_DIR, filePath);

  for (const script of scripts) {
    blocks++;
    const raw = script.rawText.trim();
    try {
      JSON.parse(raw);
    } catch (e) {
      console.error(`  ✗ Invalid JSON-LD in ${rel}:`);
      console.error(`    ${e.message}`);
      console.error(`    First 200 chars: ${raw.slice(0, 200)}`);
      errors++;
    }
  }
}

console.log(`Checked ${blocks} JSON-LD blocks across ${files} pages.`);
console.log(`${"─".repeat(50)}`);

if (errors === 0) {
  console.log(`\n✅ Schema validation PASSED — all JSON-LD blocks are valid\n`);
  process.exit(0);
} else {
  console.error(`\n❌ Schema validation FAILED — ${errors} invalid JSON-LD block(s)`);
  console.error("   Fix schema templates before deploying.\n");
  process.exit(1);
}
