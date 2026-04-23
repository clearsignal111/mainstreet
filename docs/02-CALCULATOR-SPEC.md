# 02 — Calculator Specification

The calculator is the product. Every other file in this directory exists to put the right user in front of it and keep it ranking. This document defines the calculator completely. No implementation detail should be inferred or invented — if it is not here, ask before building.

---

## Core Principle

The calculator must produce a result that a business owner could not get anywhere else for free: an industry-specific valuation range derived from real transaction data, adjusted for their specific business conditions. The moment a user receives that number, the site has delivered its value. Everything in this spec serves that moment.

**No email gate. No registration wall. No multi-page wizard. Full result on first interaction.**

---

## Page Placement

**The full calculator renders only on the hub page (`/` or `/calculator/`).** It does not render on industry pages. This is a deliberate SEO and architecture decision: one authoritative calculator page accumulates all link equity, behavioral signals, and AdSense performance data, rather than diluting these across 63 near-duplicate implementations.

On the hub page, the calculator is the first meaningful element a user sees. No hero image, no long introduction, no navigation clutter above it. A single H1 and one or two orienting sentences precede it, then the tool begins.

**On industry pages (`/valuation/[industry-slug]/`), a micro-calculator component replaces the full calculator.** See the Micro-Calculator Specification section below for complete implementation details. The micro-calculator delivers an immediate inline estimate and transitions the user to the hub with their inputs pre-carried via URL parameters.

---

## Input Fields — Phase 1 (Initial Calculation)

These six inputs produce the initial valuation range. They are presented as a single-screen form, not a wizard. All fields visible simultaneously on desktop. Mobile stacks vertically but all remain on one scroll.

**Mobile progressive disclosure (hub page only):** On viewports below 768px, the six-input form must not render all fields visible simultaneously on load — the Calculate button would be off-screen, reducing completion rates. Instead, implement a two-stage reveal:

- **Stage 1 (visible on load):** Industry selector + SDE input + Revenue input. These three are sufficient for the user to understand the form's intent and invest by entering their primary numbers.
- **Stage 2 (reveals after SDE is entered):** Growth Trend, Owner Dependence, and Customer Concentration slide into view below. A subtle label above them: "Two more factors refine your estimate:" signals that these are additive, not required restarts.
- The Calculate button is always visible at the bottom of whichever stage is currently showing. It must never be off-screen on initial load on any mobile viewport.
- On desktop (768px+): all six fields render simultaneously as specified. No staged reveal.

This is a mobile layout behaviour only — the calculation logic, validation, and result output are identical regardless of how the fields were revealed.

---

### Input 1: Industry

**Type:** Searchable dropdown  
**Label:** "What type of business do you own?"  
**Placeholder:** "Search or select your industry..."  
**Data source:** `industry-multiples.json` — pulls `industry_name` for display, `industry_slug` for internal reference  
**Behavior:** Typing filters the list. Selecting populates the internal industry reference used in all calculations. When the hub is reached via a micro-calculator link from an industry page, this field is pre-filled and visually locked (greyed, not editable) with a note: "Showing [Industry Name] data — change industry?" — carried via URL parameter from the originating industry page.  
**Validation:** Required. Cannot submit without selection.  
**Help text:** None needed — field is self-explanatory.

---

### Input 2: Annual SDE

**Type:** Currency input (integer, US dollars)  
**Label:** "Annual SDE (Seller's Discretionary Earnings)"  
**Placeholder:** "$0"  
**Inline expander:** An expandable "What is SDE?" section immediately below the field label. This is mandatory — most business owners do not know the term and will drop off if confused. The expander content:

> **What is SDE?**
> SDE is your business's true earning power for a new owner. It equals:
> **Net profit + your salary + personal benefits run through the business + any one-time expenses**
> Example: If your business showed $40,000 net profit, you paid yourself $90,000, and ran $15,000 in personal expenses through the business, your SDE is $145,000.
> If you're unsure, use your best estimate — you can refine it later.

**Validation:** Required. Must be greater than zero. If user enters revenue instead of SDE (detectable when the figure is implausibly large relative to industry norms), show a soft warning: "This looks higher than typical SDE for this industry — are you entering revenue? SDE is usually 15–35% of revenue for most businesses."  
**Format:** Auto-formats to dollar amount with commas as user types.

---

### Input 3: Annual Revenue

