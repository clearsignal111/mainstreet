module.exports = {
  domain: "mainstreetbenchmark.org",
  url: "https://mainstreetbenchmark.org",
  brandName: "Mainstreet Benchmark",
  contactEmail: "support@mainstreetbenchmark.com",
  address: {
    street: "701 Brazos St, Suite 1616",
    city: "Austin",
    state: "TX",
    zip: "78701",
    country: "United States",
    full: "701 Brazos St, Suite 1616, Austin, TX 78701, United States",
  },
  author: {
    name: "Eric Haight",
    bio: "Small business transaction analyst and founder of Mainstreet Benchmark.",
  },
  // Credentialed data reviewer — appears in reviewedBy schema on category and guide pages.
  // Must be a CPA, CBI, or certified business appraiser before launch (Gate 1 requirement).
  reviewer: {
    name: "TODO: Add credentialed reviewer name before launch",
    title: "Certified Business Intermediary",
  },
  // Date of most recent data update — update whenever industry-multiples.json refreshes
  dataLastModified: "2026-01-15",
  // Data provenance
  dataSource: "BizBuySell Q4 2025",
  dataYear: "2025",
  dataQuarter: "Q4",
  dataCoverageStart: "2021",
  dataCoverageEnd: "2025",
  transactionCount: "9,500",
  bizBuySellUrl:
    "https://www.bizbuysell.com/learning-center/industry-valuation-multiples/",
  // Analytics — add GA4 ID here when available
  ga4Id: null, // e.g. "G-XXXXXXXXXX"
  // Build year
  year: new Date().getFullYear(),
};
