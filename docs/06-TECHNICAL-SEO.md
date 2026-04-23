# 06 — Technical SEO Specification

Technical SEO in this project is not polish applied after the build. It is part of the build. Schema must be present on every page from day one. Core Web Vitals targets must be met before launch. Entity signals must be consistent and correct across every page type. This file defines all of it precisely.

The goal of the technical layer is to make Google's systems recognize this site as a structured data entity — a source of transaction data — not a content site with a calculator attached. That distinction changes how the site is classified, how quickly it builds authority, and whether industry pages are eligible for rich results and AI Overview citations.

---

## Schema Requirements by Page Type

Schema is implemented as inline JSON-LD `<script>` blocks in the `<head>` of each page.

**Hub page exception:** The hub page uses a single unified `@graph` block that cross-references all entity types via `@id`. This explicitly declares the relationships between the Organization, the WebApplication, and the Dataset — rather than leaving AI crawlers to infer connections between separate scripts. On all other page types (industry, category, guide), separate script blocks per schema type remain the standard.

**Build-time validation is mandatory.** The hub `@graph` block combines five schema types in a single JSON object. A syntax error silently breaks all schema on the page. The build pipeline must run a JSON linter (e.g., `ajv`) against every generated schema block before the page is considered publishable. Schema validation failure must block deployment. This is a publish gate requirement — it appears in `07-PUBLISH-GATES.md`.

---

### Hub Page (Homepage / `/calculator/`)

