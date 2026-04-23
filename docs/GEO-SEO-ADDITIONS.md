# GEO/Gemini SEO Additions — Gap Analysis & Patch

This document captures what was **already covered** and what **needs to be added** to the existing `.md` specs based on the Gemini 2026 SEO guidance. Apply each addition to the file indicated.

---

## Coverage Assessment

| Gemini Recommendation | Status | File |
|---|---|---|
| INP < 100ms target | ✅ Already covered | `06-TECHNICAL-SEO-GEMINI.md` |
| WebApplication + Dataset schema | ✅ Already covered | `06-TECHNICAL-SEO-GEMINI.md` |
| `reviewedBy` schema for E-E-A-T | ✅ Already covered | `06-TECHNICAL-SEO-GEMINI.md` |
| Canonical parameter handling | ✅ Already covered | `06-TECHNICAL-SEO-GEMINI.md` |
| Open Graph / Twitter meta tags | ✅ Already covered | `06-TECHNICAL-SEO-GEMINI.md` |
| Preload/preconnect directives | ✅ Already covered | `06-TECHNICAL-SEO-GEMINI.md` |
| `llms.txt` file | ❌ **Missing** | Add to `03-SITE-ARCHITECTURE.md` |
| GEO Chunk Extraction (context-complete sentences) | ❌ **Missing** | Add to `04-PAGE-TEMPLATES.md` |
| Information Gain mandate on guide pages | ❌ **Missing** | Add to `04-PAGE-TEMPLATES.md` |
| Brand entity injection in citations | ❌ **Missing** | Add to `04-PAGE-TEMPLATES.md` |
| Freshness signal (dynamic year) in result block | ❌ **Missing** | Add to `04-PAGE-TEMPLATES.md` |
| `WebApplication` schema `input`/`output` definition | ❌ **Missing** | Add to `06-TECHNICAL-SEO.md` |
| SSR/SSG textual data mandate | ❌ **Missing** | Add to `06-TECHNICAL-SEO.md` |
| AI-specific `robots.txt` rules | ❌ **Missing** | Add to `06-TECHNICAL-SEO.md` |
| `<link rel="alternate">` for `llms.txt` | ❌ **Missing** | Add to `06-TECHNICAL-SEO.md` |
| IndexNow Protocol implementation | ❌ **Missing** | Add to `06-TECHNICAL-SEO.md` |

---

## Additions Required

---

### ADD TO: `03-SITE-ARCHITECTURE.md`

**Location:** After the `/robots.txt` entry in the URL Structure section, before the crawlability section.

---

#### `llms.txt` — AI Engine Crawl File

**Add this section:**

```
/llms.txt → AI engine sitemap (generative AI crawlers)
```

**Add this block immediately after the URL map:**

---

#### `/llms.txt` — Generative Engine Optimization File

Deploy a static `/llms.txt` file in the root directory. This is read by generative AI search engines (ChatGPT, Perplexity, Copilot, Gemini) that power zero-click AI Overview results. These engines often cannot execute client-side JavaScript, meaning they would otherwise misrepresent or skip the calculator entirely. The `llms.txt` file provides a static, machine-readable summary of the site's data and logic.

**File structure:**

```markdown
# [Brand Name] — Small Business Valuation Data

> [Brand Name] publishes SDE multiples and revenue multiples for 63 small business categories, 
> derived from BizBuySell closed transaction data. All valuations use a deterministic model: 
> adjusted SDE × industry median multiple = baseline valuation range. Deal-readiness factors 
> (revenue trend, owner involvement, customer concentration) apply a ±20% adjustment band.

## Calculator

The free business valuation calculator is at https://[domain]/. It accepts six inputs:
industry category, annual SDE, annual revenue, revenue trend, owner involvement level, 
and customer concentration. It outputs a valuation range and a what-if simulation.

## Data Source

All industry multiples are derived from BizBuySell transaction records (CoStar Group). 
The dataset covers 9,500+ closed small business sales from Q1 2021 through Q4 2025. 
Multiples are updated biannually.

## Industry Coverage

63 industries across 12 categories. Examples:
- HVAC Services: 2.3× – 3.1× SDE (median 2.79×, 340+ transactions)
- Car Wash: 4.2× – 5.8× SDE (median 4.99×, 180+ transactions)
- Restaurant: 1.8× – 2.8× SDE (median 2.3×, 1,200+ transactions)
- Dental Practice: 3.5× – 5.2× SDE (median 4.3×, 290+ transactions)
- Accounting/Tax Practice: 2.8× – 4.2× SDE (median 3.3×, 210+ transactions)

Full industry list: https://[domain]/valuation/

## Pages

- /valuation/[industry-slug]/ — Industry-specific multiple data and inline calculator
- /guides/ — Educational content on SDE, valuation multiples, sale preparation
- /methodology/ — Data methodology and calculator logic
- /about/ — Site entity information
```

