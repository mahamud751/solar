import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight, BookOpen, CalendarDays, ChevronRight, CircleCheck, DraftingCompass, FilePlus2, Images, Inbox, MailPlus, Sun,
} from "lucide-react";
import { requireAdmin } from "@/server/admin";
import { database } from "@/server/db";
import { TableFrame } from "./AdminUI";
import { CountUp } from "./AdminClient";
import { InquiryTable } from "./inquiries/InquiryTable";

function greeting(now: Date) {
  const hour = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Asia/Dhaka" }).format(now));
  return hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
}

export default async function AdminOverview() {
  await requireAdmin();
  const db = database();
  const [newInquiries, inquiries, published, drafts, recent] = await Promise.all([
    db.inquiry.count({ where: { status: "NEW" } }),
    db.inquiry.count(),
    db.contentEntry.count({ where: { published: true } }),
    db.contentEntry.count({ where: { published: false } }),
    db.inquiry.findMany({
      take: 6, orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      select: { id: true, fullName: true, email: true, city: true, kind: true, status: true, createdAt: true },
    }),
  ]);
  const now = new Date();
  const today = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka" }).format(now);
  const stats = [
    { label: "New inquiries", count: newInquiries, href: "/admin/inquiries?status=NEW", foot: "Needs a reply", icon: MailPlus, tone: "mint" },
    { label: "Total inquiries", count: inquiries, href: "/admin/inquiries", foot: "Open inbox", icon: Inbox, tone: "blue" },
    { label: "Published entries", count: published, foot: "Live on the website", icon: CircleCheck, tone: "violet" },
    { label: "Draft entries", count: drafts, foot: "Not yet published", icon: DraftingCompass, tone: "amber" },
  ];
  const shortcuts = [
    { label: "Add a service", description: "Create a service listing", href: "/admin/content/services/new", icon: FilePlus2, tone: "mint" },
    { label: "Write an article", description: "Start a blog draft", href: "/admin/content/articles/new", icon: BookOpen, tone: "blue" },
    { label: "Upload an image", description: "Open the media library", href: "/admin/media", icon: Images, tone: "violet" },
  ];

  return (
    <>
      <section className="admin-hero">
        <div className="admin-hero-art" aria-hidden="true">
          <span className="admin-hero-art-core" />
          <Sun size={176} strokeWidth={0.6} />
        </div>
        <div className="admin-hero-copy">
          <span className="admin-hero-date"><CalendarDays size={14} aria-hidden="true" /> {today}</span>
          <h1>{greeting(now)}, <span>welcome back</span></h1>
          <p>
            {newInquiries > 0
              ? `You have ${newInquiries.toLocaleString("en-BD")} new ${newInquiries === 1 ? "inquiry" : "inquiries"} waiting for a reply.`
              : "You're all caught up. Manage inquiries, website content and media for Green Dhaka."}
          </p>
          <div className="admin-hero-actions">
            <Link className="admin-button admin-button-primary" href="/admin/inquiries"><Inbox size={17} aria-hidden="true" /> Open inquiries</Link>
            <Link className="admin-button admin-button-glass" href="/admin/content/services">Edit website content <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <div className="admin-stats" aria-label="Dashboard totals">
        {stats.map(({ label, count, href, foot, icon: Icon, tone }, i) => {
          const content = <>
            <span className="admin-stat-top">
              <span className="admin-stat-label">{label}</span>
              <span className="admin-item-icon" data-tone={tone}><Icon size={19} aria-hidden="true" /></span>
            </span>
            <strong><CountUp value={count} /></strong>
            <span className="admin-stat-foot">{foot}{href && <ArrowRight size={13} aria-hidden="true" />}</span>
          </>;
          const style = { "--i": i } as CSSProperties;
          return href
            ? <Link key={label} className="admin-stat admin-stat-link" data-tone={tone} href={href} style={style}>{content}</Link>
            : <div key={label} className="admin-stat" data-tone={tone} style={style}>{content}</div>;
        })}
      </div>

      <div className="admin-overview-grid">
        <TableFrame title="Recent inquiries" count={recent.length ? `Latest ${recent.length}` : undefined}
          action={<Link className="admin-button admin-button-ghost" href="/admin/inquiries">View all <ArrowRight size={15} aria-hidden="true" /></Link>}>
          <InquiryTable entries={recent} />
        </TableFrame>
        <section className="admin-panel admin-quick-actions">
          <h2>Quick actions</h2>
          {shortcuts.map(({ label, description, href, icon: Icon, tone }) => (
            <Link key={label} href={href}>
              <span className="admin-item-icon" data-tone={tone}><Icon size={18} aria-hidden="true" /></span>
              <span><strong>{label}</strong><small>{description}</small></span>
              <ChevronRight size={17} aria-hidden="true" />
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}
