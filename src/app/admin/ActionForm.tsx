"use client";

import { useActionState, type ReactNode } from "react";
import type { FormState } from "./actions";

export function ActionForm({ action, children, submit, danger = false, className = "" }: {
  action: (state: FormState, data: FormData) => Promise<FormState>;
  children: ReactNode;
  submit: string;
  danger?: boolean;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form action={formAction} className={`grid gap-4 ${className}`}>
      {children}
      {state.error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-900">{state.error}</p>}
      {state.success && <p role="status" className="text-sm font-semibold text-emerald-800">{state.success}</p>}
      <div>
        <button className={`admin-button ${danger ? "admin-button-danger" : "admin-button-primary"}`} disabled={pending}>
          {pending ? "Saving…" : submit}
        </button>
      </div>
    </form>
  );
}
