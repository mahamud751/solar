import Link from "next/link";
import { AdminHeading } from "../../AdminUI";
import { notFound } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/server/admin";
import { database } from "@/server/db";
import { ActionForm } from "../../../ActionForm";
import { deleteInquiry } from "../../../actions";
import { InquiryEditor } from "./InquiryEditor";
import { inquiryDate, inquiryKinds } from "../presentation";

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
      <AdminHeading title={item.fullName ?? item.email ?? "Inquiry"} />
      {saved === "1" && <p className="admin-notice" role="status">Inquiry updated.</p>}
      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <section className="admin-panel">
          <h2 className="text-lg font-extrabold">Request details</h2>
          <dl className="mt-4 grid gap-x-4 gap-y-3 text-sm sm:grid-cols-[auto_1fr]">
            <dt className="font-bold">Type</dt><dd>{inquiryKinds[item.kind]}</dd>
            <dt className="font-bold">Received (Dhaka)</dt><dd>{inquiryDate.format(item.createdAt)}</dd>
            <dt className="font-bold">Phone</dt>
            <dd>{item.phone ? <a className="underline" href={`tel:${item.phone}`}>{item.phone}</a> : "—"}</dd>
            <dt className="font-bold">Email</dt>
            <dd className="break-all">{item.email ? <a className="underline" href={`mailto:${item.email}`}>{item.email}</a> : "—"}</dd>
            <dt className="font-bold">District or area</dt><dd>{item.city ?? "—"}</dd>
            <dt className="font-bold">Monthly bill (৳)</dt><dd>{item.monthlyBill ?? "—"}</dd>
            <dt className="font-bold">Property type</dt><dd>{item.segment ?? "—"}</dd>
            <dt className="font-bold">Submitted from</dt><dd>{item.source}</dd>
          </dl>
        </section>
        <section className="admin-panel">
          <h2 className="text-lg font-extrabold">Follow-up</h2>
          <InquiryEditor key={version} id={item.id} version={version} initialStatus={item.status} initialNotes={item.notes} />
        </section>
      </div>
      <details className="admin-panel mt-5">
        <summary className="cursor-pointer font-bold text-red-900">Delete inquiry</summary>
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
