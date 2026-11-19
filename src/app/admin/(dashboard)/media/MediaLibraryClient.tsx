"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Expand, ImageUp } from "lucide-react";
import { mediaPath, type MediaAsset } from "@/data/media";
import { ImageUpload } from "./ImageUpload";
import { AdminImagePreview } from "./AdminImagePreview";
import { MediaDialog } from "./MediaDialog";

export function MediaLibraryUpload({ returnToFirstPage }: { returnToFirstPage: boolean }) {
  const router = useRouter();
  const [uploaded, setUploaded] = useState<MediaAsset>();
  return (
    <section className="admin-panel admin-upload">
      <span className="admin-upload-art"><ImageUp size={28} aria-hidden="true" /></span>
      <div>
        <ImageUpload onUploaded={(asset) => {
          setUploaded(asset);
          if (returnToFirstPage) router.replace("/admin/media");
          else router.refresh();
        }} />
        {uploaded && <p className="admin-notice admin-media-notice" role="status">Uploaded {uploaded.filename}.</p>}
      </div>
    </section>
  );
}

export function MediaLibraryPreview({ asset }: { asset: MediaAsset }) {
  const [open, setOpen] = useState(false);
  const path = mediaPath(asset.id);
  return (
    <>
      <button className="admin-media-thumb admin-library-preview" type="button" aria-haspopup="dialog"
        aria-label={`Preview ${asset.filename}`} onClick={() => setOpen(true)}>
        <AdminImagePreview src={path} alt="" cover sizes="(max-width: 680px) 90vw, 320px" />
        <span className="admin-library-expand"><Expand size={16} aria-hidden="true" /></span>
      </button>
      {open && <MediaDialog title={asset.filename} onClose={() => setOpen(false)}>
        <div className="admin-large-preview"><AdminImagePreview src={path} alt={asset.filename} /></div>
      </MediaDialog>}
    </>
  );
}
