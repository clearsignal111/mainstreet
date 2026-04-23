# 07 — Publish Gates

This file does not tell Claude Code what order to build in — Claude Code determines build order from dependencies. This file tells Claude Code what conditions must be true before any page or external action is taken. These are quality and timing gates, not technical sequencing rules.

A gate is not a suggestion. If a gate is not cleared, the action does not happen.

---

## Gate 1 — Before Any Industry Page Publishes

All of the following must be true for each individual industry page:

**Data completeness:**
- [ ] The industry has a complete entry in `/data/industry-multiples.json`
- [ ] `deal_notes` field is non-empty and industry-specific (not placeholder text)
- [ ] `what_increases_value` array has minimum 3 entries
- [ ] `what_reduces_value` array has minimum 3 entries
- [ ] `typical_buyer_profile` field is non-empty
- [ ] All SDE multiple fields are populated with real numbers from BizBuySell or Sundance Financial sources
- [ ] `sde_multiple_low` ≤ `sde_multiple_mid` ≤ `sde_multiple_high` (data integrity check)
- [ ] All slugs in `related_industries` array exist as valid `industry_slug` values in the file

**Content completeness:**
- [ ] H1 states the specific multiple range for this industry
- [ ] Industry Multiple Summary Box contains correct figures
- [ ] "What Makes Worth More" section exceeds 200 words of expanded content
- [ ] "What Can Reduce Value" section exceeds 150 words
- [ ] FAQ section has minimum 3 industry-specific questions (not generic valuation questions)
- [ ] Data source citation appears in the multiple table
- [ ] No placeholder text ("TBD", "Lorem ipsum", "[INSERT]", "[INDUSTRY]") remains anywhere on the page
- [ ] Total non-template body content exceeds 400 words

**Technical completeness:**
- [ ] All three schema blocks present and correct (Dataset, FAQPage, BreadcrumbList)
- [ ] Meta description follows data-dense pattern from `06-TECHNICAL-SEO.md`
- [ ] Canonical tag present and correct
- [ ] Viewport meta tag present: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] All required internal links present (hub link, category link, related industry links, guide links)
- [ ] No broken internal links (all linked slugs exist)
- [ ] Micro-calculator component present and functional (two-input: SDE + Revenue)
- [ ] Micro-calculator inline result uses correct `sde_multiple_low` and `sde_multiple_high` for this industry
- [ ] Micro-calculator CTA link carries correct URL params (`?industry=`, `&sde=`, `&revenue=`) to hub
- [ ] Disclosure text ("median multiple only") renders with every inline result
- [ ] BizBuySell citation visible and linked in the inline result
- [ ] No ad unit appears between micro-calculator inputs and inline result
- [ ] SGE summary block collapses to single line on viewports < 768px with expand toggle
- [ ] Micro-calculator inputs and submit button visible without scrolling on 375px viewport
- [ ] All input, select elements have explicit font-size: 16px (iOS zoom prevention)

**Quality gate:**
- [ ] Passes the swap test: if "[HVAC]" were replaced with "[Restaurant]" throughout, the content would be factually wrong — meaning the content is genuinely industry-specific

---

## Gate 2 — Before the Hub Calculator Page Publishes

- [ ] `industry-multiples.json` is fully populated (all industries complete per Gate 1 data requirements)
- [ ] Calculator correctly loads all industries from the JSON file
- [ ] Calculator produces correct output for test case: HVAC + $165,000 SDE + flat revenue + moderate owner + diverse customers → range approximately $330,000–$511,500
- [ ] Calculator produces different output for Restaurant vs HVAC with identical SDE inputs
- [ ] Floor rule verified: no result falls below 1.0× SDE
- [ ] What-If sliders update valuation in real time (no page reload)
- [ ] URL parameter encoding works correctly (outbound: full result → shareable URL)
- [ ] URL parameter inbound works correctly: `/?industry=[slug]&sde=[value]&revenue=[value]` pre-fills industry (locked), SDE, and revenue — hub does NOT auto-submit
- [ ] "Complete your details to refine your estimate" sub-label renders above Calculate button when hub is reached via URL params
- [ ] No ad unit appears between the form and the result
- [ ] Data source citation appears on every result
- [ ] All schema blocks present on hub page (WebApplication, Dataset, FAQPage, BreadcrumbList)
- [ ] Viewport meta tag present: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] Mobile progressive disclosure: on 375px viewport, Stage 1 fields (Industry + SDE + Revenue) and Calculate button are visible without scrolling on load
- [ ] Stage 2 fields (Trend + Owner + Concentration) reveal correctly after SDE is entered on mobile
- [ ] All input, select elements have explicit font-size: 16px — verified on real iOS Safari (no auto-zoom on field tap)
- [ ] Hamburger nav drawer opens, closes via X button and overlay tap, scroll locks while open
- [ ] INP verified under 100ms for all calculator interactions
- [ ] LCP under 2.0 seconds
- [ ] CLS under 0.05