**Type:** Currency input (integer, US dollars)  
**Label:** "Annual Revenue"  
**Placeholder:** "$0"  
**Purpose:** Used as a secondary valuation check via revenue multiple, and to calculate implied SDE margin for the warning logic above. Also used in the output to show the revenue-based valuation estimate alongside the SDE-based estimate.  
**Validation:** Required. Must be greater than zero. Must be greater than or equal to SDE (revenue cannot be less than earnings — if it is, show error: "Revenue should be larger than SDE. Please check your figures.").  
**Help text:** None needed.

---

### Input 4: Revenue Trend

**Type:** Single-select button group (not a dropdown — buttons are faster and reduce friction)  
**Label:** "How has your revenue trended over the past 2 years?"  
**Options:**
- "Declining" 
- "Flat (±5%)"
- "Growing 10–20%/yr"
- "Growing 20%+/yr"

**Default:** No default selected — user must make an active choice.  
**Validation:** Required.

---

### Input 5: Owner Involvement

**Type:** Single-select button group  
**Label:** "How dependent is the business on you personally?"  
**Options:**
- "High — I'm central to daily operations"
- "Moderate — some systems, but I'm still key"
- "Low — mostly runs without me"

**Default:** No default.  
**Validation:** Required.  
**Help text:** Tooltip on the ⓘ icon after the label.
- **Desktop:** Appears on hover. Floating white card, max-width 260px, --text-sm, 1px border. Dismisses on mouse-out.
- **Mobile:** Tap opens an inline expansion directly below the label — not a floating tooltip, which is difficult to dismiss without a persistent hover state. The expanded content renders in the same flow as the input, pushing subsequent fields down. A second tap on the ⓘ icon collapses it. This prevents the tooltip being obscured by the virtual keyboard and eliminates the need for a tap-outside dismiss handler.

---

### Input 6: Customer Concentration

**Type:** Single-select button group  
**Label:** "How concentrated is your customer base?"  
**Options:**
- "Concentrated — one or a few customers represent 40%+ of revenue"
- "Diverse — no single customer over 15% of revenue"

**Default:** No default.  
**Validation:** Required.

---

## Calculation Logic

All calculations use data from `industry-multiples.json` for the selected industry. The fields used are: `sde_multiple_low`, `sde_multiple_mid`, `sde_multiple_high`, `revenue_multiple_avg`.

### Step 1: Establish base multiples

```
base_low = sde_multiple_low
base_high = sde_multiple_high
```

### Step 2: Apply adjustment factors

Each factor shifts both the low and high estimate. Factors are additive.

| Input | Selection | Adjustment |
|-------|-----------|------------|
| Revenue Trend | Growing 20%+ | +0.30 to both low and high |
| Revenue Trend | Growing 10–20% | +0.15 to both |
| Revenue Trend | Flat | 0 |
| Revenue Trend | Declining | −0.25 to both |
| Owner Involvement | Low (systematized) | +0.20 to both |
| Owner Involvement | Moderate | 0 |
| Owner Involvement | High (owner-dependent) | −0.20 to both |
| Customer Concentration | Diverse | +0.10 to both |
| Customer Concentration | Concentrated | −0.25 to both |

```
adjusted_low = base_low + sum(all negative and positive adjustments)
adjusted_high = base_high + sum(all negative and positive adjustments)
```

### Step 3: Apply floor and ceiling rules

```
Floor: adjusted_low cannot fall below 1.0
Ceiling: if adjusted_high exceeds 6.0, display a note: 
  "This estimate reflects strong transaction multiples in your industry. 
   Multiples above 6× are rare and typically apply to businesses with 
   significant recurring revenue and minimal owner dependency."
```

### Step 4: Calculate SDE-based valuation range

```
valuation_low = adjusted_low × annual_sde
valuation_high = adjusted_high × annual_sde
```

### Step 5: Calculate revenue-based valuation (secondary check)

```
revenue_valuation = revenue_multiple_avg × annual_revenue
```

This is displayed as a secondary reference, not the primary output. It is shown with the label: "Revenue-based estimate (secondary method): [figure]" and a note: "Most Main Street businesses sell on SDE, not revenue. Use this as a reference point only."

### Step 6: Rounding

Round both `valuation_low` and `valuation_high` to nearest $5,000 for cleanliness. Do not display false precision. "$382,417" is noise. "$380,000" is useful.

---

## Output Display — Phase 1 Result

The result appears on the same page, below the form, without a page reload. The form remains visible above so users can modify inputs.

### Primary output block

```
Your estimated business valuation:

$[valuation_low] – $[valuation_high]

Based on [N] transactions in the [Industry Name] category 
reported to BizBuySell (Q[X] [Year] data).
```

The dollar range is displayed in the largest font on the page. This is the moment of value delivery. It must be visually prominent.

