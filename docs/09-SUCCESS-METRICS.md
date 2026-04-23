# 09 — Success Metrics and Tracking

This file defines what to measure, how to set up measurement, and what the numbers mean at each stage. Tracking infrastructure must be installed before launch — retroactive data is not recoverable.

---

## Tracking Infrastructure — Install at Launch

**Google Search Console**
- Verify domain ownership before or on launch day
- Submit sitemap.xml immediately after launch
- Set primary country to United States
- Check weekly: Coverage report (pages indexed), Performance report (impressions, clicks, average position)

**Google Analytics 4**
- Install GA4 tracking code on all pages
- Configure the following events:

**Hub page events:**
- `full_calculator_submitted` — fires when user clicks Calculate on the hub page
- `full_result_viewed` — fires when the full result block renders on the hub page
- `whatsif_opened` — fires when What-If section is expanded
- `whatsif_interacted` — fires when any What-If slider is moved
- `hub_arrived_from_micro` — fires on the hub page when URL params `?industry=` + `&sde=` + `&revenue=` are present on load (identifies sessions originating from a micro-calculator CTA)

**Industry page events:**
- `micro_estimate_submitted` — fires when user clicks "Get My Estimate" on any industry page micro-calculator
- `micro_estimate_viewed` — fires when the inline result renders on an industry page
- `micro_cta_clicked` — fires when user clicks the "Get your full breakdown →" CTA link after seeing an inline result

**Event parameters to include on all calculator events:**
- `industry_slug` — the industry identifier (e.g., `hvac-services`)
- `page_type` — `hub` or `industry_page`

- Set up conversion events:
  - Primary: `full_calculator_submitted` (full calculator completion at hub — the revenue-generating action)
  - Secondary: `micro_cta_clicked` (micro-calculator → hub transition — the critical funnel step)
- Configure traffic source attribution
- The UTM parameters on micro-calculator CTA links (`utm_source=industry_page`, `utm_medium=micro_calculator`, `utm_campaign=[industry-slug]`) will automatically populate the Source/Medium/Campaign dimensions in GA4 — no additional configuration needed beyond the standard GA4 installation

**No additional tracking tools required for initial build.** Search Console and GA4 provide sufficient data for all decisions in the first 18 months.

---

## Primary Metrics by Stage

### Months 1–3 (Foundation Phase)

**What to track:**
- Pages indexed (Search Console → Coverage → Valid)
- Crawl errors (Search Console → Coverage → Errors)
- Core Web Vitals (Search Console → Core Web Vitals report)

**Target:**
- 80%+ of published pages indexed within 6 weeks of launch
- Zero Critical core web vital failures
- Zero crawl errors on published pages

**What these numbers mean:**
If pages are not indexed within 6 weeks, investigate: check robots.txt is not blocking, check canonical tags are self-referencing, check pages are internally linked (not orphans), check for noindex tags. Indexing issues at this stage are almost always technical problems, not content quality issues — the content quality reckoning comes later.

If Core Web Vitals show failures, fix before anything else. CWV failures suppress rankings regardless of content quality.

---

### Months 3–6 (Early Traffic Phase)

**What to track:**
- Organic sessions (GA4)
- Impressions and clicks by page (Search Console → Performance)
- Average position by page
- Full calculator submission rate (GA4: `full_calculator_submitted` ÷ hub page sessions)
- Micro-calculator submission rate (GA4: `micro_estimate_submitted` ÷ industry page sessions)
- Micro-calculator CTA conversion rate (GA4: `micro_cta_clicked` ÷ `micro_estimate_viewed`)

**Targets:**
- 500–2,000 organic sessions/month by month 6
- Full calculator submission rate: minimum 25% of hub page sessions
- Micro-calculator submission rate: minimum 20% of industry page sessions (users who land on an industry page and submit the micro-calculator — lower than hub because the page has more content to read first)
- Micro-calculator CTA conversion rate: minimum 30% (users who see an inline result and click through to the hub). **Below 20% warrants immediate investigation** — likely causes are disclosure text that is too alarming, CTA copy that is too weak, or users satisfied with the inline estimate and not understanding what the hub adds. Above 50% is excellent.
- At least 20 industry pages appearing in Search Console with >10 impressions/month

**What these numbers mean:**
Low impressions (< 50/month per industry page) at month 6 means either the pages are not indexed or they are indexed but not ranking for any query. Check Search Console for which specific queries are generating impressions — this reveals which industries are getting traction first.

Low full calculator submission rate (< 15%) means users are landing on the hub and leaving without engaging. Investigate: Is the calculator loading correctly? Is the SDE explainer visible enough? Is there a UI friction point at a specific input field?

