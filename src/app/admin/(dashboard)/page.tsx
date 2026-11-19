import Link from "next/link";
import { BookOpen, CircleCheck, DraftingCompass, FilePlus2, Images, Inbox, MailPlus, Sun } from "lucide-react";
import { requireAdmin } from "@/server/admin";
import { database } from "@/server/db";
import { TableFrame } from "./AdminUI";
import { InquiryTable } from "./inquiries/InquiryTable";

export default async function AdminOverview() {
  await requireAdmin();
  const db = database();
  const [newInquiries, inquiries, published, drafts, recent] = await Promise.all([
    db.inquiry.count({ where: { status: "NEW" } }),
    db.inquiry.count(),
    db.contentEntry.count({ where: { published: true } }),
    db.contentEntry.count({ where: { published: false } }),
    db.inquiry.findMany({
      take: 5, orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      select: { id: true, fullName: true, email: true, city: true, kind: true, status: true, createdAt: true },
    }),
  ]);
  const stats = [
    { label: "New inquiries", count: newInquiries, href: "/admin/inquiries?status=NEW", icon: MailPlus, tone: "mint" },
    { label: "Total inquiries", count: inquiries, href: "/admin/inquiries", icon: Inbox, tone: "blue" },
    { label: "Published entries", count: published, icon: CircleCheck, tone: "mint" },
    { label: "Draft entries", count: drafts, icon: DraftingCompass, tone: "amber" },
  ];
  const shortcuts = [
    { label: "Add a service", description: "Create a service listing", href: "/admin/content/services/new", icon: FilePlus2 },
    { label: "Write an article", description: "Start a blog draft", href: "/admin/content/articles/new", icon: BookOpen },
    { label: "Upload an image", description: "Open the media library", href: "/admin/media", icon: Images },
  ];

  return (
    <>
      <section className="admin-hero">
        <div className="admin-hero-art" aria-hidden="true"><Sun size={168} strokeWidth={0.65} /></div>
        <div className="admin-hero-copy">
          <h1>Overview</h1>
          <p>Manage inquiries, website content, and media for Green Dhaka.</p>
          <Link className="admin-button admin-hero-button" href="/admin/inquiries"><Inbox size={17} aria-hidden="true" /> Open inquiries</Link>
        </div>
      </section>

      <div className="admin-stats" aria-label="Dashboard totals">
        {stats.map(({ label, count, href, icon: Icon, tone }) => {
          const content = <><span className="admin-stat-top"><span className="admin-item-icon" data-tone={tone}><Icon size={19} aria-hidden="true" /></span>{label}</span><strong>{count.toLocaleString("en-BD")}</strong></>;
          return href
            ? <Link key={label} className="admin-stat admin-stat-link" href={href}>{content}</Link>
            : <div key={label} className="admin-stat">{content}</div>;
        })}
      </div>

      <div className="admin-overview-grid">
        <TableFrame title="Recent inquiries" count={recent.length ? `Latest ${recent.length}` : undefined}>
          <InquiryTable entries={recent} />
        </TableFrame>
        <section className="admin-panel admin-quick-actions">
          <h2>Quick actions</h2>
          {shortcuts.map(({ label, description, href, icon: Icon }) => (
            <Link key={label} href={href}>
              <span className="admin-item-icon"><Icon size={18} aria-hidden="true" /></span>
              <span><strong>{label}</strong><small>{description}</small></span>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}