The hub page carries all five schema types in a single `@graph` block.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://[domain]/#organization",
      "name": "[Brand Name]",
      "url": "https://[domain]/",
      "logo": "https://[domain]/images/logo.png",
      "sameAs": [
        "https://www.linkedin.com/company/[brand]",
        "https://crunchbase.com/organization/[brand]"
      ]
    },
    {
      "@type": "WebApplication",
      "@id": "https://[domain]/#calculator",
      "name": "Small Business Valuation Calculator",
      "url": "https://[domain]/",
      "publisher": { "@id": "https://[domain]/#organization" },
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "description": "Industry-specific small business valuation calculator using BizBuySell transaction data. Produces SDE-based valuation ranges for 63 business categories based on closed transaction multiples.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Industry-specific SDE multiples for 63 categories",
        "BizBuySell closed transaction data",
        "Adjustable deal-readiness factors",
        "What-if scenario modeling"
      ],
      "screenshot": "https://[domain]/images/calculator-screenshot.png",
      "potentialAction": {
        "@type": "Action",
        "name": "Calculate Business Valuation",
        "description": "Enter industry, SDE, revenue, and deal-readiness factors to receive an industry-specific business valuation range",
        "object": {
          "@type": "EntryPoint",
          "urlTemplate": "https://[domain]/",
          "actionPlatform": "https://schema.org/DesktopWebPlatform"
        }
      }
    },
    {
      "@type": "Dataset",
      "@id": "https://[domain]/#dataset",
      "name": "Small Business Valuation Multiples by Industry [Year]",
      "description": "SDE multiples and revenue multiples for 63 small business categories, derived from BizBuySell closed transaction data covering 9,500+ business sales from Q1 2021 through Q4 2025.",
      "url": "https://[domain]/",
      "creator": { "@id": "https://[domain]/#organization" },
      "isBasedOn": {
        "@type": "Dataset",
        "name": "BizBuySell Industry Valuation Report Q4 2025",
        "url": "https://www.bizbuysell.com/learning-center/industry-valuation-multiples/",
        "publisher": {
          "@type": "Organization",
          "name": "BizBuySell (CoStar Group)",
          "url": "https://www.bizbuysell.com/"
        }
      },
      "variableMeasured": [
        { "@type": "PropertyValue", "name": "SDE Multiple (Lower Quartile)", "unitText": "× annual SDE" },
        { "@type": "PropertyValue", "name": "SDE Multiple (Median)", "unitText": "× annual SDE" },
        { "@type": "PropertyValue", "name": "SDE Multiple (Upper Quartile)", "unitText": "× annual SDE" },
        { "@type": "PropertyValue", "name": "Revenue Multiple (Average)", "unitText": "× annual revenue" }
      ],
      "temporalCoverage": "2021/2025",
      "spatialCoverage": "United States",
      "isAccessibleForFree": true,
      "license": "https://creativecommons.org/licenses/by/4.0/",
      "includedInDataCatalog": {
        "@type": "DataCatalog",
        "name": "Small Business Valuation Transaction Database",
        "url": "https://[domain]/valuation/"
      },
      "dateModified": "[YYYY-MM-DD — update when BizBuySell data refreshes]"
    },
    {
      "@type": "FAQPage",
      "@id": "https://[domain]/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How accurate is this business valuation calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This calculator provides a data-backed estimate based on actual closed transaction multiples reported to BizBuySell. It is accurate as a planning estimate — most small businesses sell within 15–25% of a properly calculated SDE multiple range. It is not a formal appraisal and should not be used for legal, tax, or binding financial purposes."
          }
        },
        {
          "@type": "Question",
          "name": "What is SDE (Seller's Discretionary Earnings)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SDE is the total financial benefit a single owner-operator derives from a business. It equals net profit plus the owner's salary plus any personal expenses run through the business plus non-recurring or one-time expenses. It represents the true earning power available to a new owner."
          }
        },
        {
          "@type": "Question",
          "name": "Should I use revenue or earnings to value my business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For most Main Street small businesses, SDE (earnings) is the primary valuation basis. Revenue multiples are used as a secondary check. Buyers and their lenders focus on earnings because they need to service debt from business cash flow. Revenue-based valuation is more common for SaaS, e-commerce, and subscription businesses."
          }
        },
        {
          "@type": "Question",
          "name": "How do buyers determine the price of a small business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most buyers of small businesses use a multiple of SDE as the starting point for price negotiation. The multiple reflects the industry, the business's growth trend, how dependent the business is on the owner, and the customer concentration risk. Buyers also consider asset value, lease terms, and working capital requirements."
          }
        },
        {
          "@type": "Question",
          "name": "What is an SDE multiple?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An SDE multiple is the number by which a buyer multiplies your annual SDE to arrive at a business price. If your SDE is $200,000 and your industry's typical multiple is 2.5×, the implied price is $500,000. Multiples vary significantly by industry — from under 1.5× for lower-margin retail to over 5× for high-demand recurring-revenue businesses."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://[domain]/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://[domain]/"
        }
      ]
    }
  ]
}
</script>
```

The `@id` cross-referencing is the key mechanism: `WebApplication.publisher` and `Dataset.creator` use `{ "@id": "https://[domain]/#organization" }` rather than repeating the Organization object inline. This tells AI crawlers that these entities are explicitly connected — not merely co-located on the same page.

---

### Industry Pages (`/valuation/[industry-slug]/`)

Each industry page carries three schema types as separate `<script>` blocks.

#### 1. Dataset (Industry-Specific)

Each industry page asserts data entity status for its specific industry, creating a 63-page citation network all pointing to BizBuySell as primary source.

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "[Industry Name] Business Valuation Multiples — [Month] [Year]",
  "description": "SDE multiple and revenue multiple data for [Industry Name] businesses, based on [transaction_count]+ closed transactions reported to BizBuySell. [Industry Name] businesses typically sell for [sde_multiple_low]× to [sde_multiple_high]× annual SDE.",
  "url": "https://[domain]/valuation/[industry-slug]/",
  "creator": {
    "@type": "Organization",
    "name": "[Brand Name]",
    "url": "https://[domain]/"
  },
  "isBasedOn": {
    "@type": "Dataset",
    "name": "BizBuySell Industry Valuation Report [data_source]",
    "url": "https://www.bizbuysell.com/learning-center/industry-valuation-multiples/",
    "publisher": {
      "@type": "Organization",
      "name": "BizBuySell (CoStar Group)",
      "url": "https://www.bizbuysell.com/"
    }
  },
  "variableMeasured": [
    {
      "@type": "PropertyValue",
      "name": "SDE Multiple (Lower Quartile)",
      "value": "[sde_multiple_low]",
      "unitText": "× annual SDE"
    },
    {
      "@type": "PropertyValue",
      "name": "SDE Multiple (Median)",
      "value": "[sde_multiple_mid]",
      "unitText": "× annual SDE"
    },
    {
      "@type": "PropertyValue",
      "name": "SDE Multiple (Upper Quartile)",
      "value": "[sde_multiple_high]",
      "unitText": "× annual SDE"
    },
    {
      "@type": "PropertyValue",
      "name": "Revenue Multiple (Average)",
      "value": "[revenue_multiple_avg]",
      "unitText": "× annual revenue"
    }
  ],
  "temporalCoverage": "2021/2025",
  "spatialCoverage": "United States",
  "isAccessibleForFree": true,
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "includedInDataCatalog": {
    "@type": "DataCatalog",
    "name": "Small Business Valuation Transaction Database",
    "url": "https://[domain]/valuation/"
  },
  "isRelatedTo": {
    "@type": "WebApplication",
    "name": "Small Business Valuation Calculator",
    "url": "https://[domain]/",
    "description": "Full industry-specific valuation calculator using this data. Accepts SDE, revenue, growth trend, owner involvement, and customer concentration to produce a personalized estimate."
  },
  "dateModified": "[last_updated from industry-multiples.json — YYYY-MM-DD]"
}
```

