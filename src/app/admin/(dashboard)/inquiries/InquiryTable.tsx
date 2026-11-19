import Link from "next/link";
import { Inbox, UserRound } from "lucide-react";
import type { Inquiry } from "@/generated/prisma/client";
import { EmptyState, Status } from "../AdminUI";
import { inquiryDate, inquiryKinds, inquiryStatuses } from "./presentation";

type Row = Pick<Inquiry, "id" | "fullName" | "email" | "city" | "kind" | "status" | "createdAt">;

export function InquiryTable({ entries, filtered = false }: { entries: Row[]; filtered?: boolean }) {
  if (!entries.length) {
    return <EmptyState icon={Inbox} title={filtered ? "No matching inquiries" : "No inquiries yet"}
      detail={filtered ? "Try changing your search or filters." : "Quote, consultation, and partner requests will appear here."} />;
  }

  return <div className="admin-table-scroll" tabIndex={0} role="region" aria-label="Inquiry table">
    <table className="admin-table admin-table-inquiries">
      <thead><tr><th scope="col">Contact</th><th scope="col">Type</th><th scope="col">Status</th><th scope="col">Received (Dhaka)</th></tr></thead>
      <tbody>{entries.map((item) => (
        <tr key={item.id}>
          <td>
            <div className="admin-table-name">
              <span className="admin-item-icon"><UserRound size={16} aria-hidden="true" /></span>
              <div>
                <Link href={`/admin/inquiries/${item.id}`}>{item.fullName ?? item.email ?? "Inquiry"}</Link>
                {(item.city || (item.fullName && item.email)) && <small>{item.city ?? item.email}</small>}
              </div>
            </div>
          </td>
          <td>{inquiryKinds[item.kind]}</td>
          <td><Status tone={item.status.toLowerCase()}>{inquiryStatuses[item.status]}</Status></td>
          <td><time dateTime={item.createdAt.toISOString()}>{inquiryDate.format(item.createdAt)}</time></td>
        </tr>
      ))}</tbody>
    </table>
  </div>;
}