### Breakdown block (shown below primary output)

```
How we calculated this:

Industry: [Industry Name]
Typical SDE multiple range: [sde_multiple_low]× – [sde_multiple_high]×
Your adjusted multiple range: [adjusted_low]× – [adjusted_high]×
Applied to your SDE of $[annual_sde]: $[valuation_low] – $[valuation_high]

Revenue-based estimate (secondary): $[revenue_valuation]
```

### What drives your value up (dynamic, based on inputs)

Show only factors that are positive for the user's specific inputs. If none are positive, omit this section.

Examples:
- "Strong revenue growth signals momentum to buyers — this typically supports a higher multiple"
- "A diversified customer base reduces buyer risk and supports stronger pricing"
- "Low owner involvement makes the business more transferable and more valuable"

### What could reduce your sale price (dynamic, based on inputs)

Show only factors that are risks for the user's specific inputs. Always show at least one — no business is without risk factors.

Examples:
- "High owner involvement is the single most common reason businesses sell below asking price — buyers discount for key-person risk"
- "Customer concentration is a significant deal risk. Buyers and their lenders scrutinize this closely"
- "Declining revenue requires explanation. Sellers who can show a clear reason (one-time event, COVID recovery) fare better than those who cannot"

### Data source citation block

```
Transaction data: BizBuySell Industry Valuation Report, [Quarter] [Year]
Covering [N]+ closed transactions across [X] industry categories.
Source: bizbuysell.com/learning-center/industry-valuation-multiples/
```

This block is mandatory on every result. It is both an E-E-A-T requirement and the product's credibility claim.

---

## Phase 2: What-If Simulation (Post-Result)

After the initial result is displayed, a second interactive layer activates below the result block. This is not a separate page or step — it appears as a continuation of the result, collapsed by default with a clear prompt to expand:

**"See how improving your business could change your valuation →"**

When expanded, the following sliders appear. They operate on the same calculation engine as Phase 1 but allow continuous adjustment rather than discrete selections.

### Slider 1: Owner Involvement Hours

**Label:** "What if you reduced your weekly involvement?"  
**Range:** 60 hours/week (fully owner-dependent) to 5 hours/week (mostly systematized)  
**Starting position:** Set based on Phase 1 owner involvement selection  
**Effect:** Maps linearly across the owner involvement adjustment range (−0.20 to +0.20)  
**Live output:** Valuation range updates in real time as slider moves. The delta is shown: "+$45,000 – +$60,000 vs. current structure"

### Slider 2: Customer Concentration

**Label:** "What if you reduced customer concentration?"  
**Range:** "1 customer = 60% of revenue" to "No customer over 10%"  
**Starting position:** Based on Phase 1 selection  
**Effect:** Maps across the concentration adjustment range (−0.25 to +0.10)  
**Live output:** Same real-time update with delta display

### Slider 3: Revenue Growth Rate

**Label:** "What if revenue grew at a different rate?"  
**Range:** −10%/yr to +30%/yr  
**Starting position:** Based on Phase 1 revenue trend selection  
**Effect:** Maps across the growth adjustment range (−0.25 to +0.30)  
**Live output:** Real-time update with delta

### What-If output display

As sliders move, the primary valuation range updates live. Below it:

```
Current structure: $[original_low] – $[original_high]
With these changes: $[new_low] – $[new_high]
Potential value increase: +$[delta_low] – +$[delta_high]
```

**Purpose of this layer:** Extends dwell time by giving users a concrete financial reason to explore. A business owner who sees their valuation jump $80,000 when they reduce owner involvement has received a planning insight they will remember. This is the site's secondary value proposition beyond the initial number — it functions as a lightweight exit planning tool, not just a valuation snapshot.

---

## Next Steps Module

Appears below the What-If section. Not a lead capture. No email required.

```
What to do with this number:

1. Get a formal valuation
   A certified business appraiser or experienced broker can provide 
   a formal opinion of value for sale, financing, or legal purposes.
   [Link to: "Working with a Business Broker" supporting content page]

2. Understand your deal-readiness
   Most businesses need 12–24 months of preparation to sell at 
   maximum value. [Link to: "How to Prepare Your Business for Sale"]

3. Review your financials
   Buyers and their lenders will scrutinize 3 years of tax returns 
   and P&Ls. [Link to: "Preparing Financials for a Business Sale"]
```

No CTA buttons that look like ads. No "Get a free quote" forms. These are genuine navigational links to supporting content that serves the user.

---

## Technical Requirements

