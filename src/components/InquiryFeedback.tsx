"use client";

import { useT } from "@/i18n/lang";

export function InquiryFeedback({ error }: { error: "invalid" | "unavailable" | null }) {
  const t = useT();
  if (!error) return null;
  return (
    <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-900">
      {error === "invalid"
        ? t("Check your contact details and try again.", "যোগাযোগের তথ্য যাচাই করে আবার চেষ্টা করুন।")
        : t("We couldn't save your request. Please try again shortly.", "আপনার অনুরোধ সংরক্ষণ করা যায়নি। একটু পরে আবার চেষ্টা করুন।")}
    </p>
  );
}

export function InquiryHoneypot() {
  return (
    <label hidden>
      Leave this field empty
      <input name="website" tabIndex={-1} autoComplete="off" />
    </label>
  );
}
