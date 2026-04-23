# 04 — Page Templates

This file defines the structural template for every page type in the site. Templates specify section order, required elements, H-tag hierarchy, and content requirements for each section. They do not define copy — copy standards are in `05-CONTENT-RULES.md`. They do not define schema — schema is in `06-TECHNICAL-SEO.md`. This file defines structure only.

Build each page type from its template. Do not invent sections. Do not reorder sections. If a section's content requires data that does not exist, the page does not publish.

---

## Page Type 1: Hub Calculator Page

**URL:** `/` or `/calculator/`  
**Target queries:** "business valuation calculator," "what is my business worth," "how to value a small business," "small business valuation calculator free"  
**Primary purpose:** Deliver the calculator to the broadest audience. Establish the site as a data entity. Link to the full programmatic structure below it.

### Template Structure

```
<head>
  Title: Small Business Valuation Calculator — [Year] Industry Data
  Meta description: [see 06-TECHNICAL-SEO.md for pattern]
  Canonical: https://[domain]/
  Schema: WebApplication, Dataset, FAQPage, BreadcrumbList
</head>

<body>
  [SECTION: Header / Navigation]
  - Site name / logo
  - Minimal navigation: Home | Industries | Guides | About | Methodology
  - No hero image. No banner. Navigation directly above calculator.

  [SECTION: H1 + Orienting Text]
  - H1: "Small Business Valuation Calculator — [Year] Industry Data"
  - 2–3 sentences maximum: what the tool does, why industry-specific data matters, 
    that no email is required. Do not exceed 60 words in this section.
  - Inline note: "Based on [N]+ closed transactions · [Number] industries covered · 
    Updated [Quarter Year]"

  [SECTION: Calculator — Full Input Form]
  - All six input fields per 02-CALCULATOR-SPEC.md
  - "Calculate My Valuation" submit button
  - No content between H1 and calculator. Calculator follows immediately.

  [SECTION: Calculator Result — appears on submit, same page]
  - Primary valuation range (largest text on page)
  - Breakdown block
  - What drives value up (dynamic)
  - What could reduce value (dynamic)
  - Data source citation block
  - [AD UNIT 1: Below result block, above What-If section]
    Context: user has their number, highest intent moment
    Size: responsive display ad, size-reserved

  [SECTION: What-If Simulation]
  - Collapsed by default with expand prompt
  - Three sliders per 02-CALCULATOR-SPEC.md
  - Real-time output updates

  [SECTION: Next Steps Module]
  - Three suggested actions with links to guide pages
  - No email capture

  [AD UNIT 2: Below next steps module]

  [SECTION: About This Data — H2]
  - H2: "Where This Data Comes From"
  - 150–250 words explaining BizBuySell, CoStar Group, transaction count, 
    update frequency, why industry-specific multiples matter
  - Link to /methodology/ for full explanation

  [SECTION: Understanding Your Valuation — H2]
  - H2: "Understanding Business Valuation Multiples"
  - 200–350 words explaining what an SDE multiple is, why multiples vary by 
    industry, what the range means in practice
  - Link to "Understanding Business Valuation Multiples" guide page

  [SECTION: Browse by Industry — H2]
  - H2: "Valuation Data by Industry"
  - Category grid linking to all 11 category hub pages
  - Below the grid: direct links to the top 15 highest-volume industry pages
    displayed as a clean list grouped by category

  [SECTION: FAQ — H2]
  - H2: "Frequently Asked Questions"
  - 5 Q&A pairs per schema defined in 06-TECHNICAL-SEO.md
  - Questions rendered as H3 within the FAQ section

  [SECTION: Footer]
  - Copyright, About, Methodology, Privacy Policy links
  - Data source citation: "Transaction data: BizBuySell Industry Valuation 
    Report. Updated biannually. This tool provides planning estimates only 
    and does not constitute a formal business appraisal."
</body>
```

---

## Page Type 2: Industry Valuation Pages

**URL pattern:** `/valuation/[industry-slug]/`  
**Example:** `/valuation/hvac-services/`  
**Target queries:** "how much is an [industry] business worth," "[industry] business valuation," "[industry] SDE multiple," "[industry] business sale price"  
**Primary purpose:** Rank for industry-specific valuation queries. Deliver an immediate inline estimate via the micro-calculator component. Drive qualified, high-intent users to the full calculator hub with their inputs pre-carried.