All bracketed values are populated from the industry's entry in `industry-multiples.json` at build time. The `value` fields in `variableMeasured` must be the raw numeric value (e.g., `2.79`) not a formatted string (e.g., `"2.79×"`). This makes the values machine-parseable by AI extraction systems.

The `isRelatedTo` reference creates a structured entity relationship between each industry data page and the hub calculator — reinforcing to Google's systems that these 63 pages are functional components of a single tool, not 63 disconnected content pages.

#### 2. FAQPage

Applied to the industry-specific FAQ section at the bottom of each page. Minimum 3 questions, maximum 6. Questions must be industry-specific — not generic valuation questions (those live on the hub FAQ).

Example questions for HVAC:
- "What is the typical SDE multiple for an HVAC business?"
- "Does having service contracts increase an HVAC business's value?"
- "How do HVAC business buyers typically finance acquisitions?"
- "What is the average sale price of an HVAC business?"

Each industry's FAQ questions and answers are generated from the `deal_notes`, `what_increases_value`, `what_reduces_value`, and `typical_buyer_profile` fields in the JSON data. They must be specific to the industry, not generic.

#### 3. BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://[domain]/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Business Valuation",
      "item": "https://[domain]/valuation/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[Industry Name] Valuation",
      "item": "https://[domain]/valuation/[industry-slug]/"
    }
  ]
}
```

---

### Category Hub Pages (`/valuation/[category-slug]/`)

Category pages carry Article schema and BreadcrumbList. No Dataset schema on category pages — they are navigation and context pages, not data entity pages. The `reviewedBy` node is mandatory for YMYL E-E-A-T.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Valuing a [Category] Business: SDE Multiples and Market Data (2026)",
  "description": "Industry-specific valuation multiples for [Category] businesses, based on BizBuySell transaction data.",
  "author": {
    "@type": "Organization",
    "name": "[Brand Name] Data Team",
    "url": "https://[domain]/about/"
  },
  "reviewedBy": {
    "@type": "Person",
    "name": "[Reviewer Name — CPA or Certified Business Intermediary]",
    "url": "https://[domain]/about/#reviewer"
  },
  "publisher": {
    "@type": "Organization",
    "name": "[Brand Name]",
    "url": "https://[domain]/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://[domain]/images/logo.png"
    }
  },
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD — update on any content change]",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://[domain]/valuation/[category-slug]/"
  }
}
```

---

### Supporting Content Pages

