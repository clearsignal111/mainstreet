# 08 — Monetization Specification

Revenue comes from Google AdSense display ads. The model is simple: high-intent users arrive, use the calculator, receive their valuation, and at the moment of maximum intent see contextually relevant ads from business brokers, SBA lenders, and M&A advisors. Everything in this file serves that moment without undermining the user experience that produces it.

---

## Revenue Model

**Primary:** Google AdSense display advertising  
**Secondary (future, not in initial build):** Direct ad partnerships with business brokers or SBA lenders once traffic reaches meaningful volume (10,000+ monthly sessions)  
**Not in scope:** Lead generation, affiliate commissions, email list monetization, subscription features

The AdSense model compounds because it requires no ongoing sales effort. RPM improves as domain authority improves (better advertiser competition for ad slots), as traffic grows (more impressions), and as the user base self-selects toward higher-value business owners (higher CPC advertisers targeting this audience).

---

## Advertiser Context

Understanding who bids for this audience determines why ad placement matters and what contextual framing around ad units can legally and ethically do.

**Business brokers:** The primary advertiser category. Business brokers pay $15–$55 CPC to reach business owners considering a sale. A user who has just received a "$380,000–$510,000" estimate for their HVAC business is the most qualified lead a business broker can reach through display advertising. This is why placement immediately after the result is structurally correct — not manipulative, but genuinely relevant.

**SBA lenders and acquisition financing platforms:** Target buyers of small businesses who need financing. This audience is reached when the content discusses deal structure and financing (buyer profile sections of industry pages, the SBA acquisition loans guide).

**M&A advisors and wealth managers:** Higher-value targets — relevant for businesses with valuations above $1M–$2M. These advertisers bid at higher CPCs than Main Street business brokers.

**Business valuation appraisers:** Certified appraisers who offer formal opinions of value. Relevant immediately after the tool result — a user who received an estimate may want a formal appraisal.

Note: Google AdSense's contextual targeting will serve the most relevant ads automatically based on page content and user signals. The site does not manually select which ads appear. What the site controls is the content context that signals relevance to AdSense's targeting system — and the placement that determines when the user sees the ad.

---

## Valuation-Tiered Contextual Framing

The calculator output signals the approximate business value. This information can be used to place contextual text adjacent to the ad unit that subtly primes the user for the type of service most relevant to their situation. This is distinct from changing the ad slot itself (which AdSense policy prohibits) — it is changing the surrounding content, which AdSense's own contextual engine then reads.

Implementation: immediately above Ad Unit 1 (the post-result placement), render a short contextual sentence based on the valuation range:

**If valuation_low < $500,000:**
> "Businesses in this range typically work with local business brokers and qualify for SBA 7(a) acquisition financing."

**If valuation_low >= $500,000 and valuation_high < $2,000,000:**
> "Businesses at this valuation level often work with regional business brokers or M&A intermediaries, with SBA and conventional financing both available."

**If valuation_low >= $2,000,000:**
> "Businesses at this valuation level typically engage M&A advisors rather than traditional business brokers, and buyers often include private equity and strategic acquirers."

This text is factually accurate, genuinely useful to the user, and signals to AdSense's contextual system what type of service provider is relevant — improving the probability that broker, lender, or advisor ads appear rather than unrelated display ads. The result is higher CPC relevance without any manipulation of the ad unit itself.

---

## Ad Placement Specification

### Ad Unit 1 — Post-Result (Highest Intent Position)

**On the hub page:**
- Location: Immediately below the full result block (primary range + breakdown + what drives value up/down + data citation), above the What-If simulation section
- Trigger: Appears only after the user submits the form and receives a result. Does not appear on page load.

**On industry pages:**
- Location: Immediately below the micro-calculator inline result block (dollar range + citation + disclosure + CTA link)
- Trigger: Appears only after the user submits the micro-calculator and receives an inline result. Does not appear on page load.
- Note: The valuation-tiered context sentence (see Contextual Framing section above) applies here too — render a simplified version based on the inline estimate range before the ad unit.

**Both placements:**
- Format: Responsive display ad — Google auto-sizes. Reserve space: minimum 300×250, maximum 728×90 on desktop.
- CSS: Reserve explicit space before ad loads: `min-height: 280px` on mobile, `min-height: 100px` on desktop. This prevents CLS when the ad renders.
- Why this placement: The user has just received their specific dollar range — on either page. Their intent to act is at its peak. This is the only moment on the site where ad relevance and user intent perfectly align.

### Ad Unit 2 — Post-Next-Steps

