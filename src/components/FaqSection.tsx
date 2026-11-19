"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useContent } from "@/data/content";
import { useT } from "@/i18n/lang";

export function FaqSection() {
  const t = useT();
  const { FAQS } = useContent();
  const containerRef = useRef<HTMLDivElement>(null);
  const [allExpanded, setAllExpanded] = useState(false);

  const handleToggleAll = () => {
    const container = containerRef.current;
    if (!container) return;
    const nextOpen = !allExpanded;
    container
      .querySelectorAll<HTMLDetailsElement>(":scope > details")
      .forEach((d) => {
        d.open = nextOpen;
      });
    setAllExpanded(nextOpen);
  };

  const syncExpandedState = () => {
    const container = containerRef.current;
    if (!container) return;
    const items = Array.from(
      container.querySelectorAll<HTMLDetailsElement>(":scope > details")
    );
    setAllExpanded(items.length > 0 && items.every((d) => d.open));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-t border-border/70 bg-surface py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center rounded-full bg-primary-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-deep">
              {t("Clear Answers", "স্পষ্ট উত্তর", "faq-section/clear-answers")}
            </span>
            <h2
              id="faq-heading"
              className="mt-3 text-3xl font-extrabold tracking-tight text-ink-deep sm:text-4xl"
            >
              {t("Frequently Asked Questions", "সাধারণ প্রশ্নোত্তর", "faq-section/frequently-asked-questions")}
            </h2>
            <p className="mt-2.5 text-base text-muted-foreground">
              {t("Everything you need to know about going solar with Green Dhaka. Can't find your answer?", "গ্রিন ঢাকার সাথে সোলারে যাওয়া সম্পর্কে যা জানা দরকার। উত্তর খুঁজে পাচ্ছেন না?", "faq-section/everything-you-need-to-know-about-going")}{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary-deep underline decoration-primary/40 underline-offset-4 hover:text-primary-deep"
              >
                {t("Reach out", "যোগাযোগ করুন", "faq-section/reach-out")}
              </Link>{" "}
              {t("and we'll get back within 48 hours.", "— আমরা ৪৮ ঘণ্টার মধ্যে উত্তর দেব।", "faq-section/and-we-ll-get-back-within-48")}
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleAll}
            aria-expanded={allExpanded}
            className="inline-flex shrink-0 items-center self-start rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-ink-deep shadow-card transition-colors hover:border-primary/40 hover:bg-primary-soft sm:self-auto"
          >
            {allExpanded ? t("Collapse all", "সব বন্ধ করুন", "faq-section/collapse-all") : t("Expand all", "সব খুলুন", "faq-section/expand-all")}
          </button>
        </div>

        {/* Adjacent native <details> elements — no headings inside <summary> per accessibility guidance */}
        <div ref={containerRef} className="solnce-accordion mt-9 space-y-3">
          {FAQS.map((item, idx) => (
            <details
              key={item.id}
              open={idx === 0}
              onToggle={syncExpandedState}
            >
              <summary>{item.question}</summary>
              <div className="px-6 pb-5 pl-[3.4rem] text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
