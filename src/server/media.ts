import type { MediaPage } from "@/data/media";
import { database } from "./db";

const pageSize = 24;

export async function listMedia(query: string, requestedPage: string): Promise<MediaPage> {
  const db = database();
  const where = query ? { filename: { contains: query.slice(0, 100), mode: "insensitive" as const } } : {};
  const total = await db.mediaAsset.count({ where });
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.max(1, Math.min(pages, Number.parseInt(requestedPage, 10) || 1));
  const assets = await db.mediaAsset.findMany({
    where,
    orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    select: { id: true, filename: true },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  return { assets, page, pages, total };
}
