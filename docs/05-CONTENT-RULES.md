# 05 — Content Rules

This file defines the quality standards that every piece of content must meet before it publishes. These are not style preferences — they are quality gates. A page that fails any rule in this file is not ready to publish, regardless of whether its template structure is correct.

The single test for all content: **Does this make the tool more useful to a business owner who is seriously considering selling their business?**

If a sentence, section, or page does not pass that test, it does not belong in this build.

---

## The 63-Page Scaled Content Problem — and How to Solve It

This is the most critical content challenge in the build. 63 pages sharing a template structure is the definition of what Google's Scaled Content Abuse classifier targets. Passing it requires understanding precisely what the classifier measures and building the specific differentiators that defeat it.

**What the classifier measures:** Template-to-value ratio. If the structural template (section order, heading patterns, table format) accounts for 90% of what appears on the page, the page fails. The classifier looks for evidence that a human with domain knowledge was involved in producing the content — not that the template was filled in from a database.

**What passes it:** Structural similarity is acceptable. NerdWallet, Zillow, and Bankrate all use templates across thousands of pages. What they have — and what this site must have — is genuine informational differentiation per page that could not have been produced by swapping a variable into a template.

**The three mandatory differentiators on every industry page:**

### Differentiator 1: Industry-Specific Jargon in Deal Notes

The `deal_notes` and surrounding prose must contain terminology that belongs to that specific industry and no other. This is both an E-E-A-T signal and a classifier signal — Google's NLP detects whether the vocabulary is domain-appropriate.

Each industry has a vocabulary that marks genuine expertise. Claude Code must use this vocabulary naturally in the deal notes expansion, not avoid it for fear of confusing readers. The target reader (a business owner in this industry) knows these terms. Using them signals that the content was produced by someone who understands their world.

**Required jargon examples by industry category:**

*Home Services (HVAC, Plumbing, Electrical):*
"Service contracts," "maintenance agreements," "truck rolls," "technician churn," "recurring route revenue," "service area density," "master license," "journeyman," "call-back rate"

*Food and Restaurants:*
"Prime cost," "COGS," "inventory turn," "per-seat revenue," "table turns," "liquor license transfer," "FOH/BOH ratio," "food cost percentage," "cover count"

*Healthcare (Dental, Medical, Home Health):*
"DSO," "payer mix," "fee-for-service," "DIR fees," "EBITDA margin," "RVU," "patient panel," "hygiene recall rate," "script count," "per-member-per-month"

*Financial Services (Accounting, Insurance):*
"Book of business," "EFT," "renewal commission," "contingent commission," "client retention rate," "billing rate," "recurrence revenue," "LOB concentration," "carrier appointment"

*Automotive (Auto Repair, Car Wash, Gas Station):*
"ARO (average repair order)," "bay utilization," "EFT membership," "gallonage," "inside revenue," "c-store margin," "car count," "express throughput"

*Technology (MSP, SaaS, Ecommerce):*
"MRR," "ARR," "churn rate," "NRR," "CAC," "LTV," "PSA/RMM," "seat count," "organic traffic," "domain authority"

*Pet Services:*
"Boarding utilization," "daycare membership," "grooming ticket average," "SKU concentration," "live animal margin"

*Service Businesses (Pest Control, Cleaning, Landscaping):*
"Route density," "recurring treatment contract," "stop count," "contract retention," "commercial vs residential split," "route value per stop"

If the deal notes section for an HVAC page could be dropped onto the pest control page without the reader noticing, the jargon requirement has failed.

### Differentiator 2: Unique Comparison Table Per Page

Every industry page contains a comparison table showing this industry's multiples versus 2-3 related industries. Because every industry has different neighbors, every comparison table is unique. The HVAC table cannot appear on the restaurant page and vice versa.

The data for this table comes entirely from `industry-multiples.json` — the related industries are specified in each entry's `related_industries` array. Claude Code pulls the `sde_multiple_mid` for each related industry slug and builds the table from live data. No invented figures.

This table is the simplest and most reliable page differentiator because it is structurally identical across pages (same column headers) but produces different rows on every single page. 63 pages, 63 different tables. Zero template fluff.

### Differentiator 3: Market Sentiment Paragraph

Every industry page contains a 100-150 word paragraph describing the current M&A environment specifically for that industry. This paragraph must contain at least one concrete, industry-specific market signal that could not appear on any other page.

