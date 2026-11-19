import { getPageMetadata } from "@/server/page-metadata";
import React from "react";
import { Calculator, ShieldCheck, Sparkles } from "lucide-react";
import { SolarCalculatorClient } from "@/components/SolarCalculatorClient";
import { FaqSection } from "@/components/FaqSection";
import { T } from "@/i18n/lang";

export function generateMetadata() {
  return getPageMetadata("solar-calculator");
}

export default function SolarCalculatorPage() {
  return (
    <>
      <section className="bg-hero-paper pt-28 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-deep">
              <Calculator className="h-3.5 w-3.5" aria-hidden="true" />
              <T copyKey="solar-calculator/clear-sky-irradiance-roi-model" en={"Clear-Sky Irradiance & ROI Model"} bn={"ক্লিয়ার-স্কাই বিকিরণ ও ROI মডেল"} />
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-deep sm:text-5xl">
              <T copyKey="solar-calculator/bangladesh-solar-calculator" en={"Bangladesh Solar Calculator"} bn={"বাংলাদেশ সোলার ক্যালকুলেটর"} />
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <T copyKey="solar-calculator/pick-your-electricity-utility-slide-your-monthly" en={"Pick your electricity utility, slide your monthly bill and roof area, and instantly see the right kW size, estimated cost in taka, your monthly bill after solar, payback period and 25-year savings."} bn={"আপনার বিদ্যুৎ বিতরণ কর্তৃপক্ষ বেছে নিন, মাসিক বিল ও ছাদের আয়তন সরান, আর সাথে সাথে দেখুন সঠিক কিলোওয়াট, টাকায় আনুমানিক খরচ, সোলারের পর মাসিক বিল, বিনিয়োগ-উদ্ধারের সময় ও ২৫ বছরের সাশ্রয়।"} />
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                <T copyKey="solar-calculator/based-on-2026-bangladesh-tariffs" en={"Based on 2026 Bangladesh tariffs"} bn={"২০২৬ সালের বাংলাদেশের ট্যারিফ অনুযায়ী"} />
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                <T copyKey="solar-calculator/no-phone-number-required-to-calculate" en={"No Phone Number Required to Calculate"} bn={"হিসাবের জন্য ফোন নম্বর লাগবে না"} />
              </span>
            </div>
          </div>

          <div className="mt-12">
            <SolarCalculatorClient />
          </div>
        </div>
      </section>

      <FaqSection />
    </>
  );
}