### Data dependencies (from `industry-multiples.json` — all required before page publishes)
- `industry_name`, `industry_slug`, `industry_category`
- `sde_multiple_low`, `sde_multiple_mid`, `sde_multiple_high`, `revenue_multiple_avg`
- `typical_sde_margin_pct`, `transaction_count`, `data_source`, `last_updated`
- `deal_notes` (non-empty)
- `what_increases_value` (minimum 3 items)
- `what_reduces_value` (minimum 3 items)
- `typical_buyer_profile` (non-empty)
- `related_industries` (minimum 2 valid slugs)

### Template Structure

```
<head>
  Title: How Much Is a [Industry Name] Business Worth? ([Year] Data)
  Meta description: [Industry Name] SDE Multiple: [low]× – [high]× 
    ([data_source]). Calculate your specific [Industry Name] business 
    valuation using [transaction_count]+ closed transactions. Free, 
    no email required.
  Canonical: https://[domain]/valuation/[industry-slug]/
  Schema: Dataset (industry-specific), FAQPage, BreadcrumbList
</head>

<body>
  [SECTION: Header / Navigation]
  - Same site header as all pages
  - Breadcrumb: Home > Business Valuation > [Industry Name] Valuation

  [SECTION: H1 + Orienting Text]
  - H1: "How Much Is a [Industry Name] Business Worth? ([Year] Data)"
  - 2–4 sentences: what this page covers, what the typical multiple range is 
    (state the actual numbers: "[Industry] businesses typically sell for 
    [sde_multiple_low]× to [sde_multiple_high]× annual SDE"), data source.
  - Industry-specific, not generic. References the specific multiple.
  - Maximum 80 words.

  [SECTION: Industry Multiple Summary Box — above calculator]
  - Styled summary card displaying:
    - "Typical SDE Multiple: [sde_multiple_low]× – [sde_multiple_high]×"
    - "Median Multiple: [sde_multiple_mid]×"
    - "Revenue Multiple (avg): [revenue_multiple_avg]×"
    - "Based on: [transaction_count]+ transactions | [data_source]"
  - Wrap this entire block in a CSS class: `class="sge-summary-block"`
    This class is the primary SGE extraction target — the clean wrapper
    allows crawlers to identify and parse the data-dense fragment without
    ambiguity. No other section on the page should use this class.
  - Internal structure of the text content within this block must follow
    three-part logic for AI extraction optimization:
    1. Core Fact: The median multiple stated as a number
       ("The median [Industry] SDE multiple is [sde_multiple_mid]×")
    2. Data Volume: Transaction count as authority signal
       ("based on [transaction_count]+ closed transactions reported
       to BizBuySell through [data_source]")
    3. Range Variable: Low-to-high range with the primary driver
       ("Valuations range from [sde_multiple_low]× to
       [sde_multiple_high]× depending on [primary driver from
       deal_notes — e.g., 'service contract ratio' for HVAC,
       'lease terms' for restaurants, 'membership program' for
       car washes]")
  - This three-part structure ensures the block answers the query
    completely, signals authority, and creates a reason to use the
    calculator rather than leaving with just the range.

  [SECTION: Micro-Calculator — Industry-Specific Estimate]
  - This is NOT the full calculator. It is the micro-calculator component
    specified in 02-CALCULATOR-SPEC.md § Micro-Calculator Specification.
    The full calculator lives only at the hub (`/`).
  - Single hook line immediately above the micro-calculator inputs:
    "Enter your SDE and annual revenue to see where your [Industry Name]
    business falls within the [Year] transaction range."
    This line is plain text, not a heading.
  - Two inputs: Annual SDE + Annual Revenue (industry is known from the page,
    not an input)
  - Submit button: "Get My Estimate"
  - On submit: inline result renders on this page (no navigation)
    - Dollar range in accent green, same visual weight as full calculator result
    - Median multiple citation + BizBuySell source line
    - Disclosure: "Estimate uses median multiple only. Revenue trend, owner
      involvement, and concentration are not factored in — these shift results
      by 20–40%."
    - CTA text link: "Get your full breakdown, What-If analysis, and value
      drivers →" — links to `/?industry=[slug]&sde=[value]&revenue=[value]`
  - No ad unit between the inputs and the inline result.
  - Ad Unit 1 appears below the inline result block (same placement logic
    as the full calculator result on the hub page).

  [AD UNIT 1: Below micro-calculator result, trigger: appears after user submits]

  [SECTION: Next Steps Module]
  - Note: The What-If Simulation is part of the full calculator at the hub,
    not present on industry pages. The micro-calculator CTA drives users to
    the hub for What-If access.

  [AD UNIT 2: Below next steps]

  [SECTION: [Industry Name] Valuation Multiple Data — H2]
  - H2: "[Industry Name] Business Valuation Multiples ([Year])"
  - Multiple table:
    | Metric | Value |
    | SDE Multiple (Lower Quartile) | [sde_multiple_low]× |
    | SDE Multiple (Median) | [sde_multiple_mid]× |
    | SDE Multiple (Upper Quartile) | [sde_multiple_high]× |
    | Revenue Multiple (Average) | [revenue_multiple_avg]× |
    | Transactions Analyzed | [transaction_count]+ |
    | Data Source | [data_source] |
    | Data Coverage | Q1 2021 – Q4 2025 |
  - 1–2 sentences below the table interpreting what the range means in 
    plain language. Example: "A [Industry Name] business with $200,000 SDE 
    would be valued between $[low calc] and $[high calc] under typical 
    market conditions."

  [SECTION: What Drives [Industry Name] Business Value — H2]
  - H2: "What Makes a [Industry Name] Business Worth More"
  - Introductory sentence from deal_notes field
  - Bullet list from what_increases_value array — each bullet is one 
    sentence minimum, expanding on the factor with specificity
  - Total section: 200–350 words

  [SECTION: What Reduces [Industry Name] Business Value — H2]
  - H2: "What Can Reduce a [Industry Name] Business's Sale Price"
  - Bullet list from what_reduces_value array — same expansion requirement
  - Total section: 150–300 words

  [SECTION: How We Calculated This Valuation — H3 or toggleable block]
  - Positioned below the multiple data table, before the value drivers section
  - H3: "How This Valuation Was Calculated"
  - Required content:
    - Data source statement: "The [sde_multiple_mid]x median multiple for 
      [Industry Name] businesses is derived from [transaction_count]+ closed 
      transactions reported to BizBuySell from Q1 2021 through Q4 2025."
    - Adjustment logic in plain language: "Your specific estimate adjusts 
      from the median based on revenue trend (+-0.15 to 0.30x), owner 
      involvement (+-0.20x), and customer concentration (+-0.10 to 0.25x). 
      Strong growth plus low owner dependency plus diversified customers 
      approaches the upper quartile; the inverse pushes toward the lower."
    - Floor rule statement: "Results are floored at 1.0x SDE — businesses 
      rarely sell below annual earnings regardless of risk factors."
    - Disclaimer: "This is a planning estimate based on closed transaction 
      data, not a formal business appraisal."
  - Can be rendered as a collapsed "How this works" toggle to reduce 
    visual weight while remaining crawlable.
  - This section is mandatory. It satisfies E-E-A-T Methodology 
    Transparency and demonstrates to Google that the tool is a 
    deterministic financial model, not a random number generator.
    A tool without visible methodology is a black box; a tool that 
    explains its logic is an authority.

  [SECTION: [Industry Name] Market Context — H2]
  - H2: "2026 [Industry Name] Business Sale Market"
  - THIS SECTION MUST BE UNIQUE PER INDUSTRY PAGE. It is the primary 
    mechanism by which 63 structurally similar pages pass the Scaled 
    Content Abuse classifier. It cannot be a template with [Industry] 
    swapped in. Every element below must reflect knowledge specific 
    to this industry's actual transaction market.

  Required element 1 — Comparison Table (all pages):
  A small table comparing this industry's multiples against 2-3 related 
  industries from the same category. The HVAC table compares HVAC vs 
  Plumbing vs Electrical. The Restaurant table compares Restaurant vs 
  Bar/Tavern vs Coffee Shop. The comparison set is different on every 
  page because every industry has different neighbors.
  | Business Type | Median SDE Multiple | Primary Value Driver |
  | [This Industry] | [mid]x | [key factor from deal_notes] |
  | [Related 1] | [their mid]x | [their key factor] |
  | [Related 2] | [their mid]x | [their key factor] |
  Source both the related industry multiples from industry-multiples.json.

  Required element 2 — Market Sentiment Paragraph (all pages):
  100-150 words covering what has specifically changed in the M&A 
  environment for this industry in 2024-2026. This must draw on the 
  deal_notes content in the JSON and extend it with current market 
  context. Examples of what makes this paragraph industry-specific:
  - HVAC: PE roll-up pace, specific platform names, service contract 
    premium in current deal flow
  - Restaurant: Post-COVID lease renegotiation environment, SBA 
    lending tightening for food service, current buyer risk-aversion 
    around short leases
  - Car Wash: Membership program valuation premium, express format 
    dominance, PE consolidator appetite in 2025-2026
  - Funeral Home: National consolidator acquisition pace, pre-need 
    trust regulation environment, cremation share shift
  This paragraph is where the seller learns something current and 
  market-specific that they could not get from a generic tool.

  Optional element 3 — Industry Operational Benchmark (where natural):
  A short note, callout box, or worked example containing operational 
  benchmark data specific to this industry. Not required on every page 
  but strongly recommended for industries with strong operational 
  metrics that drive valuation (car washes, laundromats, restaurants, 
  gyms, marinas). Examples:
  - Car Wash: "A membership base of 500+ members generating $35/month 
    represents $210,000 in annual recurring revenue — the factor most 
    directly correlated with upper-quartile multiples in this category."
  - Restaurant: "Industry benchmark: prime cost (food + labor combined) 
    below 60% of revenue is considered well-managed. Buyers use this 
    as a proxy for operational quality independent of the earnings figure."
  - Laundromat: "A 40-machine laundromat running 8 loads per machine 
    per day at $3.50 average generates approximately $400,000 annual 
    revenue — the breakeven point where card-payment systems begin 
    producing verifiable data that supports SBA financing."

  [SECTION: Who Buys [Industry Name] Businesses — H2]
  - H2: "Who Buys [Industry Name] Businesses?"
  - Content from typical_buyer_profile field, expanded to 100-200 words
  - Covers: buyer type (individual, PE, strategic), financing method 
    (SBA vs conventional), typical deal structure considerations

  [SECTION: Frequently Asked Questions — H2]
  - H2: "Frequently Asked Questions: Selling a [Industry Name] Business"
  - 3–5 Q&A pairs, industry-specific (not generic valuation questions)
  - Each Q rendered as H3
  - All Q&A pairs included in FAQPage schema

  [SECTION: Related Industries — H3 or styled link block]
  - "See also:" followed by links to related_industries pages
  - Natural anchor text, not exact match

  [SECTION: Internal Links to Guides — contextual]
  - 1–2 contextual in-body links to relevant guide pages already placed 
    within the content sections above (not a link block, integrated naturally)

  [SECTION: Footer]
  - Same footer as all pages
  - Data citation and disclaimer mandatory
</body>
```

