import type { CSSProperties } from "react";
import { Images } from "lucide-react";
import { AdminHeading, EmptyState, Pagination } from "../AdminUI";
import { CopyField } from "../AdminClient";
import { requireAdmin } from "@/server/admin";
import { mediaPath } from "@/data/media";
import { listMedia } from "@/server/media";
import { MediaLibraryPreview, MediaLibraryUpload } from "./MediaLibraryClient";

export default async function MediaLibrary({ searchParams }: {
  searchParams: Promise<{ page?: string }>;
}) {
  await requireAdmin();
  const { page: pageParam } = await searchParams;
  const { assets, page, pages, total } = await listMedia("", typeof pageParam === "string" ? pageParam : "");

  return (
    <>
      <AdminHeading icon={Images} eyebrow="Workspace" title="Media library"
        description={`Upload and reuse images across the website. ${total.toLocaleString("en-BD")} ${total === 1 ? "image" : "images"} in the library.`} />
      <MediaLibraryUpload returnToFirstPage={page > 1} />
      {assets.length > 0 && (
        <div className="admin-media-grid">
          {assets.map(({ id, filename }, i) => (
            <article key={id} className="admin-panel admin-media-card" style={{ "--i": i } as CSSProperties}>
              <MediaLibraryPreview asset={{ id, filename }} />
              <div className="admin-media-body">
                <h2 title={filename}>{filename}</h2>
                <CopyField label="Image path" value={mediaPath(id)} />
              </div>
            </article>
          ))}
        </div>
      )}
      {assets.length === 0 && <section className="admin-table-panel mt-5">
        <EmptyState icon={Images} title="No images yet" detail="Upload an image to start your library." />
      </section>}
      <Pagination page={page} pages={pages} href={(n) => `/admin/media?page=${n}`} label="Media pages" />
    </>
  );
}
