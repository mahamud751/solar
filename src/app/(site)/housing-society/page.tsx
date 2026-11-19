import { getPageMetadata } from "@/server/page-metadata";
import { SocietyPage } from "@/components/site/pages/housing-society";

export function generateMetadata() {
  return getPageMetadata("housing-society");
}

export default function Page() {
  return (
    <div className="pt-[4.75rem]">
      <SocietyPage />
    </div>
  );
}
