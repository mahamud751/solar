"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Smartphone,
  Sparkles,
  ArrowRight,
  Sliders,
  ShieldCheck,
  BarChart3,
  FileCheck2,
  Sun,
  Wrench,
  Landmark,
  Droplets,
} from "lucide-react";
import { formatBDT } from "@/data/solnce";
import { useContent } from "@/data/content";
import { useT } from "@/i18n/lang";

export function AppShowcaseSection() {
  const t = useT();
  const { APP_STEPS, PANEL_BRANDS, COMPANY_INFO } = useContent();
  const [activeStep, setActiveStep] = useState(0);
  const [sampleBill, setSampleBill] = useState(5000);
  const [selectedBrandIdx, setSelectedBrandIdx] = useState(0); // LONGi

  // Bangladesh sizing: ~117 units/kW/month at ~৳10/unit, ~৳88,000/kW installed
  const recommendedKw = Math.max(2, Math.min(15, Math.round(sampleBill / 1150)));
  const netCost = recommendedKw * 88000;
  const monthlySaving = Math.round(recommendedKw * 117 * 10);

  return (
    <>
      {/* How Our Solar App Works — Interactive 4-Step Walkthrough */}
      <section
        aria-labelledby="how-app-works-heading"
        className="border-y border-border/70 bg-surface py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-deep">
              <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
              {t("Guided In-App Journey", "অ্যাপে ধাপে ধাপে গাইড", "app-showcase-section/guided-in-app-journey")}
            </span>
            <h2
              id="how-app-works-heading"
              className="mt-3 text-3xl font-extrabold tracking-tight text-ink-deep sm:text-4xl"
            >
              {t("How our Solar App Works", "আমাদের সোলার অ্যাপ যেভাবে কাজ করে", "app-showcase-section/how-our-solar-app-works")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {t("The Green Dhaka App makes solar installation easy. In a few clicks, size your system, compare panels and approve your design — from first estimate to commissioning, all guided in-app.", "গ্রিন ঢাকা অ্যাপ সোলার ইনস্টলেশন সহজ করে। কয়েক ক্লিকেই সিস্টেমের আকার ঠিক করুন, প্যানেল তুলনা করুন ও ডিজাইন অনুমোদন দিন — প্রথম হিসাব থেকে চালু হওয়া পর্যন্ত সবকিছু অ্যাপেই।", "app-showcase-section/the-green-dhaka-app-makes-solar-installation")}
            </p>
          </div>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
            {/* Left Interactive Steps */}
            <div className="space-y-3.5 lg:col-span-6">
              {APP_STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    aria-pressed={isActive}
                    className={`group flex w-full items-start gap-4 rounded-3xl border p-5 text-left transition-all duration-200 ${
                      isActive
                        ? "border-primary/40 bg-card shadow-elevated"
                        : "border-border/80 bg-card/60 hover:border-primary/25 hover:bg-card"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-mono text-sm font-extrabold transition-colors ${
                        isActive
                          ? "bg-solnce-blue text-white shadow-glow"
                          : "bg-primary-soft text-primary-deep group-hover:bg-primary/15"
                      }`}
                    >
                      {step.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-lg font-extrabold text-ink-deep">
                          {step.title}
                        </h3>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold ${
                            isActive
                              ? "bg-gold-soft text-[#9A5D06]"
                              : "bg-surface-muted text-muted-foreground"
                          }`}
                        >
                          {step.badge}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Interactive Live Phone Screen */}
            <div className="flex justify-center lg:col-span-6">
              <div className="relative w-full max-w-[23.5rem] rounded-[2.6rem] border-[8px] border-[#131B2E] bg-secondary p-3 shadow-elevated">
                {/* Phone notch */}
                <div
                  aria-hidden="true"
                  className="mx-auto mb-2.5 h-5 w-28 rounded-full bg-[#1C2740]"
                />

                {/* Interactive App Viewport */}
                <div className="min-h-[28.5rem] overflow-hidden rounded-[1.85rem] bg-[#F7FAFE] p-4 text-ink-deep">
                  {/* App Top Bar */}
                  <div className="flex items-center justify-between border-b border-border/80 pb-3">
                    <div>
                      <p className="text-[0.65rem] font-bold uppercase tracking-wider text-primary-deep">
                        {t("Step", "ধাপ", "app-showcase-section/step")} {APP_STEPS[activeStep].number} · {t("Green Dhaka App", "গ্রিন ঢাকা অ্যাপ", "app-showcase-section/green-dhaka-app")}
                      </p>
                      <p className="text-base font-extrabold text-ink-deep">
                        {APP_STEPS[activeStep].screenTitle}
                      </p>
                    </div>
                    <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[0.68rem] font-bold text-primary-deep">
                      {APP_STEPS[activeStep].screenSub}
                    </span>
                  </div>

                  {/* Step 01 Screen: Interactive Bill Sizer */}
                  {activeStep === 0 && (
                    <div className="mt-4 space-y-4">
                      <div className="rounded-2xl bg-solnce-blue p-4 text-white">
                        <div className="flex items-center justify-between text-xs text-white/80">
                          <span>{t("Recommended Rooftop Plant", "প্রস্তাবিত ছাদের প্ল্যান্ট", "app-showcase-section/recommended-rooftop-plant")}</span>
                          <Sliders className="h-3.5 w-3.5" aria-hidden="true" />
                        </div>
                        <p className="mt-1 font-mono text-3xl font-extrabold tabular-nums">
                          {recommendedKw}.0 kW
                        </p>
                        <p className="mt-1 text-xs text-white/80">
                          {t("Generates", "উৎপাদন", "app-showcase-section/generates")} ~{recommendedKw * 117} {t("units/mo", "ইউনিট/মাস", "app-showcase-section/units-mo")} ·{" "}
                          {recommendedKw * 90} sq.ft roof
                        </p>
                      </div>

                      <div className="rounded-2xl border border-border bg-white p-3.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span>{t("Monthly Electricity Bill", "মাসিক বিদ্যুৎ বিল", "app-showcase-section/monthly-electricity-bill")}</span>
                          <span className="font-mono text-primary-deep">
                            {formatBDT(sampleBill)}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={1500}
                          max={16000}
                          step={500}
                          value={sampleBill}
                          onChange={(e) => setSampleBill(Number(e.target.value))}
                          aria-label={t("Preview monthly bill in Green Dhaka App", "গ্রিন ঢাকা অ্যাপে মাসিক বিল দেখুন", "app-showcase-section/preview-monthly-bill-in-green-dhaka-app")}
                          className="mt-2.5 w-full cursor-pointer accent-primary"
                        />
                        <div className="mt-1 flex justify-between text-[0.68rem] text-muted-foreground">
                          <span>৳1,500</span>
                          <span>DESCO / DPDC</span>
                          <span>৳16,000</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="rounded-xl border border-border bg-white p-3">
                          <p className="text-[0.68rem] text-muted-foreground">
                            {t("Monthly Saving", "মাসিক সাশ্রয়", "app-showcase-section/monthly-saving")}
                          </p>
                          <p className="mt-0.5 font-mono text-base font-extrabold text-success">
                            ~{formatBDT(monthlySaving)}
                          </p>
                        </div>
                        <div className="rounded-xl border border-border bg-white p-3">
                          <p className="text-[0.68rem] text-muted-foreground">
                            {t("Estimated System Cost", "আনুমানিক সিস্টেম খরচ", "app-showcase-section/estimated-system-cost")}
                          </p>
                          <p className="mt-0.5 font-mono text-base font-extrabold text-ink-deep">
                            {formatBDT(netCost)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 02 Screen: Pick Your Solar Panels */}
                  {activeStep === 1 && (
                    <div className="mt-4 space-y-2.5">
                      {PANEL_BRANDS.map((brand, bIdx) => {
                        const chosen = selectedBrandIdx === bIdx;
                        return (
                          <button
                            key={brand.name}
                            type="button"
                            onClick={() => setSelectedBrandIdx(bIdx)}
                            className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left transition-all ${
                              chosen
                                ? "border-primary bg-primary-soft/70 shadow-sm"
                                : "border-border bg-white hover:border-primary/30"
                            }`}
                          >
                            <div>
                              <p className="text-sm font-extrabold text-ink-deep">
                                {brand.name}
                              </p>
                              <p className="text-[0.7rem] text-muted-foreground">
                                {brand.wattage} · {brand.efficiency} eff ·{" "}
                                {brand.warranty} warranty
                              </p>
                            </div>
                            <span
                              className={`rounded-full px-2.5 py-1 text-[0.68rem] font-bold ${
                                chosen
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-surface text-muted-foreground"
                              }`}
                            >
                              {chosen ? "Selected" : "Pick"}
                            </span>
                          </button>
                        );
                      })}
                      <div className="rounded-xl bg-success-soft p-3 text-xs font-semibold text-emerald-900">
                        <ShieldCheck
                          className="mr-1.5 inline h-4 w-4 text-success"
                          aria-hidden="true"
                        />
                        {t("Tier-1 panels with 30-year performance warranty ·", "৩০ বছরের পারফরম্যান্স ওয়ারেন্টিসহ টিয়ার-১ প্যানেল ·", "app-showcase-section/tier-1-panels-with-30-year-performance")}{" "}
                        {(PANEL_BRANDS[selectedBrandIdx] ?? PANEL_BRANDS[0])?.name ?? "—"}
                      </div>
                    </div>
                  )}

                  {/* Step 03 Screen: Side-by-Side Comparison */}
                  {activeStep === 2 && (
                    <div className="mt-4 space-y-3">
                      <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border bg-white p-3 text-xs">
                        <div className="font-bold text-muted-foreground">
                          {t("Spec", "স্পেসিফিকেশন", "app-showcase-section/spec")}
                        </div>
                        <div className="font-extrabold text-primary-deep">
                          LONGi Hi-MO
                        </div>
                        <div className="font-extrabold text-ink-deep">
                          Trina Vertex N
                        </div>

                        <div className="border-t border-border/60 pt-2 text-muted-foreground">
                          {t("Rated Power", "রেটেড পাওয়ার", "app-showcase-section/rated-power")}
                        </div>
                        <div className="border-t border-border/60 pt-2 font-mono font-bold">
                          580 Wp
                        </div>
                        <div className="border-t border-border/60 pt-2 font-mono font-bold">
                          585 Wp
                        </div>

                        <div className="border-t border-border/60 pt-2 text-muted-foreground">
                          {t("Efficiency", "দক্ষতা", "app-showcase-section/efficiency")}
                        </div>
                        <div className="border-t border-border/60 pt-2 font-mono font-bold text-success">
                          22.8%
                        </div>
                        <div className="border-t border-border/60 pt-2 font-mono font-bold">
                          22.5%
                        </div>

                        <div className="border-t border-border/60 pt-2 text-muted-foreground">
                          {t("Temp Coeff", "তাপমাত্রা সহগ", "app-showcase-section/temp-coeff")}
                        </div>
                        <div className="border-t border-border/60 pt-2 font-mono font-bold text-success">
                          -0.29%/°C
                        </div>
                        <div className="border-t border-border/60 pt-2 font-mono font-bold">
                          -0.30%/°C
                        </div>

                        <div className="border-t border-border/60 pt-2 text-muted-foreground">
                          {t("Warranty", "ওয়ারেন্টি", "app-showcase-section/warranty")}
                        </div>
                        <div className="border-t border-border/60 pt-2 font-mono font-bold">
                          {t("30 Years", "৩০ বছর", "app-showcase-section/30-years")}
                        </div>
                        <div className="border-t border-border/60 pt-2 font-mono font-bold">
                          {t("30 Years", "৩০ বছর", "app-showcase-section/30-years")}
                        </div>
                      </div>
                      <div className="rounded-2xl bg-primary-soft p-3 text-xs text-primary-deep">
                        <BarChart3
                          className="mr-1.5 inline h-4 w-4 text-primary-deep"
                          aria-hidden="true"
                        />
                        <strong>{t("Site Match:", "সাইটের সাথে মিল:", "app-showcase-section/site-match")}</strong> {t("Lower temperature coefficient keeps generation higher through Bangladesh's hot, humid summers.", "কম তাপমাত্রা সহগ বাংলাদেশের গরম ও আর্দ্র গ্রীষ্মেও উৎপাদন বেশি রাখে।", "app-showcase-section/lower-temperature-coefficient-keeps-generation-higher-through")}
                      </div>
                    </div>
                  )}

                  {/* Step 04 Screen: BOQ & Live Stage Tracker */}
                  {activeStep === 3 && (
                    <div className="mt-4 space-y-3">
                      <div className="rounded-2xl bg-secondary p-3.5 text-white">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#F6C44C]">
                            {t("Roof Layout & Quote Approved", "ছাদের লেআউট ও কোটেশন অনুমোদিত", "app-showcase-section/roof-layout-quote-approved")}
                          </span>
                          <FileCheck2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                        </div>
                        <p className="mt-1 text-xs text-slate-300">
                          9× 580 Wp LONGi · 5 kW Growatt Inverter · GreenPro Mount™
                        </p>
                      </div>

                      <ol className="space-y-2 text-xs">
                        {[
                          { label: t("Site Survey & Shadow Analysis", "সাইট সার্ভে ও ছায়া বিশ্লেষণ", "app-showcase-section/site-survey-shadow-analysis"), done: true },
                          { label: t("Material Dispatch & Quality Check", "মালামাল প্রেরণ ও মান যাচাই", "app-showcase-section/material-dispatch-quality-check"), done: true },
                          { label: t("Installation & Earthing Complete", "ইনস্টলেশন ও আর্থিং সম্পন্ন", "app-showcase-section/installation-earthing-complete"), done: true },
                          { label: t("Net-Metering Approval (DESCO)", "নেট-মিটারিং অনুমোদন (DESCO)", "app-showcase-section/net-metering-approval-desco"), active: true },
                          { label: t("Bi-Directional Meter & Switch-On", "বাই-ডিরেকশনাল মিটার ও চালু", "app-showcase-section/bi-directional-meter-switch-on"), done: false },
                        ].map((stage) => (
                          <li
                            key={stage.label}
                            className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 font-semibold ${
                              stage.active
                                ? "border-primary bg-primary-soft text-primary-deep"
                                : stage.done
                                ? "border-border bg-white text-ink-deep"
                                : "border-border/60 bg-surface text-muted-foreground"
                            }`}
                          >
                            <CheckCircle2
                              className={`h-4 w-4 shrink-0 ${
                                stage.done
                                  ? "text-success"
                                  : stage.active
                                  ? "text-primary-deep"
                                  : "text-slate-300"
                              }`}
                              aria-hidden="true"
                            />
                            <span>{stage.label}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Bottom Step Dots inside Phone */}
                  <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-3">
                    <div className="flex gap-1.5">
                      {APP_STEPS.map((s, idx) => (
                        <button
                          key={s.number}
                          type="button"
                          onClick={() => setActiveStep(idx)}
                          aria-label={`View step ${idx + 1}: ${s.title}`}
                          className={`h-2 rounded-full transition-all ${
                            activeStep === idx
                              ? "w-6 bg-primary"
                              : "w-2 bg-border hover:bg-primary/40"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveStep((prev) => (prev + 1) % APP_STEPS.length)
                      }
                      className="text-xs font-bold text-primary-deep hover:underline"
                    >
                      {t("Next screen →", "পরের স্ক্রিন →", "app-showcase-section/next-screen")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature App Download Band — "Step into Green Dhaka — the future of solar solutions" */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal-on-scroll relative overflow-hidden rounded-[2.25rem] bg-solnce-blue px-6 py-12 text-white shadow-elevated sm:px-12 sm:py-16">
            {/* Ambient radial glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#F6C44C]/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-primary/25 blur-3xl"
            />

            <div className="relative grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1 text-xs font-bold text-[#F6C44C] backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("Survey, install & track — all in one place", "সার্ভে, ইনস্টল ও ট্র্যাক — সব এক জায়গায়", "app-showcase-section/survey-install-track-all-in-one-place")}
                </span>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {t("Step into Green Dhaka — the future of solar solutions", "গ্রিন ঢাকায় আসুন — সোলার সমাধানের ভবিষ্যৎ", "app-showcase-section/step-into-green-dhaka-the-future-of")}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/80">
                  {t("From your free roof survey to switch-on and 25 years of service, Green Dhaka handles everything. Track every unit your roof generates and the taka it saves, book cleaning and maintenance, and follow your net-metering approval — all in one place.", "ফ্রি ছাদ সার্ভে থেকে চালু হওয়া এবং ২৫ বছরের সেবা — সবকিছু গ্রিন ঢাকা সামলায়। ছাদের উৎপাদিত প্রতিটি ইউনিট ও সাশ্রয়ী টাকা দেখুন, পরিষ্কার ও রক্ষণাবেক্ষণ বুক করুন এবং নেট-মিটারিং অনুমোদন অনুসরণ করুন — সব এক জায়গায়।", "app-showcase-section/from-your-free-roof-survey-to-switch")}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="/contact#quote"
                    className="inline-flex items-center gap-2.5 rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-ink-deep shadow-card transition-transform hover:-translate-y-0.5"
                  >
                    <Smartphone className="h-4 w-4 text-primary-deep" aria-hidden="true" />
                    <span>{t("Book a free survey", "ফ্রি সার্ভে বুক করুন", "app-showcase-section/book-a-free-survey")}</span>
                  </a>
                  <a
                    href={COMPANY_INFO.phoneHref}
                    className="inline-flex items-center gap-2.5 rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-extrabold text-white backdrop-blur-sm transition-transform hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    <Smartphone className="h-4 w-4 text-[#F6C44C]" aria-hidden="true" />
                    <span>{t("Call", "কল করুন", "app-showcase-section/call")} {COMPANY_INFO.phone}</span>
                  </a>
                </div>
              </div>

              {/* Dual App UI Preview Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
                {/* Screen 1: Offerings Hub */}
                <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#F6C44C]">
                    {t("Green Dhaka App Home", "গ্রিন ঢাকা অ্যাপ হোম", "app-showcase-section/green-dhaka-app-home")}
                  </p>
                  <p className="mt-1 text-base font-extrabold text-white">
                    {t("Book anything in 1 tap", "এক ট্যাপে যেকোনো কিছু বুক করুন", "app-showcase-section/book-anything-in-1-tap")}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    {[
                      { icon: Sun, label: t("New Solar", "নতুন সোলার", "app-showcase-section/new-solar"), sub: t("Free survey", "ফ্রি সার্ভে", "app-showcase-section/free-survey") },
                      { icon: Droplets, label: t("Cleaning", "পরিষ্কার", "app-showcase-section/cleaning"), sub: t("Robotic / Jet", "রোবটিক / জেট", "app-showcase-section/robotic-jet") },
                      { icon: Wrench, label: t("Maintenance", "রক্ষণাবেক্ষণ", "app-showcase-section/maintenance"), sub: t("Annual O&M", "বার্ষিক O&M", "app-showcase-section/annual-o-m") },
                      { icon: Landmark, label: t("Solar Loan", "সোলার লোন", "app-showcase-section/solar-loan"), sub: t("0% down EMI", "০% ডাউন EMI", "app-showcase-section/0-down-emi") },
                    ].map((tile) => (
                      <div
                        key={tile.label}
                        className="rounded-2xl bg-white/12 p-3 transition-colors hover:bg-white/20"
                      >
                        <tile.icon
                          className="h-4 w-4 text-[#F6C44C]"
                          aria-hidden="true"
                        />
                        <p className="mt-2 text-xs font-bold text-white">
                          {tile.label}
                        </p>
                        <p className="text-[0.68rem] text-white/70">
                          {tile.sub}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Screen 2: Live Bookings */}
                <div className="rounded-3xl border border-white/20 bg-secondary/70 p-5 backdrop-blur-md">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    {t("Active Bookings", "চলমান বুকিং", "app-showcase-section/active-bookings")}
                  </p>
                  <p className="mt-1 text-base font-extrabold text-white">
                    {t("Live project milestones", "প্রকল্পের লাইভ অগ্রগতি", "app-showcase-section/live-project-milestones")}
                  </p>
                  <div className="mt-4 space-y-2.5">
                    {[
                      {
                        title: t("5 kW Rooftop Install", "৫ কিলোওয়াট ছাদে ইনস্টল", "app-showcase-section/5-kw-rooftop-install"),
                        status: t("Net Metering · 85%", "নেট মিটারিং · ৮৫%", "app-showcase-section/net-metering-85"),
                        bar: "w-[85%] bg-emerald-400",
                      },
                      {
                        title: t("Quarterly Jet Cleaning", "ত্রৈমাসিক জেট ক্লিনিং", "app-showcase-section/quarterly-jet-cleaning"),
                        status: t("Scheduled · Sat 7 AM", "নির্ধারিত · শনিবার সকাল ৭টা", "app-showcase-section/scheduled-sat-7-am"),
                        bar: "w-[45%] bg-[#F6C44C]",
                      },
                      {
                        title: t("Savings Guarantee", "সাশ্রয় গ্যারান্টি", "app-showcase-section/savings-guarantee"),
                        status: t("On track · ৳6,200 saved this month", "ঠিক পথে · এ মাসে ৳6,200 সাশ্রয়", "app-showcase-section/on-track-6-200-saved-this-month"),
                        bar: "w-full bg-primary",
                      },
                    ].map((job) => (
                      <div
                        key={job.title}
                        className="rounded-2xl border border-white/10 bg-white/5 p-3"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white">
                            {job.title}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[0.7rem] text-slate-300">
                          {job.status}
                        </p>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                          <div className={`h-full rounded-full ${job.bar}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/solar-calculator"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#F6C44C] hover:underline"
                  >
                    <span>{t("Try web calculator now", "এখনই ওয়েব ক্যালকুলেটর ব্যবহার করুন", "app-showcase-section/try-web-calculator-now")}</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
