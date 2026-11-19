"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/** Animates a number from 0 to `value` once it scrolls into view. */
export function CountUp({ value, locale = "en-BD" }: { value: number; locale?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || value <= 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const duration = Math.min(1200, 500 + value * 8);
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      setShown(0);
      frame = requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);

  return <span ref={ref} className="admin-tabular">{shown.toLocaleString(locale)}</span>;
}

/** Read-only text with a copy button and "Copied" feedback. */
export function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <div className="admin-field">
      <span>{label}</span>
      <span className="admin-copy">
        <input className="admin-input" value={value} readOnly aria-label={label} onFocus={(e) => e.currentTarget.select()} />
        <button type="button" className="admin-copy-button" data-copied={copied || undefined}
          onClick={async () => {
            try { await navigator.clipboard.writeText(value); setCopied(true); } catch { /* clipboard blocked */ }
          }}>
          {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </span>
      <span className="sr-only" role="status">{copied ? "Image path copied" : ""}</span>
    </div>
  );
}