---

## Page Type 3: Category Hub Pages

**URL pattern:** `/valuation/[category-slug]/`  
**Examples:** `/valuation/home-services/`, `/valuation/food-beverage/`, `/valuation/automotive/`  
**Target queries:** "home services business valuation," "food and beverage business for sale multiple," "how to value a [category] business"  
**Primary purpose:** Intermediate navigation layer that groups industry pages by category, builds topical authority within each category, and distributes internal link equity to industry pages.

### Template Structure

```
<head>
  Title: [Category] Business Valuation: SDE Multiples & Market Data ([Year])
  Meta description: [Category] businesses sell for [range]× SDE depending 
    on type. Valuation data for [3–4 specific sub-industries], based on 
    BizBuySell transaction records.
  Canonical: https://[domain]/valuation/[category-slug]/
  Schema: Article, BreadcrumbList
</head>

<body>
  [SECTION: Header / Navigation]
  - Breadcrumb: Home > Business Valuation > [Category Name]

  [SECTION: H1 + Overview]
  - H1: "Valuing a [Category Name] Business: SDE Multiples and 2026 Market Data"
  - 100–200 words: overview of the category, why valuation varies within it,
    the multiple range across industries in this category (high to low)
  - Link to hub calculator: "Use our free business valuation calculator to 
    get your industry-specific estimate."

  [SECTION: [Category] Multiple Summary Table — H2]
  - H2: "[Category] Business Valuation Multiples by Type"
  - Table showing all industries in the category with their median SDE multiple:
    | Business Type | Typical SDE Multiple | Transactions |
    | [Industry 1] | [mid]× | [count]+ |
    | [Industry 2] | [mid]× | [count]+ |
    ...
  - Each business type in the table links to its industry page

  [SECTION: Industry Deep-Dives — H2 per industry group]
  - For each industry in the category, a short H2-headed section:
    - H2: "[Industry Name] Businesses"
    - 100–150 words covering what drives valuation in this specific type
    - Link to the full industry page: "See full [Industry Name] valuation data →"

  [SECTION: Key Factors Affecting [Category] Business Value — H2]
  - H2: "Key Factors Affecting [Category] Business Valuations"
  - 200–350 words on factors common across the category 
    (e.g., for Home Services: recurring service contracts, technician 
    availability, geographic density, equipment ownership)
  - Not a repeat of individual industry factors — category-level synthesis

  [AD UNIT: Mid-page, after key factors section]

  [SECTION: Frequently Asked Questions — H2]
  - 3–4 category-level FAQ questions and answers

  [SECTION: Footer]
</body>
```

