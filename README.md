# Small Business Valuation Calculator — Build Reference

This is a standalone utility website. The product is a calculator that produces industry-specific business valuation estimates using BizBuySell transaction data. Everything in this repository exists to build that tool, rank it, and compound its revenue over time.

**Read the `/docs/` files in numerical order before writing any code, creating any files, or making any architectural decisions.** The files contain precise specifications that cannot be inferred. Deviation from the specifications produces a product that will not rank, will not convert, or will violate Google's content quality policies.

---

## Reading Order

| File | What it contains | Read before... |
|------|-----------------|----------------|
| `docs/00-PROJECT-BRIEF.md` | Why this exists, the moat, anti-patterns | Everything |
| `docs/01-DATA-SPEC.md` | The JSON data file schema, sources, maintenance | Any page build |
| `docs/02-CALCULATOR-SPEC.md` | Exact calculator inputs, logic, outputs, UX | Any calculator build |
| `docs/03-SITE-ARCHITECTURE.md` | URL structure, page relationships, link graph, footer architecture | Any routing or navigation build |
| `docs/04-PAGE-TEMPLATES.md` | Section-level template for each page type including SGE block and market context | Any page content build |
| `docs/05-CONTENT-RULES.md` | Scaled content differentiators, quality standards, thin content prevention | Any content generation |
| `docs/06-TECHNICAL-SEO.md` | Schema JSON-LD with PropertyValue objects, meta patterns, Core Web Vitals | Any page publishing |
| `docs/07-PUBLISH-GATES.md` | What must be true before any page or action proceeds | Any publish step |
| `docs/08-MONETIZATION.md` | Ad placement, AdSense path, valuation-tiered context | Any front-end layout |
| `docs/09-SUCCESS-METRICS.md` | Tracking setup, what to measure and when | Launch |
| `docs/10-INDUSTRY-PRIORITIZATION.md` | Industry tiers, data readiness framework, excluded industries | Before adding any industry to the JSON |
| `docs/11-COPY-SPEC.md` | Voice, tone, three-element opening, hook sentences, seller psychology, anchor text formula | Any content generation |
| `docs/12-VISUAL-DESIGN-SPEC.md` | Complete visual language: colors, typography, spacing, components, micro-calculator styling | Any HTML/CSS build |
| `docs/13-INDUSTRY-COPY.md` | Verbatim hook sentences, market sentiment paragraphs, and logic transparency openers for all 63 industries | Before generating any industry page or hub result block |

---

## Repository Structure

```
/
├── README.md                           ← You are here
├── docs/
│   ├── 00-PROJECT-BRIEF.md
│   ├── 01-DATA-SPEC.md
│   ├── 02-CALCULATOR-SPEC.md
│   ├── 03-SITE-ARCHITECTURE.md
│   ├── 04-PAGE-TEMPLATES.md
│   ├── 05-CONTENT-RULES.md
│   ├── 06-TECHNICAL-SEO.md
│   ├── 07-PUBLISH-GATES.md
│   ├── 08-MONETIZATION.md
│   ├── 09-SUCCESS-METRICS.md
│   ├── 10-INDUSTRY-PRIORITIZATION.md
│   ├── 11-COPY-SPEC.md
│   ├── 12-VISUAL-DESIGN-SPEC.md
│   └── 13-INDUSTRY-COPY.md        ← Verbatim hooks, market sentiment, logic transparency openers for all 63 industries
├── data/
│   └── industry-multiples.json        ← 63 complete industry entries, validated
└── [site build files created by Claude Code]
```

---

## The Non-Negotiables

Before any other decision, know these four things:

1. **The calculator uses real industry-specific data.** Every valuation uses the SDE multiple for the selected industry from `industry-multiples.json`. Generic multiples (same range for every industry) invalidate the entire product.

2. **No email gate.** The full result shows on first calculation. No registration. No "enter email to see your valuation." This is both the product's core promise and the primary competitive differentiation.

3. **No page publishes with incomplete data.** Check `07-PUBLISH-GATES.md` before publishing anything. A page with placeholder `deal_notes` or generic content harms the entire domain.

4. **Data source is always cited.** BizBuySell appears visibly on every page that uses their data. This is mandatory — not optional.

---

## First Build Action

After reading all docs files:

1. Verify `/data/industry-multiples.json` — every industry entry must pass Gate 6 before proceeding (complete `deal_notes`, `what_increases_value`, `what_reduces_value`, `typical_buyer_profile` — no empty or generic fields)
2. Validate the JSON passes data integrity rules (low ≤ mid ≤ high for all entries, no orphaned `related_industries` slugs, no Tier 4 excluded industries present)
3. Build the calculator per `02-CALCULATOR-SPEC.md`
4. Verify calculator produces correct output for the test cases in `02-CALCULATOR-SPEC.md` validation checklist
5. Build all page types per `04-PAGE-TEMPLATES.md`, applying content standards from `05-CONTENT-RULES.md` and schema from `06-TECHNICAL-SEO.md`
6. Apply Gate 1 checks to every industry page individually before marking any page ready
7. When every page passes its gate — publish everything simultaneously

**Do not publish a partial set of industry pages.** All industry pages launch together or none launch. See `07-PUBLISH-GATES.md` Gate 4 for the full launch checklist.
