import type { InquiryKind, InquiryStatus } from "@/generated/prisma/enums";

export const inquiryKinds: Record<InquiryKind, string> = {
  QUOTE: "Quote", CONSULTATION: "Consultation", PARTNERSHIP: "Partnership", ESTIMATE: "Rooftop estimate",
};

export const inquiryStatuses: Record<InquiryStatus, string> = {
  NEW: "New", CONTACTED: "Contacted", QUALIFIED: "Qualified", CLOSED: "Closed",
};

export const inquiryDate = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Dhaka",
});
