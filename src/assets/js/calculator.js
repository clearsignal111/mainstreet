/**
 * Mainstreet Benchmark — Full Calculator
 * Hub page only (/). Per docs/02-CALCULATOR-SPEC.md.
 * Vanilla JS — no framework.
 */

(function () {
  "use strict";

  // Industry data is injected into the page as window.INDUSTRIES
  // by the hub template (src/index.njk)
  const INDUSTRIES = window.INDUSTRIES || [];

  // Adjustment factors (02-CALCULATOR-SPEC.md Step 2)
  const ADJUSTMENTS = {
    trend: {
      "growing-20": 0.30,
      "growing-10-20": 0.15,
      "flat": 0,
      "declining": -0.25,
    },
    owner: {
      "low": 0.20,
      "moderate": 0,
      "high": -0.20,
    },
    concentration: {
      "diverse": 0.10,
      "concentrated": -0.25,
    },
  };

  // Round to nearest $5,000
  function roundNearest5k(n) {
    return Math.round(n / 5000) * 5000;
  }

  // Format as currency
  function fmtUSD(n) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);
  }

  // Format number with commas as user types
  function formatCurrency(input) {
    const raw = input.value.replace(/[^0-9]/g, "");
    if (!raw) { input.value = ""; return; }
    input.value = parseInt(raw, 10).toLocaleString("en-US");
    input.dataset.raw = raw;
  }

  function getRawValue(input) {
    const raw = input.dataset.raw || input.value.replace(/[^0-9]/g, "");
    return parseInt(raw, 10) || 0;
  }

  // ── DOM refs ────────────────────────────────────────────────
  const form         = document.getElementById("calculator-form");
  if (!form) return; // not on hub page

  const industrySelect  = document.getElementById("industry-select");
  const industrySearch  = document.getElementById("industry-search");
  const industryDropdown= document.getElementById("industry-dropdown");
  const sdeInput        = document.getElementById("sde-input");
  const revenueInput    = document.getElementById("revenue-input");
  const calcBtn         = document.getElementById("calc-btn");
  const sublabel        = document.getElementById("calc-sublabel");
  const resultBlock     = document.getElementById("result-block");
  const whatifSection   = document.getElementById("whatif-section");
  const whatifToggle    = document.getElementById("whatif-toggle");
  const whatifContent   = document.getElementById("whatif-content");
  const stage2Fields    = document.getElementById("stage-2-fields");

  let selectedIndustry  = null;
  let lastResult        = null;

  // ── Industry Searchable Dropdown ────────────────────────────
  function buildDropdown() {
    if (!industryDropdown) return;
    industryDropdown.innerHTML = "";
    const query = (industrySearch?.value || "").toLowerCase().trim();
    const filtered = query
      ? INDUSTRIES.filter(i => i.industry_name.toLowerCase().includes(query))
      : INDUSTRIES;

    if (filtered.length === 0) {
      industryDropdown.innerHTML = '<div class="industry-option industry-option--empty">No results</div>';
      return;
    }

    // Group by category
    const groups = {};
    for (const ind of filtered) {
      if (!groups[ind.industry_category]) groups[ind.industry_category] = [];
      groups[ind.industry_category].push(ind);
    }

    for (const [cat, inds] of Object.entries(groups)) {
      const groupEl = document.createElement("div");
      groupEl.className = "industry-group";
      groupEl.innerHTML = `<div class="industry-group__label">${cat}</div>`;
      for (const ind of inds) {
        const opt = document.createElement("div");
        opt.className = "industry-option";
        opt.dataset.slug = ind.industry_slug;
        opt.textContent = ind.industry_name;
        if (selectedIndustry?.industry_slug === ind.industry_slug) {
          opt.classList.add("industry-option--selected");
        }
        opt.addEventListener("click", () => selectIndustry(ind));
        groupEl.appendChild(opt);
      }
      industryDropdown.appendChild(groupEl);
    }
  }

  function selectIndustry(ind, lock = false) {
    selectedIndustry = ind;
    if (industrySearch) {
      industrySearch.value = ind.industry_name;
      industrySearch.dataset.locked = lock ? "true" : "";
      if (lock) {
        industrySearch.setAttribute("readonly", "true");
        industrySearch.classList.add("locked");
        document.getElementById("industry-locked-note")?.classList.remove("hidden");
      }
    }
    closeDropdown();
    validateIndustry();
    // On mobile: if SDE already entered, reveal stage 2
    if (getRawValue(sdeInput) > 0) revealStage2();
  }

  function openDropdown() {
    if (!industryDropdown) return;
    buildDropdown();
    industryDropdown.style.display = "block";
    industrySearch?.setAttribute("aria-expanded", "true");
  }

  function closeDropdown() {
    if (!industryDropdown) return;
    industryDropdown.style.display = "none";
    industrySearch?.setAttribute("aria-expanded", "false");
  }

  if (industrySearch) {
    industrySearch.addEventListener("focus", openDropdown);
    industrySearch.addEventListener("input", () => {
      if (industrySearch.dataset.locked) return;
      selectedIndustry = null;
      buildDropdown();
      if (!industryDropdown.style.display || industryDropdown.style.display === "none") {
        openDropdown();
      }
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".industry-select-wrap")) closeDropdown();
    });
  }

  // ── Currency inputs ─────────────────────────────────────────
  [sdeInput, revenueInput].forEach(inp => {
    if (!inp) return;
    inp.addEventListener("input", () => {
      formatCurrency(inp);
      if (inp === sdeInput && getRawValue(sdeInput) > 0) revealStage2();
      clearErrors(inp);
    });
    inp.setAttribute("inputmode", "numeric");
  });

  // ── Mobile Stage 2 reveal ───────────────────────────────────
  function revealStage2() {
    if (stage2Fields && window.innerWidth < 768) {
      stage2Fields.classList.add("revealed");
      const lbl = document.getElementById("stage-2-label");
      if (lbl) lbl.style.display = "block";
    }
  }

  // ── URL parameter handling ──────────────────────────────────
  function readUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const slug    = params.get("industry");
    const sde     = params.get("sde");
    const revenue = params.get("revenue");
    const trend   = params.get("trend");
    const owner   = params.get("owner");
    const conc    = params.get("concentration");

    if (slug) {
      const ind = INDUSTRIES.find(i => i.industry_slug === slug);
      if (ind) {
        selectIndustry(ind, true); // lock the field
        if (sublabel) sublabel.classList.add("visible");
      }
    }
    if (sde) {
      const n = parseInt(sde, 10);
      if (!isNaN(n)) {
        sdeInput.value = n.toLocaleString("en-US");
        sdeInput.dataset.raw = String(n);
        revealStage2();
      }
    }
    if (revenue) {
      const n = parseInt(revenue, 10);
      if (!isNaN(n)) {
        revenueInput.value = n.toLocaleString("en-US");
        revenueInput.dataset.raw = String(n);
      }
    }
    // Restore Phase 2 inputs if returning to a shared URL
    if (trend)  selectRadio("trend", trend);
    if (owner)  selectRadio("owner", owner);
    if (conc)   selectRadio("concentration", conc);

    // Do NOT auto-submit — user must click Calculate
  }

  function selectRadio(name, value) {
    const radio = form.querySelector(`input[name="${name}"][value="${value}"]`);
    if (radio) radio.checked = true;
  }

  // ── Validation ──────────────────────────────────────────────
  function clearErrors(input) {
    const errEl = document.getElementById(input.id + "-error");
    const warnEl = document.getElementById(input.id + "-warning");
    if (errEl) errEl.classList.remove("visible");
    if (warnEl) warnEl.classList.remove("visible");
    input.classList.remove("error");
  }

  function validateIndustry() {
    const errEl = document.getElementById("industry-error");
    if (errEl) errEl.classList.toggle("visible", !selectedIndustry);
    return !!selectedIndustry;
  }

  function validateSDE() {
    const val = getRawValue(sdeInput);
    const errEl = document.getElementById("sde-error");
    const warnEl = document.getElementById("sde-warning");
    sdeInput.classList.remove("error");
    if (!val || val <= 0) {
      if (errEl) errEl.classList.add("visible");
      sdeInput.classList.add("error");
      return false;
    }
    if (errEl) errEl.classList.remove("visible");

    // Implausibly high SDE warning (>35% margin check)
    if (selectedIndustry) {
      const rev = getRawValue(revenueInput);
      const expectedMaxSDE = rev * 0.5; // generous threshold
      if (rev > 0 && val > expectedMaxSDE) {
        if (warnEl) warnEl.classList.add("visible");
      } else {
        if (warnEl) warnEl.classList.remove("visible");
      }
    }
    return true;
  }

  function validateRevenue() {
    const sde = getRawValue(sdeInput);
    const rev = getRawValue(revenueInput);
    const errEl = document.getElementById("revenue-error");
    revenueInput.classList.remove("error");
    if (!rev || rev <= 0) {
      if (errEl) errEl.classList.add("visible");
      revenueInput.classList.add("error");
      return false;
    }
    if (rev < sde) {
      if (errEl) {
        errEl.textContent = "Revenue should be larger than SDE. Please check your figures.";
        errEl.classList.add("visible");
      }
      revenueInput.classList.add("error");
      return false;
    }
    if (errEl) errEl.classList.remove("visible");
    return true;
  }

  function validateRadio(name) {
    const val = form.querySelector(`input[name="${name}"]:checked`)?.value;
    const errEl = document.getElementById(name + "-error");
    if (!val) {
      if (errEl) errEl.classList.add("visible");
      return false;
    }
    if (errEl) errEl.classList.remove("visible");
    return true;
  }

  // ── Core calculation (Steps 1-6 from spec) ─────────────────
  function calculate() {
    const ind        = selectedIndustry;
    const sde        = getRawValue(sdeInput);
    const rev        = getRawValue(revenueInput);
    const trend      = form.querySelector('input[name="trend"]:checked')?.value;
    const owner      = form.querySelector('input[name="owner"]:checked')?.value;
    const conc       = form.querySelector('input[name="concentration"]:checked')?.value;

    // Step 1: base multiples
    let adjLow  = ind.sde_multiple_low;
    let adjHigh = ind.sde_multiple_high;

    // Step 2: adjustments
    const totalAdj =
      (ADJUSTMENTS.trend[trend] || 0) +
      (ADJUSTMENTS.owner[owner] || 0) +
      (ADJUSTMENTS.concentration[conc] || 0);

    adjLow  += totalAdj;
    adjHigh += totalAdj;

    // Step 3: floor and ceiling
    adjLow  = Math.max(adjLow, 1.0);
    adjHigh = Math.max(adjHigh, 1.0);

    // Step 4: SDE valuations
    const valLow  = roundNearest5k(adjLow * sde);
    const valHigh = roundNearest5k(adjHigh * sde);

    // Step 5: revenue valuation (secondary)
    const revVal = roundNearest5k(ind.revenue_multiple_avg * rev);

    const medianVal = roundNearest5k(ind.sde_multiple_mid * sde);

    return {
      ind, sde, rev, trend, owner, conc,
      adjLow, adjHigh, totalAdj,
      valLow, valHigh, revVal, medianVal,
      aboveCeiling: adjHigh > 6.0,
    };
  }

  // ── Value driver messages ───────────────────────────────────
  function getDrivers(result) {
    const positive = [], negative = [];
    const { trend, owner, conc } = result;

    if (trend === "growing-20")     positive.push("Strong revenue growth (20%+/yr) signals momentum to buyers — this typically supports a higher multiple.");
    if (trend === "growing-10-20") positive.push("Steady revenue growth signals momentum and reduces buyer risk — this typically supports a higher multiple.");
    if (trend === "declining")     negative.push("Declining revenue requires explanation. Sellers who can show a clear reason (one-time event, COVID recovery) fare better than those who cannot.");

    if (owner === "low")      positive.push("Low owner involvement makes the business more transferable and more valuable to buyers who need to step into operations.");
    if (owner === "high")     negative.push("High owner involvement is the single most common reason businesses sell below asking price — buyers discount for key-person risk.");

    if (conc === "diverse")      positive.push("A diversified customer base reduces buyer risk and supports stronger pricing.");
    if (conc === "concentrated") negative.push("Customer concentration is a significant deal risk. Buyers and their lenders scrutinize this closely — a single large customer can block SBA financing.");

    if (negative.length === 0) negative.push("No perfect business: even strong businesses carry some transition risk for the incoming buyer.");

    return { positive, negative };
  }

  // ── Contextual framing for ad unit (08-MONETIZATION.md) ────
  function getContextualFrame(valLow) {
    if (valLow < 500000) return "Businesses in this range typically work with local business brokers and qualify for SBA 7(a) acquisition financing.";
    if (valLow < 2000000) return "Businesses at this valuation level often work with regional business brokers or M&A intermediaries, with SBA and conventional financing both available.";
    return "Businesses at this valuation level typically engage M&A advisors rather than traditional business brokers, and buyers often include private equity and strategic acquirers.";
  }

  // ── Render result ───────────────────────────────────────────
  function renderResult(result) {
    const { ind, sde, rev, adjLow, adjHigh, valLow, valHigh, revVal, medianVal, aboveCeiling } = result;
    const drivers = getDrivers(result);

    // Primary range
    document.getElementById("res-range").textContent = `${fmtUSD(valLow)} – ${fmtUSD(valHigh)}`;
    document.getElementById("res-median").textContent = `Median estimate: ${fmtUSD(medianVal)}`;
    document.getElementById("res-multiple-line").textContent =
      `Based on ${adjLow.toFixed(2)}× – ${adjHigh.toFixed(2)}× adjusted SDE multiple for ${ind.industry_name}`;

    // Citation
    document.getElementById("res-citation").innerHTML =
      `Based on ${ind.transaction_count}+ transactions. Source: <a href="https://www.bizbuysell.com/learning-center/industry-valuation-multiples/" target="_blank" rel="noopener">BizBuySell ${ind.data_source} data</a>.`;

    // Ceiling note
    const ceilingNote = document.getElementById("res-ceiling-note");
    if (ceilingNote) {
      ceilingNote.style.display = aboveCeiling ? "block" : "none";
    }

    // Breakdown
    document.getElementById("res-industry").textContent  = ind.industry_name;
    document.getElementById("res-base-range").textContent = `${ind.sde_multiple_low}× – ${ind.sde_multiple_high}×`;
    document.getElementById("res-adj-range").textContent  = `${adjLow.toFixed(2)}× – ${adjHigh.toFixed(2)}×`;
    document.getElementById("res-sde").textContent        = fmtUSD(sde);
    document.getElementById("res-sde-val").textContent    = `${fmtUSD(valLow)} – ${fmtUSD(valHigh)}`;
    document.getElementById("res-rev-val").textContent    = fmtUSD(revVal);

    // Logic transparency opener (from industry JSON)
    const ltOpener = document.getElementById("res-lt-opener");
    if (ltOpener && ind.logic_transparency_opener) {
      ltOpener.textContent = ind.logic_transparency_opener;
    }

    // Drivers
    const posEl = document.getElementById("res-drivers-up");
    const negEl = document.getElementById("res-drivers-down");
    if (posEl) {
      posEl.style.display = drivers.positive.length ? "block" : "none";
      posEl.querySelector("ul").innerHTML = drivers.positive.map(d => `<li>✓ ${d}</li>`).join("");
    }
    if (negEl) {
      negEl.querySelector("ul").innerHTML = drivers.negative.map(d => `<li>⚠ ${d}</li>`).join("");
    }

    // Contextual frame above ad
    const frameEl = document.getElementById("res-contextual-frame");
    if (frameEl) frameEl.textContent = getContextualFrame(valLow);

    // Show result block with fade
    resultBlock.classList.add("visible");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resultBlock.classList.add("revealed"));
    });

    resultBlock.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // Reveal What-If section
    if (whatifSection) {
      whatifSection.classList.add("visible");
      initWhatIf(result);
    }

    // Update URL silently (shareable result — Phase 2)
    updateUrl(result);
  }

  // ── Form submit ─────────────────────────────────────────────
  if (calcBtn) {
    calcBtn.addEventListener("click", () => {
      const okInd   = validateIndustry();
      const okSde   = validateSDE();
      const okRev   = validateRevenue();
      const okTrend = validateRadio("trend");
      const okOwner = validateRadio("owner");
      const okConc  = validateRadio("concentration");

      if (!okInd || !okSde || !okRev || !okTrend || !okOwner || !okConc) return;

      // Loading state
      calcBtn.classList.add("loading");
      calcBtn.disabled = true;

      setTimeout(() => {
        const result = calculate();
        lastResult = result;
        renderResult(result);
        calcBtn.classList.remove("loading");
        calcBtn.disabled = false;
      }, 80); // minimal delay for loading UX
    });
  }

  // ── What-If sliders ─────────────────────────────────────────
  function initWhatIf(baseResult) {
    if (!whatifContent) return;

    const sliderOwner = document.getElementById("slider-owner");
    const sliderConc  = document.getElementById("slider-conc");
    const sliderTrend = document.getElementById("slider-trend");

    // Set initial positions based on Phase 1 selections
    const ownerMap  = { high: 0, moderate: 50, low: 100 };
    const concMap   = { concentrated: 0, diverse: 100 };
    const trendMap  = { declining: 0, flat: 33, "growing-10-20": 66, "growing-20": 100 };

    if (sliderOwner) sliderOwner.value = ownerMap[baseResult.owner] ?? 50;
    if (sliderConc)  sliderConc.value  = concMap[baseResult.conc]  ?? 100;
    if (sliderTrend) sliderTrend.value = trendMap[baseResult.trend] ?? 33;

    function recalcWhatIf() {
      const ownerVal = parseInt(sliderOwner?.value ?? 50);
      const concVal  = parseInt(sliderConc?.value  ?? 100);
      const trendVal = parseInt(sliderTrend?.value ?? 33);

      // Map slider positions to adjustments
      const ownerAdj  = -0.20 + (ownerVal / 100) * 0.40;
      const concAdj   = -0.25 + (concVal  / 100) * 0.35;
      const trendAdj  = -0.25 + (trendVal / 100) * 0.55;

      const ind = baseResult.ind;
      let newLow  = Math.max(ind.sde_multiple_low  + ownerAdj + concAdj + trendAdj, 1.0);
      let newHigh = Math.max(ind.sde_multiple_high + ownerAdj + concAdj + trendAdj, 1.0);

      const newValLow  = roundNearest5k(newLow  * baseResult.sde);
      const newValHigh = roundNearest5k(newHigh * baseResult.sde);
      const deltaLow   = newValLow  - baseResult.valLow;
      const deltaHigh  = newValHigh - baseResult.valHigh;

      const newRangeEl  = document.getElementById("wi-new-range");
      const deltaEl     = document.getElementById("wi-delta");
      const origRangeEl = document.getElementById("wi-orig-range");

      if (origRangeEl) origRangeEl.textContent = `Current: ${fmtUSD(baseResult.valLow)} – ${fmtUSD(baseResult.valHigh)}`;
      if (newRangeEl)  newRangeEl.textContent  = `${fmtUSD(newValLow)} – ${fmtUSD(newValHigh)}`;
      if (deltaEl) {
        const sign = deltaLow >= 0 ? "+" : "";
        deltaEl.textContent = `Potential change: ${sign}${fmtUSD(deltaLow)} – ${sign}${fmtUSD(deltaHigh)}`;
        deltaEl.style.color = deltaLow >= 0 ? "var(--color-accent)" : "var(--color-error-text)";
      }
    }

    [sliderOwner, sliderConc, sliderTrend].forEach(s => {
      if (s) s.addEventListener("input", recalcWhatIf);
    });
    recalcWhatIf();
  }

  if (whatifToggle) {
    whatifToggle.addEventListener("click", () => {
      whatifContent?.classList.toggle("open");
    });
  }

  // ── URL encoding ─────────────────────────────────────────────
  function updateUrl(result) {
    const params = new URLSearchParams();
    params.set("industry", result.ind.industry_slug);
    params.set("sde", result.sde);
    params.set("revenue", result.rev);
    params.set("trend", result.trend);
    params.set("owner", result.owner);
    params.set("concentration", result.conc);
    const url = `${window.location.pathname}?${params.toString()}`;
    history.replaceState(null, "", url);
  }

  // ── SDE expander ─────────────────────────────────────────────
  const sdeToggle = document.getElementById("sde-expander-toggle");
  const sdeContent = document.getElementById("sde-expander-content");
  if (sdeToggle && sdeContent) {
    sdeToggle.addEventListener("click", () => {
      sdeContent.classList.toggle("open");
      sdeToggle.textContent = sdeContent.classList.contains("open")
        ? "▴ Hide SDE definition"
        : "▾ What is SDE?";
    });
  }

  // ── Init ─────────────────────────────────────────────────────
  readUrlParams();

})();