This is also the primary freshness mechanism. When BizBuySell data updates biannually, the Market Sentiment paragraph is updated simultaneously to reflect current conditions. The `dateModified` in the Dataset schema updates to match.

**What makes a Market Sentiment paragraph industry-specific (not generic):**

- It names specific buyers or buyer types active in this industry (not "private equity buyers" but "Wrench Group, Apex Service Partners, and Hoffman Family of Companies" for HVAC)
- It references a specific market dynamic from 2024-2026 relevant to this category (not "interest rates affect valuations" but "SBA 7(a) lenders tightened underwriting on restaurant acquisitions in 2024, requiring 30% down from buyers instead of the prior 20%, which compressed the buyer pool at the $300,000-$600,000 price point")
- It contains a current trend directional statement: whether demand is increasing, stable, or contracting for this specific business type and why

**Generic paragraph that fails:**
"The [Industry] market has seen increased activity in recent years due to demographic trends and economic factors. Buyers are looking for businesses with strong financials and growth potential."

**Specific paragraph that passes (HVAC example):**
"PE-backed consolidators completed over 200 HVAC acquisitions in 2024 alone — a pace that has continued into 2026. The primary platforms (Wrench Group, Apex Service Partners, Hoffman Family) have shifted their acquisition criteria toward businesses with documented maintenance agreement revenue above 35% of total, reflecting buyer recognition that recurring service contracts justify the premium multiples they're paying. For individual buyer transactions (businesses under $2M sale price), SBA 7(a) remains the dominant financing vehicle, with 25-year loan terms keeping monthly debt service manageable for owner-operators. The window of elevated multiples driven by PE competition is expected to remain open through 2026-2027 as consolidators complete their geographic coverage goals."

---

## The Thin Content Problem — What to Avoid

Google's Scaled Content Abuse policy targets exactly the pattern this site could fall into if built carelessly: 63 pages that swap "[Industry]" into a template while the underlying content is identical. Pages that fail this test are not just penalized — they can trigger a manual action that suppresses the entire domain.

A page is thin if:
- The content would be substantially unchanged if the industry name were swapped
- The calculator result would be the same regardless of which industry was selected
- The `deal_notes`, `what_increases_value`, and `what_reduces_value` content contains generic statements that apply to any business
- The FAQ questions and answers could appear on any industry page without modification
- The page contains fewer than 400 words of non-boilerplate content

A page passes the thin content test if:
- The SDE multiple range is specific to this industry and different from the site average
- The deal_notes content references factors unique to this industry
- At least 3 of the 5 bullet points in `what_increases_value` would not apply to a different industry
- The FAQ contains questions a seller of specifically this type of business would ask
- A reader could identify which industry the page covers from the body text alone, without seeing the H1

**This test must be applied to every industry page before it publishes.**

---

## Content Standards by Page Type

### Industry Pages — Minimum Content Requirements

**H1 section (orienting text):** 50–80 words. Must state the specific multiple range for this industry. Must reference the data source. Example: "HVAC businesses typically sell for 2.3× to 3.1× annual SDE, based on 340+ closed transactions reported to BizBuySell through Q4 2025. This range shifts based on factors specific to HVAC operations — service contract coverage, technician dependency, and recurring maintenance revenue all move the needle meaningfully."

**Industry Multiple Summary Box:** Data only — no prose in this box. The numbers speak. Annotations are added in the sections below.

**"What Makes [Industry] Businesses Worth More" section:**
- Minimum 3 bullet points from `what_increases_value`, maximum 6
- Each bullet point must be expanded from the JSON field value to a full sentence or two
- JSON field value: "Strong recurring maintenance contract revenue"
- Expanded version: "HVAC businesses with active maintenance agreements covering 30%+ of annual revenue consistently command multiples in the upper quartile. Buyers recognize recurring revenue as a predictor of retention — a customer on a maintenance plan is far less likely to switch providers after a sale."
- Generic statements that are not expanded with industry-specific rationale fail this standard

**"What Can Reduce [Industry] Business's Sale Price" section:**
- Same expansion requirement as above
- Must include at least one risk factor specific to this industry's operational model (not just generic "declining revenue" or "owner dependency" — those are generic; "HVAC businesses where the owner is the primary certified technician face significant buyer resistance because SBA lenders require a qualified operator replacement plan" is specific)

**"Who Buys [Industry] Businesses" section:**
- Must reference the actual buyer profile for this industry (PE roll-ups vs. individual operators vs. strategic acquirers)
- Must mention typical financing method if it varies from the norm (most small business buyers use SBA 7(a) — industries where this is not true should note it)
- 100–200 words

