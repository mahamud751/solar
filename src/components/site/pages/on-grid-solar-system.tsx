"use client";

import { useContent } from "@/data/content";
import { GuidePage } from "@/components/site/GuidePage";

export function OnGridPage() {
  return <GuidePage g={useContent().BLOCKS.ON_GRID} />;
}
