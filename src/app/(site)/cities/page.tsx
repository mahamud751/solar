import { getPageMetadata } from "@/server/page-metadata";
import { CitiesPage } from "@/components/site/pages/cities";

export function generateMetadata() {
  return getPageMetadata("cities");
}

export default function Page() {
  return (
    <div className="pt-[4.75rem]">
      <CitiesPage />
    </div>
  );
}
