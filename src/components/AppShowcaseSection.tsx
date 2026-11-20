"use client";

import React from "react";
import Link from "next/link";
import {
  Smartphone,
  Sparkles,
  ArrowRight,
  Sun,
  Wrench,
  Landmark,
  Droplets,
} from "lucide-react";
import { useContent } from "@/data/content";
import { useT } from "@/i18n/lang";

export function AppShowcaseSection() {
  const t = useT();
  const { COMPANY_INFO } = useContent();

  return (
    <>
      {/* Feature App Download Band — "Step into Green Dhaka — the future of solar solutions" */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal-on-scroll relative overflow-hidden rounded-[2.25rem] bg-solnce-blue px-6 py-12 text-white shadow-elevated sm:px-12 sm:py-16">
            {/* Ambient radial glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-primary/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-primary/25 blur-3xl"
            />

            <div className="relative grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1 text-xs font-bold text-primary backdrop-blur-sm">
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
                    <Smartphone className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span>{t("Call", "কল করুন", "app-showcase-section/call")} {COMPANY_INFO.phone}</span>
                  </a>
                </div>
              </div>

              {/* Dual App UI Preview Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
                {/* Screen 1: Offerings Hub */}
                <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
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
                      { icon: Landmark, label: t("Solar Loan", "সোলার লোন", "app-showcase-section/solar-loan"), sub: t("20% down EMI", "২০% ডাউন EMI", "app-showcase-section/0-down-emi") },
                    ].map((tile) => (
                      <div
                        key={tile.label}
                        className="rounded-2xl bg-white/12 p-3 transition-colors hover:bg-white/20"
                      >
                        <tile.icon
                          className="h-4 w-4 text-primary"
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
                        bar: "w-[45%] bg-primary",
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
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
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
