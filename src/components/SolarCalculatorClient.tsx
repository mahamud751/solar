"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Sun,
  Banknote,
  Leaf,
  Trees,
  ArrowRight,
  ShieldCheck,
  Building2,
  Home,
  Factory,
  CheckCircle2,
} from "lucide-react";
import {
  formatBDT,
} from "@/data/solnce";
import { useT } from "@/i18n/lang";
import { useContent } from "@/data/content";

type Segment = "residential" | "commercial" | "industrial";
const segmentIcons = { residential: Home, commercial: Building2, industrial: Factory };

export function SolarCalculatorClient({ initialBill }: { initialBill?: number }) {
  const { DISCOMS, PANEL_BRANDS } = useContent();
  const t = useT();
  if (!DISCOMS.length || !PANEL_BRANDS.length) {
    return <p role="status">{t("The calculator is currently unavailable.", "ক্যালকুলেটরটি এখন উপলব্ধ নয়।")}</p>;
  }
  return <CalculatorForm initialBill={initialBill} />;
}

function CalculatorForm({ initialBill }: { initialBill?: number }) {
  const t = useT();
  const [segment, setSegment] = useState<Segment>("residential");
  const { DISCOMS, PANEL_BRANDS, BLOCKS: { CALCULATOR_SEGMENTS } } = useContent();
  const [discomId, setDiscomId] = useState<string>(DISCOMS[0].id);
  const [monthlyBill, setMonthlyBill] = useState<number>(
    initialBill && initialBill >= CALCULATOR_SEGMENTS.residential.minBill
      ? Math.min(initialBill, CALCULATOR_SEGMENTS.residential.maxBill) : CALCULATOR_SEGMENTS.residential.defaultBill
  );
  const [roofAreaSqFt, setRoofAreaSqFt] = useState<number>(600);
  const [selectedBrand, setSelectedBrand] = useState<string>(
    PANEL_BRANDS[0].name
  );
  const [includeLoan, setIncludeLoan] = useState<boolean>(false);

  const seg = CALCULATOR_SEGMENTS[segment];
  const discom = useMemo(
    () => DISCOMS.find((d) => d.id === discomId) ?? DISCOMS[0],
    [discomId, DISCOMS]
  );

  const handleSegmentChange = (next: Segment) => {
    setSegment(next);
    setMonthlyBill(CALCULATOR_SEGMENTS[next].defaultBill);
    setRoofAreaSqFt(
      next === "residential" ? 600 : next === "commercial" ? 4500 : 18000
    );
  };

  const results = useMemo(() => {
    const effectiveTariff = +(discom.ratePerUnit * seg.tariffMultiplier).toFixed(2);
    const monthlyUnits = monthlyBill / effectiveTariff;
    const unitsPerKwPerMonth = discom.sunHours * 30 * 0.82; // 82% PR clear-sky factor
    const neededKw = Math.max(1, Math.ceil(monthlyUnits / unitsPerKwPerMonth));
    const maxKwByRoof = Math.max(1, Math.floor(roofAreaSqFt / 88));
    const recommendedKw = Math.min(neededKw, maxKwByRoof);

    const annualGeneration = Math.round(recommendedKw * unitsPerKwPerMonth * 12);
    const annualSavings = Math.round(annualGeneration * effectiveTariff);
    const grossCost = recommendedKw * seg.costPerKw;
    // Bangladesh has no cash subsidy for rooftop solar: the investment is the system cost.
    const netEffectiveCost = grossCost;
    const billAfterSolar = Math.max(0, Math.round(monthlyBill - annualSavings / 12));
    const paybackYears = +(netEffectiveCost / Math.max(1, annualSavings)).toFixed(1);

    // 25-year cumulative savings points (with 3% annual grid tariff inflation & 0.45% panel degradation)
    const yearlyPoints: { year: number; net: number }[] = [];
    let cumulative = -netEffectiveCost;
    for (let yr = 1; yr <= 25; yr++) {
      const yrSavings =
        annualSavings * Math.pow(1.03, yr - 1) * Math.pow(0.9955, yr - 1);
      cumulative += yrSavings;
      yearlyPoints.push({ year: yr, net: Math.round(cumulative) });
    }
    const lifetimeNetProfit = yearlyPoints[24].net;

    // EMI estimate (0% down, ~9% residential / ~10% C&I over 60 months)
    const principal = netEffectiveCost;
    const r = (segment === "residential" ? 0.09 : 0.1) / 12;
    const n = 60;
    const monthlyEmi = Math.round(
      (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    );

    // Bangladesh grid emission factor ≈ 0.67 kg CO₂ per kWh
    const co2Tonnes = Math.round((annualGeneration * 25 * 0.67) / 1000);
    const treesEquivalent = Math.round(co2Tonnes * 45);

    return {
      effectiveTariff,
      recommendedKw,
      neededKw,
      roofLimited: neededKw > maxKwByRoof,
      requiredRoofArea: recommendedKw * 90,
      annualGeneration,
      annualSavings,
      grossCost,
      billAfterSolar,
      netEffectiveCost,
      paybackYears,
      lifetimeNetProfit,
      monthlyEmi,
      co2Tonnes,
      treesEquivalent,
      yearlyPoints,
    };
  }, [discom, seg, monthlyBill, roofAreaSqFt, segment]);

  // SVG chart coordinates for 25-year cumulative net value
  const chart = useMemo(() => {
    const w = 520;
    const h = 150;
    const minVal = Math.min(...results.yearlyPoints.map((p) => p.net), -results.netEffectiveCost);
    const maxVal = Math.max(...results.yearlyPoints.map((p) => p.net), 100000);
    const range = maxVal - minVal || 1;
    const zeroY = h - ((0 - minVal) / range) * (h - 20) - 10;

    const coords = results.yearlyPoints.map((p, idx) => {
      const x = (idx / 24) * w;
      const y = h - ((p.net - minVal) / range) * (h - 20) - 10;
      return { x, y, ...p };
    });

    const line = coords.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
    const area = `0,${zeroY.toFixed(1)} ${line} ${w},${zeroY.toFixed(1)}`;
    return { w, h, zeroY, line, area };
  }, [results]);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Left Inputs Panel */}
      <div className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-elevated sm:p-8 lg:col-span-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary-deep">
            {t("Step 1 · Property & Utility", "ধাপ ১ · সম্পত্তি ও বিতরণ কর্তৃপক্ষ", "solar-calculator-client/step-1-property-utility")}
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {(Object.keys(CALCULATOR_SEGMENTS) as Segment[]).map((key) => {
              const cfg = CALCULATOR_SEGMENTS[key];
              const Icon = segmentIcons[key];
              const active = segment === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSegmentChange(key)}
                  aria-pressed={active}
                  className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center text-xs font-bold transition-all ${
                    active
                      ? "border-primary bg-primary-soft text-primary-deep shadow-sm"
                      : "border-border bg-surface text-muted-foreground hover:border-primary/35 hover:text-ink-deep"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{t(cfg.label.split(" ")[0], cfg.labelBn)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* DISCOM selector */}
        <div>
          <label
            htmlFor="calc-discom"
            className="block text-sm font-bold text-ink-deep"
          >
            {t("Select Your Electricity Utility", "আপনার বিদ্যুৎ বিতরণ কর্তৃপক্ষ বাছাই করুন", "solar-calculator-client/select-your-electricity-utility")}
          </label>
          <select
            id="calc-discom"
            value={discomId}
            onChange={(e) => setDiscomId(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-surface px-3.5 py-3 text-sm font-medium text-ink-deep"
          >
            {DISCOMS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} — {d.region} (~৳{d.ratePerUnit}/{t("unit", "ইউনিট", "solar-calculator-client/unit")})
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {discom.netMeteringNote}
          </p>
        </div>

        {/* Monthly Bill Slider */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="calc-bill"
              className="text-sm font-bold text-ink-deep"
            >
              {t("Average Monthly Electricity Bill", "গড় মাসিক বিদ্যুৎ বিল", "solar-calculator-client/average-monthly-electricity-bill")}
            </label>
            <span className="rounded-full bg-primary-soft px-3 py-1 font-mono text-sm font-extrabold text-primary-deep tabular-nums">
              {formatBDT(monthlyBill)}
            </span>
          </div>
          <input
            id="calc-bill"
            type="range"
            min={seg.minBill}
            max={seg.maxBill}
            step={seg.step}
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(Number(e.target.value))}
            className="mt-3 w-full cursor-pointer accent-primary"
          />
          <div className="mt-1 flex justify-between font-mono text-xs text-muted-foreground">
            <span>{formatBDT(seg.minBill)}</span>
            <span>{t("Tariff", "ট্যারিফ", "solar-calculator-client/tariff")}: ~৳{results.effectiveTariff}/{t("unit", "ইউনিট", "solar-calculator-client/unit")}</span>
            <span>{formatBDT(seg.maxBill)}</span>
          </div>
        </div>

        {/* Available Shadow-Free Roof Area */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="calc-roof"
              className="text-sm font-bold text-ink-deep"
            >
              {t("Shadow-Free Roof Area", "ছায়ামুক্ত ছাদের আয়তন", "solar-calculator-client/shadow-free-roof-area")}
            </label>
            <span className="font-mono text-sm font-bold text-ink-deep tabular-nums">
              {roofAreaSqFt.toLocaleString("en-IN")} {t("sq.ft", "বর্গফুট", "solar-calculator-client/sq-ft")}
            </span>
          </div>
          <input
            id="calc-roof"
            type="range"
            min={segment === "residential" ? 150 : 1000}
            max={segment === "residential" ? 3000 : 40000}
            step={segment === "residential" ? 50 : 500}
            value={roofAreaSqFt}
            onChange={(e) => setRoofAreaSqFt(Number(e.target.value))}
            className="mt-3 w-full cursor-pointer accent-primary"
          />
          {results.roofLimited && (
            <p className="mt-1.5 text-xs font-semibold text-[#9A5D06]">
              {t(
                `Sized to fit your ${roofAreaSqFt} sq.ft roof (full bill offset needs ${results.neededKw} kW / ~${results.neededKw * 90} sq.ft).`,
                `আপনার ${roofAreaSqFt} বর্গফুট ছাদে যতটুকু ধরে ততটুকু ধরা হয়েছে (পুরো বিল মেটাতে ${results.neededKw} কিলোওয়াট / ~${results.neededKw * 90} বর্গফুট দরকার)।`
              )}
            </p>
          )}
        </div>

        {/* Preferred Tier-1 Panel Brand */}
        <div>
          <label
            htmlFor="calc-brand"
            className="block text-sm font-bold text-ink-deep"
          >
            {t("Preferred Tier-1 Module Brand", "পছন্দের টিয়ার-১ মডিউল ব্র্যান্ড", "solar-calculator-client/preferred-tier-1-module-brand")}
          </label>
          <select
            id="calc-brand"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-surface px-3.5 py-3 text-sm font-medium text-ink-deep"
          >
            {PANEL_BRANDS.map((b) => (
              <option key={b.name} value={b.name}>
                {b.name} ({b.wattage} · {b.efficiency} · {t(b.warranty, b.warranty.replace("yrs", "বছর"))})
              </option>
            ))}
          </select>
        </div>

        {/* Financing Toggle */}
        <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-border bg-surface p-4">
          <span>
            <span className="block text-sm font-bold text-ink-deep">
              {t("Compare Solar Loan EMI Option", "সোলার লোন EMI তুলনা করুন", "solar-calculator-client/compare-solar-loan-emi-option")}
            </span>
            <span className="block text-xs text-muted-foreground">
              {t("0% down · 5-year tenure", "০% ডাউন · ৫ বছর মেয়াদ", "solar-calculator-client/0-down-5-year-tenure")} (~{segment === "residential" ? "9%" : "10%"} {t("p.a., indicative", "বার্ষিক, আনুমানিক", "solar-calculator-client/p-a-indicative")})
            </span>
          </span>
          <input
            type="checkbox"
            checked={includeLoan}
            onChange={(e) => setIncludeLoan(e.target.checked)}
            className="h-5 w-5 accent-primary"
          />
        </label>
      </div>

      {/* Right Results Dashboard */}
      <div className="space-y-6 lg:col-span-7">
        {/* Hero Result Banner */}
        <div className="rounded-3xl bg-solnce-blue p-6 text-white shadow-elevated sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-[#F6C44C]">
              <Sun className="h-3.5 w-3.5" aria-hidden="true" />
              {t("Clear-Sky System Recommendation", "ক্লিয়ার-স্কাই সিস্টেম সুপারিশ", "solar-calculator-client/clear-sky-system-recommendation")}
            </span>
            <span className="font-mono text-xs text-white/80">
              {selectedBrand} · {discom.region}
            </span>
          </div>

          <div className="mt-5 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold text-white/80">
                {t("Recommended Capacity", "প্রস্তাবিত ক্ষমতা", "solar-calculator-client/recommended-capacity")}
              </p>
              <p className="mt-1 font-mono text-4xl font-extrabold tabular-nums">
                {results.recommendedKw}
                <span className="ml-1 text-lg text-[#F6C44C]">kW</span>
              </p>
              <p className="mt-1 text-xs text-white/80">
                {t("Uses", "প্রয়োজন", "solar-calculator-client/uses")} ~{results.requiredRoofArea.toLocaleString("en-IN")} {t("sq.ft", "বর্গফুট", "solar-calculator-client/sq-ft")}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-white/80">
                {t("Annual Clean Yield", "বার্ষিক পরিচ্ছন্ন উৎপাদন", "solar-calculator-client/annual-clean-yield")}
              </p>
              <p className="mt-1 font-mono text-3xl font-extrabold tabular-nums">
                {results.annualGeneration.toLocaleString("en-IN")}
                <span className="ml-1 text-sm text-white/80">kWh</span>
              </p>
              <p className="mt-1 text-xs text-emerald-300">
                {t("Saves", "সাশ্রয়", "solar-calculator-client/saves")} {formatBDT(results.annualSavings)} / {t("yr", "বছর", "solar-calculator-client/yr")}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-white/80">
                {t("Estimated Payback", "আনুমানিক বিনিয়োগ-উদ্ধার", "solar-calculator-client/estimated-payback")}
              </p>
              <p className="mt-1 font-mono text-3xl font-extrabold tabular-nums">
                {results.paybackYears}
                <span className="ml-1 text-sm text-[#F6C44C]">{t("yrs", "বছর", "solar-calculator-client/yrs")}</span>
              </p>
              <p className="mt-1 text-xs text-white/80">
                {t("20+ yrs pure savings after", "এরপর ২০+ বছর শুধুই সাশ্রয়", "solar-calculator-client/20-yrs-pure-savings-after")}
              </p>
            </div>
          </div>
        </div>

        {/* Financial Breakdown Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
            <p className="text-xs font-semibold text-muted-foreground">
              {t("Est. Turnkey System Cost", "আনুমানিক টার্নকি সিস্টেম খরচ", "solar-calculator-client/est-turnkey-system-cost")}
            </p>
            <p className="mt-1.5 font-mono text-xl font-extrabold text-ink-deep tabular-nums">
              {formatBDT(results.grossCost)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("Includes installation & net metering", "ইনস্টলেশন ও নেট মিটারিংসহ", "solar-calculator-client/includes-installation-net-metering")}
            </p>
          </div>

          <div className="rounded-3xl border border-success/30 bg-success-soft p-5 shadow-card">
            <p className="text-xs font-semibold text-emerald-800">
              {t("Monthly Bill After Solar", "সোলারের পর মাসিক বিল", "solar-calculator-client/monthly-bill-after-solar")}
            </p>
            <p className="mt-1.5 font-mono text-xl font-extrabold text-emerald-950 tabular-nums">
              {formatBDT(results.billAfterSolar)}
            </p>
            <p className="mt-1 text-xs text-emerald-800">
              {t("Surplus units credited via SREDA net metering", "SREDA নেট মিটারিংয়ে বাড়তি ইউনিট বিলে সমন্বয়", "solar-calculator-client/surplus-units-credited-via-sreda-net-metering")}
            </p>
          </div>

          <div className="rounded-3xl border border-primary/30 bg-primary-soft/75 p-5 shadow-card">
            <p className="text-xs font-semibold text-primary-deep">
              {t("Your Investment", "আপনার বিনিয়োগ", "solar-calculator-client/your-investment")}
            </p>
            <p className="mt-1.5 font-mono text-xl font-extrabold text-ink-deep tabular-nums">
              {formatBDT(results.netEffectiveCost)}
            </p>
            <p className="mt-1 text-xs font-semibold text-primary-deep">
              {includeLoan
                ? `EMI: ~${formatBDT(results.monthlyEmi)}/mo`
                : t("0% down EMI available", "০% ডাউন EMI সুবিধা আছে", "solar-calculator-client/0-down-emi-available")}
            </p>
          </div>
        </div>

        {/* 25-Year Cumulative Net Return SVG Chart */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-extrabold text-ink-deep">
                {t("25-Year Cumulative Net Financial Return", "২৫ বছরের মোট নিট আর্থিক রিটার্ন", "solar-calculator-client/25-year-cumulative-net-financial-return")}
              </h3>
              <p className="text-xs text-muted-foreground">
                {t("Models 3% annual tariff increase & 0.45%/yr linear panel degradation", "বছরে ৩% ট্যারিফ বৃদ্ধি ও প্যানেলের বছরে ০.৪৫% লিনিয়ার ক্ষয় ধরে হিসাব", "solar-calculator-client/models-3-annual-tariff-increase-0-45")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
                {t("25-Yr Net Gain", "২৫ বছরের নিট লাভ", "solar-calculator-client/25-yr-net-gain")}
              </p>
              <p className="font-mono text-xl font-extrabold text-success tabular-nums">
                {formatBDT(results.lifetimeNetProfit)}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <svg
              viewBox={`0 0 ${chart.w} ${chart.h}`}
              className="h-40 w-full overflow-visible"
              role="img"
              aria-label={`25-year solar net profit chart reaching ${formatBDT(results.lifetimeNetProfit)}`}
            >
              <defs>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16A34A" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#16A34A" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              {/* Break-even zero line */}
              <line
                x1="0"
                y1={chart.zeroY}
                x2={chart.w}
                y2={chart.zeroY}
                stroke="#94A3B8"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <polygon points={chart.area} fill="url(#profitGrad)" />
              <polyline
                points={chart.line}
                fill="none"
                stroke="#15803D"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="mt-1 flex justify-between font-mono text-[0.72rem] text-muted-foreground">
              <span>{t("Year 1", "বছর ১", "solar-calculator-client/year-1")}</span>
              <span>{t("Break-even", "সমান-সমান", "solar-calculator-client/break-even")} (~{t("Yr", "বছর", "solar-calculator-client/yr-2")} {results.paybackYears})</span>
              <span>{t("Year 15", "বছর ১৫", "solar-calculator-client/year-15")}</span>
              <span>{t("Year 25", "বছর ২৫", "solar-calculator-client/year-25")}</span>
            </div>
          </div>
        </div>

        {/* Environmental Impact + CTA Lock-in */}
        <div className="grid items-center gap-4 rounded-3xl border border-border bg-surface p-6 sm:grid-cols-12">
          <div className="flex flex-wrap gap-6 sm:col-span-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-success-soft text-success">
                <Leaf className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-lg font-extrabold text-ink-deep tabular-nums">
                  {results.co2Tonnes} {t("tonnes", "টন", "solar-calculator-client/tonnes")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("CO₂ offset over 25 yrs", "২৫ বছরে CO₂ হ্রাস", "solar-calculator-client/co-offset-over-25-yrs")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-soft text-[#9A5D06]">
                <Trees className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-lg font-extrabold text-ink-deep tabular-nums">
                  {results.treesEquivalent.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("Mature trees equivalent", "পূর্ণবয়স্ক গাছের সমতুল্য", "solar-calculator-client/mature-trees-equivalent")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:col-span-5 sm:items-end">
            <Link
              href="/contact#quote"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              <span>{t(`Lock ${results.recommendedKw} kW Free Quote`, `${results.recommendedKw} কিলোওয়াটের ফ্রি কোটেশন নিন`)}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <span className="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary-deep" aria-hidden="true" />
              {t("Includes shadow analysis & itemised quote", "ছায়া বিশ্লেষণ ও বিস্তারিত কোটেশনসহ", "solar-calculator-client/includes-shadow-analysis-itemised-quote")}
            </span>
          </div>
        </div>

        {/* Loan breakdown pill if enabled */}
        {includeLoan && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary/25 bg-primary-soft/60 px-5 py-4 text-sm">
            <div className="flex items-center gap-2.5">
              <Banknote className="h-5 w-5 text-primary-deep" aria-hidden="true" />
              <span className="font-semibold text-ink-deep">
                {t("Estimated Monthly EMI:", "আনুমানিক মাসিক EMI:", "solar-calculator-client/estimated-monthly-emi")}{" "}
                <strong className="font-mono text-primary-deep">
                  {formatBDT(results.monthlyEmi)}/mo
                </strong>{" "}
                {t("vs. Monthly Bill Savings:", "বনাম মাসিক বিল সাশ্রয়:", "solar-calculator-client/vs-monthly-bill-savings")}{" "}
                <strong className="font-mono text-success">
                  {formatBDT(Math.round(results.annualSavings / 12))}/mo
                </strong>
              </span>
            </div>
            {results.annualSavings / 12 >= results.monthlyEmi ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-success">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                {t("Cash-flow positive", "ক্যাশ-ফ্লো পজিটিভ", "solar-calculator-client/cash-flow-positive")}
              </span>
            ) : (
              <span className="text-xs font-bold text-primary-deep">
                {t("Savings cover ~", "সাশ্রয়ে EMI-র ~", "solar-calculator-client/savings-cover")}
                {Math.round((results.annualSavings / 12 / Math.max(1, results.monthlyEmi)) * 100)}%{" "}
                {t("of the EMI", "পূরণ হয়", "solar-calculator-client/of-the-emi")}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
