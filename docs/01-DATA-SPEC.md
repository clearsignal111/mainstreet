# 01 — Data Specification

The data is the product's moat. No existing free tool uses BizBuySell's industry-specific transaction multiples. The moment that changes — if a competitor builds this — the moat narrows. Until then, data accuracy and citation integrity are the primary competitive advantages. This file defines exactly what the data is, where it comes from, how it is structured, and how it must be maintained.

Read this file before building any page, any template, or any calculation. Everything downstream depends on the data being right.

---

## What the Data Is

BizBuySell — owned by CoStar Group, the largest commercial real estate data company in the US — maintains a publicly accessible table of SDE multiples and revenue multiples by industry, derived from actual closed business sale transactions reported through their platform. As of Q4 2025, this covers 9,500+ transactions across 70+ industry categories.

This is not estimated data. It is not survey data. It is derived from actual sale prices and actual seller earnings disclosures on closed transactions. That provenance is the credibility claim. It must be cited precisely on every page that uses it.

The supplementary source — Sundance Financial (sundancefg.com/resources/sde-multiples-by-industry) — extends coverage to approximately 120 industry categories using BizBuySell data as its base, formatted into a cleaner table. Use this to fill categories not explicitly covered in BizBuySell's primary table.

---

## Primary Source Access

**URL:** `https://www.bizbuysell.com/learning-center/industry-valuation-multiples/`  
**Access:** Public, no login required, no API  
**Update frequency:** Approximately biannual — Q1 and Q3 each year  
**Data period covered:** Transactions from Q1 2021 through Q4 2025 (as of initial build)

**Secondary URL:** `https://sundancefg.com/resources/sde-multiples-by-industry`  
**Use:** Supplementary industries not in BizBuySell's primary table. Always note when a figure comes from Sundance rather than directly from BizBuySell.

---

## The Data File

**Location:** `/data/industry-multiples.json`  
**Format:** JSON array of industry objects  
**Role:** Single source of truth for all calculations and all programmatic page generation. No multiple figure appears on any page unless it originated in this file.

---

## JSON Schema — Required Fields Per Industry Entry

```json
{
  "industry_name": "HVAC Services",
  "industry_slug": "hvac-services",
  "industry_category": "Home Services",
  "sde_multiple_low": 2.3,
  "sde_multiple_mid": 2.7,
  "sde_multiple_high": 3.1,
  "revenue_multiple_avg": 0.55,
  "typical_sde_margin_pct": 18,
  "transaction_count": 340,
  "data_source": "BizBuySell Q4 2025",
  "last_updated": "2026-01-15",
  "deal_notes": "HVAC businesses with service contract books command premiums. Seasonal revenue patterns and technician dependency are primary discount factors. Recurring maintenance agreement revenue (20%+ of total) typically supports the upper quartile.",
  "what_increases_value": [
    "Strong recurring maintenance contract revenue",
    "Multiple technicians with low owner technical dependency",
    "Proprietary service routes with documented customer relationships",
    "Commercial client mix alongside residential"
  ],
  "what_reduces_value": [
    "Owner is lead technician with no qualified replacement",
    "Heavily seasonal revenue without commercial offset",
    "No written service agreements — verbal-only customer relationships",
    "Single geography with no expansion history"
  ],
  "typical_buyer_profile": "Often acquired by regional HVAC roll-ups or owner-operators seeking an established customer base. SBA financing is common for transactions under $2M.",
  "related_industries": ["plumbing-services", "electrical-services", "general-contractor"],
  "supplementary_source": false
}
```

---

## Field Definitions

**`industry_name`**  
Display name exactly as it should appear on the page H1, in the calculator dropdown, and in citation text. Use title case. Do not abbreviate.

**`industry_slug`**  
URL-safe version of the industry name. Lowercase, hyphens only, no special characters. This becomes the URL path: `/valuation/hvac-services/`. Must be unique across all entries.

**`industry_category`**  
Broader grouping for category hub pages. Allowed values: `Home Services`, `Food & Beverage`, `Retail`, `Manufacturing`, `Healthcare`, `Professional Services`, `Technology`, `Automotive`, `Recreation & Hospitality`, `Personal Services`. Assign each industry to exactly one category.

**`sde_multiple_low`**  
Lower quartile SDE multiple from BizBuySell data. This represents approximately the 25th percentile of transaction multiples — businesses with risk factors or below-average deal readiness. Used as the floor of the valuation range before user-specific adjustments.

**`sde_multiple_mid`**  
Median SDE multiple. This is the base multiple used in the calculator's adjustment logic. Represents a typical, unremarkable business in this industry selling under normal market conditions.

**`sde_multiple_high`**  
Upper quartile SDE multiple. Represents approximately the 75th percentile — businesses with strong growth, low owner dependency, or other value-enhancing factors. Used as the ceiling of the range before adjustments.

**`revenue_multiple_avg`**  
Average revenue multiple for the industry. Used only as a secondary valuation check, not as the primary calculation. Some industries (particularly SaaS and technology) are more commonly valued on revenue; for Main Street businesses, SDE multiple is primary.

