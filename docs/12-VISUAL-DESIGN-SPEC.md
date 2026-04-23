# 12 — Visual Design Specification

**Read before:** Writing any HTML, CSS, or JS. Applies to every page type.  
**Authority:** This file fills the gap left intentionally open by docs 01–11. Those files specify structure, data, copy, and SEO. This file specifies the complete visual language — color, typography, spacing, component styling, and interaction states — that determines whether the product feels credible, trustworthy, and worth reading to a 47-year-old HVAC shop owner who arrived from a Google search and has 90 seconds to decide whether to continue.

---

## The Single Design Mandate

This site has one job visually: **eliminate doubt**.

The user is a small business owner considering a sale — the biggest financial transaction of their life. They are not browsing. They are evaluating. Within 50–100 milliseconds of landing, before reading a word, their nervous system has already answered: "Does this feel like something I can trust?" The visual system controls that answer entirely.

The correct visual register is: **serious, data-forward, clean, American financial services.** Not flashy. Not startup-y. Not broker-marketing-page. The nearest reference points are a well-designed SBA lender site, a regional accounting firm's web presence, or the editorial pages of Forbes. The difference between this and a generic finance site is precision — every element must feel like it was placed with purpose.

Deviation from this register in either direction is harmful:
- Too slick/modern (purple gradients, hero animations, "free" badges) → looks like a lead gen trap → user leaves
- Too plain/bare (no visual hierarchy, generic system fonts, white-grey-blue defaults) → looks amateurish → user doesn't trust the data

---

## Color System

### Palette

```css
:root {
  /* Primary — Dark Navy */
  --color-primary:        #1B2B4B;   /* Main brand color. Used: nav, H1, key labels */
  --color-primary-light:  #243660;   /* Hover states, secondary headers */

  /* Accent — Forest Green */
  --color-accent:         #1E6B45;   /* CTAs, result dollar amounts, positive value signals */
  --color-accent-hover:   #175938;   /* Button hover */
  --color-accent-light:   #EAF5EE;   /* Result card background tint, SGE summary block */

  /* Neutral Scale */
  --color-bg:             #FAFAF8;   /* Page background — off-white, not pure white */
  --color-surface:        #FFFFFF;   /* Card and calculator background */
  --color-border:         #E2E4E8;   /* All borders, dividers */
  --color-text-primary:   #111827;   /* Body copy, input values */
  --color-text-secondary: #4B5563;   /* Help text, secondary labels, source citations */
  --color-text-muted:     #9CA3AF;   /* Placeholder text, disabled states */

  /* Functional */
  --color-warning-bg:     #FFFBEB;   /* Soft warning states (implausibly high SDE) */
  --color-warning-text:   #92400E;
  --color-error-bg:       #FEF2F2;
  --color-error-text:     #991B1B;
  --color-data-cite:      #1B2B4B;   /* BizBuySell citation block — same as primary, distinct weight */
}
```

### Why This Palette (Rationale Claude Code Must Understand)

**Navy primary:** Research across financial services sites consistently shows dark navy as the highest-trust primary color for US financial audiences. It reads as institutional, authoritative, and permanent — not trendy. This is the color language of Morgan Stanley, Charles Schwab, Fidelity. The user does not need to consciously process it; they have a lifetime of trained association between dark navy and financial credibility.

**Forest green accent:** Green carries two simultaneous signals that are exactly right for this product: money (the cultural association is direct and visceral for US users) and growth/positive outcome. It is used specifically and only for the result dollar range, primary CTAs, and positive value signals — the moments that reward the user. It must not appear in navigation, body copy, or structural elements. Overuse destroys the reward signal.