---

## Page Type 4: Supporting Content / Guide Pages

**URL pattern:** `/guides/[guide-slug]/`  
**Examples:** `/guides/what-is-sde/`, `/guides/how-to-prepare-business-for-sale/`, `/guides/ebitda-vs-sde/`  
**Target queries:** educational and research-intent queries from business owners in the consideration phase  
**Primary purpose:** Topical authority, E-E-A-T signaling, internal link anchor pages for the hub and industry pages, AdSense approval support.

### Guide Pages Required (minimum before AdSense application)

1. `what-is-sde` — "What Is SDE? How to Calculate Seller's Discretionary Earnings"
2. `understanding-valuation-multiples` — "Understanding Business Valuation Multiples"
3. `how-to-prepare-business-for-sale` — "How to Prepare Your Business for Sale"
4. `what-buyers-look-for` — "What Business Buyers Look For"
5. `ebitda-vs-sde` — "EBITDA vs SDE: Which Matters When Selling Your Business"
6. `working-with-business-broker` — "Working With a Business Broker: What to Expect"
7. `sba-acquisition-loans` — "SBA Loans for Business Acquisitions: What Sellers Need to Know"
8. `how-to-increase-business-value` — "How to Increase Your Business's Sale Price"
9. `preparing-financials-for-sale` — "Preparing Your Financials for a Business Sale"
10. `valuation-methods-explained` — "Business Valuation Methods Explained: SDE, EBITDA, Asset, and DCF"