Supporting content pages carry Article schema identical in structure to the category page schema above, with page-specific headline and description. Also carry FAQPage schema if the page contains a FAQ section.

---

## Mandatory `<head>` Tags — Every Page

The following tags must be present in the `<head>` of every page without exception.

```html
<!-- Character encoding — must be first element in <head> -->
<meta charset="UTF-8">

<!-- Viewport — CRITICAL. Without this, mobile browsers render at desktop width.
     The calculator form becomes unusable. This single line makes all responsive
     CSS work. Must appear on every page including /about/, /methodology/, etc. -->
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Robots — max-snippet:-1 allows Google to use full text for featured snippets
     and AI Overview extraction. Critical for long-tail query coverage. -->
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">

<!-- Canonical — self-referencing, trailing slash consistent, NEVER includes
     ?industry= or other URL parameters -->
<link rel="canonical" href="https://[domain]/[path]/">

<!-- Title — unique per page, patterns in section below -->
<title>[Page Title]</title>

<!-- Meta description — unique per page, patterns in section below -->
<meta name="description" content="[Description]">

<!-- Open Graph — required for AI crawler link previews, Slack unfurls, social sharing.
     All values dynamic on industry pages. -->
<meta property="og:type" content="website">
<meta property="og:title" content="[Page Title]">
<meta property="og:description" content="[Meta description text]">
<meta property="og:url" content="https://[domain]/[path]/">
<meta property="og:site_name" content="[Brand Name]">
<meta name="twitter:card" content="summary_large_image">

<!-- Resource hints — preload JSON data before JS executes, reducing INP.
     Preconnect to AdSense CDN before ads load. -->
<link rel="preload" href="/data/industry-multiples.json" as="fetch" crossorigin="anonymous">
<link rel="preconnect" href="https://pagead2.googlesyndication.com" crossorigin>

<!-- Font preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Schema JSON-LD blocks — page-type specific, patterns in sections above -->
<script type="application/ld+json">...</script>
```

**Industry page OG tag overrides** — on industry pages, the OG tags must be populated with dynamic data:

```html
<meta property="og:type" content="article">
<meta property="og:title" content="[Industry Name] Business Valuation Multiples ([Year])">
<meta property="og:description" content="Based on [transaction_count] closed transactions, the median SDE multiple for [Industry Name] businesses in [Year] is [sde_multiple_mid]×, according to [Brand Name] analysis of BizBuySell data.">
<meta property="og:url" content="https://[domain]/valuation/[industry-slug]/">
```

Note the OG description follows the GEO context-completeness standard — it is fully understandable in isolation, includes industry name, year, metric, value, transaction count, and source attribution. AI crawlers use OG data for link preview extraction.

**The canonical tag on the hub page must always be static** — `https://[domain]/` — regardless of what URL parameters are appended (e.g., `?industry=hvac-services&sde=165000`). Never dynamically include parameters in the canonical tag. This prevents Google from indexing thousands of duplicate hub URLs with different parameter combinations.

---

## Title Tag and Meta Description Patterns

These patterns are mandatory. They produce the SERP snippet. Deviation risks keyword mismatch or CTR degradation.

### Hub Page

**Title:** `Small Business Valuation Calculator — [Year] Industry Data | [Brand Name]`
**Character target:** 55–60 characters
**Meta description:** `Free business valuation calculator using BizBuySell's [Year] SDE multiples for 63 industries. Get your industry-specific valuation range in 60 seconds — no email required.`
**Character target:** 150–160 characters

### Industry Pages

**Title pattern:** `How Much Is a [Industry Name] Business Worth? ([Year] Data)`
**Example:** `How Much Is an HVAC Business Worth? (2026 Data)`
**Character target:** 55–65 characters — do not truncate the year parenthetical

