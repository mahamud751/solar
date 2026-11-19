"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ImageUp, LoaderCircle, X } from "lucide-react";
import { imageAccept, imageFormatHint, maxImageBytes, type MediaAsset } from "@/data/media";
import { uploadImage } from "./actions";
import { AdminImagePreview } from "./AdminImagePreview";

export function ImageUpload({ onUploaded, onBusyChange, submitLabel = "Upload image" }: {
  onUploaded: (asset: MediaAsset) => void;
  onBusyChange?: (busy: boolean) => void;
  submitLabel?: string;
}) {
  const [selection, setSelection] = useState<{ file: File; url: string }>();
  const file = selection?.file;
  const preview = selection?.url;
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const active = useRef(false);
  const input = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const hintId = useId();

  function choose(next?: File) {
    if (!next || active.current) return;
    if (!next.size || next.size > maxImageBytes || (next.type && !imageAccept.split(",").includes(next.type))) {
      setSelection(undefined);
      setError(imageFormatHint);
      return;
    }
    setError("");
    setSelection({ file: next, url: URL.createObjectURL(next) });
  }

  async function upload() {
    if (!file || active.current) return;
    active.current = true;
    setPending(true);
    setError("");
    onBusyChange?.(true);

    const form = new FormData();
    form.set("image", file);
    let result: Awaited<ReturnType<typeof uploadImage>> | undefined;
    try {
      result = await uploadImage(form);
      if ("error" in result) setError(result.error);
    } catch {
      setError("Upload failed. Check your connection or sign in again, then retry.");
    } finally {
      active.current = false;
      setPending(false);
      onBusyChange?.(false);
    }
    if (result && "asset" in result) {
      setSelection(undefined);
      onUploaded(result.asset);
    }
  }

  return (
    <div className="admin-image-upload" aria-busy={pending}>
      {file && preview && <AdminImagePreview src={preview} alt={`Preview of ${file.name}`} />}
      <div className="admin-dropzone" onDragOver={(event) => event.preventDefault()} onDrop={(event) => {
        event.preventDefault();
        choose(event.dataTransfer.files[0]);
      }}>
        <ImageUp size={22} aria-hidden="true" />
        <div>
          <label htmlFor={inputId} className="admin-field">Image file</label>
          <p id={hintId}>{imageFormatHint} You can also drop an image here.</p>
        </div>
        <input ref={input} id={inputId} type="file" className="admin-input" aria-describedby={hintId}
          accept={imageAccept} disabled={pending} onChange={(event) => {
            choose(event.currentTarget.files?.[0]);
            event.currentTarget.value = "";
          }} />
      </div>
      {file && <div className="admin-image-actions">
        <span className="admin-image-filename" title={file.name}>{file.name}</span>
        <button type="button" className="admin-button" disabled={pending} onClick={() => {
          setSelection(undefined);
          setError("");
          input.current?.focus();
        }}><X size={15} aria-hidden="true" /> Clear</button>
      </div>}
      {error && <p className="admin-image-error" role="alert">{error}</p>}
      <div>
        <button type="button" className="admin-button admin-button-primary" disabled={!file || pending} onClick={upload}>
          {pending ? <LoaderCircle className="admin-spin" size={17} aria-hidden="true" /> : <ImageUp size={17} aria-hidden="true" />}
          {pending ? "Uploading…" : submitLabel}
        </button>
      </div>
    </div>
  );
}
