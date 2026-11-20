"use client";

import { useContent } from "@/data/content";
import { GuidePage } from "@/components/site/GuidePage";

export function OffGridPage() {
  return <GuidePage g={useContent().BLOCKS.OFF_GRID} formTitle={{ en: "Request Your Off-grid Solar Proposal", bn: "আপনার অফ-গ্রিড সোলার প্রস্তাব চান" }} />;
}