---

## Gate 3 — Before Any Guide Page Publishes

- [ ] Minimum 800 words of substantive content
- [ ] At minimum 1 internal link to the hub calculator
- [ ] At minimum 1 internal link to a relevant industry page
- [ ] Author information present (name, brief background)
- [ ] Date published present
- [ ] At minimum 1 external citation to a primary source (BizBuySell, SBA, or other authoritative reference)
- [ ] No filler language (see prohibited phrases list in `05-CONTENT-RULES.md`)
- [ ] Schema blocks present (Article, FAQPage if applicable, BreadcrumbList)
- [ ] Meta description specific to this guide (not generic)

---

## Gate 4 — Before Site Goes Live (Full Launch)

These conditions must all be true before the first page is made publicly accessible:

**Mandatory standalone pages complete:**
- [ ] `/about/` — published with real operator information, site mission, independence statement
- [ ] `/methodology/` — published with full data methodology explanation and disclaimer
- [ ] `/privacy-policy/` — GDPR/CCPA compliant, covers AdSense cookie disclosure

**Technical infrastructure:**
- [ ] `robots.txt` present and correct — no industry or guide pages blocked
- [ ] `sitemap.xml` present, complete, and submitted to Google Search Console
- [ ] Google Search Console property verified
- [ ] Google Analytics (or equivalent) installed and tracking
- [ ] SSL certificate active (HTTPS on all pages)
- [ ] All pages return correct HTTP status codes (200 for live pages, 301 for redirects)
- [ ] No pages returning 404 from internal links

**Content minimums:**
- [ ] Hub calculator page complete
- [ ] All 11 category hub pages complete
- [ ] Every industry page in the build has passed Gate 1 individually — no industry page publishes until all industry pages are ready
- [ ] All 10 priority guide pages complete (listed in `04-PAGE-TEMPLATES.md`)

**All industry pages publish simultaneously or none publish.** The sandbox clock starts on the domain's first public day regardless of how many pages exist. Topical completeness — the full internal link graph, all category hubs linking to full industry sets, all related_industries links pointing to pages that actually exist — is strongest when the entire structure launches together. The constraint is not time but data quality: every industry page must pass Gate 1 before any industry page goes live. Do not publish a partial set of industry pages as a compromise — either the data is complete and everything launches, or the data is incomplete and nothing launches until it is.

---

## Gate 5 — Before AdSense Application

- [ ] Site has been live (publicly accessible, indexed) for minimum 60 days
- [ ] Minimum 20 quality pages published (hub + guides + industry pages meeting all Gate 1/3 requirements)
- [ ] About page present
- [ ] Privacy Policy present with cookie disclosure
- [ ] Contact method present
- [ ] Site has received at minimum 50 organic sessions (confirms Google has indexed and is routing traffic)
- [ ] No AdSense policy violations present anywhere on the site (no copyrighted content, no misleading claims, no adult content)

**Do not apply before day 61.** Early applications on new domains are rejected automatically regardless of content quality. A rejection goes on record and can complicate re-application.

---

## Gate 6 — Before Any Industry Data Enters the Build

This gate applies before Claude Code generates any industry page — not after launch. All industry data must be complete before the build begins.

- [ ] Every industry included in the build has a complete JSON entry passing all Gate 1 data requirements
- [ ] No industry entry contains empty `deal_notes`, `what_increases_value`, `what_reduces_value`, or `typical_buyer_profile` fields
- [ ] No industry entry contains placeholder or generic content that would apply unchanged to a different industry
- [ ] All `related_industries` slugs reference industries that are also included in the build (no dead references)
- [ ] Tier 4 excluded industries (Truck Stops, Casinos, Dollar Stores, Check Cashing, Magazines/Newspapers, Food Trucks, and all manufacturing categories with median sale price above $1M) are not present in the data file

**The build does not start until this gate is cleared.** Generating pages from incomplete data and planning to fix them later produces thin content at scale — the exact failure mode the content rules exist to prevent.

---

## Gate 7 — Before Each BizBuySell Data Update

When BizBuySell releases updated industry multiple data (approximately biannual):

- [ ] Review source page for all changed multiple figures
- [ ] Update affected entries in `industry-multiples.json` (multiple fields + `data_source` + `last_updated`)
- [ ] Update `dateModified` in Dataset schema on hub page
- [ ] Update `temporalCoverage` in Dataset schema if new data period extends coverage
- [ ] Rebuild and redeploy all affected industry pages
- [ ] Verify calculator still produces correct output with updated data
- [ ] Resubmit sitemap to Search Console after update

Do not update the data file partially. All changes from a single BizBuySell update cycle should be committed together so the site does not temporarily contain a mix of old and new data across different industry pages.
