"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  User,
  Phone,
  Mail,
  MapPin,
  Banknote,
  ChevronDown,
  Check,
} from "lucide-react";
import { useInquiry } from "./useInquiry";
import { InquiryFeedback, InquiryHoneypot } from "./InquiryFeedback";
import { useT } from "@/i18n/lang";

const SEGMENT_BN: Record<string, string> = { Residential: "আবাসিক", Commercial: "বাণিজ্যিক", Industrial: "ইন্ডাস্ট্রিয়াল", "EPC Partner": "EPC অংশীদার" };

interface QuoteFormProps {
  kind?: "QUOTE" | "PARTNERSHIP";
  defaultSegment?: "Residential" | "Commercial" | "Industrial" | "EPC Partner";
  compact?: boolean;
  title?: string;
  subtitle?: string;
  titleBn?: string;
  subtitleBn?: string;
}

export function QuoteForm({
  kind = "QUOTE",
  defaultSegment = "Residential",
  compact = false,
  title = "Get Your Free Clear-Sky Solar Quote",
  subtitle = "Zero spam. Our solar engineer shares a roof layout & itemised quote within 24 hours.",
  titleBn = "আপনার ফ্রি সোলার কোটেশন নিন",
  subtitleBn = "কোনো স্প্যাম নয়। আমাদের সোলার প্রকৌশলী ২৪ ঘণ্টার মধ্যে ছাদের লেআউট ও বিস্তারিত কোটেশন পাঠাবেন।",
}: QuoteFormProps) {
  const { submit, pending, error } = useInquiry();
  const formRef = useRef<HTMLFormElement>(null);
  const t = useT();
  const announcerRef = useRef<HTMLDivElement>(null);
  const idPrefix = useId().replace(/:/g, "");

  const [segment, setSegment] = useState(defaultSegment);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  // Sync aria-invalid, dynamic aria-describedby, polite live region & WeakMap fallback
  useEffect(() => {
    const form = formRef.current;
    const announcer = announcerRef.current;
    if (!form || !announcer) return;

    const supportsUserInvalid =
      typeof CSS !== "undefined" && CSS.supports("selector(:user-invalid)");

    const dirtyState = new WeakMap<
      HTMLElement,
      { hasInteracted: boolean; hasBlurred: boolean }
    >();
    const flagged = new WeakSet<HTMLElement>();
    const announced = new WeakSet<HTMLElement>();
    let announceTimer: ReturnType<typeof setTimeout> | undefined;
    let announcedField: HTMLElement | null = null;

    const linkError = (el: HTMLElement, shown: boolean) => {
      const errorId = el.dataset.error;
      if (!errorId) return;
      const ids = (el.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter((id) => id && id !== errorId);
      if (shown) ids.push(errorId);
      if (ids.length) el.setAttribute("aria-describedby", ids.join(" "));
      else el.removeAttribute("aria-describedby");
    };

    const announceError = (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
      const errorId = el.dataset.error;
      if (!errorId) return;
      const errNode = document.getElementById(errorId);
      if (!errNode) return;
      const label = el.labels?.[0]?.textContent?.trim()
        ? `${el.labels[0].textContent.trim()}: `
        : "";
      clearTimeout(announceTimer);
      announcer.textContent = "";
      announcedField = el;
      announceTimer = setTimeout(() => {
        announcer.textContent = `${label}${errNode.textContent?.trim() ?? ""}`;
      }, 450);
    };

    const syncAria = (target: EventTarget | null, shouldAnnounce = false) => {
      if (
        !(
          target instanceof HTMLInputElement ||
          target instanceof HTMLSelectElement ||
          target instanceof HTMLTextAreaElement
        )
      ) {
        return;
      }

      const invalid = supportsUserInvalid
        ? target.matches(":user-invalid")
        : target.classList.contains("user-invalid-fallback");

      if (invalid) {
        if (shouldAnnounce && !announced.has(target)) {
          announceError(target);
          announced.add(target);
        }
        target.setAttribute("aria-invalid", "true");
        linkError(target, true);
        flagged.add(target);
      } else if (
        flagged.has(target) ||
        target.getAttribute("aria-invalid") !== "true"
      ) {
        target.setAttribute("aria-invalid", "false");
        linkError(target, false);
        flagged.delete(target);
        announced.delete(target);
        if (announcedField === target) {
          clearTimeout(announceTimer);
          announcer.textContent = "";
        }
      }
    };

    const updateFallbackClasses = (
      el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    ) => {
      if (supportsUserInvalid) return;
      const valid = el.validity.valid;
      el.classList.toggle("user-invalid-fallback", !valid);
      el.classList.toggle("user-valid-fallback", valid);
    };

    // Start every field at aria-invalid="false"
    form
      .querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        "input, select, textarea"
      )
      .forEach((el) => {
        el.setAttribute("aria-invalid", "false");
      });

    const onBlur = (e: Event) => {
      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement
      ) {
        if (!supportsUserInvalid) {
          const st = dirtyState.get(target) || {
            hasInteracted: false,
            hasBlurred: false,
          };
          st.hasBlurred = true;
          dirtyState.set(target, st);
          if (st.hasInteracted) updateFallbackClasses(target);
        }
        syncAria(target, true);
      }
    };

    const onInput = (e: Event) => {
      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement
      ) {
        if (!supportsUserInvalid) {
          const st = dirtyState.get(target) || {
            hasInteracted: false,
            hasBlurred: false,
          };
          st.hasInteracted = true;
          dirtyState.set(target, st);
          if (st.hasBlurred) updateFallbackClasses(target);
        }
        if (target.hasAttribute("aria-invalid")) syncAria(target, false);
      }
    };

    const onChange = (e: Event) => {
      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement
      ) {
        if (!supportsUserInvalid) {
          const st = dirtyState.get(target) || {
            hasInteracted: false,
            hasBlurred: false,
          };
          st.hasInteracted = true;
          dirtyState.set(target, st);
          if (st.hasBlurred) updateFallbackClasses(target);
        }
        syncAria(target, true);
      }
    };

    const onInvalid = (e: Event) => {
      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement
      ) {
        if (!supportsUserInvalid) {
          dirtyState.set(target, { hasInteracted: true, hasBlurred: true });
          updateFallbackClasses(target);
        }
        announced.add(target);
        syncAria(target, false);
      }
    };

    form.addEventListener("blur", onBlur, true);
    form.addEventListener("input", onInput);
    form.addEventListener("change", onChange, true);
    form.addEventListener("invalid", onInvalid, true);

    return () => {
      clearTimeout(announceTimer);
      form.removeEventListener("blur", onBlur, true);
      form.removeEventListener("input", onInput);
      form.removeEventListener("change", onChange, true);
      form.removeEventListener("invalid", onInvalid, true);
    };
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const fd = new FormData(form);
    if (await submit({ ...Object.fromEntries(fd), segment, kind })) {
      setSubmittedName(String(fd.get("fullName")).trim());
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-success/30 bg-success-soft p-8 text-center shadow-card">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-success text-white shadow-sm">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-extrabold text-ink-deep">
          {t(`Quote Request Received, ${submittedName}!`, `কোটেশনের অনুরোধ পেয়েছি, ${submittedName}!`)}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {t("A verified Green Dhaka solar engineer for", "")}{" "}
          <strong className="text-ink-deep">{t(segment, SEGMENT_BN[segment])}</strong>{" "}
          {t(
            "installations will send your generation estimate and itemised quote within 24 hours.",
            "ইনস্টলেশনের জন্য গ্রিন ঢাকার একজন যাচাইকৃত সোলার প্রকৌশলী ২৪ ঘণ্টার মধ্যে উৎপাদনের হিসাব ও বিস্তারিত কোটেশন পাঠাবেন।", "quote-form/installations-will-send-your-generation-estimate-and"
          )}
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-ink-deep transition-colors hover:bg-primary-soft"
        >
          {t("Submit another inquiry", "আরেকটি অনুরোধ পাঠান", "quote-form/submit-another-inquiry")}
        </button>
      </div>
    );
  }

  return (
    <div
      className={`rounded-3xl border border-border bg-card shadow-elevated ${
        compact ? "p-6 sm:p-7" : "p-6 sm:p-9"
      }`}
    >
      <div ref={announcerRef} aria-live="polite" className="visually-hidden" />

      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary-deep">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          {t("Verified Solar Engineers · Zero Spam", "যাচাইকৃত সোলার প্রকৌশলী · কোনো স্প্যাম নয়", "quote-form/verified-solar-engineers-zero-spam")}
        </span>
        <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink-deep">
          {t(title, titleBn)}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{t(subtitle, subtitleBn)}</p>
      </div>

      {/* Segment selector pills */}
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label={t("Property segment", "সম্পত্তির ধরন", "quote-form/property-segment")}>
        {(["Residential", "Commercial", "Industrial", "EPC Partner"] as const).map(
          (item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSegment(item)}
              aria-pressed={segment === item}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                segment === item
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-surface text-foreground/80 hover:border-primary/40 hover:text-primary-deep"
              }`}
            >
              {t(item, SEGMENT_BN[item])}
            </button>
          )
        )}
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <InquiryHoneypot />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="solnce-field">
            <label
              htmlFor={`${idPrefix}-name`}
              className="block text-sm font-semibold text-ink-deep"
            >
              {t("Full Name", "পুরো নাম", "quote-form/full-name")}
            </label>
            <span
              id={`${idPrefix}-name-hint`}
              className="mt-0.5 mb-1.5 block text-xs text-muted-foreground"
            >
              {t("Enter your name as on your electricity bill", "বিদ্যুৎ বিলে যেভাবে আছে সেভাবে নাম লিখুন", "quote-form/enter-your-name-as-on-your-electricity")}
            </span>
            <div className="field-control">
              <User className="field-icon" aria-hidden="true" />
              <input
                id={`${idPrefix}-name`}
                name="fullName"
                type="text"
                required
                minLength={2}
                maxLength={120}
                autoComplete="name"
                placeholder={t("e.g. Rahim Uddin", "যেমন: রহিম উদ্দিন", "quote-form/e-g-rahim-uddin")}
                aria-describedby={`${idPrefix}-name-hint`}
                data-error={`${idPrefix}-name-error`}
                className="field-input"
              />
              <Check className="field-check" aria-hidden="true" />
            </div>
            <div id={`${idPrefix}-name-error`} className="error-msg">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{t("Error: Please enter at least 2 characters for your name.", "ত্রুটি: নামে অন্তত ২টি অক্ষর লিখুন।", "quote-form/error-please-enter-at-least-2-characters")}</span>
            </div>
          </div>

          <div className="solnce-field">
            <label
              htmlFor={`${idPrefix}-phone`}
              className="block text-sm font-semibold text-ink-deep"
            >
              {t("Phone Number", "ফোন নম্বর", "quote-form/phone-number")}
            </label>
            <span
              id={`${idPrefix}-phone-hint`}
              className="mt-0.5 mb-1.5 block text-xs text-muted-foreground"
            >
              {t("Bangladeshi mobile number (WhatsApp preferred) for quote updates", "কোটেশনের আপডেটের জন্য বাংলাদেশি মোবাইল নম্বর (হোয়াটসঅ্যাপ হলে ভালো)", "quote-form/bangladeshi-mobile-number-whatsapp-preferred-for-quote")}
            </span>
            <div className="field-control">
              <Phone className="field-icon" aria-hidden="true" />
              <input
                id={`${idPrefix}-phone`}
                name="phone"
                type="tel"
                required
                pattern="[+]?[0-9০-৯\s\-]{10,23}"
                maxLength={24}
                autoComplete="tel"
                placeholder="01712 345678"
                aria-describedby={`${idPrefix}-phone-hint`}
                data-error={`${idPrefix}-phone-error`}
                className="field-input"
              />
              <Check className="field-check" aria-hidden="true" />
            </div>
            <div id={`${idPrefix}-phone-error`} className="error-msg">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{t("Error: Enter a valid 10-digit phone number.", "ত্রুটি: সঠিক মোবাইল নম্বর লিখুন।", "quote-form/error-enter-a-valid-10-digit-phone")}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="solnce-field">
            <label
              htmlFor={`${idPrefix}-email`}
              className="block text-sm font-semibold text-ink-deep"
            >
              {t("Email Address", "ইমেইল ঠিকানা", "quote-form/email-address")}
            </label>
            <span
              id={`${idPrefix}-email-hint`}
              className="mt-0.5 mb-1.5 block text-xs text-muted-foreground"
            >
              {t("Format: you@example.com (for your PDF quote)", "ফরম্যাট: you@example.com (PDF কোটেশনের জন্য)", "quote-form/format-you-example-com-for-your-pdf")}
            </span>
            <div className="field-control">
              <Mail className="field-icon" aria-hidden="true" />
              <input
                id={`${idPrefix}-email`}
                name="email"
                maxLength={254}
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                aria-describedby={`${idPrefix}-email-hint`}
                data-error={`${idPrefix}-email-error`}
                className="field-input"
              />
              <Check className="field-check" aria-hidden="true" />
            </div>
            <div id={`${idPrefix}-email-error`} className="error-msg">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{t("Error: Enter an email address in the format you@example.com.", "ত্রুটি: you@example.com ফরম্যাটে ইমেইল লিখুন।", "quote-form/error-enter-an-email-address-in-the")}</span>
            </div>
          </div>

          <div className="solnce-field">
            <label
              htmlFor={`${idPrefix}-city`}
              className="block text-sm font-semibold text-ink-deep"
            >
              {t("District / Area", "জেলা / এলাকা", "quote-form/district-area")}
            </label>
            <span
              id={`${idPrefix}-city-hint`}
              className="mt-0.5 mb-1.5 block text-xs text-muted-foreground"
            >
              {t("Used for sun-hour estimates & your utility's net-metering rules", "রোদের সময়ের হিসাব ও আপনার বিতরণ কর্তৃপক্ষের নেট-মিটারিং নিয়মের জন্য", "quote-form/used-for-sun-hour-estimates-your-utility")}
            </span>
            <div className="field-control">
              <MapPin className="field-icon" aria-hidden="true" />
              <input
                id={`${idPrefix}-city`}
                name="city"
                type="text"
                required
                minLength={2}
                maxLength={120}
                autoComplete="address-level2"
                placeholder={t("e.g. Dhanmondi, Dhaka", "যেমন: ধানমন্ডি, ঢাকা", "quote-form/e-g-dhanmondi-dhaka")}
                aria-describedby={`${idPrefix}-city-hint`}
                data-error={`${idPrefix}-city-error`}
                className="field-input"
              />
              <Check className="field-check" aria-hidden="true" />
            </div>
            <div id={`${idPrefix}-city-error`} className="error-msg">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{t("Error: Please provide your district or area.", "ত্রুটি: আপনার জেলা বা এলাকা লিখুন।", "quote-form/error-please-provide-your-district-or-area")}</span>
            </div>
          </div>
        </div>

        <div className="solnce-field">
          <label
            htmlFor={`${idPrefix}-bill`}
            className="block text-sm font-semibold text-ink-deep"
          >
            {t("Average Monthly Electricity Bill (৳)", "গড় মাসিক বিদ্যুৎ বিল (৳)", "quote-form/average-monthly-electricity-bill")}
          </label>
          <span
            id={`${idPrefix}-bill-hint`}
            className="mt-0.5 mb-1.5 block text-xs text-muted-foreground"
          >
            {t("Helps our engineer pre-size your rooftop capacity accurately", "আমাদের প্রকৌশলীকে আগেই সঠিক সিস্টেমের আকার নির্ধারণে সাহায্য করে", "quote-form/helps-our-engineer-pre-size-your-rooftop")}
          </span>
          <div className="field-control">
            <Banknote className="field-icon" aria-hidden="true" />
            <select
              id={`${idPrefix}-bill`}
              name="monthlyBill"
              required
              defaultValue="3000-8000"
              aria-describedby={`${idPrefix}-bill-hint`}
              className="field-input field-select"
            >
              <option value="1500-3000">{t("৳1,500 – ৳3,000 / month (1 – 3 kW)", "৳1,500 – ৳3,000 / মাস (১ – ৩ কিলোওয়াট)", "quote-form/1-500-3-000-month-1-3")}</option>
              <option value="3000-8000">{t("৳3,000 – ৳8,000 / month (3 – 7 kW)", "৳3,000 – ৳8,000 / মাস (৩ – ৭ কিলোওয়াট)", "quote-form/3-000-8-000-month-3-7")}</option>
              <option value="8000-30000">{t("৳8,000 – ৳30,000 / month (7 – 25 kW)", "৳8,000 – ৳30,000 / মাস (৭ – ২৫ কিলোওয়াট)", "quote-form/8-000-30-000-month-7-25")}</option>
              <option value="30000-200000">{t("৳30,000 – ৳2,00,000 / month (Commercial · 25 – 150 kW)", "৳30,000 – ৳2,00,000 / মাস (বাণিজ্যিক · ২৫ – ১৫০ কিলোওয়াট)", "quote-form/30-000-2-00-000-month-commercial")}</option>
              <option value="200000+">{t("৳2,00,000+ / month (Industrial / PPA / Ground Mount)", "৳2,00,000+ / মাস (ইন্ডাস্ট্রিয়াল / PPA / গ্রাউন্ড মাউন্ট)", "quote-form/2-00-000-month-industrial-ppa-ground")}</option>
            </select>
            <ChevronDown className="field-chevron" aria-hidden="true" />
          </div>
        </div>

        <InquiryFeedback error={error} />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>{pending ? t("Sending…", "পাঠানো হচ্ছে…") : t("Request Free Clear-Sky Quote", "ফ্রি কোটেশনের অনুরোধ করুন", "quote-form/request-free-clear-sky-quote")}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