**`typical_sde_margin_pct`**  
Typical SDE as a percentage of revenue for this industry. Used in the calculator's input validation to detect when a user may have entered revenue instead of SDE (if their input implies an SDE margin wildly different from this figure, show a soft warning). Example: HVAC typically runs 15–22% SDE margin, so an entry of $800,000 SDE on $1,000,000 revenue would trigger a warning.

**`transaction_count`**  
Approximate number of transactions this multiple is based on, from BizBuySell's disclosure. Used in the calculator result: "Based on [N] transactions in this category." Enter as integer. If BizBuySell does not disclose a count for a specific industry, enter the overall dataset count (9500) and set `supplementary_source: true`.

**`data_source`**  
Exact citation string. Format: `"BizBuySell Q[quarter] [year]"` for primary data or `"Sundance Financial / BizBuySell Q[quarter] [year]"` for supplementary. This string appears verbatim in the citation block on every industry page.

**`last_updated`**  
ISO date of last manual review of this entry against the source data. Updated every time BizBuySell releases new data (approximately biannual). Format: `YYYY-MM-DD`.

**`deal_notes`**  
2–4 sentences describing what specifically drives valuation up or down in this industry. This is the field that makes industry pages non-generic. It must be written from the data — what does BizBuySell's transaction history actually show about this industry? This text is used directly in the industry page content. Do not write generic placeholder text here. If unsure, leave the field as an empty string and flag for manual completion before the page publishes.

**`what_increases_value`**  
Array of 3–5 specific, concrete factors that increase valuation for businesses in this industry. These become bullet points in the "What makes [industry] businesses worth more" section of the industry page. Must be industry-specific, not generic ("strong recurring revenue" alone is generic; "strong recurring maintenance contract revenue representing 20%+ of total revenue" is specific).

**`what_reduces_value`**  
Array of 3–5 specific risk factors that reduce valuation. Same specificity requirement as above. Every industry must have at least 3 entries here — no business category is risk-free.

**`typical_buyer_profile`**  
One or two sentences describing who typically buys businesses in this category and how they typically finance it. Useful context for sellers and also creates content differentiation across pages. Example: "Often acquired by regional roll-ups or owner-operators. SBA 7(a) loans are common for transactions under $2M."

**`related_industries`**  
Array of industry slugs that are meaningfully related — similar customer base, similar buyer profile, or adjacent service offerings. Used to generate "Related industries" internal links on each page. Must reference valid slugs that exist in the file. Minimum 2, maximum 5.

**`supplementary_source`**  
Boolean. `false` if the multiple data comes directly from BizBuySell's published table. `true` if it comes from Sundance Financial or another secondary source that republishes BizBuySell data. Affects how the citation is displayed — supplementary sources use a slightly more qualified citation: "Based on industry data via Sundance Financial, sourced from BizBuySell transaction records."

---

## Industry Categories and Coverage Target

### Home Services (target: 15–18 industries)
HVAC Services, Plumbing Services, Electrical Services, Landscaping & Lawn Care, Cleaning Services (Residential), Cleaning Services (Commercial), Pest Control, Pool Service & Maintenance, Painting Contractors, General Contracting, Roofing, Flooring Installation, Appliance Repair, Handyman Services, Security Systems

### Food & Beverage (target: 10–12 industries)
Restaurant (Full Service), Restaurant (Fast Casual/QSR), Bar & Nightclub, Coffee Shop & Café, Bakery, Food Truck, Catering Business, Grocery Store (Independent), Specialty Food Retail, Liquor Store, Pizza Restaurant

### Retail (target: 10–12 industries)
Convenience Store, Gas Station with Convenience Store, Auto Parts Retail, Sporting Goods Retail, Clothing & Apparel, Furniture & Home Goods, Florist, Gift Shop, Pet Store, Pharmacy (Independent), Vape & Smoke Shop

### Automotive (target: 8–10 industries)
Auto Repair Shop, Auto Body Shop, Car Wash (Full Service), Car Wash (Self-Service/Automatic), Auto Detailing, Tire & Wheel Shop, Used Car Dealership, Towing & Recovery, Oil Change Center

### Healthcare & Personal Services (target: 12–15 industries)
Dental Practice, Veterinary Practice, Optometry Practice, Chiropractic Practice, Physical Therapy Practice, Medical Billing Service, Home Health Agency, Senior Care / Adult Day Care, Hair Salon, Barbershop, Nail Salon, Spa & Massage, Fitness Studio / Gym, Childcare & Daycare

### Professional Services (target: 10–12 industries)
Accounting Practice (CPA Firm), Insurance Agency, Financial Advisory Practice, Law Firm (Small), Marketing Agency, Staffing Agency, IT Managed Services (MSP), Printing & Signage, Engineering Consulting, Real Estate Brokerage

### Manufacturing & Industrial (target: 8–10 industries)
Metal Fabrication, Woodworking & Cabinetry, Plastics Manufacturing, Food Manufacturing, Industrial Cleaning Services, Equipment Repair & Maintenance, Welding Services, Packaging & Distribution

