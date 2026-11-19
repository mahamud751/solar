import type { ReactNode } from "react";
import { collectionLabel, type CollectionName } from "@/data/catalog";
import { requireAdmin } from "@/server/admin";
import { AdminShell } from "./AdminShell";

const collections = (names: CollectionName[]) =>
  names.map((id) => ({ id, label: collectionLabel(id), href: `/admin/content/${id}` }));

const groups = [
  { label: "Workspace", items: [
    { id: "overview", label: "Overview", href: "/admin" },
    { id: "inquiries", label: "Inquiries", href: "/admin/inquiries" },
    { id: "media", label: "Media library", href: "/admin/media" },
  ] },
  { label: "Website content", items: collections(["services", "articles", "faqs", "testimonials", "aerial", "brands", "utilities", "cities"]) },
  { label: "Configuration", items: collections(["blocks", "copy", "seo", "settings"]) },
];

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const admin = await requireAdmin();
  return <AdminShell email={admin.email} groups={groups}>{children}</AdminShell>;
}
