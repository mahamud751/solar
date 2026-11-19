"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff, ImagePlus } from "lucide-react";

export function AdminImagePreview({ src, alt, cover = false, sizes = "100vw" }: {
  src: string; alt: string; cover?: boolean; sizes?: string;
}) {
  const [failed, setFailed] = useState("");
  const unavailable = src && failed === src;
  return (
    <div className="admin-image-preview">
      {src && !unavailable ? (
        <Image src={src} alt={alt} fill unoptimized sizes={sizes}
          className={cover ? "object-cover" : "object-contain"} onError={() => setFailed(src)} />
      ) : (
        <div className="admin-image-placeholder">
          {unavailable ? <ImageOff size={24} aria-hidden="true" /> : <ImagePlus size={24} aria-hidden="true" />}
          <span>{unavailable ? "Preview unavailable" : "No image selected"}</span>
        </div>
      )}
    </div>
  );
}
