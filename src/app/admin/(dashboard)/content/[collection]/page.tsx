import Link from "next/link";
import { FileText, Plus, SlidersHorizontal } from "lucide-react";
import { AdminHeading, EmptyState, ResetFilters, SearchField, Status, TableFrame } from "../../AdminUI";
import { notFound } from "next/navigation";
import { collectionLabel, fixedGroups, isCollection, isFixed, type JsonValue } from "@/data/catalog";
import { requireAdmin } from "@/server/admin";
import { database } from "@/server/db";

function displayName(key: string, data: JsonValue) {
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const source = data.en && typeof data.en === "object" && !Array.isArray(data.en) ? data.en : data;
    for (const name of ["title", "question", "name", "label", "headline"]) {
      if (typeof source[name] === "string" && source[name]) return source[name];
    }
  }
  return key.toLowerCase().replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function ContentList({ params, searchParams }: {
  params: Promise<{ collection: string }>;
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  await requireAdmin();
  const [{ collection }, filters] = await Promise.all([params, searchParams]);
  if (!isCollection(collection)) notFound();
  const fixed = isFixed(collection);
  const q = typeof filters.q === "string" ? filters.q.trim().slice(0, 100) : "";
  const status = filters.status === "draft" || filters.status === "published" ? filters.status : "";
  const entries = await database().contentEntry.findMany({ where: { collection }, orderBy: [{ position: "asc" }, { key: "asc" }] });
  const rows = fixed
    ? Object.entries(fixedGroups[collection].entries).map(([key, fallback], position) =>
        entries.find((entry) => entry.key === key) ?? { key, data: fallback as JsonValue, published: true, position })
    : entries;
  const items = rows
    .map((row) => ({ ...row, title: displayName(row.key, row.data as JsonValue) }))
    .filter((row) =>
      (!q || `${row.key} ${row.title}`.toLowerCase().includes(q.toLowerCase())) &&
      (!status || row.published === (status === "published")));
  const base = `/admin/content/${collection}`;

  return (
    <>
      <AdminHeading title={collectionLabel(collection)}
        description={fixed ? "Update the information shown on the website." : "Edit entries, manage drafts, and control their display order."}
        action={!fixed && <Link href={`${base}/new`} className="admin-button admin-button-primary"><Plus size={18} aria-hidden="true" /> Add entry</Link>} />
      <form className="admin-filters">
        <SearchField value={q} placeholder="Search by name or slug" />
        {!fixed && <label className="admin-field">Status
          <select className="admin-input" name="status" defaultValue={status}>
            <option value="">All statuses</option><option value="published">Published</option><option value="draft">Draft</option>
          </select>
        </label>}
        <div className="admin-filter-actions">
          <button className="admin-button" type="submit"><SlidersHorizontal size={16} aria-hidden="true" /> Apply filters</button>
          {(q || status) && <ResetFilters href={base} />}
        </div>
      </form>
      <TableFrame title="Entries" count={`${items.length} of ${rows.length}`}>
        {items.length ? <div className="admin-table-scroll" role="region" aria-label="Content entries" tabIndex={0}>
          <table className="admin-table admin-table-content">
            <thead><tr><th scope="col">Entry</th>{!fixed && <><th scope="col">Status</th><th scope="col">Order</th></>}</tr></thead>
            <tbody>
              {items.map(({ key, title, published, position }) => (
                <tr key={key}>
                  <td><div className="admin-table-name">
                    <span className="admin-item-icon"><FileText size={16} aria-hidden="true" /></span>
                    <div><Link href={`${base}/${key}`}>{title}</Link>{!fixed && <small>{key}</small>}</div>
                  </div></td>
                  {!fixed && <><td><Status tone={published ? "published" : "draft"}>{published ? "Published" : "Draft"}</Status></td><td className="admin-order">{position}</td></>}
                </tr>
              ))}
            </tbody>
          </table>
        </div> : <EmptyState icon={FileText} title={q || status ? "No matching entries" : "No entries yet"}
          detail={q || status ? "Try changing your search or filters." : "Add an entry to start building this collection."} />}
      </TableFrame>
    </>
  );
}
