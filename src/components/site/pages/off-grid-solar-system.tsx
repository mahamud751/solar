"use client";

import { useContent } from "@/data/content";
import { GuidePage } from "@/components/site/GuidePage";

export function OffGridPage() {
  return <GuidePage g={useContent().BLOCKS.OFF_GRID} />;
}