### Template Structure

```
<head>
  Title: [Article-specific — natural, question-based]
  Meta description: [Article-specific, 150–160 chars, specific value stated]
  Canonical: https://[domain]/guides/[guide-slug]/
  Schema: Article, FAQPage (if FAQ section present), BreadcrumbList
</head>

<body>
  [SECTION: Header / Navigation]
  - Breadcrumb: Home > Guides > [Guide Title]

  [SECTION: H1 + Article Metadata]
  - H1: [Guide title]
  - Author name | Date published | Last updated
  - Reading time estimate (optional but improves E-E-A-T appearance)

  [SECTION: Article Body]
  - Minimum 800 words, recommended 1,200–2,000 words for primary guides
  - H2 subheadings to break content into logical sections
  - No H1 in body — H1 is the title only
  - Practical, specific, written for a business owner who is actively 
    considering a sale — not for a finance student or a general audience
  - At minimum 1 internal link to the hub calculator
  - At minimum 1 internal link to a relevant industry page
  - At minimum 1 internal link to another guide page
  - External link to BizBuySell or other primary source where cited

  [AD UNIT: Mid-article, after first major section break — not before]

  [SECTION: Key Takeaways (optional but recommended)]
  - 3–5 bullet summary at the end of the article
  - Helps users who scrolled to the bottom get value before leaving

  [SECTION: FAQ (if applicable) — H2]
  - H2: "Frequently Asked Questions"
  - 3–5 questions specific to the guide topic

  [SECTION: Related Reading — H3 or styled link block]
  - 3–4 links to related guide pages or industry pages
  - Natural anchor text

  [SECTION: Footer]
</body>
```

---

## Universal Page Elements

These elements appear on every page, in the same position, built identically.

### Header
- Site name/logo (left-aligned)
- Navigation: Home | Industries (dropdown to category pages) | Guides | About | Methodology
- No promotional banners in header
- No ad units in header

### Footer
- Copyright line
- Links: About | Methodology | Privacy Policy | Contact
- Data citation and disclaimer (see `06-TECHNICAL-SEO.md` for exact text)
- This disclaimer text is mandatory on every page — it is a legal protection and an E-E-A-T signal

### Ad Placement Constraints
- Ad Unit 1: Always appears below the full calculator result block, never between inputs and result
- Ad Unit 2: Appears after the Next Steps module
- Mid-content ad (guides and category pages only): After first major section break, never in first 25% of content
- No ad unit in the first screenful of any page
- No ad unit between the H1 and the calculator on any page
- Maximum 2 ad units per industry page, 2 per category page, 1–2 per guide page
- All ad units size-reserved with explicit CSS dimensions before load (prevents CLS)
