import { getPageMetadata } from "@/server/page-metadata";
import { OffGridPage } from "@/components/site/pages/off-grid-solar-system";

export function generateMetadata() {
  return getPageMetadata("off-grid-solar-system");
}

export default function Page() {
  return (
    <div className="pt-[4.75rem]">
      <OffGridPage />
    </div>
  );
}
