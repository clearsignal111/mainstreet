# 03 — Site Architecture

This file defines the complete structure of the site: every page type, the URL system, the relationship between pages, and the internal linking logic. The architecture is not negotiable — deviating from it breaks the topical authority signal, the internal link graph, and the entity hierarchy that the technical SEO layer depends on.

---

## The Three-Tier Structure

The site has three tiers of content, each serving a distinct function in the authority hierarchy.

**Tier 1: Hub** — The calculator (`/`) is the single highest-authority page. All links in the site flow upward toward it. It is the most internally-linked page, the most externally linked target, and the primary entity page for the domain.

**Tier 2: Category and Industry Pages** — The programmatic layer. Category pages (`/valuation/[category]/`) and industry pages (`/valuation/[industry]/`) form the ranking surface. Industry pages rank for long-tail queries. Category pages provide topical clustering.

**Tier 3: Supporting Content** — Guide pages (`/guides/[guide]/`) and standalone pages (`/about/`, `/methodology/`) provide topical authority depth, E-E-A-T signals, and internal link anchors. They do not target high-volume queries but support the pages that do.

---

## Complete URL Map

The 63 industry pages below are derived directly from `industry-multiples.json`. Every slug here has a corresponding validated entry in that file.

```
/ (Hub — calculator)
├── /valuation/ (Industry index — all categories and industries)
│   │
│   ├── /valuation/automotive/ (Category hub — 7 industries)
│   │   ├── /valuation/auto-repair-shop/
│   │   ├── /valuation/car-wash/
│   │   ├── /valuation/equipment-rental/
│   │   ├── /valuation/gas-station/
│   │   ├── /valuation/junk-salvage-yard/
│   │   ├── /valuation/marine-boat-service/
│   │   └── /valuation/towing-company/
│   │
│   ├── /valuation/education-and-children/ (Category hub — 2 industries)
│   │   ├── /valuation/daycare-childcare/
│   │   └── /valuation/preschool/
│   │
│   ├── /valuation/financial-services/ (Category hub — 3 industries)
│   │   ├── /valuation/accounting-tax-practice/
│   │   ├── /valuation/insurance-agency/
│   │   └── /valuation/medical-billing/
│   │
│   ├── /valuation/food-and-restaurants/ (Category hub — 5 industries)
│   │   ├── /valuation/bakery/
│   │   ├── /valuation/bar-pub-tavern/
│   │   ├── /valuation/brewery/
│   │   ├── /valuation/coffee-shop-cafe/
│   │   └── /valuation/restaurant/
│   │
│   ├── /valuation/healthcare-and-personal-services/ (Category hub — 11 industries)
│   │   ├── /valuation/assisted-living/
│   │   ├── /valuation/dance-pilates-yoga-studio/
│   │   ├── /valuation/dental-practice/
│   │   ├── /valuation/gym-fitness-center/
│   │   ├── /valuation/hair-salon-barber/
│   │   ├── /valuation/home-health-care/
│   │   ├── /valuation/massage-business/
│   │   ├── /valuation/medical-practice/
│   │   ├── /valuation/nail-salon/
│   │   ├── /valuation/independent-pharmacy/
│   │   └── /valuation/spa/
│   │
│   ├── /valuation/home-services/ (Category hub — 4 industries)
│   │   ├── /valuation/electrical-mechanical-contracting/
│   │   ├── /valuation/hvac-services/
│   │   ├── /valuation/landscaping-yard-services/
│   │   └── /valuation/plumbing-services/
│   │
│   ├── /valuation/pet-services/ (Category hub — 3 industries)
│   │   ├── /valuation/dog-daycare-boarding/
│   │   ├── /valuation/pet-grooming/
│   │   └── /valuation/pet-stores-supply/
│   │
│   ├── /valuation/recreation-and-hospitality/ (Category hub — 6 industries)
│   │   ├── /valuation/bowling-alley/
│   │   ├── /valuation/rv-park-campground/
│   │   ├── /valuation/golf-course/
│   │   ├── /valuation/hotel-motel/
│   │   ├── /valuation/marina/
│   │   └── /valuation/nightclub-theater/
│   │
│   ├── /valuation/retail/ (Category hub — 3 industries)
│   │   ├── /valuation/convenience-store/
│   │   ├── /valuation/grocery-store/
│   │   └── /valuation/liquor-store/
│   │
│   ├── /valuation/service-businesses/ (Category hub — 13 industries)
│   │   ├── /valuation/architecture-engineering/
│   │   ├── /valuation/catering-company/
│   │   ├── /valuation/cleaning-businesses/
│   │   ├── /valuation/commercial-laundry/
│   │   ├── /valuation/dry-cleaner/
│   │   ├── /valuation/funeral-home/
│   │   ├── /valuation/laundromat/
│   │   ├── /valuation/locksmith/
│   │   ├── /valuation/pest-control/
│   │   ├── /valuation/property-management/
│   │   ├── /valuation/security-businesses/
│   │   ├── /valuation/staffing-agency/
│   │   └── /valuation/waste-management-recycling/
│   │
│   ├── /valuation/technology/ (Category hub — 4 industries)
│   │   ├── /valuation/graphic-web-design/
│   │   ├── /valuation/it-managed-services/
│   │   ├── /valuation/software-app-company/
│   │   └── /valuation/ecommerce-website/
│   │
│   └── /valuation/transportation-and-storage/ (Category hub — 2 industries)
│       ├── /valuation/self-storage/
│       └── /valuation/trucking-company/
│
├── /guides/ (Supporting content)
│   ├── /guides/what-is-sde/
│   ├── /guides/understanding-valuation-multiples/
│   ├── /guides/how-to-prepare-business-for-sale/
│   ├── /guides/what-buyers-look-for/
│   ├── /guides/ebitda-vs-sde/
│   ├── /guides/working-with-business-broker/
│   ├── /guides/sba-acquisition-loans/
│   ├── /guides/how-to-increase-business-value/
│   ├── /guides/preparing-financials-for-sale/
│   └── /guides/valuation-methods-explained/
│
├── /about/
├── /methodology/
├── /privacy-policy/
├── /sitemap.xml
└── /robots.txt
```

