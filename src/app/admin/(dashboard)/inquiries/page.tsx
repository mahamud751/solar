import { Inbox, SlidersHorizontal } from "lucide-react";
import { AdminHeading, Pagination, ResetFilters, SearchField, TableFrame } from "../AdminUI";
import { InquiryTable } from "./InquiryTable";
import { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";
import { InquiryKind, InquiryStatus } from "@/generated/prisma/enums";
import { requireAdmin } from "@/server/admin";
import { database } from "@/server/db";
import { inquiryKinds, inquiryStatuses } from "./presentation";

const pageSize = 25;

export default async function InquiryList({ searchParams }: {
  searchParams: Promise<{ status?: string; kind?: string; q?: string; page?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const status = z.enum(InquiryStatus).safeParse(params.status).data;
  const kind = z.enum(InquiryKind).safeParse(params.kind).data;
  const q = typeof params.q === "string" ? params.q.trim().slice(0, 100) : "";
  const where: Prisma.InquiryWhereInput = {
    status, kind,
    OR: q ? [
      { fullName: { contains: q, mode: "insensitive" } },
      { city: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { phone: { contains: q, mode: "insensitive" } },
    ] : undefined,
  };
  const db = database();
  const total = await db.inquiry.count({ where });
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.max(1, Math.min(pages, Number.parseInt(params.page ?? "", 10) || 1));
  const entries = await db.inquiry.findMany({
    where, skip: (page - 1) * pageSize, take: pageSize,
    orderBy: [{ createdAt: "desc" }, { id: "asc" }],
  });

  function pageLink(number: number) {
    const query = new URLSearchParams({ page: String(number) });
    if (status) query.set("status", status);
    if (kind) query.set("kind", kind);
    if (q) query.set("q", q);
    return `/admin/inquiries?${query}`;
  }

  return (
    <>
      <AdminHeading icon={Inbox} eyebrow="Workspace" title="Inquiries" description="Review requests and track follow-up with customers and partners." />
      <form className="admin-filters">
        <SearchField value={q} label="Search contacts" placeholder="Name, email, phone or city" />
        <label className="admin-field">Status
          <select className="admin-input" name="status" defaultValue={status ?? ""}>
            <option value="">All statuses</option>
            {Object.entries(inquiryStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label className="admin-field">Type
          <select className="admin-input" name="kind" defaultValue={kind ?? ""}>
            <option value="">All types</option>
            {Object.entries(inquiryKinds).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <div className="admin-filter-actions">
          <button className="admin-button admin-button-primary" type="submit"><SlidersHorizontal size={16} aria-hidden="true" /> Apply filters</button>
          {(q || status || kind) && <ResetFilters href="/admin/inquiries" />}
        </div>
      </form>
      <TableFrame title="Inbox" count={`${total} ${total === 1 ? "request" : "requests"}`}>
        <InquiryTable entries={entries} filtered={Boolean(q || status || kind)} />
      </TableFrame>
      <Pagination page={page} pages={pages} href={pageLink} label="Inquiry pages" />
    </>
  );
}
