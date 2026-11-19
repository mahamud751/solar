import Link from "next/link";
import { Calculator, ChevronRight, Handshake, Inbox, MessagesSquare, ReceiptText, type LucideIcon } from "lucide-react";
import type { Inquiry } from "@/generated/prisma/client";
import type { InquiryKind } from "@/generated/prisma/enums";
import { Avatar, EmptyState, Status } from "../AdminUI";
import { inquiryDate, inquiryKinds, inquiryStatuses } from "./presentation";

type Row = Pick<Inquiry, "id" | "fullName" | "email" | "city" | "kind" | "status" | "createdAt">;

const kindIcons: Record<InquiryKind, LucideIcon> = {
  QUOTE: ReceiptText, CONSULTATION: MessagesSquare, PARTNERSHIP: Handshake, ESTIMATE: Calculator,
};

export function InquiryTable({ entries, filtered = false }: { entries: Row[]; filtered?: boolean }) {
  if (!entries.length) {
    return <EmptyState icon={Inbox} title={filtered ? "No matching inquiries" : "No inquiries yet"}
      detail={filtered ? "Try changing your search or filters." : "Quote, consultation, and partner requests will appear here."} />;
  }

  return <div className="admin-table-scroll" tabIndex={0} role="region" aria-label="Inquiry table">
    <table className="admin-table admin-table-inquiries">
      <thead><tr>
        <th scope="col">Contact</th><th scope="col">Type</th><th scope="col">Status</th><th scope="col">Received (Dhaka)</th>
        <th scope="col" className="admin-table-chevron"><span className="sr-only">Open</span></th>
      </tr></thead>
      <tbody>{entries.map((item) => {
        const name = item.fullName ?? item.email ?? "Inquiry";
        const KindIcon = kindIcons[item.kind];
        return (
          <tr key={item.id}>
            <td>
              <div className="admin-table-name">
                <Avatar name={name} />
                <div>
                  <Link className="admin-row-link" href={`/admin/inquiries/${item.id}`}>{name}</Link>
                  {(item.city || (item.fullName && item.email)) && <small>{item.city ?? item.email}</small>}
                </div>
              </div>
            </td>
            <td><span className="admin-kind"><KindIcon size={15} aria-hidden="true" />{inquiryKinds[item.kind]}</span></td>
            <td><Status tone={item.status.toLowerCase()}>{inquiryStatuses[item.status]}</Status></td>
            <td><time dateTime={item.createdAt.toISOString()}>{inquiryDate.format(item.createdAt)}</time></td>
            <td className="admin-table-chevron"><ChevronRight size={18} aria-hidden="true" /></td>
          </tr>
        );
      })}</tbody>
    </table>
  </div>;
}