**Total: 63 industry pages across 11 category hubs.** Every industry slug above corresponds to a validated entry in `industry-multiples.json`. Do not create pages for slugs not in that file.
│   │
---

## Internal Link Graph

This section defines the mandatory internal links every page type must carry. These are minimums — contextual links within body content can and should exceed these.

### Hub Page → outbound links
- To all 11 category hub pages (from "Browse by Industry" grid)
- To top 15 industry pages by estimated search volume (see priority list below)
- To all 10 guide pages
- To `/methodology/`
- To `/about/`

### Category Hub Pages → outbound links
- To hub page (from introductory text): anchor "small business valuation calculator" or "free valuation calculator"
- To every industry page within the category (from industry table and deep-dive sections)
- To 2–3 guide pages relevant to the category
- To `/methodology/`

### Industry Pages → outbound links
- To hub page (mandatory — two paths):
  1. **Micro-calculator CTA** (primary): the "Get your full breakdown →" link rendered with the inline estimate result. This is the highest-intent link on the page. Carries `?industry=[slug]&sde=[value]&revenue=[value]` URL params.
  2. **In-body text link** (secondary): a contextual anchor within the first or second paragraph using anchor text "small business valuation calculator" or "use our free calculator". This provides a hub link for users who do not interact with the micro-calculator.
- To parent category hub page (from breadcrumb and contextual reference)
- To 2–4 related industry pages (from `related_industries` field — natural anchor text)
- To 1–2 guide pages (contextually embedded within body content)
- To `/methodology/` (from data citation section)
- External: to BizBuySell source page (from data citation — opens in new tab)

### Guide Pages → outbound links
- To hub page (mandatory, minimum once)
- To 2–3 relevant industry pages (contextually embedded)
- To 2–3 other guide pages (contextually embedded)
- To `/methodology/`
- External: to primary sources cited (BizBuySell, SBA, relevant data sources)

### About Page → outbound links
- To hub page
- To `/methodology/`
- External: to BizBuySell

### Methodology Page → outbound links
- To hub page
- External: to BizBuySell source page

---

## Footer Link Architecture — Category-Scoped Internal Discovery

The footer on every industry page serves a dual purpose: user navigation and crawler discovery. The implementation below is based on how high-authority utility sites (including sites cited by SEO researchers as well-structured) use dense footer linking to ensure full site crawlability while keeping the links topically coherent.

**The rule:** Every industry page footer includes links to all other industry pages within the same `industry_category`. This is populated dynamically from `industry-multiples.json` at build time — find all entries where `industry_category` matches the current page's category, output them as footer links excluding the current page itself.

**Why category-scoped rather than all 63:**
A footer linking all 63 industries from every page would expose the programmatic structure too nakedly to the Scaled Content classifier — it looks like artificial equity distribution rather than navigation. Category-scoped links are genuinely related (a user on the HVAC page has a plausible interest in Plumbing and Electrical), defensible to a quality rater, and still provide full site reachability in two hops.

**Reachability math:** Any industry page → hub page (via upward link in paragraph 1) → any other category page → any industry page in that category. Two hops maximum between any two industry pages on the site. This equals Outpace-level crawl architecture without the spam signal risk.