### Recreation & Hospitality (target: 8–10 industries)
Hotel / Motel (Small), Marina, RV Park & Campground, Self-Storage Facility, Laundromat, Bowling Alley, Golf Course, Event Venue, Bed & Breakfast

### Technology (target: 5–8 industries)
SaaS Business (Small), E-Commerce Business, IT Services & Support, Web Design Agency, App Development Studio, Online Media / Content Site

---

## Data Quality Rules

**Rule 1: No page publishes without complete data.**  
Every required field must be populated before an industry page is generated for that industry. The `deal_notes`, `what_increases_value`, and `what_reduces_value` fields are especially critical — these are what make pages non-thin. If a field is empty or contains placeholder text, the page does not publish.

**Rule 2: Numbers come from the source, not from memory.**  
Every `sde_multiple_low`, `sde_multiple_mid`, and `sde_multiple_high` value must be verified against the BizBuySell source table at the time of data entry. Do not estimate or extrapolate. If an industry is not in BizBuySell's table, check Sundance Financial. If it is not in either source, do not add the industry until a credible source is found.

**Rule 3: The low multiple cannot exceed the mid, and mid cannot exceed the high.**  
This is a hard validation constraint. The JSON file should be validated against this rule before any build step runs. A mis-ordered multiple would produce a nonsensical valuation range.

**Rule 4: Slugs must be unique and stable.**  
Once an industry slug is set and a page is published under that URL, the slug cannot change without a redirect being implemented. Set slugs correctly the first time. Use the most natural, searchable form of the industry name (e.g., `hvac-services` not `heating-ventilation-air-conditioning`).

**Rule 5: related_industries must reference valid slugs.**  
Before build, validate that every slug in every `related_industries` array exists as an `industry_slug` in the file. Dead internal references are a crawl quality issue.

---

## Maintenance Protocol

BizBuySell updates their industry multiple data approximately twice per year (Q1 and Q3). When an update is released:

1. Review the BizBuySell source page for changes to any multiple figures
2. For each changed industry entry, update `sde_multiple_low`, `sde_multiple_mid`, `sde_multiple_high`, and `revenue_multiple_avg` in the JSON file
3. Update `data_source` to reflect the new quarter and year
4. Update `last_updated` to the current date
5. Update `transaction_count` if disclosed
6. Rebuild and redeploy all affected industry pages
7. Update the `temporalCoverage` field in the Dataset schema on the hub page

Estimated maintenance time: 4–6 hours per update cycle. This is the entire ongoing maintenance burden of the data layer. It is minimal relative to the competitive advantage it provides.

---

## Citation Standards

Every industry page must display the data source citation in two places:

**In the calculator result block:**
`"Based on [transaction_count]+ transactions in the [industry_name] category, BizBuySell [data_source]."`

**In the page footer / methodology note:**
`"Industry valuation data sourced from BizBuySell's Industry Valuation Report ([data_source]), covering [transaction_count]+ closed transactions. BizBuySell is operated by CoStar Group, the largest commercial real estate information company in the United States. Data is updated biannually. This tool provides estimates for planning purposes and does not constitute a formal business appraisal."`

The disclaimer in the second block is mandatory on every page. It is both a legal protection and an E-E-A-T signal — Google treats transparent methodology disclosure as a trust indicator for financial content.

---

## Sample Entry — For Reference

The following entry represents the correct level of completeness for every industry in the file. Entries with less detail than this are incomplete and block page publication.

```json
{
  "industry_name": "Car Wash (Full Service)",
  "industry_slug": "car-wash",
  "industry_category": "Automotive",
  "sde_multiple_low": 3.8,
  "sde_multiple_mid": 4.7,
  "sde_multiple_high": 5.6,
  "revenue_multiple_avg": 1.2,
  "typical_sde_margin_pct": 28,
  "transaction_count": 215,
  "data_source": "BizBuySell Q4 2025",
  "last_updated": "2026-01-15",
  "deal_notes": "Car washes command among the highest SDE multiples in the Main Street market due to high recurring customer visit frequency, minimal labor dependency in automatic formats, and strong cash flow predictability. Full-service washes with membership programs trade at the upper quartile. Single-bay or aging equipment drags multiples toward the lower end.",
  "what_increases_value": [
    "Monthly membership/subscription program with 500+ active members",
    "Modern tunnel equipment installed within the past 5 years",
    "Real estate owned rather than leased (dramatically affects deal structure)",
    "Multiple locations or expansion-ready site with demonstrated volume",
    "Express exterior format with minimal labor requirements"
  ],
  "what_reduces_value": [
    "Aging equipment requiring near-term capital expenditure",
    "Leased location with short remaining term and uncertain renewal",
    "Single-bay self-service format with no membership component",
    "High local competition from recently opened express wash operators",
    "Owner-operated with no manager in place"
  ],
  "typical_buyer_profile": "Car washes attract both individual operators and increasingly, private equity-backed roll-up platforms. PE interest has elevated multiples significantly in this category over 2022–2025. SBA financing is available but some PE buyers transact with conventional financing at higher leverage.",
  "related_industries": ["auto-detailing", "auto-repair-shop", "gas-station-convenience-store"],
  "supplementary_source": false
}
```
