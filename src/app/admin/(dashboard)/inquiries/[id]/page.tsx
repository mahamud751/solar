import Link from "next/link";
import { Mail, MessageSquareText, Phone, ShieldAlert } from "lucide-react";
import { Avatar, Status } from "../../AdminUI";
import { notFound } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/server/admin";
import { database } from "@/server/db";
import { ActionForm } from "../../../ActionForm";
import { deleteInquiry } from "../../../actions";
import { InquiryEditor } from "./InquiryEditor";
import { inquiryDate, inquiryKinds, inquiryStatuses } from "../presentation";

export default async function InquiryDetails({ params, searchParams }: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdmin();
  const [{ id }, { saved }] = await Promise.all([params, searchParams]);
  if (!z.uuid().safeParse(id).success) notFound();
  const item = await database().inquiry.findUnique({ where: { id } });
  if (!item) notFound();
  const version = item.updatedAt.toISOString();

  return (
    <>
      <Link className="admin-back-link" href="/admin/inquiries">Inquiries</Link>
      <header className="admin-page-heading">
        <div className="admin-page-heading-main">
          <Avatar name={item.fullName ?? item.email ?? "Inquiry"} size={52} />
          <div>
            <p className="admin-eyebrow">{inquiryKinds[item.kind]} inquiry</p>
            <h1>{item.fullName ?? item.email ?? "Inquiry"}</h1>
            <p className="admin-page-description">Received {inquiryDate.format(item.createdAt)} (Dhaka)</p>
          </div>
        </div>
        <div className="admin-filter-actions">
          <Status tone={item.status.toLowerCase()}>{inquiryStatuses[item.status]}</Status>
          {item.phone && <a className="admin-button" href={`tel:${item.phone}`}><Phone size={15} aria-hidden="true" /> Call</a>}
          {item.email && <a className="admin-button admin-button-primary" href={`mailto:${item.email}`}><Mail size={15} aria-hidden="true" /> Email</a>}
        </div>
      </header>
      {saved === "1" && <p className="admin-notice" role="status">Inquiry updated.</p>}
      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <section className="admin-panel">
          <h2 className="text-lg font-extrabold">Request details</h2>
          <dl className="admin-details">
            <dt>Type</dt><dd>{inquiryKinds[item.kind]}</dd>
            <dt>Received (Dhaka)</dt><dd>{inquiryDate.format(item.createdAt)}</dd>
            <dt>Phone</dt>
            <dd>{item.phone ? <a href={`tel:${item.phone}`}>{item.phone}</a> : "—"}</dd>
            <dt>Email</dt>
            <dd className="break-all">{item.email ? <a href={`mailto:${item.email}`}>{item.email}</a> : "—"}</dd>
            <dt>District or area</dt><dd>{item.city ?? "—"}</dd>
            <dt>Monthly bill (৳)</dt><dd>{item.monthlyBill ?? "—"}</dd>
            <dt>Property type</dt><dd>{item.segment ?? "—"}</dd>
            <dt>Submitted from</dt><dd>{item.source}</dd>
          </dl>
        </section>
        <section className="admin-panel">
          <h2 className="flex items-center gap-2 text-lg font-extrabold"><MessageSquareText size={19} aria-hidden="true" /> Follow-up</h2>
          <InquiryEditor key={version} id={item.id} version={version} initialStatus={item.status} initialNotes={item.notes} />
        </section>
      </div>
      <details className="admin-panel admin-danger">
        <summary><ShieldAlert size={18} aria-hidden="true" /> Danger zone · Delete inquiry</summary>
        <ActionForm action={deleteInquiry.bind(null, item.id)} submit="Permanently delete" danger className="mt-4">
          <input type="hidden" name="version" value={version} />
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" name="confirm" required /> Confirm permanent deletion
          </label>
        </ActionForm>
      </details>
    </>
  );
}