**Footer section label:** "Other [Category Name] Business Valuations" — e.g., "Other Home Services Business Valuations" on the HVAC page, "Other Food & Beverage Business Valuations" on the Restaurant page.

**Category sizes by footer link count:**
- Home Services: 4 pages (HVAC, Plumbing, Electrical, Landscaping)
- Food and Restaurants: 5 pages
- Healthcare and Personal Services: 11 pages — display as two columns
- Service Businesses: 13 pages — display as two columns
- Technology: 4 pages
- Automotive: 7 pages
- Recreation and Hospitality: 6 pages
- Financial Services: 3 pages
- Education and Children: 2 pages
- Pet Services: 3 pages
- Retail: 3 pages
- Transportation and Storage: 2 pages

For categories with more than 8 pages, split into two columns in the footer. For categories with 2-3 pages, include a second footer section: "Related Categories" linking to 2-3 other category hub pages that share buyer profiles or seller demographics with this industry.

**Hub page footer:** Links to all 11 category hub pages plus the top 15 industry pages by estimated search volume — already specified in the hub page template. No change needed.

**Global footer elements present on every page regardless of category:**
- About | Methodology | Privacy Policy | Contact (standard)
- Data source citation and disclaimer (mandatory)
- "Small Business Valuation Calculator" link to hub (anchor text exact)

The category-scoped footer links appear between the global navigation links and the standard footer elements.

## Priority Industry Pages

The following 15 industries represent the highest estimated search volume and should receive additional internal linking from the hub page and guide pages. All slugs are verified against `industry-multiples.json`.

1. `/valuation/restaurant/` — "how much is a restaurant worth"
2. `/valuation/auto-repair-shop/` — "auto repair shop valuation"
3. `/valuation/hvac-services/` — "HVAC business for sale value"
4. `/valuation/landscaping-yard-services/` — "landscaping business valuation"
5. `/valuation/cleaning-businesses/` — "cleaning business valuation"
6. `/valuation/dental-practice/` — "dental practice valuation multiple"
7. `/valuation/car-wash/` — "car wash business valuation"
8. `/valuation/plumbing-services/` — "plumbing business for sale price"
9. `/valuation/hair-salon-barber/` — "hair salon business valuation"
10. `/valuation/convenience-store/` — "convenience store valuation"
11. `/valuation/accounting-tax-practice/` — "accounting firm valuation multiple"
12. `/valuation/insurance-agency/` — "insurance agency valuation"
13. `/valuation/gym-fitness-center/` — "gym business valuation"
14. `/valuation/daycare-childcare/` — "daycare business for sale value"
15. `/valuation/it-managed-services/` — "MSP business valuation"

---

## Orphan Page Prevention

No page in the public URL structure should be reachable only via the sitemap. Every page must have at minimum 2 inbound internal links from other published pages.

Verification method: After build, run a crawl starting from the homepage and confirm that every URL in the sitemap is discovered via internal links. URLs only found via the sitemap (not via internal link crawl) are orphans and must be linked from an appropriate parent page.

---

## Redirect Map

Set these redirects at launch to prevent 404s and consolidate any URL variations:

```
/calculator/    →  / (301 if homepage is the calculator)
/valuation/     →  / (301 — no standalone industry index page needed if hub serves this)
```

Any URL that generates a 404 after launch should be investigated immediately. 404s on industry pages indicate a slug mismatch between the URL map and the JSON data file — fix in both places simultaneously.

---

## GEO / AI Citation Surface

One architectural consideration from the current search landscape: the more authoritative external sites reference this site's data, the more likely AI systems (ChatGPT, Perplexity, Claude, Google's AI Overviews) are to cite it when users ask about business valuation.

The link acquisition targets below are therefore dual-purpose: they build PageRank through traditional backlinks AND they expand the AI citation surface by getting the site referenced on pages that AI systems treat as authoritative sources.

**Primary outreach targets:**
- SCORE chapter resource pages (small business mentoring nonprofit — high domain authority, relevant audience, links to planning tools)
- SBA.gov partner resource pages (government adjacency — significant authority signal)
- State Small Business Development Center (SBDC) websites — each state has one, most maintain resource pages for business owners
- Small business exit planning content on sites like Entrepreneur, Inc., Forbes Small Business — earned media via useful data (contact editorial teams, not advertising teams)
- Business broker association websites (IBBA — International Business Brokers Association, and state-level equivalents) — these are the most directly relevant external linkers

**What to offer:** A specific, data-backed resource that their audience needs. "We've built a free calculator using BizBuySell's transaction data that gives business owners an industry-specific valuation estimate" is a concrete pitch, not a generic link request.

**No paid links. No link exchanges.** The backlink profile must be earned. Paid or exchanged links in this niche will be visible in a link audit and create manual action risk.