**Location:** Below the Next Steps module, before any related content sections  
**Trigger:** Renders on page load (not result-dependent) but below the fold — user has scrolled through the calculator area  
**Format:** Responsive display ad  
**CSS:** Size-reserved  
**Why this placement:** Users who scroll past the result to read next steps are highly engaged. This is the second-highest intent position on the page.

### Ad Unit 3 — Mid-Content (Guide Pages and Category Pages Only)

**Location:** After the first major section break (H2) within guide or category page body content — never in the first 25% of content  
**Format:** Responsive display ad or in-article ad format  
**Trigger:** Static — renders on page load at a fixed position in the content  
**CSS:** Size-reserved  
**Not on industry pages:** Industry pages already carry Ad Units 1 and 2. A third ad unit on industry pages would push the content-to-ad ratio below acceptable limits and create UX degradation.

---

## Ad-to-Content Ratio

**Industry pages:** Maximum 2 ad units per page. With 600–1,000 words of content, 2 ad units maintains approximately 80/20 content-to-ad ratio by page area.

**Guide pages:** Maximum 2 ad units per page (1 mid-content, 1 post-content). With 800–2,000 words of content, this ratio is sustainable.

**Category pages:** Maximum 2 ad units per page.

**Hub page:** Maximum 2 ad units (post-result and post-next-steps). The hub page is primarily the calculator — the content-to-ad ratio is measured differently because the calculator itself is not content in the traditional sense.

Exceeding these limits risks Google's ad policy enforcement for "ad-heavy" pages and degrades the UX signals (bounce rate, dwell time) that support rankings. The compound revenue model depends on maintaining rankings — ad placement that damages rankings destroys compound value faster than it creates short-term RPM.

---

## AdSense Approval Path

Google AdSense approval for new sites requires meeting content volume, quality, and policy requirements. The approval process for financial content sites is more scrutinized than for general content sites.

**Minimum requirements before application:**
- Site live for at least 60 days (not negotiable — Google's system checks domain age)
- Minimum 15–20 high-quality, substantive pages published (this means guide pages and industry pages with full content — not placeholder pages)
- About page and Privacy Policy present
- Contact method present
- No copyrighted content, no adult content, no misleading claims
- Site is indexable and has received at least some organic traffic (even 50–100 sessions signals a legitimate site)

**Application timing based on build sequence:**
Since the site is built in one session and launched complete (all pages, all content), the 60-day clock starts at launch. Apply for AdSense at day 61. With a complete, quality site from day one, approval is expected within 2–4 weeks of application. Target AdSense revenue by month 3.

**Privacy Policy requirement:** A GDPR/CCPA-compliant Privacy Policy is mandatory for AdSense approval. It must disclose that the site uses cookies for advertising purposes. Include a standard Privacy Policy page at `/privacy-policy/` — use a compliant template that covers cookie disclosure, data collection (none beyond what AdSense collects), and contact information.

**What accelerates approval:**
- Clean, professional site design
- Substantive content (not thin placeholder text)
- Clear site identity (About page with real operator information)
- Methodology page demonstrating data sourcing (signals the site is a legitimate utility, not a content farm)
- Some initial traffic (even low volume signals the site is being used)

---

## Revenue Projection Context

These are planning projections, not guarantees. They exist to calibrate expectations and determine when to make decisions about the site.

| Milestone | Sessions/Month | RPM | Monthly Revenue |
|-----------|---------------|-----|-----------------|
| Month 3 | 200–500 | $20–30 | $4–$15 |
| Month 6 | 2,000–8,000 | $28–38 | $56–$304 |
| Month 10–12 (sandbox exit) | 10,000–30,000 | $30–40 | $300–$1,200 |
| Month 18 | 30,000–60,000 | $35–48 | $1,050–$2,880 |
| Month 24–30 | 60,000–120,000 | $38–55 | $2,280–$6,600 |

**RPM improvement drivers over time:**
- Domain authority growth attracts higher-CPC advertisers
- More industry pages ranking improves topical signal, attracting more specialized broker/lender ads
- User behavioral data accumulates (Google learns which ad formats convert for this audience)
- Direct advertiser competition for the "business for sale" intent audience tends to be counter-cyclical to market downturns (more sellers enter the market in tough conditions)

**The honest constraint:** Revenue in months 1–9 will be negligible regardless of build quality. The sandbox suppresses traffic. The investment is in building the correct foundation — every quality decision made now compounds after sandbox exit. A site built with placeholder content and generic multiples will plateau at month 12. A site built correctly compounds through month 30 and beyond.