**FAQ section:**
- Minimum 3 questions, maximum 6
- Every question must be industry-specific
- Prohibited generic questions (these belong only on the hub page FAQ):
  - "What is SDE?"
  - "What is an SDE multiple?"
  - "Should I use revenue or SDE to value my business?"
- Required: at least one question that could only be asked by someone selling specifically this type of business
- Answers must be specific, not hedged into meaninglessness ("it depends on many factors")

**Total word count target:** 600–1,000 words of non-template body content per industry page. The template sections (H1 intro, multiple table, next steps) do not count toward this — this is the unique content requirement.

---

### Hub Page — Content Standards

The hub page has a different content challenge: it must serve users from every industry simultaneously while still being specific enough to establish credibility.

**Orienting text (below H1):** 40–60 words. Do not over-explain. The calculator's presence on the page explains what the site is. The text confirms: what the data is based on, that it's free, that no email is needed.

**"Where This Data Comes From" section:** 150–250 words. Must explain BizBuySell's data provenance clearly enough that a skeptical user understands why these numbers should be trusted. Must link to the methodology page.

**"Understanding Business Valuation Multiples" section:** 200–350 words. Explains what a multiple is and why multiples vary by industry. Uses 2–3 concrete examples with actual industry names and actual multiples from the data file. This section is what makes the hub page educational without being generic.

**Browse by Industry section:** Grid structure — not prose. Links only. Industry names as anchor text to industry pages. Grouped by category.

**FAQ section:** 5 questions. These are the generic valuation questions that don't belong on industry pages. Must be answered with specificity — not "it depends," but "for most Main Street businesses, SDE multiples between 2× and 3× are most common, though this varies significantly: car washes average 4.7×, restaurants average 2.0×."

---

### Guide Pages — Content Standards

Guide pages have the highest content bar because they are manually written and represent the site's E-E-A-T foundation.

**Minimum word count:** 800 words. Recommended 1,200–2,000 for primary guides (SDE explanation, valuation multiples, exit planning).

**Author stance:** Written from the perspective of someone who has reviewed the data and the industry, not from the perspective of a disinterested encyclopedia. Practical. Specific. Does not hedge every statement into uselessness.

**Primary source citations:** Every guide page must cite at least one primary source beyond BizBuySell (SBA data, Federal Reserve small business lending data, academic or industry research where relevant). This signals to Google that the site aggregates authoritative information, not just one source.

**Practical examples:** Every guide page must contain at least one worked example — not hypothetical, but realistic. "An HVAC business with $165,000 SDE and a 2.7× median multiple would be priced around $445,500 under normal market conditions." Examples make abstract concepts concrete and dramatically increase time-on-page.

**No filler language.** The following phrases and their equivalents do not appear in any guide page content:
- "In today's fast-paced business world..."
- "Whether you're a small business owner or entrepreneur..."
- "Selling a business can be complex and multifaceted..."
- "It's important to note that..."
- "As mentioned above..."
- "In conclusion..."

These phrases signal AI-generated content to both users and Google's classifiers. They add zero information. Every sentence must earn its place.

---

## The Generic Content Kill List

The following content patterns fail the quality test and must not appear in any published page:

**Generic multiples:** Any page that states "businesses typically sell for 2–4× SDE" without an industry-specific figure is providing the same information as every competitor. This is not differentiated content. Industry pages must state the specific multiple from the data file.

**Unstated data provenance:** Any claim about multiples or transaction data that does not cite BizBuySell or another specific source is an unsupported claim. Every number that came from the data file must have a visible source reference.

**Advice to "consult a professional":** This phrase, in any form, is acceptable only in the disclaimer section. In body content, it reads as content avoidance — the site exists to give users useful data, not to redirect them elsewhere after every statement. The disclaimer handles the legal caveat; the content should be substantive.

**Lists of factors without explanation:** A list of bullet points that says "factors that affect business value include: revenue growth, customer concentration, owner dependency, market conditions, lease terms" provides no value — any user already knows these are factors. Every factor must be explained in the context of the specific industry and the specific implications for a seller.

**Copy that could appear on a competitor's site:** If a sentence could appear unchanged on FitSmallBusiness, OmniCalculator, or any generic business content site, it adds nothing to differentiation. Content that is only on this site because of the BizBuySell data integration and the industry-specific analysis is content worth publishing.

