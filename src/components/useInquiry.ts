"use client";

import { useRef, useState } from "react";

export function useInquiry() {
  const inFlight = useRef(false);
  const attempt = useRef<{ payload: string; id: string } | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<"invalid" | "unavailable" | null>(null);

  async function submit(fields: Record<string, FormDataEntryValue>) {
    if (inFlight.current) return false;
    inFlight.current = true;
    setPending(true);
    setError(null);

    try {
      const payload = { ...fields, source: window.location.pathname };
      const key = JSON.stringify(payload);
      if (attempt.current?.payload !== key) attempt.current = { payload: key, id: crypto.randomUUID() };
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, id: attempt.current.id }),
      });
      if (!response.ok) {
        setError(response.status === 400 ? "invalid" : "unavailable");
        return false;
      }
      attempt.current = null;
      return true;
    } catch {
      setError("unavailable");
      return false;
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }

  return { submit, pending, error };
}