**Implementation notes:**
- Plain markdown, no HTML. AI engines parse markdown natively.
- Update the example industry data rows to reflect actual `industry-multiples.json` values at build time.
- Add to the sitemap as a `<loc>` entry with `<changefreq>biannual</changefreq>`.
- Do not block this file in `robots.txt` — AI crawlers must be able to access it.

---

### ADD TO: `04-PAGE-TEMPLATES.md`

---

#### 1. GEO Chunk Extraction — `sge-summary-block` Text Standard

**Location:** After the existing three-part structure spec for the `sge-summary-block` (after the "Range Variable" bullet, before the closing note about the calculator).

**Add this requirement:**

---

**GEO Context Completeness Requirement (2026 standard):**

Each sentence within the `sge-summary-block` must be fully understandable in isolation — without requiring the surrounding page for context. Generative engines extract individual sentences from pages; a sentence that depends on surrounding context for meaning will be skipped or misquoted.

**Before (fails context completeness):**
> "Typical SDE Multiple: 2.3× – 3.1×"

**After (passes context completeness):**
> "The typical SDE valuation multiple for an HVAC business in 2026 is 2.3× to 3.1×, according to [Brand Name] analysis of BizBuySell transaction data."

**Rule:** Every factual sentence in the summary block must contain: (1) the subject (what business type), (2) the metric, (3) the value, (4) the year, (5) the source attribution. Omitting any of these five elements fails context completeness for GEO extraction.

Apply this same sentence structure to the H1 orienting text paragraph — not only to the summary block.

---

#### 2. Freshness Signal in Calculator Result Block

**Location:** In the Hub Calculator Page template, within the `[SECTION: Calculator Result]` block.

**Add this requirement:**

---

**Freshness Signal — Required:**

The calculator result block must dynamically inject the current year into the result display. AI Overviews and generative engines apply temporal ranking — they preferentially cite sources that signal up-to-date data.

Required implementation:
- Below the primary valuation range, the data source citation line must read:
  `"Source: [transaction_count]+ transactions · BizBuySell · [dynamically rendered current year] data"`
- The year is rendered by JavaScript at display time — not hardcoded at build time. This ensures the citation always reflects the current year without requiring a content update.
- The same dynamic year injection applies to the industry micro-calculator result on industry pages.

This single addition causes every AI citation of a result from this tool to include the year, making it appear as a current source in AI training and retrieval contexts.

---

#### 3. Information Gain Mandate — Guide Pages

**Location:** In Page Type 4 (Guide Pages) template, within the `[SECTION: Article Body]` requirements.

**Add this requirement after the existing internal link requirements:**

---

**Information Gain Requirement (mandatory for every guide page):**

Search algorithms in 2026 apply an Information Gain score to content — pages that introduce net-new data that cannot be found in other sources on the same topic are ranked above pages that restate consensus information. Guide pages on generic topics ("What is SDE?", "Understanding valuation multiples") are at high risk of being classified as consensus echo chambers and suppressed.

**Requirement:** Every guide page must contain at minimum one proprietary data point from `industry-multiples.json` that is not available in any other source's treatment of the same topic.

**Implementation:**
- The `what-is-sde` guide must include: "Based on [Brand Name]'s analysis of [N]+ BizBuySell transactions, the median SDE margin across all 63 industries in our dataset is [X]% of revenue — though this varies from [low]% in restaurants to [high]% in accounting practices."
- The `understanding-valuation-multiples` guide must include a proprietary comparison table of median SDE multiples across at least 5 industries drawn from `industry-multiples.json`.
- The `how-to-prepare-business-for-sale` guide must reference the specific valuation impact of deal-readiness factors as quantified by the calculator's adjustment model (e.g., "Owner involvement scoring in our model applies up to a 20% discount to businesses where the owner works more than 40 hours per week in the operations").