**Off-white background (#FAFAF8):** Pure white (#FFFFFF) reads as clinical and creates visual fatigue on long-read pages. Off-white is warmer and signals content quality — it is the paper choice of serious publications. Research from Crazy Egg's financial design analysis found that more whitespace increases trust on financial sites; this background supports that effect.

**Color-blind safety:** The palette above uses blue-green contrast, not red-green. All functional states (warning, error) additionally use text and icons, never color alone, per WCAG accessibility requirements and the `02-CALCULATOR-SPEC.md` accessibility rule.

### Color Usage Rules

1. **The result dollar range is always rendered in `--color-accent`.** This is the money signal. It is the only element on the page that uses this color at large size.
2. **No gradient backgrounds.** Gradients on financial tools signal marketing, not data. Every background is a solid color from the palette above.
3. **The SGE summary block background is `--color-accent-light`.** This light green tint is the only colored background block allowed on industry pages — it visually separates the AI-extraction target section from prose content.
4. **Navigation background is `--color-primary`.** Dark nav with white text. No transparent or white nav.
5. **Ad unit reserved spaces use `--color-bg`.** Never a border or "ad placeholder" visual treatment that makes the ad look like a broken element.

---

## Typography

### Font Stack

```css
/* Display / H1 only */
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');

/* All other text */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

:root {
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body:    'DM Sans', system-ui, -apple-system, sans-serif;
}
```

### Why This Pairing

**DM Serif Display (H1 only):** Serifs carry a specific signal for US financial content audiences: tradition, stability, serious expertise. This is why the Wall Street Journal, Financial Times, Bloomberg, and most print-heritage financial publications use serif for large display text. DM Serif Display is the right serif for this product specifically because it is high-legibility (large x-height, open counters), modern-optimized (designed for screen, not print), and authoritative without being stuffy. The DM family pairing (Display + Sans) creates a single-family visual identity with different emotional registers by size.

**DM Sans (everything else):** Every body copy, label, input, button, and secondary heading uses DM Sans. Reasons: (a) screen-optimized legibility at all sizes down to 12px, (b) tabular numeral support — critical for a calculator site displaying dollar ranges, (c) neutral warmth that matches DM Serif Display's character, (d) variable font support means one file handles all weights, minimizing load cost. The serif-for-display, sans-for-body split is the same approach used by high-conversion financial SaaS (Stripe Docs, Mercury Bank, Brex).

**Note on Inter:** Inter is excluded despite being technically excellent because it is used on approximately 40% of all financial tool sites currently. The user has seen it thousands of times; it carries no distinctive identity signal. DM Sans has equivalent performance characteristics and creates identity differentiation.

### Type Scale

```css
:root {
  /* Scale */
  --text-xs:   0.75rem;   /* 12px — citations, legal notes */
  --text-sm:   0.875rem;  /* 14px — help text, secondary labels, mobile body */
  --text-base: 1rem;      /* 16px — body copy, inputs, buttons */
  --text-lg:   1.125rem;  /* 18px — intro paragraphs, calculator labels */
  --text-xl:   1.25rem;   /* 20px — H3, section intros */
  --text-2xl:  1.5rem;    /* 24px — H2 */
  --text-3xl:  1.875rem;  /* 30px — H1 on industry/guide pages */
  --text-4xl:  2.25rem;   /* 36px — H1 on hub/homepage */
  --text-result: 2.5rem;  /* 40px — The valuation dollar range output */

  /* Leading */
  --leading-tight:  1.25;  /* Headings */
  --leading-snug:   1.375; /* Subheadings, calculator labels */
  --leading-normal: 1.5;   /* Body copy */
  --leading-relaxed:1.625; /* Long-form guide content */

  /* Weights */
  --weight-normal:   400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;
}
```

### Critical Typography Rules

1. **The result dollar range uses `--text-result` (40px), `--font-body`, `--weight-bold`, `--color-accent`.** This is the single largest, most prominent text on any industry page. Nothing should compete with it in size or visual weight.
2. **H1 on all pages uses `--font-display` (DM Serif Display).** H2 and below use `--font-body` (DM Sans).
3. **Minimum body font size: 16px (`--text-base`).** The target user skews 45–65 years old — small business owners considering a sale are statistically in mid-career or late-career. Readability at this demographic means no body text below 16px. This also aligns with the 24% form conversion improvement documented in research on font-size and readability.
4. **Line length: 60–75 characters for body copy.** Use `max-width: 68ch` on prose containers. This is the research-validated optimal reading range for comprehension and scanning.
5. **No all-caps body text.** All-caps beyond very short labels (3–4 words) degrades readability and creates formality that conflicts with the copy spec's conversational voice.
6. **Tabular figures for all numbers:** All currency display, SDE multiples, and result ranges must use tabular numerals (`font-variant-numeric: tabular-nums`). This keeps columns aligned in comparison tables and prevents visual jitter as numbers change in the What-If slider.

---

## Spacing System

```css
:root {
  --space-1:   0.25rem;   /* 4px */
  --space-2:   0.5rem;    /* 8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-5:   1.25rem;   /* 20px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-10:  2.5rem;    /* 40px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-20:  5rem;      /* 80px */
  --space-24:  6rem;      /* 96px */
}
```

**Section spacing:** Top-level page sections are separated by `--space-16` (64px) on desktop, `--space-12` (48px) on mobile. This whitespace is a trust signal — generous spacing communicates that the content is not competing for attention, which signals quality and editorial confidence.

**Internal card spacing:** All cards and the calculator container use `--space-8` (32px) padding on desktop, `--space-6` (24px) on mobile.

---

## Component Specifications

### Navigation

```
Background:     --color-primary (#1B2B4B)
Height:         60px desktop, 56px mobile
Logo area:      Left-aligned. Site name in --font-display, 20px, white.
Nav links:      --font-body, 14px, --weight-medium, white, opacity 0.85
Nav link hover: opacity 1.0, underline
Active link:    white, opacity 1.0, border-bottom 2px --color-accent
No sticky nav:  The calculator is the product. Do not use sticky/fixed nav.
               It consumes vertical space and creates scroll complexity with the
               calculator form.

Mobile navigation (< 768px):
  Trigger:      Hamburger icon — right-aligned in nav bar. 3 horizontal lines,
                white, 24px hit area minimum. Tap toggles drawer.
  Drawer:       Slides in from right. Width: min(280px, 85vw).
                Background: --color-primary. Full viewport height.
                z-index: 1000 (above all page content).
  Scroll lock:  <body> overflow hidden while drawer is open — prevents
                background page scrolling.
  Close:        (1) Tap the X button (top-right of drawer, same icon size as
                hamburger). (2) Tap the overlay (semi-transparent black,
                opacity 0.5, covers remaining viewport). Either closes drawer
                and restores scroll.
  Drawer links: Stacked vertically. --text-base, --weight-medium, white.
                padding: --space-4 --space-6 per link. Border-bottom
                1px rgba(255,255,255,0.1) between links.
  Industries:   Accordion within drawer. Tap "Industries" expands a nested
                list of 11 category links. Chevron icon rotates 180deg on open.
  Transition:   Drawer slides in at 250ms ease. Overlay fades in at 200ms.
                No animation on initial page load — only on user trigger.
```

### Calculator Container

```
Background:     --color-surface (#FFFFFF)
Border:         1px solid --color-border
Border-radius:  8px
Shadow:         0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)
               (Subtle depth that lifts the calculator off the page background
               without the shadow becoming decorative. No colored shadows.)
Padding:        --space-8 (32px) desktop, --space-6 (24px) mobile
Max-width:      720px, centered
Margin:         0 auto
```

### Form Inputs

```
Height:         48px (meets WCAG 44px minimum touch target with margin)
Border:         1px solid --color-border
Border-radius:  6px
Background:     --color-surface
Font:           --font-body, --text-base, --color-text-primary
Padding:        12px 14px
Font-size (mobile): font-size must be explicitly set to 16px (1rem) on all
               <input>, <select>, and <textarea> elements on mobile viewports.
               iOS Safari auto-zooms the page when any input has font-size
               below 16px. This zoom is disorienting on a calculator form and
               cannot be prevented via viewport meta alone. Explicitly set:
               input, select, textarea { font-size: 16px; }
               Do not rely on the inherited --text-base value — declare it
               directly on the element selectors to guarantee iOS compliance.

Focus state:
  Border:       2px solid --color-primary
  Outline:      none (border replaces outline)
  Shadow:       0 0 0 3px rgba(27,43,75,0.12)

Error state:
  Border:       1px solid #DC2626
  Background:   --color-error-bg
  Error text:   --text-sm, --color-error-text, displayed below input

Disabled/locked (pre-filled industry on industry pages):
  Background:   #F3F4F6
  Text:         --color-text-secondary
  Border:       1px solid --color-border
  Cursor:       not-allowed
  Note text:    "Showing [Industry Name] data — change industry?"
                Displayed below in --text-sm, --color-text-secondary

Label:          --font-body, --text-sm, --weight-semibold, --color-text-primary
                Displayed above input, margin-bottom --space-2
Help tooltip:   ⓘ icon after label.
  Desktop:      On hover — floating white card, 1px border, --text-sm,
                max-width 260px. Dismisses on mouse-out.
  Mobile:       On tap — inline expansion directly below the label in normal
                document flow. Same text, same styling as desktop card but
                rendered inline. Second tap collapses. No floating element —
                floating tooltips are unreliable on mobile (obscured by
                keyboard, no hover-out to dismiss). Do not use title attribute
                as a tooltip substitute — it does not render on touch devices.
```

### Sliders (Owner-Dependence, Growth Trend)

```
Track:          --color-border, 4px height, border-radius 2px
Fill:           --color-primary, same dimensions
Thumb:          18px circle, --color-primary, 2px white border, box-shadow
                On hover: scale(1.15) transform
ARIA:           role="slider", aria-valuemin, aria-valuemax, aria-valuenow,
                aria-label required. See 02-CALCULATOR-SPEC.md.
Step labels:    Text below slider. --text-xs, --color-text-secondary.
                Left-aligned "Low" right-aligned "High" or equivalent.
```

### Calculate Button

```
Background:     --color-accent (#1E6B45)
Hover:          --color-accent-hover (#175938)
Text:           White, --font-body, --text-base, --weight-semibold
Height:         52px
Width:          Full width of calculator container
Border-radius:  6px
Transition:     background-color 150ms ease, transform 100ms ease
Active:         scale(0.99) transform (tactile press feedback)
Loading state:  Replace label text with spinner + "Calculating…"
               Spinner is white, 20px, CSS animation only
```

### Result Block

This is the most important component on the site. Every design decision here must serve the moment of value delivery.

```
Container:
  Background:   --color-accent-light (#EAF5EE)
  Border:       1px solid rgba(30,107,69,0.2)
  Border-radius: 8px
  Padding:      --space-8

Primary range display:
  Label:        "Estimated Business Value" — --text-sm, --weight-semibold,
                --color-text-secondary, letter-spacing 0.05em, all-caps
                (This is the exception to the no-all-caps rule — short label,
                establishes the section identity)
  Value:        "$XXX,000 – $XXX,000" — --text-result (40px), --weight-bold,
                --color-accent, --font-body, tabular-nums
                This is the single most prominent text on the page.
  Median line:  "Median estimate: $XXX,000" — --text-base, --weight-medium,
                --color-text-secondary, below the range

Multiple display:
  "Based on [X.Xx]× SDE multiple for [Industry Name]"
  --text-sm, --color-text-secondary

Data citation (mandatory):
  Border-top:   1px solid rgba(30,107,69,0.15), margin-top --space-4
  Content:      "Based on [N] transactions. Source: BizBuySell [Year] data."
  Style:        --text-xs, --color-text-secondary
  BizBuySell:   Must be a hyperlink to bizbuysell.com (opens new tab)
```

### Micro-Calculator Component (Industry Pages Only)

The micro-calculator is a distinct component from the full calculator. It is lighter, narrower, and purpose-built to deliver one thing: an immediate inline estimate that earns the click-through to the hub. Its visual language must match the full calculator closely enough that the user experiences continuity when they arrive at the hub — not a jarring brand shift.

```
Container:
  Background:   --color-surface (#FFFFFF)
  Border:       1px solid --color-border
  Border-radius: 8px
  Shadow:       0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)
  Padding:      --space-8 (32px) desktop, --space-6 (24px) mobile
  Max-width:    560px (narrower than full calculator — 2 inputs only)
  Margin:       0 auto

Label above container:
  "[Industry Name] Valuation Estimate"
  --text-sm, --weight-semibold, --color-text-secondary
  letter-spacing 0.05em, uppercase (same as result block label)

Inputs (SDE + Revenue):
  Identical styling to full calculator inputs.
  Stack vertically on all viewports.
  SDE field first, Revenue field second.

Button: "Get My Estimate"
  Identical styling to full calculator Calculate button.
  Full width of container.

────────────────────────────────
INLINE RESULT (renders in-place, no page change)
────────────────────────────────

Result dollar range:
  "~$XXX,000 – $XXX,000"
  --text-result (40px), --weight-bold, --color-accent
  tabular-nums
  The tilde (~) prefix is mandatory — it visually signals approximation
  and distinguishes this estimate from the precise hub result.

Sub-label:
  "Based on [X.Xx]× median SDE multiple for [Industry Name]"
  --text-sm, --color-text-secondary

Citation line:
  "Source: [transaction_count]+ transactions · BizBuySell"
  --text-xs, --color-text-secondary
  BizBuySell hyperlinked (opens new tab)

Divider:
  1px solid --color-border, margin --space-4 vertical

Disclosure text:
  "This estimate uses the industry median multiple only.
   Revenue trend, owner involvement, and customer concentration
   are not factored in — these can shift your result by 20–40%."
  --text-xs, --color-text-muted, font-style: italic

CTA link:
  "Get your full breakdown, What-If analysis, and value drivers →"
  --text-base, --weight-semibold, --color-primary
  text-decoration: underline on hover
  display: block, margin-top --space-4
  NOT a button — a styled text link. One Calculate button per page.
```

**Reveal animation:** The inline result fades in at 250ms opacity transition — identical to the full calculator result reveal. This creates visual continuity for users who later use the hub.

**Mobile behavior:** Identical to full calculator. Currency inputs trigger numeric keyboard. Both inputs full-width stacked.

### SGE Summary Block

This section receives its own distinct styling per `04-PAGE-TEMPLATES.md`.

```
CSS class:      .sge-summary-block (as specified in 04)
Background:     --color-accent-light
Border-left:    4px solid --color-accent
Border-radius:  0 6px 6px 0
Padding:        --space-6
Margin:         --space-8 0
Font:           --text-base, --leading-normal

Mobile collapse (< 768px):
  The SGE summary block renders 4 data rows plus text on desktop and
  consumes ~140px — enough to push the micro-calculator below the fold on
  a 375px screen.
  On mobile, collapse the block to a single summary line:
    "[Industry Name]: [sde_multiple_low]x – [sde_multiple_high]x SDE median"
    --text-sm, --weight-semibold, --color-primary
  with a "See full data ▾" toggle that expands the complete block inline.
  Collapsed state height: ~44px. This keeps the micro-calculator inputs
  visible within the first scroll on all mobile viewports.
  The collapsed line is crawlable text — not hidden via display:none.
  Use max-height CSS transition (0 → auto via JS class toggle) rather than
  display:none/block, so the content remains in the DOM for crawlers.
```

This visual treatment communicates: "this is the direct answer, extracted for you." The border-left with accent color is a standard visual pattern for pull-quotes and key passages — users have a trained association between this treatment and "important, read this first."

### Data Tables (Comparison, Market Context)

```
Border:         1px solid --color-border
Border-radius:  8px (on container, overflow hidden)
Header row:     Background --color-primary, text white, --text-sm, --weight-semibold
                Padding: --space-3 --space-4
Body rows:      Alternating --color-surface / #F9FAFB
                Padding: --space-3 --space-4, --text-sm, --color-text-primary
Number cells:   tabular-nums, text-align right
Hover row:      Background #F0F4FF (very light blue — does not conflict with accent green)
Mobile:         Horizontal scroll wrapper. Do not collapse table columns.
```

### Ad Unit Reserved Spaces

```
Ad Unit 1 (post-result):
  Container:    Background --color-bg, no border, no label
  Reserved:     min-height: 280px on mobile, min-height: 100px on desktop
  Margin:       --space-8 above (after context sentence), --space-8 below

Ad Unit 2 (mid-page):
  Same treatment. min-height: 280px mobile, 100px desktop.

Ad Unit 3 (guide pages only):
  Same treatment.

The "reserved space" approach prevents CLS (required by Core Web Vitals)
while not drawing attention to the ad placement before the ad loads.
Never label the space "Advertisement" before load.
After load: Google AdSense renders its own "Sponsored" label.
```

### Footer

```
Background:     --color-primary
Text:           White, opacity 0.7 for secondary links, opacity 1.0 for primary
Padding:        --space-12 0
Structure:      3-column grid desktop, stacked mobile
Columns:        Site name + tagline | Page links | Methodology + Privacy + About
Bottom bar:     Border-top 1px rgba(255,255,255,0.1)
               "© [Year] [Domain] · Not a formal appraisal · Data: BizBuySell"
               --text-xs, opacity 0.5
```

---

## Page Layout Structure

### Hub / Homepage

```
[NAV — full width, --color-primary background]
[HERO — white background]
  H1 (DM Serif Display, 36px) — max-width 600px
  Subhead (DM Sans, 18px, --color-text-secondary) — max-width 520px
  No hero image. No illustration.

[CALCULATOR — centered, max-width 720px]
  Full calculator per 02-CALCULATOR-SPEC.md
  Desktop: all six fields visible simultaneously. Above-the-fold on desktop.
  Mobile: progressive disclosure — Stage 1 (Industry + SDE + Revenue) visible
  on load with Calculate button in view. Stage 2 (Trend + Owner + Concentration)
  reveals after SDE is entered. See 02-CALCULATOR-SPEC.md mobile progressive
  disclosure spec for full behaviour.

[AD UNIT 1 — post-result, appears only after calculation]
[WHAT-IF SECTION — below calculator]
[AD UNIT 2 — below What-If]
[NEXT STEPS / INTERNAL LINKS]
[FOOTER]
```

### Industry Pages

```
[NAV]
[PAGE HEADER — white background, --space-12 top padding]
  Breadcrumb — --text-sm, --color-text-secondary
  H1 (DM Serif Display) — max-width 680px

[SGE SUMMARY BLOCK — .sge-summary-block styling]
[MICRO-CALCULATOR COMPONENT — see spec below]
[AD UNIT 1 — post-micro-result only, trigger: after user submits]
[NEXT STEPS MODULE]
[AD UNIT 2 — below next steps, below fold]
[MARKET CONTEXT SECTIONS — prose + table]
[VALUE DRIVERS — what increases / what reduces]
[RELATED INDUSTRIES — link block]
[FOOTER]
```

**Note:** The What-If Simulation section is not present on industry pages. It is part of the full calculator experience at the hub. The micro-calculator CTA explicitly names it: "Get your full breakdown, What-If analysis, and value drivers →".

**Single-column layout on industry pages.** No sidebar. The ad units are inline, not sidebar.

### Guide Pages

```
[NAV]
[ARTICLE HEADER — white background]
  Breadcrumb
  H1 (DM Serif Display, 30px)
  Meta line: "Updated [Month Year] · X min read" — --text-sm, --color-text-secondary

[ARTICLE BODY]
  Max-width: 720px, centered
  Body text: --text-base, --leading-relaxed (1.625)
  H2: DM Sans, --text-2xl, --weight-bold, --color-primary, margin-top --space-12
  H3: DM Sans, --text-xl, --weight-semibold, --color-primary, margin-top --space-8

[AD UNIT — mid-content, after first major section]
[CONTINUED ARTICLE BODY]
[FAQ SECTION — structured per 04-PAGE-TEMPLATES.md]
[RELATED READING]
[AD UNIT — post-content]
[FOOTER]
```

---

## Responsive Breakpoints

```css
/* Mobile-first. All base styles target mobile. */
/* Tablet */
@media (min-width: 768px) { ... }
/* Desktop */
@media (min-width: 1024px) { ... }
/* Wide */
@media (min-width: 1280px) { ... }

/* Content max-width: 1200px, centered with auto margins */
/* Calculator max-width: 720px at all breakpoints */
/* Prose max-width: 720px at all breakpoints */
```

**Mobile behavior specifics:**
- Hub calculator: progressive disclosure per `02-CALCULATOR-SPEC.md` — Stage 1 fields (Industry + SDE + Revenue) visible on load, Stage 2 (Trend + Owner + Concentration) reveals after SDE entry. Calculate button always in view.
- Industry page: SGE summary block collapses to single line on mobile, expanding on tap. Micro-calculator inputs visible within first scroll on all viewports ≥ 320px.
- Calculator inputs stack vertically, full-width
- Sliders become full-width with larger thumb size (24px) for touch accuracy
- Result dollar range: reduce to 32px (--text-3xl) on screens < 375px
- Navigation collapses to hamburger at < 768px per full spec above
- Tables: horizontal scroll wrapper, never collapse to stacked layout (numeric data loses meaning when column relationships break)
- All `<input>`, `<select>`, `<textarea>` elements: explicit `font-size: 16px` — prevents iOS Safari auto-zoom on focus

---

## Interaction and Animation Rules

**Guiding principle: function over decoration.** Every animation must either (a) communicate state change, or (b) guide attention. Decorative animation adds load cost and creates a marketing register that undermines trust.

**Permitted interactions:**

1. **Result reveal:** When the user submits the calculator and results appear, the result block fades in over 250ms (`opacity: 0 → 1`). No slide, no bounce, no count-up animation on the numbers. The fade-in signals "new content arrived" without theatricality.

2. **Input focus states:** The focus ring (described above) appears immediately on focus — no transition delay. Instant feedback is required per the 100ms INP target in `02-CALCULATOR-SPEC.md`.

3. **Button press feedback:** `transform: scale(0.99)` on `active` state, 100ms. Tactile without being theatrical.

4. **Slider thumb hover:** `scale(1.15)` transform, 150ms transition. Makes the interactive element feel responsive.

5. **Tooltip appear/disappear:** 150ms fade.

**Not permitted:**

- Page load animations or entrance animations on any element
- Number count-up animations on the result dollar range (they look impressive but delay value delivery and the NNG research is unambiguous: users want immediate results, not performance)
- Scroll-triggered reveal animations on content sections
- Hover effects on the navigation items beyond the underline/opacity change specified above
- Any animation that causes layout shift

---

## Trust Signal Visual Treatment

Trust signals are embedded throughout the layout through visual design, not just copy. Claude Code must understand why each of these decisions communicates credibility:

**1. The data citation in the result block** (BizBuySell hyperlink) must be visually legible — `--text-xs` is the minimum, never smaller. Linking to the data source is a credibility signal. If it's so small users can't see it, it stops functioning as a signal.

**2. The methodology footnote under every result** ("This is an estimate based on market data. It is not a formal appraisal.") uses `--text-xs`, `--color-text-muted`. Visible but not prominent. The copy spec's direction about honest limitation statements applies here: this sentence builds trust precisely because it limits the claim. Never hide it.

**3. No testimonials, star ratings, or "trust badges."** This site's trust comes from data precision, not social proof. A "4.8/5 stars" badge on a valuation tool signals that the site is trying to sell something. The entire design must communicate: "this is a data resource, not a marketing page."

**4. BizBuySell citation visibility:** Per the non-negotiables in README.md, BizBuySell appears visibly on every data-using page. Visually, the source line in the result block and the footnote in the data citation section of industry pages must render at a size a human can actually read. This is both an ethical requirement and a trust amplifier — external data attribution signals that the site isn't making numbers up.

---

## What Claude Code Must Not Do

These are visual-design-specific prohibitions derived from the same logic as the non-negotiables in README.md:

1. **Do not use purple, teal, or orange as any primary or accent color.** These color choices signal startup/SaaS/marketing. The user population is small business owners, not tech adopters. The visual register must match the audience.

2. **Do not add hero images, illustrations, or stock photography.** This is a data tool, not a marketing site. Imagery adds load cost, creates a marketing register, and competes with the calculator for attention above the fold.

3. **Do not use card hover-lift effects (translateY box-shadow animations) on content cards.** These are a strong SaaS/product marketing visual signal. They are inappropriate on content pages where the user is reading data, not shopping features.

4. **Do not use gradient backgrounds anywhere on the site.** Single exception: if a future brand update is specifically approved, that approval goes through this document.

5. **Do not implement dark mode.** The user base (small business owners 40–65) skews heavily toward light mode usage. Dark mode implementation adds CSS complexity, has unpredictable effects on ad rendering, and is not tested for this product. If a user's OS is in dark mode, the site renders in light mode via `color-scheme: light` on `<html>`.

6. **Do not add social sharing buttons or "like" counts anywhere.** These create a social-media register that undermines the editorial authority the design is trying to establish.

7. **Do not make the result dollar range smaller than 32px on any viewport.** This is the product's core delivery moment. It must be unmissable.

---

## Performance Constraints (Visual System)

All visual decisions must be compatible with Core Web Vitals targets:

- **Fonts:** Load DM Serif Display and DM Sans via Google Fonts with `display=swap`. Subset to Latin only (`&subset=latin`). Use `<link rel="preconnect" href="https://fonts.googleapis.com">` and preload the two font files.
- **No web font for body copy fallback:** System font stack (`system-ui, -apple-system, sans-serif`) must produce an acceptable rendering while web fonts load.
- **No CSS framework:** Do not use Tailwind, Bootstrap, or any CSS framework. Write scoped CSS using the variables defined above. Frameworks add 30–80KB of unused styles.
- **CSS custom properties** (as defined throughout this document) are the entire design token system. No SASS/SCSS required.
- **Shadow complexity:** Box shadows are limited to 2 layers maximum (as specified in the calculator container above). Do not add blur-radius above 16px or spread above 4px anywhere on the site.
- **Image use:** If an image ever becomes necessary (unlikely), use WebP format, `loading="lazy"`, and explicit `width`/`height` attributes.

---

## Build Verification Checklist

Before any page passes its publish gate, the following visual conditions must be true:

- [ ] H1 renders in DM Serif Display at the correct size
- [ ] Body copy renders in DM Sans at minimum 16px
- [ ] Result dollar range is in --color-accent (#1E6B45), minimum 32px, bold
- [ ] BizBuySell citation is visible and hyperlinked in the result block
- [ ] Page background is --color-bg (#FAFAF8), not pure white
- [ ] Navigation background is --color-primary (#1B2B4B)
- [ ] No gradient backgrounds anywhere
- [ ] No hero imagery
- [ ] Ad unit spaces are reserved with correct min-height (CLS prevention)
- [ ] All inputs have associated labels (not placeholder-only)
- [ ] Color contrast passes WCAG AA (4.5:1 for body text, 3:1 for large text)
- [ ] Focus states are visible on all interactive elements
- [ ] Font size does not drop below 12px anywhere on the page
- [ ] Tabular-nums applied to all numeric displays

**Mobile checks (verify on real device or 375px viewport — not DevTools simulation only):**
- [ ] Viewport meta tag present in `<head>` on every page
- [ ] Page does not render at desktop width on mobile (no horizontal scroll on body)
- [ ] No input, select, or textarea triggers iOS Safari auto-zoom on tap (font-size: 16px confirmed)
- [ ] Hub: Stage 1 fields and Calculate button visible without scrolling on 375px screen
- [ ] Hub: Stage 2 fields reveal correctly after SDE entry
- [ ] Industry page: SGE summary block collapses to single line on < 768px
- [ ] Industry page: micro-calculator inputs and submit button visible within first scroll on 375px
- [ ] Tooltip/help text expands inline on mobile tap (no floating card)
- [ ] Nav hamburger opens correctly; drawer closes via X and overlay tap; background scroll locked while open
- [ ] Sliders are operable by touch (24px thumb, full-width track)
- [ ] Tables scroll horizontally rather than overflowing or collapsing

**Industry pages — micro-calculator additional checks:**
- [ ] Micro-calculator container max-width 560px, visually distinct from but consistent with full calculator
- [ ] Inline result dollar range prefixed with tilde (~) to signal approximation
- [ ] Disclosure text renders in --text-xs, italic, --color-text-muted
- [ ] CTA is a text link, not a second button
- [ ] No ad unit renders between the inputs and the inline result
- [ ] Ad Unit 1 space is reserved but hidden until user submits

---

*This document is the authority on all visual decisions. If a visual question is not answered here, the answer is: default to the principle of "serious, data-forward, trust-first" and match the closest analogous component specification above.*
