import { getPageMetadata } from "@/server/page-metadata";
import { CommercialPage } from "@/components/site/pages/commercial";

export function generateMetadata() {
  return getPageMetadata("commercial");
}

export default function Page() {
  return (
    <div className="pt-[4.75rem]">
      <CommercialPage />
    </div>
  );
}
