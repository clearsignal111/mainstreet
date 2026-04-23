#!/usr/bin/env node
/**
 * Pre-build data validation — Gate 6
 * Verifies industry-multiples.json meets all Gate 1 data requirements
 * before Eleventy is allowed to generate pages.
 * Exits with code 1 (blocking build) on any failure.
 */

const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../data/industry-multiples.json");

// Tier 4 excluded industries (from 07-PUBLISH-GATES.md)
const EXCLUDED_KEYWORDS = [
  "truck stop", "casino", "dollar store", "check cashing",
  "magazine", "newspaper", "food truck",
];

let errors = 0;
let warnings = 0;

function fail(msg) {
  console.error(`  ✗ ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  ⚠ ${msg}`);
  warnings++;
}

function pass(msg) {
  console.log(`  ✓ ${msg}`);
}

console.log("\n=== Gate 6: Pre-Build Data Validation ===\n");

// Load file
let data;
try {
  const raw = fs.readFileSync(DATA_FILE, "utf8");
  data = JSON.parse(raw);
  pass(`Loaded ${DATA_FILE}`);
} catch (e) {
  console.error(`FATAL: Cannot read ${DATA_FILE}: ${e.message}`);
  process.exit(1);
}

if (!Array.isArray(data)) {
  console.error("FATAL: industry-multiples.json must be a JSON array");
  process.exit(1);
}

pass(`Entry count: ${data.length} industries`);

const allSlugs = new Set(data.map((i) => i.industry_slug));

// ── Per-industry checks ────────────────────────────────────────────────────
for (const ind of data) {
  const slug = ind.industry_slug || "(missing slug)";
  const prefix = `[${slug}]`;

  // Required string fields
  const requiredStrings = [
    "industry_name", "industry_slug", "industry_category",
    "data_source", "last_updated", "deal_notes",
    "typical_buyer_profile", "hook", "market_sentiment",
    "logic_transparency_opener",
  ];
  for (const field of requiredStrings) {
    if (!ind[field] || String(ind[field]).trim() === "") {
      fail(`${prefix} Missing or empty field: ${field}`);
    }
  }

  // Required numeric fields
  const requiredNums = [
    "sde_multiple_low", "sde_multiple_mid", "sde_multiple_high",
    "revenue_multiple_avg", "typical_sde_margin_pct", "transaction_count",
  ];
  for (const field of requiredNums) {
    if (ind[field] === undefined || ind[field] === null || isNaN(Number(ind[field]))) {
      fail(`${prefix} Missing or non-numeric field: ${field}`);
    }
  }

  // Multiple ordering: low ≤ mid ≤ high
  if (ind.sde_multiple_low > ind.sde_multiple_mid) {
    fail(`${prefix} sde_multiple_low (${ind.sde_multiple_low}) > sde_multiple_mid (${ind.sde_multiple_mid})`);
  }
  if (ind.sde_multiple_mid > ind.sde_multiple_high) {
    fail(`${prefix} sde_multiple_mid (${ind.sde_multiple_mid}) > sde_multiple_high (${ind.sde_multiple_high})`);
  }

  // what_increases_value: array, minimum 3 entries
  if (!Array.isArray(ind.what_increases_value) || ind.what_increases_value.length < 3) {
    fail(`${prefix} what_increases_value must have ≥3 entries (has ${(ind.what_increases_value || []).length})`);
  }

  // what_reduces_value: array, minimum 3 entries
  if (!Array.isArray(ind.what_reduces_value) || ind.what_reduces_value.length < 3) {
    fail(`${prefix} what_reduces_value must have ≥3 entries (has ${(ind.what_reduces_value || []).length})`);
  }

  // related_industries: array, all slugs must exist
  if (!Array.isArray(ind.related_industries) || ind.related_industries.length < 2) {
    fail(`${prefix} related_industries must have ≥2 entries`);
  } else {
    for (const relSlug of ind.related_industries) {
      if (!allSlugs.has(relSlug)) {
        fail(`${prefix} related_industries references non-existent slug: "${relSlug}"`);
      }
    }
  }

  // last_updated: valid date format YYYY-MM-DD
  if (ind.last_updated && !/^\d{4}-\d{2}-\d{2}$/.test(ind.last_updated)) {
    fail(`${prefix} last_updated must be YYYY-MM-DD format (got: "${ind.last_updated}")`);
  }

  // Tier 4 exclusion check
  const nameLower = (ind.industry_name || "").toLowerCase();
  for (const kw of EXCLUDED_KEYWORDS) {
    if (nameLower.includes(kw)) {
      fail(`${prefix} Contains excluded Tier 4 industry keyword: "${kw}"`);
    }
  }

  // Placeholder text check
  const PLACEHOLDERS = ["TBD", "Lorem ipsum", "[INSERT]", "[INDUSTRY]", "TODO"];
  const allText = JSON.stringify(ind);
  for (const ph of PLACEHOLDERS) {
    if (allText.includes(ph)) {
      fail(`${prefix} Contains placeholder text: "${ph}"`);
    }
  }
}

// ── Summary ────────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(50)}`);
if (errors === 0) {
  console.log(`\n✅ Gate 6 PASSED — ${data.length} industries validated, ${warnings} warnings\n`);
  process.exit(0);
} else {
  console.error(`\n❌ Gate 6 FAILED — ${errors} error(s), ${warnings} warning(s)`);
  console.error("   Fix all errors before running the build.\n");
  process.exit(1);
}
