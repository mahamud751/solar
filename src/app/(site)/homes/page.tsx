import { getPageMetadata } from "@/server/page-metadata";
import { HomesPage } from "@/components/site/pages/homes";

export function generateMetadata() {
  return getPageMetadata("homes");
}

export default function Page() {
  return (
    <div className="pt-[4.75rem]">
      <HomesPage />
    </div>
  );
}
