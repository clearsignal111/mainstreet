const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Passthrough copies
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "brand-assets": "brand-assets" });
  eleventyConfig.addPassthroughCopy("src/_redirects");

  // Watch targets
  eleventyConfig.addWatchTarget("src/assets/");

  // ── Filters ────────────────────────────────────────────────────────────────

  // Format a number as USD with commas, no cents
  eleventyConfig.addFilter("usd", (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  );

  // Round to nearest $5,000 then format
  eleventyConfig.addFilter("usdRounded", (value) => {
    const rounded = Math.round(value / 5000) * 5000;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(rounded);
  });

  // Format a decimal multiple to 2 decimal places with × suffix
  eleventyConfig.addFilter("multiple", (value) =>
    `${parseFloat(value).toFixed(2)}×`
  );

  // Slugify: convert category name to URL slug
  eleventyConfig.addFilter("slugify", (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );

  // Format ISO date as "Month YYYY" (e.g. "January 2026")
  eleventyConfig.addFilter("dateMonthYear", (dateStr) => {
    const d = new Date(dateStr + "T12:00:00Z");
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
  });

  // Calculate example valuation range from SDE and multiples (returns object)
  eleventyConfig.addFilter("exampleRange", (sde, low, high) => {
    const lo = Math.round((sde * low) / 5000) * 5000;
    const hi = Math.round((sde * high) / 5000) * 5000;
    return { low: lo, high: hi };
  });

  // JSON encode (safe for use in <script> blocks)
  eleventyConfig.addFilter("jsonEncode", (value) =>
    JSON.stringify(value)
  );

  // Escape a string for safe inline use inside a JSON-LD string value.
  // Use as: "key": "{{ someField | jsStr }}"
  // Handles embedded quotes, backslashes, newlines, and Unicode line separators.
  eleventyConfig.addFilter("jsStr", (str) =>
    String(str == null ? "" : str)
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029")
  );

  // Format a number with commas (no $ prefix) — for use inside JSON-LD values
  eleventyConfig.addFilter("numFmt", (value) =>
    new Intl.NumberFormat("en-US").format(value)
  );

  // Absolute URL
  eleventyConfig.addFilter("absoluteUrl", (path, base) =>
    new URL(path, base).href
  );

  // Current year (for copyright)
  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  // ── Template config ────────────────────────────────────────────────────────

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "html", "md", "xml", "txt"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
