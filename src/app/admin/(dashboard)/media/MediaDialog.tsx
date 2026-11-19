"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

export function MediaDialog({ title, children, onClose, busy = false }: {
  title: string; children: ReactNode; onClose: () => void; busy?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    if (!dialog.current?.open) dialog.current?.showModal();
  }, []);

  return (
    <dialog ref={dialog} className="admin-media-dialog" aria-labelledby={titleId} onClose={onClose}
      onCancel={(event) => { if (busy) event.preventDefault(); }}
      onClick={(event) => { if (!busy && event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="admin-media-dialog-inner">
        <header className="admin-media-dialog-header">
          <h2 id={titleId}>{title}</h2>
          <button type="button" className="admin-button" aria-label="Close dialog" disabled={busy}
            onClick={() => dialog.current?.close()}><X size={18} aria-hidden="true" /></button>
        </header>
        <div className="admin-media-dialog-body">{children}</div>
      </div>
    </dialog>
  );
}
