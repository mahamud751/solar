"use client";

import { useState } from "react";
import type { InquiryStatus } from "@/generated/prisma/enums";
import { ActionForm } from "../../../ActionForm";
import { saveInquiry } from "../../../actions";
import { inquiryStatuses } from "../presentation";

export function InquiryEditor({ id, version, initialStatus, initialNotes }: {
  id: string;
  version: string;
  initialStatus: InquiryStatus;
  initialNotes: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [notes, setNotes] = useState(initialNotes);
  return (
    <ActionForm action={saveInquiry.bind(null, id)} submit="Save follow-up" className="mt-4">
      <input type="hidden" name="version" value={version} />
      <label className="admin-field">Status
        <select className="admin-input" name="status" value={status} onChange={(event) => setStatus(event.target.value as InquiryStatus)}>
          {Object.entries(inquiryStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </label>
      <label className="admin-field">Internal notes
        <textarea className="admin-input" name="notes" rows={6} maxLength={6000} value={notes} onChange={(event) => setNotes(event.target.value)} />
      </label>
    </ActionForm>
  );
}
