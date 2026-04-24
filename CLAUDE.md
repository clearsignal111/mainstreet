# Mainstreet — Small Business Valuation Calculator

## What This Is

A standalone utility site: a small business valuation calculator using BizBuySell industry-specific SDE multiples across 63 industries. Revenue model is Google AdSense display ads. No email gate, no subscriptions.

## Current State (as of April 2026)

**The site is fully built and deployed.** All HTML/template work is complete. The current focus is visual UX — styling the existing skeleton.

- Live preview: https://project-01yr7.vercel.app
- GitHub: https://github.com/clearsignal111/mainstreet (branch: main)
- Deploy: `vercel --prod --yes` from project root (Vercel CLI linked)
- Build: `npm run build` — outputs 94 files to `dist/`

### What is built and working
- 63 industry pages (`/valuation/[slug]/`) via `src/valuation/industry.njk`
- 11 category pages (`/valuation/[category]/`) via `src/valuation/category.njk`
- 10 guide pages (`/guides/[slug]/`) in `src/guides/`
- Hub/calculator page (`/`) via `src/index.njk`
- Valuation hub index (`/valuation/`) via `src/valuation/index.njk`
- Standalone pages: about, methodology, privacy-policy, sitemap.xml, robots.txt, llms.txt
- Full calculator JS: `src/assets/js/calculator.js`
- Micro-calculator JS: `src/assets/js/micro-calc.js`
- CSS: `src/assets/css/main.css` (1,527 lines — design tokens and component styles exist but need visual refinement)

### What is NOT done yet (pre-launch blockers)
- AdSense publisher ID: `ca-pub-XXXXXXXXXXXXXXXX` placeholder in all ad slots
- Credentialed reviewer name in `src/_data/site.js` (Gate 1 — TODO comment in file)
- GitHub repo not connected to Vercel for auto-deploy (currently CLI-only)

### Established rules (carry forward)
- **No em dashes in any copy.** Use hyphens. (em dashes remain in `data/industry-multiples.json` data fields only — leave for now)
- All year references in titles include the quarter: "(Q4 2025 Data)", not "(2025 Data)"
- Industry display names strip trailing "Business/Businesses" via `industry.display_name` (computed in `src/_data/industries.js`)

---

## Docs — What Is Still Relevant

The docs were written pre-build. Most functional specs are now implemented. Read selectively:

| File | Status | Still relevant? |
|------|--------|-----------------|
| `docs/00-PROJECT-BRIEF.md` | Reference | Yes — strategy and anti-patterns apply throughout |
| `docs/01-DATA-SPEC.md` | Done | Only if touching `industry-multiples.json` |
| `docs/02-CALCULATOR-SPEC.md` | Done | Only if modifying calculator logic |
| `docs/03-SITE-ARCHITECTURE.md` | Done | Reference for URL structure only |
| `docs/04-PAGE-TEMPLATES.md` | Done | Implemented — do not rebuild from scratch |
| `docs/05-CONTENT-RULES.md` | Done | Reference if writing new copy |
| `docs/06-TECHNICAL-SEO.md` | Done | Reference if touching schema or meta |
| `docs/07-PUBLISH-GATES.md` | Active | Gates 1, 4, 5 still open — check before launch |
| `docs/08-MONETIZATION.md` | Partially done | Ad slot placements exist; publisher ID not set |
| `docs/09-SUCCESS-METRICS.md` | Not started | GA4 tracking setup — post-launch work |
| `docs/10-INDUSTRY-PRIORITIZATION.md` | Done | All 63 industries built |
| `docs/11-COPY-SPEC.md` | Done | Reference only |
| `docs/12-VISUAL-DESIGN-SPEC.md` | **Active** | **This is the focus of the next session** |
| `docs/13-INDUSTRY-COPY.md` | Done | Implemented in `industry-multiples.json` |
| `docs/GEO-SEO-ADDITIONS.md` | Done | llms.txt, robots.txt, sitemap built |

---

## Project Structure

```
/
├── CLAUDE.md                         <- This file
├── docs/                             <- Spec files (see table above)
├── data/
│   └── industry-multiples.json       <- 63 industries, validated (do not edit lightly)
├── src/
│   ├── _data/
│   │   ├── site.js                   <- Brand, domain, author, reviewer config
│   │   └── industries.js             <- Data layer: computes display_name, bySlug, categories
│   ├── _includes/
│   │   ├── layouts/base.njk          <- Root layout (head, nav, footer)
│   │   ├── footer.njk
│   │   ├── nav.njk
│   │   └── schema/                   <- JSON-LD includes per page type
│   ├── assets/
│   │   ├── css/main.css              <- All styles (design tokens defined, visual polish needed)
│   │   └── js/                       <- calculator.js, micro-calc.js
│   ├── valuation/
│   │   ├── industry.njk              <- Pagination template -> 63 industry pages
│   │   ├── category.njk              <- Pagination template -> 11 category pages
│   │   └── index.njk                 <- /valuation/ hub
│   ├── guides/                       <- 10 guide pages (individual .njk files)
│   ├── index.njk                     <- Home page / calculator
│   ├── about.njk
│   ├── methodology.njk
│   └── privacy-policy.njk
├── brand-assets/                     <- Logos, favicons, og-image
└── dist/                             <- Build output (94 files, git-ignored)
```

## Non-Negotiables

1. **Industry-specific multiples only.** Every calculation uses `industry-multiples.json`.
2. **No email gate.** Full result on first calculation, no registration.
3. **BizBuySell cited visibly** on every page that uses their data.
4. **No em dashes in copy.** Hyphens only in all template files.

## Config Variables (see memory/project_config.md)

All confirmed. Domain: mainstreetbenchmark.org, Brand: Mainstreet Benchmark, Author: Eric Haight, Address: 701 Brazos St Suite 1616 Austin TX 78701. See `memory/project_config.md` for full list.
