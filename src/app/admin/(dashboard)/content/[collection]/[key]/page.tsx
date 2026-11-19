import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { AdminHeading } from "../../../AdminUI";
import { adminIcon } from "../../../admin-icons";
import { notFound } from "next/navigation";
import { collectionLabel, contentTemplate, isCollection, isFixed, type JsonValue } from "@/data/catalog";
import { emptyField } from "@/data/content-fields";
import { requireAdmin } from "@/server/admin";
import { database } from "@/server/db";
import { ActionForm } from "../../../../ActionForm";
import { deleteContent } from "../../../../actions";
import { ContentEditor } from "./ContentEditor";

export default async function EditContent({ params, searchParams }: {
  params: Promise<{ collection: string; key: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdmin();
  const [{ collection, key }, { saved }] = await Promise.all([params, searchParams]);
  if (!isCollection(collection)) notFound();
  const fixed = isFixed(collection);
  const template = contentTemplate(collection, key);
  if (!template) notFound();

  const db = database();
  const entry = await db.contentEntry.findUnique({ where: { collection_key: { collection, key } } });
  const creating = key === "new" && !fixed && !entry;
  if (!creating && !fixed && !entry) notFound();
  const last = creating ? await db.contentEntry.aggregate({ where: { collection }, _max: { position: true } }) : null;
  const stored = entry?.data as JsonValue | undefined;
  const sample = fixed && template && typeof template === "object" && !Array.isArray(template) &&
    stored && typeof stored === "object" && !Array.isArray(stored)
    ? { ...template, ...stored }
    : stored ?? (creating ? emptyField(template) : template);
  const version = entry?.updatedAt.toISOString() ?? "";

  return (
    <>
      <Link className="admin-back-link" href={`/admin/content/${collection}`}>{collectionLabel(collection)}</Link>
      <AdminHeading icon={adminIcon(collection)} eyebrow={collectionLabel(collection)}
        title={creating ? "Add entry" : key.toLowerCase().replace(/[-_]/g, " ").replace(/\b\w/, (c) => c.toUpperCase())}
        description={creating ? "Fill in the fields below, then save to add it to the website." : "Edit the fields below and save your changes."} />
      {saved === "1" && <p className="admin-notice" role="status">Changes saved.</p>}
      <div className="admin-panel mt-5">
        <ContentEditor key={version || `${collection}/${key}`} collection={collection} entryKey={creating ? null : key}
          initial={sample} template={template} position={entry?.position ?? (last?._max.position ?? -1) + 1}
          published={entry?.published ?? fixed} version={version} fixed={fixed}
        />
      </div>
      {entry && !fixed && <details className="admin-panel admin-danger">
        <summary><ShieldAlert size={18} aria-hidden="true" /> Danger zone · Delete entry</summary>
        <ActionForm action={deleteContent.bind(null, collection, key)} submit="Permanently delete" danger className="mt-4">
          <input type="hidden" name="version" value={version} />
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" name="confirm" required /> Confirm permanent deletion
          </label>
        </ActionForm>
      </details>}
    </>
  );
}
