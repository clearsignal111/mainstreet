const path = require("path");
const rawData = require(path.join(__dirname, "../../data/industry-multiples.json"));

// Map category names to URL slugs (must match 03-SITE-ARCHITECTURE.md)
const CATEGORY_SLUG_MAP = {
  "Automotive": "automotive",
  "Education and Children": "education-and-children",
  "Financial Services": "financial-services",
  "Food and Restaurants": "food-and-restaurants",
  "Healthcare and Personal Services": "healthcare-and-personal-services",
  "Home Services": "home-services",
  "Pet Services": "pet-services",
  "Recreation and Hospitality": "recreation-and-hospitality",
  "Retail": "retail",
  "Service Businesses": "service-businesses",
  "Technology": "technology",
  "Transportation and Storage": "transportation-and-storage",
};

// Strip trailing " Businesses" or " Business" for use in H1/title phrases like
// "How Much Is a HVAC Business Worth?" (avoids "HVAC Businesses Business Worth?")
function toDisplayName(name) {
  return name.replace(/ Businesses$/, "").replace(/ Business$/, "");
}

// Enrich each industry with computed fields
const all = rawData.map((ind) => ({
  ...ind,
  // display_name: name without trailing "Business/Businesses" suffix — use in H1/title
  display_name: toDisplayName(ind.industry_name),
  category_slug: CATEGORY_SLUG_MAP[ind.industry_category] || ind.industry_category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  page_url: `/valuation/${ind.industry_slug}/`,
  category_url: `/valuation/${CATEGORY_SLUG_MAP[ind.industry_category]}/`,
  // Example calc at $200k SDE for template prose
  example_sde: 200000,
  example_low: Math.round((200000 * ind.sde_multiple_low) / 5000) * 5000,
  example_high: Math.round((200000 * ind.sde_multiple_high) / 5000) * 5000,
  // Freshness display
  last_updated_display: (() => {
    const d = new Date(ind.last_updated + "T12:00:00Z");
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
  })(),
}));

// Lookup by slug
const bySlug = Object.fromEntries(all.map((i) => [i.industry_slug, i]));

// Group by category, preserving URL map order
const CATEGORY_ORDER = [
  "Automotive",
  "Education and Children",
  "Financial Services",
  "Food and Restaurants",
  "Healthcare and Personal Services",
  "Home Services",
  "Pet Services",
  "Recreation and Hospitality",
  "Retail",
  "Service Businesses",
  "Technology",
  "Transportation and Storage",
];

const byCategory = {};
for (const ind of all) {
  if (!byCategory[ind.industry_category]) byCategory[ind.industry_category] = [];
  byCategory[ind.industry_category].push(ind);
}

// Category objects for pagination (category hub pages)
const categories = CATEGORY_ORDER.map((catName) => {
  const inds = byCategory[catName] || [];
  const multiples = inds.map((i) => i.sde_multiple_mid);
  return {
    name: catName,
    slug: CATEGORY_SLUG_MAP[catName],
    url: `/valuation/${CATEGORY_SLUG_MAP[catName]}/`,
    industries: inds,
    multiple_low: Math.min(...inds.map((i) => i.sde_multiple_low)).toFixed(2),
    multiple_high: Math.max(...inds.map((i) => i.sde_multiple_high)).toFixed(2),
    multiple_mid_avg: (multiples.reduce((a, b) => a + b, 0) / multiples.length).toFixed(2),
    industry_count: inds.length,
  };
});

// Priority industries (top 15 by estimated search volume, per 03-SITE-ARCHITECTURE.md)
const PRIORITY_SLUGS = [
  "restaurant",
  "auto-repair-shop",
  "hvac-services",
  "landscaping-yard-services",
  "cleaning-businesses",
  "dental-practice",
  "car-wash",
  "plumbing-services",
  "hair-salon-barber",
  "convenience-store",
  "accounting-tax-practice",
  "insurance-agency",
  "gym-fitness-center",
  "daycare-childcare",
  "it-managed-services",
];

const priorityIndustries = PRIORITY_SLUGS.map((slug) => bySlug[slug]).filter(Boolean);

module.exports = {
  all,
  bySlug,
  byCategory,
  categories,
  priorityIndustries,
};