**Rendering:** Client-side JavaScript only. No server round-trips for calculations. The full industry-multiples.json data is loaded once on page load and all calculation happens in the browser. This ensures sub-100ms response on all interactions including slider movement.

**INP target:** All interactions (field entry, button selection, slider movement) must produce visible output update within 100ms. This is a hard requirement, not a goal. If the JS implementation cannot meet this, the implementation is wrong.

**No framework requirement:** The calculator does not require React, Vue, or any heavy framework. Vanilla JS with the JSON data file is sufficient and preferred for load performance. If a framework is used, it must not meaningfully increase Time to Interactive.

**Mobile:** All inputs must be fully functional on mobile. Button-group selects are preferable to dropdowns on mobile for speed of interaction. Currency inputs should trigger numeric keyboard on mobile.

**Accessibility:** All inputs must have proper label associations. Slider inputs must have ARIA attributes. Color alone cannot be the only differentiator for result states.

**No cookies required:** The calculator stores no state between sessions. If the user wants to save their result, they copy the URL.

**URL parameter encoding — two purposes:**

**Purpose 1 — Inbound from industry page micro-calculators (Phase 1, required at launch):** When a user submits the micro-calculator on an industry page, they are sent to the hub with their inputs pre-carried:
`/?industry=hvac-services&sde=165000&revenue=520000`

On arrival, the hub reads these parameters and pre-fills the industry (locked), SDE, and Revenue fields. The user then reviews and completes the remaining inputs (trend, owner-dependence, concentration) before submitting. The hub must **not** auto-submit on arrival — the user must click Calculate consciously after reviewing the pre-filled values.

**Purpose 2 — Shareable/bookmarkable results (Phase 2 enhancement):** When a user completes a full calculation, the URL updates silently (no page reload) to encode all inputs:
`/?industry=hvac-services&sde=165000&revenue=520000&trend=growing-10-20&owner=moderate&concentration=diverse`

This serves two purposes: shareable results (user can send the link to their accountant), and bookmarkable state (user can return to their specific inputs).

---

## What the Calculator Must Not Do

- **Must not require email** to show results at any stage, including the What-If layer
- **Must not use generic multiples** — if the industry JSON data is not loaded or the industry is not selected, the submit button must be disabled, not fall back to a generic 2–4× range
- **Must not show a single number** — always a range. Single-number precision is false precision for this type of estimate
- **Must not display results on a new page** — result appears on the same page as the inputs, maintaining the user's context
- **Must not auto-select any Phase 1 inputs** — the user must make every selection consciously. Pre-selected defaults for revenue trend or owner involvement would produce results that feel wrong to users who didn't notice the default
- **Must not place any ad unit between the input form and the primary result** — the result must be unobstructed. Ad placement begins below the full result block, not before it
- **Must not auto-submit when arriving from a micro-calculator link** — even when URL parameters pre-fill industry, SDE, and revenue, the user must consciously click Calculate after reviewing the remaining inputs

---

## Micro-Calculator Specification (Industry Pages)

The micro-calculator is a lightweight, self-contained component that renders on every industry page in place of the full calculator. It is not a stripped-down version of the full calculator — it is a separate, purpose-built component with a distinct conversion goal: deliver an immediate inline estimate and earn the click-through to the full calculator.

### Purpose

The micro-calculator solves the conflict between two valid requirements:
1. The full calculator must live on a single hub page (SEO architecture requirement)
2. Users convert better when they can interact with a tool on the page they landed on (UX research requirement)

The micro-calculator satisfies both: it delivers genuine, immediate value on the industry page (satisfying the UX requirement) while keeping the full calculation — and all its link equity, behavioral signals, and ad revenue — on the hub (satisfying the SEO requirement).

### Inputs

Two fields only:

**Field 1: Annual SDE**
- Same input spec as the full calculator's Input 2 (currency, integer, USD)
- Label: "Your Annual SDE"
- Inline expander: same "What is SDE?" expandable block as the full calculator — mandatory, same content
- Validation: required, must be greater than zero

**Field 2: Annual Revenue**
- Same input spec as the full calculator's Input 3 (currency, integer, USD)
- Label: "Your Annual Revenue"
- Validation: required, must be greater than zero, must be ≥ SDE

### Calculation Logic

Uses the industry's `sde_multiple_low` and `sde_multiple_high` from `industry-multiples.json` only. No adjustments for trend, owner-dependence, or concentration — those are full-calculator inputs.

```
estimate_low  = SDE × sde_multiple_low
estimate_high = SDE × sde_multiple_high
```

The result is a range, never a single number. The same floor rule applies: no result below 1.0× SDE.

### Output (Inline — No Page Transition)