---

## Writing Style Rules

**Tense:** Present tense for data statements ("HVAC businesses sell for..."), past tense for completed events ("BizBuySell reported...").

**Numbers:** Always use figures for dollar amounts ($165,000 not "one hundred sixty-five thousand dollars"). Always use × notation for multiples (2.7× not "2.7 times"). Dollar ranges: "$380,000 – $510,000" with en-dash, not hyphen.

**Industry name consistency:** Use the exact `industry_name` value from the JSON file throughout all content for that industry. Do not use abbreviations or alternative names ("HVAC" and "Heating and Cooling" are not interchangeable within the same page).

**Headings:** H2 and H3 headings are informative, not clever. "What Makes HVAC Businesses Worth More" outperforms "Unlocking Value in HVAC Transactions." The user scans headings to navigate — headings must tell them exactly what the section contains.

**Sentence length:** Vary deliberately. Long sentences for context and explanation. Short sentences for emphasis. "The owner dependency factor matters more than almost anything else. Buyers need to run the business after you leave."

**Voice:** Active, not passive. "Buyers pay more for recurring revenue" not "Higher valuations are paid for businesses with recurring revenue streams."

---

## Pre-Publication Checklist

Before any industry page is marked ready to publish:

**Data completeness:**
- [ ] `deal_notes` field in JSON is populated with industry-specific content
- [ ] `what_increases_value` has minimum 3 entries, all industry-specific
- [ ] `what_reduces_value` has minimum 3 entries, all industry-specific
- [ ] `typical_buyer_profile` is populated
- [ ] All `related_industries` slugs exist and their multiples are in the JSON

**Content completeness:**
- [ ] H1 states the specific multiple range for this industry
- [ ] Industry Multiple Summary Box contains correct figures from JSON
- [ ] Opening follows three-element structure per `11-COPY-SPEC.md`: hook sentence → Direct Answer Block → orienting paragraph
- [ ] "What Makes [Industry] Worth More" section has minimum 200 words of expanded content using industry-specific jargon (not generic language)
- [ ] "What Can Reduce Value" section has minimum 150 words with industry-specific risk factors named directly
- [ ] Logic Transparency Block present below the multiple table — explains data source, adjustment logic, floor rule, and disclaimer
- [ ] FAQ section has minimum 3 industry-specific questions in natural phrasing; at least one question could only be asked by someone selling this specific type of business
- [ ] No FAQ questions that belong only on the hub page
- [ ] Data source citation appears in the multiple table and in the footer

**Scaled Content differentiators (all three required):**
- [ ] Deal notes and value driver prose uses industry-specific jargon from the vocabulary list in `05-CONTENT-RULES.md` — a reader could not mistake this content for any other industry
- [ ] Comparison table present showing this industry vs. 2-3 related industries with multiples sourced from `industry-multiples.json` — table rows are unique to this page
- [ ] Market Sentiment paragraph present (100-150 words) — contains at least one named buyer, named platform, or specific 2024-2026 market event specific to this industry; is not a template swap

**Swap test:** Read the deal notes and market sentiment paragraph. If the industry name were replaced with a different industry name, would the content be factually wrong or obviously inappropriate? If yes, it passes. If the content would still make sense under a different industry name, it fails — rewrite before publishing.

**Technical completeness:**
- [ ] All three schema blocks present and correct (Dataset, FAQPage, BreadcrumbList)
- [ ] Meta description follows data-dense pattern from `06-TECHNICAL-SEO.md`
- [ ] Canonical tag present and correct
- [ ] `dateModified` in Dataset schema matches `last_updated` in JSON entry
- [ ] Visible "Last updated: [Month Year]" text present below the Industry Multiple Summary Box
- [ ] All required internal links present (hub link, category link, related industry links, guide links)
- [ ] No broken internal links — all linked slugs exist as published pages
- [ ] Micro-calculator component present and functional (two inputs: SDE + Revenue)
- [ ] Micro-calculator inline result uses correct `sde_multiple_low` and `sde_multiple_high` for this industry from `industry-multiples.json`
- [ ] Micro-calculator CTA link (`/?industry=`, `&sde=`, `&revenue=`, `&utm_source=industry_page&utm_medium=micro_calculator&utm_campaign=[slug]`) is correct and verified
- [ ] No placeholder text remaining anywhere on the page
- [ ] Total non-template body content (excluding calculator, tables, and boilerplate) exceeds 600 words
