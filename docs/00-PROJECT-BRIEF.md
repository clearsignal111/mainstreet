# 00 — Project Brief

Read this file first. It contains the strategic context that every other file assumes. Without this context, implementation decisions get made against the wrong objectives.

---

## What This Is

A standalone utility website built around a single core tool: a small business valuation calculator that produces industry-specific, data-backed valuation estimates for Main Street business owners who are considering selling their business or want to understand what it is worth.

**The tool is the product.** Everything else — the industry pages, the supporting content, the internal link structure, the schema — exists to put the right user in front of that tool and to establish the site as an authoritative data entity in Google's ranking systems.

**One-sentence mission:** Give any small business owner an honest, data-backed estimate of what their business is worth, specific to their industry, in under two minutes, with no email required.

---

## Why This Niche — The Competitive Reasoning

Two other niches were evaluated and eliminated before this one:

**LLC formation cost calculators** were eliminated because ZenBusiness, Bizee, Northwest, and LegalZoom (DR 70–90) rank for these terms because selling formation services is their entire business model. A standalone tool site cannot displace them.

**Workers compensation premium calculators** were eliminated for identical reasons. ADP, The Hartford, NEXT Insurance, and Insureon rank because selling insurance is their business. Same structural problem.

**Small business valuation is different in one structural way:** the incumbents are content publishers and niche operators, not service giants with commercial lock. FitSmallBusiness (DR ~72), OmniCalculator (DR ~68), EmpireFlippers (DR ~70) rank for head terms, but their tools are generic — they apply the same 2–4× range regardless of industry. The long-tail terms ("how much is an HVAC business worth," "plumbing company SDE multiple") are populated by local business broker sites at DR 20–40. These are beatable within 12–18 months after sandbox exit.

**The second structural advantage:** this query cluster is almost entirely immune to AI Overviews. "What is my business worth?" requires the user's private financial inputs — their SDE, industry, growth rate, owner dependency — to answer usefully. Google cannot produce a useful AI Overview for this without user data. The interactive calculation is structurally AI-proof.

---

## The Data Moat

The entire differentiation of this project is one fact: **no existing free tool uses BizBuySell's industry-specific transaction multiples.**

BizBuySell (owned by CoStar Group) publishes SDE multiples and revenue multiples by industry derived from 9,500+ actual closed business sale transactions. This data is free, publicly accessible, and updated biannually. It shows that car washes sell at 4.7× SDE, restaurants at 2.0–2.5×, HVAC businesses at 2.3–3.1×, marinas at 6.6×.

No existing competitor uses this data. Every free tool applies a generic 2–4× range regardless of industry. The gap between what exists and what this site provides is the moat.

The moat is defensible because:
- The data is sourced from a named, authoritative third party (not made up, not proprietary)
- The data is updated independently of the site (BizBuySell updates it biannually)
- The calculation requires user inputs that AI cannot provide (making the tool AI-proof)
- The programmatic page structure (63 industries with genuinely different outputs) takes months to build and replicate

The moat narrows the moment a competitor builds the same thing. Build speed and completeness are therefore competitive advantages.

---

## The Programmatic Axis

The site scales across three dimensions that produce genuinely different page content:

- **Industry** — 63 categories with SDE multiples ranging from under 1.5× to over 6×
- **Deal-readiness factors** — growth trend, owner dependency, customer concentration all shift the multiple
- **Revenue band context** — what "$200,000 SDE" means differs between a restaurant and a dental practice

This produces 63 industry pages where the calculator output, the multiple table, the value drivers, and the risk factors are all substantively different. This passes Google's scaled content abuse test because the underlying data — not just the template — differs per page.

---

## Revenue Model

Google AdSense display advertising. No lead generation. No email capture. No subscriptions.

The user base (business owners considering a sale) is the highest-intent audience that business broker, SBA lender, and M&A advisor advertisers can reach through display. This produces RPMs in the $30–$55 range for US-dominant traffic — meaningful but not exceptional.

**Honest revenue projections:**
- Month 6: $50–$300/month (low traffic, sandbox effect)
- Month 12: $300–$1,200/month (sandbox exit beginning)
- Month 18: $1,000–$2,800/month (compound traffic growth)
- Month 24–30: $2,300–$6,600/month (full compound phase)

The revenue model compounds because each new industry page cracking a top-5 ranking adds a relatively permanent revenue increment requiring no ongoing effort.

---

## What Success Looks Like by Stage

**Month 3:** Site indexed. 50+ pages in Google's index. First trickle of traffic (100–500 sessions/month). No meaningful revenue. This is expected and normal.

**Month 6:** 2,000–8,000 sessions/month from long-tail industry pages beginning to rank. AdSense approved and generating first revenue ($50–$300/month). Wide range because sandbox exit timing is unpredictable.

**Month 10–12:** Sandbox exit. Traffic inflection. 10,000–30,000 sessions/month if execution has been clean. Revenue $300–$1,200/month.

**Month 18:** 30,000–60,000 sessions/month as industry pages compound. Revenue $1,000–$2,800/month. This is the minimum viable outcome.

**Month 24–30:** Full compound phase. $2,300–$6,600/month with growing compound authority.

**The honest constraint:** This niche does not have the highest possible revenue ceiling. Its strength is the combination of genuine feasibility + defensibility + data quality + low E-E-A-T friction. At month 30 it is a $4,000–$8,000/month business with compounding authority. That is the realistic projection.

---

## The Anti-Patterns — What Not to Build

These are the specific failure modes that look reasonable but kill the project. They are listed here, not in individual spec files, because they need to be known before any implementation decision is made.

**Do not gate results behind email capture.** Every competitor does this. It is why users bounce. The tool produces a full result with no registration. The business model does not need emails — it needs ad impressions. Email gates destroy the completion rate that drives all revenue.

**Do not use generic multiples.** If the calculator applies the same 2–4× range regardless of industry, the entire differentiation is gone. Every calculation uses the industry-specific multiple from `/data/industry-multiples.json`. This must be tested explicitly.

**Do not build thin industry pages.** Each industry page must contain the micro-calculator component pre-loaded for that industry, the industry-specific multiple table, and at least 400 words of industry-specific context. Pages with only the micro-calculator and boilerplate text will be penalized under Google's scaled content abuse policy and will damage the entire domain's authority. The micro-calculator delivers an inline estimate and a CTA to the full calculator at the hub — it is not a substitute for substantive written content.

**Do not launch with incomplete data.** A page with incorrect or placeholder multiple data harms users and damages site credibility. If data for an industry is not complete, that industry page does not publish. The publish gates in `07-PUBLISH-GATES.md` enforce this.

**Do not skip the data source citation.** BizBuySell must be cited visibly on every page that uses their data. This is an E-E-A-T requirement, an ethical obligation, and a signal to Google that this is a data aggregation entity — not an AI-generated content farm.

**Do not optimize for traffic before quality.** The compound revenue curve depends on maintaining rankings. Rankings depend on content quality and user satisfaction signals. Short-term traffic tactics (keyword stuffing, thin content at volume) that degrade quality will flatten the compound curve permanently.

---

## The Single Decision Test

Every build decision — every feature, every page, every optimization — should be evaluated against this:

**"Does this make the tool more useful to a business owner who is seriously considering selling their business?"**

If the answer is no, the feature does not belong in this build.
