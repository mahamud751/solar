"use client";

import { useInquiry } from "@/components/useInquiry";
import { InquiryFeedback, InquiryHoneypot } from "@/components/InquiryFeedback";
import { useState } from "react";
import { useContent } from "@/data/content";
import { useLang, type Bi } from "@/i18n/lang";

/** Navigation data for the Green Dhaka offering pages, shared by the Navbar and Footer. */
export const offeringsNav: Bi<{ label: string; items: [string, string][] }> = {
  en: {
    label: "Our Offerings",
    items: [
      ["Solar for Homes", "/homes"],
      ["Solar for Housing Societies", "/housing-society"],
      ["Solar for Commercial", "/commercial"],
    ],
  },
  bn: {
    label: "আমাদের সেবাসমূহ",
    items: [
      ["বাসাবাড়ির জন্য সোলার", "/homes"],
      ["হাউজিং সোসাইটির জন্য সোলার", "/housing-society"],
      ["বাণিজ্যিক প্রতিষ্ঠানের জন্য সোলার", "/commercial"],
    ],
  },
};

export const solutionsNav: Bi<{ label: string; items: [string, string][] }> = {
  en: {
    label: "Solar Solutions",
    items: [
      ["On-grid solar system", "/on-grid-solar-system"],
      ["Off-grid solar system", "/off-grid-solar-system"],
    ],
  },
  bn: {
    label: "সোলার সলিউশন",
    items: [
      ["অন-গ্রিড সোলার সিস্টেম", "/on-grid-solar-system"],
      ["অফ-গ্রিড সোলার সিস্টেম", "/off-grid-solar-system"],
    ],
  },
};

export const citiesNav: Bi<string> = { en: "Cities", bn: "শহরসমূহ" };



export function LeadForm() {
  const { lang } = useLang();
  const t = useContent().BLOCKS.CONSULTATION_FORM[lang];
  const { submit, pending, error } = useInquiry();
  const [sent, setSent] = useState(false);
  const [billIndex, setBillIndex] = useState(2);
  return (
    <form
      id="quote"
      onSubmit={async (e) => {
        e.preventDefault();
        const fields = Object.fromEntries(new FormData(e.currentTarget));
        const monthlyBill = ["<1500", "1500-2500", "2500-4000", "4000-8000", "8000+"][billIndex];
        if (await submit({ ...fields, kind: "CONSULTATION", monthlyBill })) setSent(true);
      }}
      className="rounded-2xl bg-card p-6 text-card-foreground shadow-2xl sm:p-8"
    >
      <h2 className="text-2xl font-bold">{t.title}</h2>
      {sent ? (
        <p className="mt-6 text-lg">{t.thanks}</p>
      ) : (
        <div className="mt-6 space-y-4">
          <InquiryHoneypot />
          {t.placeholders.map((p, index) => (
            <input
              key={index}
              name={["fullName", "phone", "city"][index]}
              type={index === 1 ? "tel" : "text"}
              autoComplete={["name", "tel", "address-level2"][index]}
              maxLength={index === 1 ? 24 : 120}
              required
              placeholder={p}
              aria-label={p}
              className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:border-primary"
            />
          ))}
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">{t.legend}</legend>
            <div className="flex flex-wrap gap-2">
              {t.bills.map((b, i) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => setBillIndex(i)}
                  aria-pressed={billIndex === i}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    billIndex === i ? "border-primary bg-primary text-primary-foreground" : "bg-background"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </fieldset>
          <InquiryFeedback error={error} />
          <button
            type="submit"
            disabled={pending}
            className="bg-brand-gradient h-12 w-full rounded-md font-bold text-primary-foreground transition hover:opacity-90"
          >
            {pending ? (lang === "en" ? "Sending…" : "পাঠানো হচ্ছে…") : t.submit}
          </button>
          <p className="text-center text-xs text-muted-foreground">{t.note}</p>
        </div>
      )}
    </form>
  );
}
