import Image from "next/image";
import Link from "next/link";
import { Images } from "lucide-react";
import { AdminHeading, EmptyState } from "../AdminUI";
import { requireAdmin } from "@/server/admin";
import { database } from "@/server/db";
import { ActionForm } from "../../ActionForm";
import { uploadImage } from "./actions";

const pageSize = 24;

export default async function MediaLibrary({ searchParams }: {
  searchParams: Promise<{ uploaded?: string; page?: string }>;
}) {
  await requireAdmin();
  const { uploaded, page: pageParam } = await searchParams;
  const db = database();
  const total = await db.mediaAsset.count();
  const lastPage = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.max(1, Math.min(lastPage, Number.parseInt(pageParam ?? "", 10) || 1));
  const assets = await db.mediaAsset.findMany({
    orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    select: { id: true, filename: true },
    skip: (page - 1) * pageSize, take: pageSize,
  });

  return (
    <>
      <AdminHeading title="Media library" description="Upload and reuse images across the website." />
      <div className="admin-panel mt-5">
        <ActionForm submit="Upload image" action={uploadImage}>
          <label className="admin-field">Image file
            <input className="admin-input" name="image" type="file" accept="image/jpeg,image/png,image/webp" required />
          </label>
          <p className="text-sm text-[#456156]">Up to 4 MB. Copy the uploaded image path into an image field in the content editor.</p>
        </ActionForm>
        {uploaded && assets.some((asset) => asset.id === uploaded) &&
          <p role="status" className="mt-4 text-sm font-semibold text-emerald-800">Upload complete.</p>}
      </div>
      {assets.length > 0 && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {assets.map(({ id, filename }) => (
            <article key={id} className="admin-panel min-w-0">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-[#e5ece8]">
                <Image src={`/media/${id}`} alt="" fill unoptimized className="object-cover" />
              </div>
              <h2 className="mt-3 truncate text-sm font-bold" title={filename}>{filename}</h2>
              <label className="admin-field mt-2">Image path
                <input className="admin-input text-sm" value={`/media/${id}`} readOnly />
              </label>
            </article>
          ))}
        </div>
      )}
      {assets.length === 0 && <section className="admin-table-panel">
        <EmptyState icon={Images} title="No images yet" detail="Upload an image to start your library." />
      </section>}
      {lastPage > 1 && <nav className="mt-4 flex items-center gap-3" aria-label="Media pages">
        {page > 1 && <Link className="admin-button" href={`/admin/media?page=${page - 1}`}>Previous</Link>}
        <p className="text-sm font-semibold">Page {page} of {lastPage}</p>
        {page < lastPage && <Link className="admin-button" href={`/admin/media?page=${page + 1}`}>Next</Link>}
      </nav>}
    </>
  );
}