**Format:** The proprietary data point can be inline (a specific statistic in a paragraph), a callout box, or a small comparison table. It must be labeled with attribution: "According to [Brand Name] data..." or "Based on [Brand Name]'s analysis of BizBuySell transaction data..."

This requirement cannot be waived. A guide page that contains zero proprietary data is a restatement guide that will not generate Information Gain signals.

---

#### 4. Brand Entity Injection — Zero-Click Brand Building

**Location:** In the `sge-summary-block` spec and the data source citation line specs throughout all page types.

**Add this requirement:**

---

**Brand Name in All Data Citations (mandatory):**

Over 58% of informational searches end without a click due to AI Overviews answering queries directly. When this site's data is used in an AI Overview, the brand name must appear in the cited text — not just in the URL. If the brand name is absent from the cited sentence, the user receives the data without learning the source, eliminating the brand-building value of the citation.

**Standard citation format for all data attribution on the site:**

> "According to [Brand Name]'s analysis of BizBuySell transaction data, [specific data claim]."

**Apply to:**
- Every data row in the `sge-summary-block` prose text (not the label/value display pairs, but any surrounding explanatory sentences)
- The data source citation line in all micro-calculator results
- The market context paragraphs on industry pages
- The proprietary data point callouts on guide pages

**Do not use:**
> "Based on BizBuySell data..." (omits brand — zero brand-building value when cited)
> "Transaction data shows..." (anonymous — zero entity signal)

The goal: when ChatGPT, Perplexity, or Google's AI Overview cites this site's data, the output reads "According to [Brand Name]..." — establishing the brand as a named entity in AI training data and user awareness simultaneously.

---

### ADD TO: `06-TECHNICAL-SEO-GEMINI.md`

---

#### 1. WebApplication Schema — Input/Output Definition

**Location:** Within the Hub Page WebApplication schema block, add `potentialAction` after `provider`.

**Add to the WebApplication JSON block:**

```json
"potentialAction": {
  "@type": "Action",
  "name": "Calculate Business Valuation",
  "description": "Enter industry, SDE, revenue, and deal-readiness factors to receive an industry-specific business valuation range",
  "object": {
    "@type": "EntryPoint",
    "urlTemplate": "https://[domain]/calculator/",
    "actionPlatform": "https://schema.org/DesktopWebPlatform"
  },
  "expectsAcceptanceOf": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

**Rationale:** Google uses `potentialAction` in `WebApplication` schema to surface interactive tools directly in AI Overviews. Defining the action explicitly tells the AI system what the tool does and how to invoke it, increasing the likelihood of being shown as a direct tool result rather than a cited link.

---

#### 2. `llms.txt` in Crawlability Section

**Location:** In the Crawlability and Indexing section, after the `robots.txt` block.

**Add this block:**

---

**`/llms.txt` — AI Engine Crawl File:**

In addition to `robots.txt` and `sitemap.xml`, deploy an `llms.txt` file at the root. This file is the 2026 standard for communicating site structure and data to generative AI crawlers (ChatGPT, Perplexity, Copilot) that power AI Overviews and zero-click answers.

The calculator runs entirely client-side. AI bots that cannot execute JavaScript will not see calculator outputs. The `llms.txt` file provides a static summary of the mathematical model and key industry data so that AI systems can accurately cite the site's conclusions without executing the JS.

Full content specification is in `03-SITE-ARCHITECTURE.md` under the `/llms.txt` entry.

**Do not block `llms.txt` in `robots.txt`.** AI crawlers must be able to access it to cite this site in generative results. Blocking it means the site's data will not appear in ChatGPT, Perplexity, or Copilot responses regardless of ranking position.

---

---

### REPLACE IN: `06-TECHNICAL-SEO-GEMINI.md` — Hub Page Schema → `@graph`

**Decision:** Adopt the unified `@graph` approach for the hub page. The existing spec's "separate script blocks" rule was written as a defensive default. It is overruled for the hub page specifically, where the goal is explicit entity relationship declaration for AI Overview citation. The syntax-error risk is neutralized by build-time schema validation (see below).

**Industry and category pages keep their existing separate blocks** — `@graph` is only warranted on the hub because that is the only page that co-locates Organization + WebApplication + Dataset, making explicit cross-referencing valuable.

---

**REPLACE:** The implementation statement at the top of the Schema Requirements section:

> *"Schema is implemented as inline JSON-LD `<script>` blocks in the `<head>` of each page. One script block per schema type. Multiple schema types on a single page are implemented as separate script blocks, not nested."*

**WITH:**

> Schema is implemented as inline JSON-LD `<script>` blocks in the `<head>` of each page.
>
> **Hub page exception:** The hub page uses a single unified `@graph` block that cross-references all entity types via `@id`. This explicitly declares the relationships between the Organization, the WebApplication, and the Dataset — rather than leaving AI crawlers to infer connections between three separate scripts. On all other page types (industry, category, guide), separate script blocks per schema type remain the standard.

---

**REPLACE:** The entire hub page schema section (all five separate blocks for Organization, WebApplication, Dataset, FAQPage, BreadcrumbList) with this single `@graph` block:

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

**Key changes from the previous separate-block approach:**
- Every entity has an `@id` anchor URI (e.g., `#organization`, `#calculator`, `#dataset`)
- `WebApplication.publisher` and `Dataset.creator` use `{ "@id": "..." }` references instead of repeating the Organization object — this is the entity relationship declaration
- `potentialAction` is included in the WebApplication node (previously a separate addition)
- All five schema types are in one validated, linted JSON block

