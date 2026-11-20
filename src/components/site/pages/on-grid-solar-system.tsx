"use client";

import { useContent } from "@/data/content";
import { GuidePage } from "@/components/site/GuidePage";

export function OnGridPage() {
  return <GuidePage g={useContent().BLOCKS.ON_GRID} formTitle={{ en: "Request Your On-grid Solar Proposal", bn: "আপনার অন-গ্রিড সোলার প্রস্তাব চান" }} />;
}
