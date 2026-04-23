# Mainstreet — Small Business Valuation Calculator

## What This Is

A standalone utility site: a small business valuation calculator using BizBuySell industry-specific SDE multiples across 63 industries. Revenue model is Google AdSense display ads. No email gate, no subscriptions.

## Read the Docs First

**Before writing any code or generating any page, read `/docs/` files in order (00–13).** They contain non-negotiable specs. The order matters.

| File | Covers |
|------|--------|
| `docs/00-PROJECT-BRIEF.md` | Strategy, moat, anti-patterns |
| `docs/01-DATA-SPEC.md` | JSON schema, data sources |
| `docs/02-CALCULATOR-SPEC.md` | Calculator logic, inputs, outputs, test cases |
| `docs/03-SITE-ARCHITECTURE.md` | URL map, link graph, footer architecture |
| `docs/04-PAGE-TEMPLATES.md` | Section-level templates per page type |
| `docs/05-CONTENT-RULES.md` | Quality standards, thin content prevention |
| `docs/06-TECHNICAL-SEO.md` | Schema JSON-LD, meta patterns, Core Web Vitals |
| `docs/07-PUBLISH-GATES.md` | Gates 1–7 — must clear before any publish action |
| `docs/08-MONETIZATION.md` | AdSense placement, ad-to-content ratio |
| `docs/09-SUCCESS-METRICS.md` | GA4 events, Search Console, tracking setup |
| `docs/10-INDUSTRY-PRIORITIZATION.md` | Industry tiers, excluded industries |
| `docs/11-COPY-SPEC.md` | Voice, tone, hook sentences, seller psychology |
| `docs/12-VISUAL-DESIGN-SPEC.md` | Colors, typography, spacing, components |
| `docs/13-INDUSTRY-COPY.md` | Verbatim hooks + market sentiment for all 63 industries |
| `docs/GEO-SEO-ADDITIONS.md` | llms.txt, IndexNow, AI-specific additions |

## Project Structure

```
/
├── CLAUDE.md                    ← This file
├── README.md                    ← Build reference and reading order
├── docs/                        ← All spec files (read before building)
├── data/
│   └── industry-multiples.json  ← 63 industries, validated
├── brand-assets/                ← Logos, favicons, og-image
└── [site build output]          ← Created by Claude Code during build
```

## Non-Negotiables

1. **Industry-specific multiples only.** Every calculation uses `industry-multiples.json`. Generic ranges invalidate the product.
2. **No email gate.** Full result on first calculation, no registration.
3. **No page publishes with incomplete data.** Gates 1–7 in `07-PUBLISH-GATES.md` are hard stops.
4. **BizBuySell cited visibly** on every page that uses their data.
5. **All industry pages launch simultaneously** or none launch (see Gate 4).

## Build Sequence

1. Verify `data/industry-multiples.json` passes Gate 6
2. Build calculator per `02-CALCULATOR-SPEC.md`, verify test cases
3. Build all page types per `04-PAGE-TEMPLATES.md`
4. Clear Gate 1 for every industry page individually
5. Clear Gate 4 (full launch checklist) before going live
6. Apply for AdSense on day 61 after launch (Gate 5)

## Config Variables (see memory/project_config.md)

Some build-time values are not yet confirmed. Check `memory/project_config.md` before using any placeholder like `[domain]` or `[Brand Name]` in generated code.
