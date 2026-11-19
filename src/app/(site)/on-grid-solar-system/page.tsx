import { getPageMetadata } from "@/server/page-metadata";
import { OnGridPage } from "@/components/site/pages/on-grid-solar-system";

export function generateMetadata() {
  return getPageMetadata("on-grid-solar-system");
}

export default function Page() {
  return (
    <div className="pt-[4.75rem]">
      <OnGridPage />
    </div>
  );
}
