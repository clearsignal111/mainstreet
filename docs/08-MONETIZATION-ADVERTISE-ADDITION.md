# Addition to 08-MONETIZATION.md — `/advertise/` Page Spec

Add this section to `08-MONETIZATION.md` after the AdSense Approval Path section.

---

## The `/advertise/` Page

### Why It Exists

The `/advertise/` page is not a near-term revenue mechanism — it is a professional entity signal that costs one hour to build and pays indefinitely. Its functions:

1. **Google quality rater signal.** A site with a clean `/advertise/` page reads as a professional publishing entity. A site without one reads as a hobbyist tool or thin affiliate site. Quality raters use it as a proxy for organizational legitimacy, even if they never contact you.

2. **Future direct partner path.** Once the site hits 10,000+ monthly sessions, business brokers, SBA lenders, and M&A advisors will search for direct advertising options to avoid AdSense's CPC auction. The page makes that path exist before it is needed.

3. **E-E-A-T reinforcement.** The page demonstrates that the site has a defined, professional commercial relationship with its advertising ecosystem — distinct from a site that just dropped an AdSense tag in and called it monetized.

4. **Zero downside.** It is a static page. It does not affect ad revenue, page speed, or any other metric negatively.

### Page Structure

**URL:** `/advertise/`
**Title:** `Advertise With [Brand Name] — Reach Business Owners Considering a Sale`
**Meta description:** `[Brand Name] reaches [X]+ monthly business owners actively researching their business's value. Advertising options for business brokers, SBA lenders, M&A advisors, and acquisition financing platforms.`
**Schema:** None required beyond the standard site-wide Organization schema inherited from the hub.
**Index:** Yes — indexable. Do not noindex this page.

**Template:**

```
[SECTION: H1]
"Advertise With [Brand Name]"

[SECTION: Audience]
H2: "Our Audience"
- Who visits: small business owners aged 45–65 actively researching their 
  business's sale value. Not tire-kickers — users who have entered their 
  SDE and revenue into a valuation calculator.
- Volume: [Current monthly sessions] monthly sessions — update this number 
  quarterly as traffic grows. In month 1, use "Growing — contact us for 
  current figures."
- Intent: High. The user has received a specific dollar valuation and is 
  actively considering next steps, which may include working with a broker, 
  securing SBA financing, or hiring an M&A advisor.

[SECTION: Advertiser Categories]
H2: "Who Advertises Here"
- Business brokers and intermediaries seeking qualified seller leads
- SBA lenders and acquisition financing platforms
- M&A advisors and wealth managers serving business owners
- Business valuation appraisers offering formal opinions of value
- Exit planning services and financial advisors

[SECTION: Current Ad Inventory]
H2: "Current Advertising"
Short statement: "[Brand Name] currently monetizes through Google AdSense 
contextual display advertising. Direct advertising partnerships are 
available for qualified partners — contact us to discuss."

[SECTION: Contact]
H2: "Get In Touch"
- Email address or contact form (routed through Resend)
- Response time expectation: "We respond to all advertising inquiries 
  within 2 business days."
```

### What Not To Put On This Page

- Do not publish rate cards in month 1. You have no traffic data to justify any rate and publishing speculative CPMs looks amateurish.
- Do not promise specific audience sizes until you have 3+ months of data.
- Do not create a media kit PDF. A clean HTML page is more credible than an overdesigned PDF from a site with no traffic.

### Navigation Placement

Add "Advertise" as a footer-only link — not in the primary navigation. Primary navigation stays: Home | Industries | Guides | About | Methodology. Footer: About | Methodology | Advertise | Privacy Policy | Contact.

This keeps the page discoverable by quality raters and partners who look for it, without cluttering the navigation for the primary user (a business owner valuing their company, who has no interest in advertising options).