Rendered immediately below the submit button on the same industry page:

```
~$XXX,000 – $XXX,000

Based on [sde_multiple_mid]× median SDE multiple for [Industry Name]
Source: [transaction_count]+ transactions · BizBuySell

────────────────────────────────────────────────────
This estimate uses the industry median multiple only.
Revenue trend, owner involvement, and customer
concentration are not factored in — these can shift
your actual result by 20–40% in either direction.
────────────────────────────────────────────────────

[Get your full breakdown, What-If analysis, and value drivers →]
```

**Result styling:**
- Dollar range: `--text-result` (40px), `--weight-bold`, `--color-accent` — identical to the full calculator result. The user must feel they have received the product, not a teaser.
- Disclosure text: `--text-xs`, `--color-text-muted`, italic. Visible but not competing with the result.
- CTA: text link (not a second large button), `--color-primary`, `--weight-semibold`, `--text-base`. See `12-VISUAL-DESIGN-SPEC.md` for full component styling.

**Button label:** "Get My Estimate" (not "Calculate" — distinguishes micro from full)

### Transition to Hub

The CTA link carries the user's inputs to the hub via URL parameters:
`/?industry=[slug]&sde=[value]&revenue=[value]`

On arrival at the hub:
- Industry field: pre-filled from `industry` param, locked (greyed), "Showing [Industry Name] data — change industry?"
- SDE field: pre-filled from `sde` param
- Revenue field: pre-filled from `revenue` param
- Remaining inputs (trend, owner-dependence, concentration): visible and empty — user must select consciously
- A sub-label appears above the Calculate button: "Complete your details to refine your estimate"
- The hub does **not** auto-submit

### Why the Hub Result May Differ From the Inline Estimate

The inline estimate uses the median multiple only. The full hub result adjusts for trend, owner-dependence, and concentration, which can move the result 20–40% in either direction. The hub result block includes this explanatory line:

> "Your estimate reflects adjustments for revenue trend, owner involvement, and customer concentration — factors that move the base [X.Xx×] multiple up or down from the industry median."

This prevents the user from feeling misled when the numbers differ.

### What the Micro-Calculator Must Not Do

- Must not require any input beyond SDE and Revenue
- Must not show a single number — always a range
- Must not open results on a new page — inline only
- Must not be presented as equivalent to the full calculator — the disclosure is mandatory
- Must not load the full calculator JS bundle — the micro-calculator is a standalone ~40-line vanilla JS component that reads only the two relevant fields from `industry-multiples.json`
- Must not place an ad unit between the input and the inline result

### Build Verification (Micro-Calculator)

- [ ] Inline estimate renders on the same page without navigation
- [ ] Estimate uses correct `sde_multiple_low` and `sde_multiple_high` for the page's industry
- [ ] Floor rule applies (no result below 1.0× SDE)
- [ ] Revenue ≥ SDE validation fires correctly
- [ ] CTA link carries correct URL parameters to hub
- [ ] Hub correctly pre-fills industry (locked), SDE, and revenue from URL params
- [ ] Hub does not auto-submit on arrival
- [ ] Disclosure text renders on every result
- [ ] BizBuySell citation is visible and linked in the inline result
- [ ] Component loads without the full calculator JS bundle

---

## Validation Checklist (Build Verification)

Before considering the calculator complete, verify each of the following:

- [ ] HVAC business with $165,000 SDE, flat revenue, moderate owner involvement, diverse customers returns range of approximately $330,000–$511,500
- [ ] Same inputs with declining revenue and high owner involvement returns a meaningfully lower range
- [ ] Same inputs with strong growth and low owner involvement returns a meaningfully higher range
- [ ] Restaurant industry returns a different multiple range than HVAC (restaurant ~2.0–2.5×, HVAC ~2.3–3.1×)
- [ ] Car wash returns a significantly higher multiple range (~4.0–5.0×)
- [ ] Floor rule: no result returns a low estimate below 1.0× SDE regardless of negative factors
- [ ] Revenue validation fires when SDE > Revenue
- [ ] Industry field pre-fills and locks correctly when hub is reached via micro-calculator URL params
- [ ] Hub does not auto-submit when arriving from micro-calculator URL params
- [ ] URL parameters encode correctly after full calculation and decode correctly on reload
- [ ] What-If sliders update valuation in real time without page reload
- [ ] All inputs accessible via keyboard only
- [ ] Mobile: all inputs functional on iOS Safari and Android Chrome
- [ ] INP: slider movement produces visible output update within 100ms
- [ ] No ad unit appears between form and result

- [ ] Data source citation appears on every result
