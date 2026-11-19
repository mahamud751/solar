"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, Expand, ImageUp, Images, LoaderCircle, Search } from "lucide-react";
import { isImagePath, mediaPath, type MediaPage } from "@/data/media";
import { AdminImagePreview } from "./AdminImagePreview";
import { ImageUpload } from "./ImageUpload";
import { MediaDialog } from "./MediaDialog";

function BrowseImages({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState({ q: "", page: 1 });
  const [result, setResult] = useState<MediaPage>();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(true);
  const searchId = useId();

  useEffect(() => {
    const request = new AbortController();
    const query = new URLSearchParams({ q: filter.q, page: String(filter.page) });
    async function load() {
      try {
        const response = await fetch(`/admin/media/library?${query}`, { signal: request.signal });
        if (!response.ok) {
          throw new Error(response.status === 401 ? "Sign in again to use the media library." : "Could not load the media library.");
        }
        const data = await response.json() as MediaPage;
        if (!request.signal.aborted) {
          setResult(data);
          setError("");
        }
      } catch (error) {
        if (!request.signal.aborted) setError(error instanceof Error ? error.message : "Could not load the media library.");
      } finally {
        if (!request.signal.aborted) setPending(false);
      }
    }
    void load();
    return () => request.abort();
  }, [filter]);

  function browse(q: string, page: number) {
    setPending(true);
    setError("");
    setFilter({ q, page });
  }

  return (
    <div className="admin-media-picker">
      <div className="admin-picker-search">
        <label className="admin-field" htmlFor={searchId}>Search images
          <input id={searchId} className="admin-input" type="search" maxLength={100} value={input}
            placeholder="Search by file name" onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                browse(input.trim(), 1);
              }
            }} />
        </label>
        <button className="admin-button" type="button" onClick={() => browse(input.trim(), 1)}><Search size={16} aria-hidden="true" /> Search</button>
      </div>
      {pending ? <p role="status" className="admin-picker-status"><LoaderCircle className="admin-spin" size={17} aria-hidden="true" /> Loading images…</p>
        : error ? <p role="alert" className="admin-image-error">{error}</p>
        : !result?.assets.length ? <p role="status" className="admin-picker-status">
          {filter.q ? "No images match this search." : "The media library is empty. Upload an image to get started."}
        </p>
        : <>
          <div className="admin-picker-grid">
            {result.assets.map(({ id, filename }) => {
              const path = mediaPath(id);
              return (
                <button key={id} type="button" className="admin-picker-image" onClick={() => onChange(path)}
                  aria-label={`Use ${filename}`} data-selected={value === path || undefined}>
                  <AdminImagePreview src={path} alt="" cover sizes="200px" />
                  <span title={filename}>{value === path && <Check size={15} aria-hidden="true" />}{filename}</span>
                </button>
              );
            })}
          </div>
          {result.pages > 1 && <nav className="admin-picker-pagination" aria-label="Image pages">
            <button className="admin-button" type="button" disabled={result.page === 1} onClick={() => browse(filter.q, result.page - 1)}>Previous</button>
            <span>Page {result.page} of {result.pages}</span>
            <button className="admin-button" type="button" disabled={result.page === result.pages} onClick={() => browse(filter.q, result.page + 1)}>Next</button>
          </nav>}
        </>}
    </div>
  );
}

export function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [mode, setMode] = useState<"upload" | "browse" | "preview" | null>(null);
  const [busy, setBusy] = useState(false);
  const [chosen, setChosen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const inputId = useId();
  const preview = isImagePath(value.trim()) ? value.trim() : "";
  const dialogTitle = mode === "upload" ? `Upload ${label.toLowerCase()}`
    : mode === "preview" ? `${label} preview` : "Choose an image";


  function select(path: string) {
    onChange(path);
    setChosen(true);
    setMode(null);
    requestAnimationFrame(() => trigger.current?.focus());
  }

  return (
    <div className="admin-image-field">
      <label htmlFor={inputId} className="admin-field">{label}</label>
      <div className="admin-image-field-content">
        <AdminImagePreview src={preview} alt={`${label} preview`} sizes="260px" />
        <div className="admin-image-field-controls">
          <input id={inputId} className="admin-input" value={value} placeholder="/images/… or /media/…"
            onChange={(event) => { setChosen(false); onChange(event.target.value); }} />
          <div className="admin-image-actions">
            <button type="button" className="admin-button admin-button-primary" aria-haspopup="dialog" onClick={(event) => {
              trigger.current = event.currentTarget;
              setMode("upload");
            }}><ImageUp size={17} aria-hidden="true" /> Upload image</button>
            <button type="button" className="admin-button" aria-haspopup="dialog" onClick={(event) => {
              trigger.current = event.currentTarget;
              setMode("browse");
            }}><Images size={17} aria-hidden="true" /> Choose from library</button>
            {preview && <button type="button" className="admin-button" aria-haspopup="dialog"
              onClick={() => setMode("preview")}><Expand size={17} aria-hidden="true" /> Preview image</button>}
          </div>
          <p role="status">{chosen ? "Image selected. Save the entry to apply it." : "Upload a new image or reuse one from your library."}</p>
        </div>
      </div>
      {mode && <MediaDialog title={dialogTitle} onClose={() => setMode(null)} busy={busy}>
        {mode === "upload" && <ImageUpload submitLabel="Upload and select" onBusyChange={setBusy} onUploaded={({ id }) => select(mediaPath(id))} />}
        {mode === "browse" && <BrowseImages value={value} onChange={select} />}
        {mode === "preview" && <div className="admin-large-preview"><AdminImagePreview src={preview} alt={label} /></div>}
      </MediaDialog>}
    </div>
  );
}
