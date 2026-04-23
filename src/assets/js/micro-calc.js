/**
 * Mainstreet Benchmark — Micro-Calculator
 * Industry pages only. Standalone ~40-line component.
 * Per docs/02-CALCULATOR-SPEC.md § Micro-Calculator Specification.
 * Must NOT load the full calculator bundle.
 */

(function () {
  "use strict";

  const container = document.getElementById("micro-calc");
  if (!container) return;

  // Industry data is injected per-page as data attributes on #micro-calc
  const SLUG        = container.dataset.slug;
  const MULTI_LOW   = parseFloat(container.dataset.multiLow);
  const MULTI_MID   = parseFloat(container.dataset.multiMid);
  const MULTI_HIGH  = parseFloat(container.dataset.multiHigh);
  const TXN_COUNT   = container.dataset.txnCount;
  const IND_NAME    = container.dataset.indName;

  const sdeInput  = document.getElementById("mc-sde");
  const revInput  = document.getElementById("mc-revenue");
  const btn       = document.getElementById("mc-btn");
  const resultEl  = document.getElementById("mc-result");

  // Round to nearest $5,000
  function r5k(n) { return Math.round(n / 5000) * 5000; }

  function fmtUSD(n) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);
  }

  function formatCurrency(input) {
    const raw = input.value.replace(/[^0-9]/g, "");
    if (!raw) { input.value = ""; return; }
    input.value = parseInt(raw, 10).toLocaleString("en-US");
    input.dataset.raw = raw;
  }

  function getRaw(input) {
    return parseInt(input.dataset.raw || input.value.replace(/[^0-9]/g, ""), 10) || 0;
  }

  // Format currency inputs
  [sdeInput, revInput].forEach(inp => {
    if (!inp) return;
    inp.setAttribute("inputmode", "numeric");
    inp.addEventListener("input", () => formatCurrency(inp));
  });

  // SDE expander
  const sdeToggle  = document.getElementById("mc-sde-toggle");
  const sdeContent = document.getElementById("mc-sde-content");
  if (sdeToggle && sdeContent) {
    sdeToggle.addEventListener("click", () => {
      sdeContent.classList.toggle("open");
      sdeToggle.textContent = sdeContent.classList.contains("open")
        ? "▴ Hide SDE definition"
        : "▾ What is SDE?";
    });
  }

  if (!btn) return;

  btn.addEventListener("click", () => {
    const sde = getRaw(sdeInput);
    const rev = getRaw(revInput);

    // Validate
    let ok = true;
    const sdeErr = document.getElementById("mc-sde-error");
    const revErr = document.getElementById("mc-rev-error");

    if (!sde || sde <= 0) {
      if (sdeErr) { sdeErr.textContent = "Please enter your annual SDE."; sdeErr.classList.add("visible"); }
      sdeInput?.classList.add("error");
      ok = false;
    } else {
      if (sdeErr) sdeErr.classList.remove("visible");
      sdeInput?.classList.remove("error");
    }

    if (!rev || rev <= 0) {
      if (revErr) { revErr.textContent = "Please enter your annual revenue."; revErr.classList.add("visible"); }
      revInput?.classList.add("error");
      ok = false;
    } else if (rev < sde) {
      if (revErr) { revErr.textContent = "Revenue should be larger than SDE."; revErr.classList.add("visible"); }
      revInput?.classList.add("error");
      ok = false;
    } else {
      if (revErr) revErr.classList.remove("visible");
      revInput?.classList.remove("error");
    }

    if (!ok) return;

    // Calculate (no adjustments — median multiple only)
    const lo = r5k(Math.max(MULTI_LOW, 1.0) * sde);
    const hi = r5k(Math.max(MULTI_HIGH, 1.0) * sde);

    // Build CTA URL
    const ctaUrl = `/?industry=${encodeURIComponent(SLUG)}&sde=${sde}&revenue=${rev}&utm_source=industry_page&utm_medium=micro_calculator&utm_campaign=${SLUG}`;

    // Render result
    if (resultEl) {
      resultEl.innerHTML = `
        <div class="micro-result__range">~${fmtUSD(lo)} – ${fmtUSD(hi)}</div>
        <div class="micro-result__sublabel">Based on ${MULTI_MID.toFixed(2)}× median SDE multiple for ${IND_NAME}</div>
        <div class="micro-result__citation">Source: ${TXN_COUNT}+ transactions · <a href="https://www.bizbuysell.com/learning-center/industry-valuation-multiples/" target="_blank" rel="noopener">BizBuySell</a></div>
        <hr class="micro-result__divider">
        <p class="micro-result__disclosure">This estimate uses the industry median multiple only. Revenue trend, owner involvement, and customer concentration are not factored in — these can shift your result by 20–40%.</p>
        <a href="${ctaUrl}" class="micro-result__cta">Get your full breakdown, What-If analysis, and value drivers →</a>
      `;
      resultEl.classList.add("visible");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => resultEl.classList.add("revealed"));
      });
      resultEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });

})();