Low micro-calculator CTA conversion rate (< 20%) means the micro-calculator is delivering an estimate but not successfully converting users to the full calculator. Check: Is the disclosure text discouraging users rather than setting expectations? Is the CTA visually prominent enough? Is the inline estimate range so wide that users feel they already have enough information? GA4 Funnel Exploration (`micro_estimate_submitted` → `micro_estimate_viewed` → `micro_cta_clicked` → `hub_arrived_from_micro`) will show exactly where the drop-off occurs.

---

### Months 6–12 (Sandbox Phase / Pre-Exit)

**What to track:**
- Organic sessions (targeting growth, not absolute number)
- Revenue (AdSense dashboard — available after approval)
- RPM (AdSense: revenue ÷ thousands of impressions)
- Which industry pages are ranking in positions 11–30 (these are the next to break into top 10)
- What-If interaction rate (GA4 event: `whatsif_interacted` ÷ `full_result_viewed`)

**Targets:**
- Organic sessions: 2,000–8,000/month by month 9
- What-If interaction rate: minimum 15% of users who see a result engage with sliders (this signals the feature is working; low rate means the expand prompt is not visible enough)
- At least 10 industry pages in positions 1–10
- RPM: $25–$40 (low traffic volume means limited advertiser competition; RPM rises with scale)

**What these numbers mean:**
The sandbox effect means rankings are artificially suppressed for new domains in financial content. If you are seeing 100–500 impressions per day per industry page but positions 15–30, the sandbox is working as expected — those pages will move up after the authority threshold is crossed (typically 8–12 months for YMYL-adjacent content). Do not interpret this as a content failure.

If after 9 months zero industry pages are ranking in the top 30 for any query, investigate: check for manual actions in Search Console, check that pages are not over-optimized (keyword stuffing in titles), check that the site has at least some external links (even 3–5 quality links make a difference at this stage).

---

### Months 12–18 (Post-Sandbox / Compound Phase)

**What to track:**
- Organic sessions (expecting meaningful inflection)
- Revenue and RPM
- Which industry pages are in top 5 (this is the revenue-generating position)
- New vs. returning users (returning users signal the site has become a reference resource)
- Pages per session and average engagement time

**Targets:**
- 10,000–40,000 organic sessions/month
- Minimum 20 industry pages in positions 1–10
- Revenue: $500–$2,000/month
- RPM: $30–$48

**What these numbers mean:**
The sandbox exit shows as a visible inflection in the Search Console impressions and clicks chart — a period of steady low impressions followed by a step-change increase. When this happens, the compound phase has begun. Each new industry page breaking into top 5 adds permanent revenue without additional effort.

If the inflection does not occur by month 14, investigate: algorithm updates (check Google's official update log for the period), content quality issues on lower-performing pages (add more specific content to industry pages that are stuck in positions 20–40), external link profile (if the site has zero external links, it may need 5–10 quality inbound links to exit the sandbox).

---

## Leading Indicators vs. Lagging Indicators

**Lagging indicators** (tell you what happened, can't be acted on immediately):
- Revenue
- Monthly organic sessions
- Search Console average position

**Leading indicators** (tell you what will happen, can be acted on):
- Pages indexed (leading indicator for traffic potential)
- Impressions (leading indicator for clicks — high impressions with low clicks signals title/meta description needs work)
- Full calculator submission rate (leading indicator for hub ad revenue — higher completion = higher ad exposure)
- Micro-calculator CTA conversion rate (leading indicator for hub traffic from industry pages — the critical measure of whether the two-step architecture is working)
- What-If interaction rate (leading indicator for dwell time signals)

Monitor leading indicators weekly. Review lagging indicators monthly.

---

## When to Investigate vs. When to Wait

**Investigate immediately:**
- Pages not indexed after 8 weeks
- Core Web Vitals failures (red status in Search Console)
- Calculator not producing results (verify with manual testing)
- 404 errors on published pages (internal link pointing to wrong URL)
- Revenue drop of > 40% month-over-month (could signal manual action or algorithm penalty)

**Wait and monitor:**
- Low traffic in months 1–9 (sandbox is expected)
- Positions 15–40 for industry pages in months 3–9 (pre-sandbox-exit is expected)
- Low RPM at low traffic volumes (advertiser competition is thin at < 5,000 sessions/month)
- Zero revenue before AdSense approval (expected — AdSense is not applied for until day 61)

**The most common mistake:** Treating sandbox suppression as a content quality failure and rebuilding content that is working correctly. Wait for the inflection before making major changes to content that is indexed and receiving impressions.

---

## Data Update Trigger

When BizBuySell releases updated industry data (biannual), update the data file and all affected pages immediately. After updating:
- Check Search Console for any temporary ranking drops on updated pages (data changes can trigger re-evaluation)
- Verify the `dateModified` in Dataset schema updated correctly
- Monitor for impression changes on updated pages — fresh data typically improves performance on freshness-sensitive queries