---

**ADD to the What Not to Do — Technical Anti-Patterns section:**

> **Do not skip JSON-LD schema validation at build time.** The hub page's `@graph` block combines five schema types in a single JSON object. A syntax error (missing comma, unclosed brace) silently breaks all schema on the page with no visible error in the browser. The build pipeline must run a JSON linter (e.g., `ajv`, `jsonschema`, or Google's Rich Results Test API) against every generated schema block before the page is considered publishable. Schema validation failure must block deployment, not produce a warning. This is a publish gate requirement — add it to `07-PUBLISH-GATES.md`.

---

---

### ADD TO: `06-TECHNICAL-SEO.md` — `<head>` Tags Section

#### 3. `llms.txt` Alternate Link Directive

**Location:** In the Mandatory `<head>` Tags — Every Page section, directly below the Open Graph tags.

**Add this line:**

```html
<!-- AI Crawler Roadmap Directive — points generative engines to the static site summary -->
<link rel="alternate" type="text/markdown" title="LLM-friendly version" href="/llms.txt">
```

**Rationale:** This signals to AI crawlers — in the same way `<link rel="alternate">` signals to translation crawlers — that a machine-readable summary of this site exists at `/llms.txt`. Crawlers that respect this directive will use it as their primary parsing target rather than attempting to execute client-side JavaScript.

---

### ADD TO: `06-TECHNICAL-SEO.md` — Core Web Vitals Implementation Requirements

#### 4. SSR/SSG Mandate for Textual Data

**Location:** In the Implementation requirements block under Core Web Vitals & Accessibility Targets.

**Add this requirement:**

---

**SSR/SSG Mandate for Data (mandatory):**

While calculator interactivity is client-side, all text content, multiples data, and the `sge-summary-block` on industry and category pages must be statically generated (SSG) or server-side rendered (SSR) at build time. The actual numeric data — SDE multiples, transaction counts, deal notes — must be present in the raw HTML DOM response, independent of JavaScript execution.

AI headless browsers and generative engine crawlers routinely skip or truncate JavaScript execution. If critical data requires JS to render, it will not be indexed by generative engines regardless of how well the schema is structured. This is the single most common reason a technically correct site fails to appear in AI Overviews.

**Cloudflare Workers implementation:** At build time, the Worker pre-renders each industry page by reading `industry-multiples.json` and injecting the data directly into the HTML response. The `sge-summary-block` HTML — including all numeric values — must be in the initial HTTP response body, not injected by JavaScript after the DOM loads.

**What must be SSR/SSG (not JS-rendered):**
- All `sge-summary-block` content on industry pages
- H1 text (already specified as a hard rule in anti-patterns)
- SDE multiple values in the comparison table
- Market context paragraphs
- FAQ question/answer text

