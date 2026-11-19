"use server";

import { redirect } from "next/navigation";
import sharp from "sharp";
import { requireAdmin } from "@/server/admin";
import { database } from "@/server/db";
import type { FormState } from "../../actions";

export async function uploadImage(_: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const file = form.get("image");
  if (!(file instanceof File) || !file.size || file.size > 4 * 1024 * 1024) {
    return { error: "Choose a JPEG, PNG or WebP image up to 4 MB." };
  }
  let data: Uint8Array<ArrayBuffer>;
  try {
    const image = sharp(Buffer.from(await file.arrayBuffer()), { limitInputPixels: 24_000_000 });
    const info = await image.metadata();
    if (!["jpeg", "png", "webp"].includes(info.format ?? "") || (info.pages ?? 1) > 1) {
      return { error: "Choose a static JPEG, PNG or WebP image." };
    }
    data = new Uint8Array(await image.autoOrient().resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true }).webp({ quality: 86 }).toBuffer());
  } catch {
    return { error: "The image could not be read. Choose a supported image under 24 megapixels." };
  }
  const asset = await database().mediaAsset.create({
    data: { filename: file.name.replace(/[\u0000-\u001f]/g, "").slice(0, 160) || "Image", data },
    select: { id: true },
  });
  redirect(`/admin/media?uploaded=${asset.id}`);
}
