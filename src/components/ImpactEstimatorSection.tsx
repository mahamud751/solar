"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  PhoneCall,
  TrendingDown,
  Leaf,
  Banknote,
  Clock,
  Calculator,
} from "lucide-react";
import {
  formatBDT,
} from "@/data/solnce";
import { useContent } from "@/data/content";
import { useT } from "@/i18n/lang";

export function ImpactEstimatorSection() {
  const t = useT();
  const { COMPANY_INFO, BLOCKS: { QUICK_ESTIMATOR } } = useContent();
  const [monthlyBill, setMonthlyBill] = useState(5000);

  // Bangladesh rooftop sizing heuristics: ~1,400 units/kW/yr at ~৳10/unit,
  // ~৳88,000/kW installed, no cash subsidy (net metering credits surplus units).
  const systemKw = Math.max(2, Math.min(25, Math.round(monthlyBill / QUICK_ESTIMATOR.billPerKw)));
  const annualUnits = systemKw * QUICK_ESTIMATOR.annualUnitsPerKw;
  const annualSavings = Math.round(annualUnits * QUICK_ESTIMATOR.ratePerUnit);
  const netCost = systemKw * QUICK_ESTIMATOR.costPerKw;
  const paybackYears = +(netCost / annualSavings).toFixed(1);
  const lifetimeSavings = annualSavings * 23 - netCost;
  const co2Tonnes25Yr = Math.round(annualUnits * 0.67 * 25 / 1000);

  return (
    <>
      {/* Real savings. Real impact. + Interactive Quick Estimator */}
      <section
        aria-labelledby="impact-heading"
        className="border-y border-border/70 bg-surface py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Left Impact Narrative + Bento Stats */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3.5 py-1 text-xs font-bold text-emerald-800">
                <Leaf className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                {t("Real Savings · Real Impact", "আসল সাশ্রয় · আসল প্রভাব", "impact-estimator-section/real-savings-real-impact")}
              </span>
              <h2
                id="impact-heading"
                className="mt-3 text-3xl font-extrabold tracking-tight text-ink-deep sm:text-4xl"
              >
                {t("Real savings. Real impact.", "আসল সাশ্রয়। আসল প্রভাব।", "impact-estimator-section/real-savings-real-impact-2")}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {t("Green Dhaka customers cut their electricity bills by up to 90% — backed by itemised quotes, a Savings Guarantee and live generation tracking in the app.", "গ্রিন ঢাকার গ্রাহকরা বিদ্যুৎ বিল ৯০% পর্যন্ত কমান — বিস্তারিত কোটেশন, সাশ্রয় গ্যারান্টি ও অ্যাপে লাইভ উৎপাদন ট্র্যাকিংসহ।", "impact-estimator-section/green-dhaka-customers-cut-their-electricity-bills")}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
                  <TrendingDown className="h-5 w-5 text-primary-deep" aria-hidden="true" />
                  <p className="mt-3 font-mono text-2xl font-extrabold text-ink-deep">
                    {t("Up to 90%", "৯০% পর্যন্ত", "impact-estimator-section/up-to-90")}
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {t("Lower monthly electricity bills", "কম মাসিক বিদ্যুৎ বিল", "impact-estimator-section/lower-monthly-electricity-bills")}
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
                  <Banknote className="h-5 w-5 text-success" aria-hidden="true" />
                  <p className="mt-3 font-mono text-2xl font-extrabold text-ink-deep">
                    {t("0% down", "০% ডাউন", "impact-estimator-section/0-down")}
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {t("Easy EMI — your savings help pay the instalment", "সহজ EMI — আপনার সাশ্রয়েই কিস্তি পরিশোধে সহায়তা", "impact-estimator-section/easy-emi-your-savings-help-pay-the")}
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
                  <Clock className="h-5 w-5 text-gold" aria-hidden="true" />
                  <p className="mt-3 font-mono text-2xl font-extrabold text-ink-deep">
                    {t("4–6 yrs", "৪–৬ বছর", "impact-estimator-section/4-6-yrs")}
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {t("Typical home payback, then 20+ yrs near-free power", "বাসায় সাধারণ বিনিয়োগ-উদ্ধার, তারপর ২০+ বছর প্রায় ফ্রি বিদ্যুৎ", "impact-estimator-section/typical-home-payback-then-20-yrs-near")}
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
                  <Leaf className="h-5 w-5 text-success" aria-hidden="true" />
                  <p className="mt-3 font-mono text-2xl font-extrabold text-ink-deep">
                    {t("25 yrs", "২৫ বছর", "impact-estimator-section/25-yrs")}
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {t("Tier-1 linear panel performance warranty", "টিয়ার-১ প্যানেলের লিনিয়ার পারফরম্যান্স ওয়ারেন্টি", "impact-estimator-section/tier-1-linear-panel-performance-warranty")}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Interactive Savings Estimator Card */}
            <div className="lg:col-span-7">
              <div className="rounded-[2rem] border border-border bg-card p-6 shadow-elevated sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary-deep">
                      {t("Instant Rooftop Payback Preview", "তাৎক্ষণিক ছাদের বিনিয়োগ-উদ্ধার হিসাব", "impact-estimator-section/instant-rooftop-payback-preview")}
                    </p>
                    <h3 className="mt-1 text-xl font-extrabold text-ink-deep">
                      {t("Slide your monthly electricity bill", "আপনার মাসিক বিদ্যুৎ বিল সরান", "impact-estimator-section/slide-your-monthly-electricity-bill")}
                    </h3>
                  </div>
                  <span className="rounded-full bg-primary-soft px-3.5 py-1.5 font-mono text-sm font-extrabold text-primary-deep">
                    {formatBDT(monthlyBill)} / mo
                  </span>
                </div>

                <div className="mt-5">
                  <label htmlFor="quick-bill-slider" className="sr-only">
                    {t("Monthly electricity bill in taka", "টাকায় মাসিক বিদ্যুৎ বিল", "impact-estimator-section/monthly-electricity-bill-in-taka")}
                  </label>
                  <input
                    id="quick-bill-slider"
                    type="range"
                    min={1500}
                    max={30000}
                    step={500}
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="h-2.5 w-full cursor-pointer accent-primary"
                  />
                  <div className="mt-1.5 flex justify-between font-mono text-xs text-muted-foreground">
                    <span>৳1,500</span>
                    <span>৳15,000</span>
                    <span>৳30,000+</span>
                  </div>
                </div>

                <div className="mt-6 grid gap-3.5 sm:grid-cols-3">
                  <div className="rounded-2xl bg-primary-soft/75 p-4">
                    <p className="text-xs font-semibold text-primary-deep">
                      {t("Recommended Plant", "প্রস্তাবিত প্ল্যান্ট", "impact-estimator-section/recommended-plant")}
                    </p>
                    <p className="mt-1 font-mono text-2xl font-extrabold text-ink-deep tabular-nums">
                      {systemKw} kW
                    </p>
                    <p className="mt-0.5 text-[0.72rem] text-muted-foreground">
                      ~{annualUnits.toLocaleString("en-IN")} {t("units / yr", "ইউনিট / বছর", "impact-estimator-section/units-yr")}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-success-soft p-4">
                    <p className="text-xs font-semibold text-emerald-800">
                      {t("Estimated System Cost", "আনুমানিক সিস্টেম খরচ", "impact-estimator-section/estimated-system-cost")}
                    </p>
                    <p className="mt-1 font-mono text-2xl font-extrabold text-emerald-950 tabular-nums">
                      {formatBDT(netCost)}
                    </p>
                    <p className="mt-0.5 text-[0.72rem] text-emerald-800">
                      {t("Installation & net metering included", "ইনস্টলেশন ও নেট মিটারিংসহ", "impact-estimator-section/installation-net-metering-included")}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gold-soft p-4">
                    <p className="text-xs font-semibold text-[#9A5D06]">
                      {t("25-Year Net Profit", "২৫ বছরের নিট লাভ", "impact-estimator-section/25-year-net-profit")}
                    </p>
                    <p className="mt-1 font-mono text-2xl font-extrabold text-ink-deep tabular-nums">
                      {formatBDT(lifetimeSavings)}
                    </p>
                    <p className="mt-0.5 text-[0.72rem] text-[#9A5D06]">
                      {t("Payback", "বিনিয়োগ-উদ্ধার", "impact-estimator-section/payback")} ~{paybackYears} {t("yrs", "বছর", "impact-estimator-section/yrs")} · {co2Tonnes25Yr}t CO₂
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                  <p className="text-xs text-muted-foreground">
                    {t("Want utility-specific tariffs, commercial sizing or EMI options?", "বিতরণ কর্তৃপক্ষভিত্তিক ট্যারিফ, বাণিজ্যিক আকার বা EMI বিকল্প চান?", "impact-estimator-section/want-utility-specific-tariffs-commercial-sizing-or")}
                  </p>
                  <Link
                    href={`/solar-calculator?bill=${monthlyBill}`}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
                  >
                    <Calculator className="h-4 w-4" aria-hidden="true" />
                    <span>{t("Open Full Calculator", "পূর্ণ ক্যালকুলেটর খুলুন", "impact-estimator-section/open-full-calculator")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Impact CTA Banner — "Your rooftop can start working for you." */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal-on-scroll relative overflow-hidden rounded-[2.25rem] bg-secondary px-6 py-12 text-white shadow-elevated sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-teal/40 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-[#F6C44C]/20 blur-3xl"
            />

            <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {t("Your rooftop can start working for you.", "আপনার ছাদ এখনই আপনার জন্য কাজ শুরু করতে পারে।", "impact-estimator-section/your-rooftop-can-start-working-for-you")}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-300">
                  {t("Our solar expert is one call away. They'll understand your need and help you choose the best quality products at the most affordable rates.", "আমাদের সোলার বিশেষজ্ঞ মাত্র একটি কল দূরে। তিনি আপনার প্রয়োজন বুঝে সবচেয়ে সাশ্রয়ী দামে সেরা মানের পণ্য বাছাইয়ে সাহায্য করবেন।", "impact-estimator-section/our-solar-expert-is-one-call-away")}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3.5">
                <Link
                  href="/contact#quote"
                  className="inline-flex items-center gap-2 rounded-full bg-solnce-gold px-7 py-3.5 text-sm font-extrabold text-[#12151C] shadow-sm transition-transform hover:-translate-y-0.5 sm:text-base"
                >
                  <span>{t("Get a free quote", "ফ্রি কোটেশন নিন", "impact-estimator-section/get-a-free-quote")}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 font-mono text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:text-base"
                >
                  <PhoneCall className="h-4 w-4 text-[#F6C44C]" aria-hidden="true" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