**What can remain client-side:**
- Calculator input handling and result computation
- What-If simulation sliders
- Mobile navigation drawer
- Ad unit rendering

---

### ADD TO: `06-TECHNICAL-SEO.md` — Crawlability and Indexing Section

#### 5. "Crawl-to-Referral" `robots.txt` Policy

**Location:** Replace the existing `robots.txt` block entirely.

**Replace with:**

```
User-agent: *
Disallow: /admin/
Disallow: /api/

# AI Search & Synthesis bots — cite sources and drive referral traffic — ALLOW
User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

# Pure training scrapers — high server load, zero referral traffic — BLOCK
User-agent: CCBot
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /

User-agent: ClaudeBot
Disallow: /

Sitemap: https://[domain]/sitemap.xml
```

**Rationale:** Not all AI crawlers are equal. The distinction that matters for this project:

- **Cite-and-refer bots** (OAI-SearchBot for ChatGPT Search, PerplexityBot) index content, cite it by name in answers, and drive branded referral traffic. These are the crawlers that build entity authority. Allow unrestricted.
- **Training-only scrapers** (CCBot for Common Crawl, Meta-ExternalAgent, ClaudeBot) consume content for model training without generating citations or referral traffic. They provide high server load with zero compounding SEO benefit. Block them.

This policy is the "Crawl-to-Referral" principle: permit crawlers that generate attribution, block crawlers that only extract. The list of bot names should be reviewed biannually as the AI crawler ecosystem evolves.

---

#### 6. IndexNow Protocol — Real-Time Push Indexing

**Location:** In the Crawlability and Indexing section, after the sitemap block.

**Add this requirement:**

---

**IndexNow Protocol (mandatory for Cloudflare Workers deployment):**

IndexNow is a push-based indexing protocol supported by Bing, Yandex, and by extension Perplexity (which uses Bing's index). Rather than waiting for crawlers to discover updated pages, the CI/CD pipeline pings `api.indexnow.org` the moment any page is deployed or when `industry-multiples.json` is updated. This guarantees instant discovery in non-Google AI engines without waiting for a crawl cycle.

**Implementation in Cloudflare Workers:**

On every deploy that changes content, the Worker (or a deploy hook) sends a POST to the IndexNow API:

```javascript
// Run after successful deploy — not on every request
await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: '[domain]',
    key: '[your-indexnow-key]',      // 32-128 char hex key, also served at /[key].txt
    keyLocation: 'https://[domain]/[key].txt',
    urlList: [
      'https://[domain]/',
      'https://[domain]/valuation/',
      // Include all industry page URLs that changed
    ]
  })
});
```

**Setup steps:**
1. Generate a random 32–128 character hex key
2. Serve it as a static text file at `https://[domain]/[key].txt` (plain text, just the key)
3. Add the POST call to the deploy pipeline
4. Verify at `https://www.bing.com/webmasters/` that submissions are being received

**What this does not cover:** Google has its own IndexNow endpoint but does not guarantee processing. Google discovery still relies on sitemaps and organic crawling. IndexNow is primarily valuable for Bing Copilot and Perplexity, both of which process submissions rapidly.

---

## Summary of Changes by File

| File | Changes |
|---|---|
| `03-SITE-ARCHITECTURE.md` | Add `/llms.txt` to URL map + full file spec |
| `04-PAGE-TEMPLATES.md` | (1) GEO context completeness rule for `sge-summary-block`; (2) Dynamic year freshness signal in result block; (3) Information Gain mandate for guide pages; (4) Brand entity injection standard |
| `06-TECHNICAL-SEO.md` | (1) Hub page schema → unified `@graph` with `@id` cross-referencing; (2) `potentialAction` included in WebApplication node; (3) `llms.txt` note in Crawlability section; (4) `llms.txt` alternate `<link>` tag in `<head>`; (5) SSG/SSR Mandate for data; (6) "Crawl-to-Referral" `robots.txt` policy; (7) IndexNow Protocol API specification; (8) Build-time JSON validation requirement added to anti-patterns |
| `07-PUBLISH-GATES.md` | Add schema validation as a hard publish gate |

The `@graph` change replaces (not extends) the existing hub page schema blocks. All other page types are unaffected.