**Meta description pattern:** `[Industry Name] SDE Multiple: [sde_multiple_low]× – [sde_multiple_high]× ([data_source]). Calculate your specific [Industry Name] business valuation using [transaction_count]+ closed transactions. Free, no email required.`
**Example:** `HVAC Business SDE Multiple: 2.3× – 3.1× (BizBuySell Q4 2025). Calculate your specific HVAC business valuation using 340+ closed transactions. Free, no email required.`
**Character target:** 150–165 characters

The data-dense meta description pattern serves two purposes: it gives a human user the specific number they searched for (increasing CTR for high-intent users), and it presents the exact structured data fragment that AI Overview systems extract and cite.

### Category Pages

**Title pattern:** `[Category] Business Valuation: SDE Multiples & Market Data ([Year])`
**Example:** `Home Services Business Valuation: SDE Multiples & Market Data (2026)`

**Meta description:** `[Category] businesses sell for [range] SDE depending on industry. See industry-specific multiples for [list 3–4 sub-industries], based on BizBuySell transaction data.`

### Supporting Content Pages

**Title pattern:** Natural, question-based or instructional. Examples:
- `What Is SDE? How to Calculate Seller's Discretionary Earnings`
- `EBITDA vs SDE: Which Matters When Selling Your Business?`

**Meta description:** Descriptive, specific, includes the concrete value the article provides.

---

## URL Structure

```
/                              → Hub page (calculator)
/calculator/                   → 301 redirect to /
/valuation/                    → Index of all industry categories
/valuation/[category-slug]/    → Category hub (e.g., /valuation/home-services/)
/valuation/[industry-slug]/    → Industry page (e.g., /valuation/hvac-services/)
/guides/                       → Supporting content index
/guides/[guide-slug]/          → Individual supporting content page
/about/                        → About page (entity establishment)
/methodology/                  → Data methodology page (mandatory)
/advertise/                    → Advertise page (professional entity signal + future partner path)
/llms.txt                      → AI engine crawl file (see 03-SITE-ARCHITECTURE.md)
/sitemap.xml                   → XML sitemap
/robots.txt                    → Crawl directives
```

---

## Hosting and Email Infrastructure

**Hosting: Cloudflare Workers**

All pages are served via Cloudflare Workers. This has two specific implications for this spec:

1. **Trailing slash redirects must be implemented in the Worker** (see URL convention section below)
2. **`/llms.txt` must be served as a static asset** via Cloudflare R2 or as a Worker response — it cannot rely on a file system path. Return it with `Content-Type: text/plain` and `Cache-Control: max-age=86400`
3. **`/sitemap.xml` and `/robots.txt`** are similarly Worker-served static responses — hardcode them or generate from the JSON at build time and cache at the edge

**Email: Resend**

Transactional email via Resend. Relevant to this spec only in that the contact form on `/about/` (if implemented as a form rather than a mailto link) routes through Resend's API. The Worker handles the POST request and forwards to Resend. No email addresses should be exposed in plain text in HTML — use a contact form to avoid spam harvesting.

---

**Trailing slash convention: WITH trailing slash. This is final and cannot change after indexing.**

All URLs end with `/`. This is not a preference — it is a hard constraint locked before build. Changing trailing slash convention after Google has indexed pages requires 301 redirects across the entire site and causes a temporary authority split while Google processes the redirects. The decision is made: trailing slash everywhere.

Correct: `https://[domain]/valuation/hvac-services/`
Wrong: `https://[domain]/valuation/hvac-services`

**Cloudflare Workers implementation requirement:** Workers routes do not automatically normalize trailing slashes. The Worker must explicitly 301-redirect any request for a non-trailing-slash URL to its trailing-slash equivalent before serving content. This must be implemented as the first route rule:

```javascript
// In the Worker — runs before any page is served
if (!url.pathname.endsWith('/') && !url.pathname.includes('.')) {
  return Response.redirect(url.origin + url.pathname + '/' + url.search, 301);
}
```

This applies to all paths except file extensions (`.json`, `.xml`, `.txt`, `.png`, etc.).

