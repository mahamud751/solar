export const imageAccept = "image/jpeg,image/png,image/webp";
export const maxImageBytes = 4 * 1024 * 1024;
export const imageFormatHint = "JPG, PNG or WebP, up to 4 MB.";
export const mediaIdPattern = /^c[a-z0-9]{24}$/;

export type MediaAsset = { id: string; filename: string };
export type MediaPage = { assets: MediaAsset[]; page: number; pages: number; total: number };

export function mediaPath(id: string) {
  return `/media/${id}`;
}

export function isImageField(field: string) {
  return field === "image" || field === "img" || field.endsWith("Image");
}

export function isImagePath(path: string) {
  if (path.startsWith("/media/")) return mediaIdPattern.test(path.slice(7));
  if (!/^\/images\/[a-zA-Z0-9/_.%-]+$/.test(path)) return false;
  return path.slice(8).split("/").every((part) => {
    try {
      const decoded = decodeURIComponent(part);
      return decoded !== "." && decoded !== ".." && /^[a-zA-Z0-9_. %()-]+$/.test(decoded);
    } catch {
      return false;
    }
  });
}
