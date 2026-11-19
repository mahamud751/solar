import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search, type LucideIcon } from "lucide-react";

export function AdminHeading({ title, description, action, icon: Icon, eyebrow }: {
  title: string; description?: string; action?: ReactNode; icon?: LucideIcon; eyebrow?: string;
}) {
  return <header className="admin-page-heading">
    <div className="admin-page-heading-main">
      {Icon && <span className="admin-heading-icon"><Icon size={22} aria-hidden="true" /></span>}
      <div>
        {eyebrow && <p className="admin-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="admin-page-description">{description}</p>}
      </div>
    </div>
    {action}
  </header>;
}

export function TableFrame({ title, count, action, children }: { title: string; count?: string; action?: ReactNode; children: ReactNode }) {
  return <section className="admin-table-panel">
    <div className="admin-table-heading">
      <h2>{title}{count && <span className="admin-count">{count}</span>}</h2>
      {action}
    </div>
    {children}
  </section>;
}

export function Status({ tone, children }: { tone: string; children: ReactNode }) {
  return <span className="admin-status" data-tone={tone}><span className="admin-status-dot" aria-hidden="true" />{children}</span>;
}

/** Initials avatar with a stable colour derived from the name. */
export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name.trim().split(/[\s@._-]+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join("") || "?";
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) % 360;
  return <span className="admin-avatar-initials" aria-hidden="true"
    style={{ "--hue": hash, width: size, height: size, fontSize: size * 0.38 } as CSSProperties}>{initials}</span>;
}

export function EmptyState({ icon: Icon, title, detail, action }: {
  icon: LucideIcon; title: string; detail?: string; action?: ReactNode;
}) {
  return <div className="admin-empty">
    <span className="admin-empty-icon"><Icon size={26} aria-hidden="true" /></span>
    <h3>{title}</h3>
    {detail && <p>{detail}</p>}
    {action}
  </div>;
}

export function SearchField({ value, placeholder, label = "Search" }: { value: string; placeholder: string; label?: string }) {
  return <label className="admin-field admin-search-field">
    {label}
    <span className="admin-search-input"><Search size={17} aria-hidden="true" />
      <input className="admin-input" name="q" type="search" defaultValue={value} maxLength={100} placeholder={placeholder} />
    </span>
  </label>;
}

export function ResetFilters({ href }: { href: string }) {
  return <Link className="admin-button admin-button-ghost" href={href}>Reset</Link>;
}

export function Pagination({ page, pages, href, label }: { page: number; pages: number; href: (n: number) => string; label: string }) {
  if (pages <= 1) return null;
  return <nav className="admin-pagination" aria-label={label}>
    {page > 1
      ? <Link className="admin-button" href={href(page - 1)}><ChevronLeft size={16} aria-hidden="true" /> Previous</Link>
      : <span className="admin-button" aria-disabled="true"><ChevronLeft size={16} aria-hidden="true" /> Previous</span>}
    <p>Page <strong>{page}</strong> of {pages}</p>
    {page < pages
      ? <Link className="admin-button" href={href(page + 1)}>Next <ChevronRight size={16} aria-hidden="true" /></Link>
      : <span className="admin-button" aria-disabled="true">Next <ChevronRight size={16} aria-hidden="true" /></span>}
  </nav>;
}