**Canonical rules:**
- Every page declares a self-referencing canonical tag with trailing slash
- No duplicate pages for the same industry — one URL per industry, no pagination
- Hub canonical is always `https://[domain]/` — never includes URL parameters
- The `/llms.txt`, `/sitemap.xml`, and `/robots.txt` files are the only URLs without trailing slashes — they are files, not pages

---

## Core Web Vitals & Accessibility Targets

Hard targets, not aspirational. Pages that do not meet these targets before launch are not ready to launch.

| Metric | Target | Notes |
|--------|--------|-------|
| LCP (Largest Contentful Paint) | < 2.0s | Calculator or H1 must be the LCP element |
| INP (Interaction to Next Paint) | < 100ms | All calculator interactions: field entry, button click, slider movement |
| CLS (Cumulative Layout Shift) | < 0.05 | Ad units must be size-reserved before load |
| TTFB (Time to First Byte) | < 400ms | Server response time |
| FCP (First Contentful Paint) | < 1.2s | |

**Implementation requirements:**
- `industry-multiples.json` is preloaded via `<link rel="preload">` and cached — not fetched per interaction
- All calculator logic runs client-side. No API calls during calculation
- Ad units loaded asynchronously, size-reserved with explicit CSS dimensions before load (prevents CLS)
- No render-blocking JavaScript. Calculator JS loads with `defer` attribute
- Images use WebP or AVIF with explicit dimensions
- No large above-the-fold images — calculator is the above-the-fold content
- Font loading uses `font-display: swap`

**Accessibility requirements for SEO:**
- All `<input>` elements have explicit, descriptive `<label>` tags (not placeholder-only)
- `aria-live="polite"` on the output container where the valuation range appears
- All form elements have explicit `font-size: 16px` (iOS Safari auto-zoom prevention)

---

## Crawlability and Indexing

**`robots.txt` directives:**
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://[domain]/sitemap.xml
```

Do not block `/llms.txt`. AI crawlers must access it to cite this site in generative results.

**XML Sitemap:**
- `<loc>` — full URL
- `<lastmod>` — date of last content or data change
- `<changefreq>` — `monthly` for industry pages, `yearly` for guide pages, `daily` for hub
- `<priority>` — Hub: 1.0, Industry pages: 0.8, Category pages: 0.7, Guide pages: 0.6

Submit sitemap to Google Search Console on launch day. Resubmit after any major content addition.

**Indexing timeline expectation:** New domains in YMYL-adjacent financial content typically experience 8–12 months of suppressed rankings regardless of technical quality. This is normal. Monitor for indexing in Search Console's Coverage report, not rankings. If pages are not indexed within 4–6 weeks of launch, investigate crawlability. If after 9 months zero industry pages rank in the top 30 for any query, check for manual actions, over-optimization, or absence of external links.

---

## Entity Establishment — The About and Methodology Pages

These two pages are entity establishment pages, not content pages. They tell Google what this site is, who runs it, and how the data works. They are mandatory.

### `/about/`

Must contain:
- Site name and one-paragraph mission statement
- Organizational authorship ("The [Brand Name] Data Team") as the primary byline for the site's content
- A credentialed reviewer in an "Advisory Board" or "Data Reviewers" section — a CPA, CBI, or business appraiser with a 50-word bio and LinkedIn link. This person appears in `reviewedBy` schema on category and guide pages. They are a trust signal for the algorithm, not a marketing face.
- Statement of independence: this site is not a business broker, does not receive referral fees, does not sell business listings
- Statement of data sourcing: data derived from BizBuySell's publicly available transaction records
- Contact information (email is sufficient)
- Physical address or LLC registration state (corporate verifiability for institutional E-E-A-T)

Generic about pages are worse than useless. Specific, factual, and transparent is the correct tone.

### `/methodology/`

Must contain:
- Explanation of what SDE multiples are and why they are used
- Explanation of where BizBuySell data comes from (CoStar Group, closed transactions, biannual updates)
- Explanation of how the calculator applies adjustments (growth trend, owner involvement, customer concentration) and the ±20% adjustment band these factors produce
- Clear statement of limitations: "This is an estimate for planning purposes. It is not a formal appraisal. Individual business characteristics, local market conditions, and deal structure all affect final sale price."
- Link to BizBuySell's source page
- Date of most recent data update

---

## Internal Linking Rules — Technical Implementation

**Mandatory links from every industry page:**
1. One link to the hub calculator page (two paths: micro-calculator CTA + in-body text link)
2. One link to `/methodology/`
3. Links to 2–4 `related_industries` pages
4. Links to 1–2 relevant guide pages

**Micro-calculator CTA link — internal tracking (CRITICAL):**
Do not use UTM parameters (`utm_source`, `utm_medium`) on internal links. UTMs force GA4 to start a new session, destroying organic acquisition attribution. Use a custom `?ref=` parameter instead:

`/?industry=[slug]&sde=[value]&revenue=[value]&ref=micro_calculator_[industry-slug]`

Example: `/?industry=hvac-services&sde=165000&revenue=520000&ref=micro_calculator_hvac-services`

Parse the `ref` parameter on the hub page via JavaScript and push a custom GA4 event (`internal_cta_click` with `source_industry` parameter). This preserves organic attribution while enabling the `micro_cta_clicked` → `hub_arrived_from_micro` funnel measurement.

**Mandatory links from the hub page:**
1. Links to all 11 category hub pages
2. Links to the top 15 industry pages by estimated search volume
3. Links to all guide pages

**No orphan pages.** Every page must have at least 2 inbound internal links. Verify with a crawl after build.

**Anchor text distribution:**
- Hub → industry: descriptive anchor text ("HVAC business valuation" or "how much is an HVAC business worth")
- Supporting links: natural in-context anchor text, no exact match anchor repeated more than twice per page
- Navigation (breadcrumbs, footer): short descriptive labels

---

## What Not to Do — Technical Anti-Patterns

**Do not use UTM parameters for internal tracking.** They destroy GA4 session data and misattribute organic traffic. Use `?ref=` custom parameters and GA4 custom events instead.

**Do not implement lazy loading on above-the-fold content.** The calculator is above the fold. Lazy loading it introduces LCP delay.

**Do not omit the viewport meta tag.** Its absence causes the entire responsive layout to fail silently on real mobile devices.

**Do not set input font-size below 16px.** iOS Safari auto-zooms on any `<input>`, `<select>`, or `<textarea>` with `font-size` below 16px. All form elements must have explicit `font-size: 16px`.

**Do not use JavaScript to render H1 or title text.** Heading content must be in the HTML.

**Do not create paginated versions of industry pages.** Each industry is one page.

**Do not implement noindex on any industry page or guide page.** Only admin, API, and duplicate technical pages should be noindexed.

**Do not use the same meta description across multiple pages.** Every page gets a unique meta description populated from its specific data.

**Do not place schema in the body.** All JSON-LD schema blocks go in the `<head>`.

**Do not implement `FinancialProduct` schema with `AggregateRating`.** This requires real, verifiable third-party reviews. Implementing it with synthetic ratings is a schema abuse violation that Google's quality raters specifically flag. The correct type for the calculator is `WebApplication`. Do not add `AggregateRating` to any page unless a real, documented review mechanism is in place.

**Do not use plain strings in `variableMeasured`.** The field must use `PropertyValue` objects with separate `name` and `value` fields containing the raw numeric value. Plain strings like `"SDE Multiple: 2.79×"` are not machine-parseable by AI extraction systems.

**Do not skip JSON-LD schema validation at build time.** A syntax error in the hub `@graph` block silently breaks all schema on the page with no visible browser error. Schema validation must be a build gate.

**Do not include URL parameters in canonical tags.** The hub canonical is always `https://[domain]/`. Never `https://[domain]/?industry=hvac-services`.

**Do not block `/llms.txt` in `robots.txt`.** This file is how generative AI engines (ChatGPT, Perplexity, Copilot) understand your site structure. Blocking it means your data will not appear in AI-generated answers regardless of ranking position.
