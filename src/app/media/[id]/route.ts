import { database } from "@/server/db";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^c[a-z0-9]{24}$/.test(id)) return new Response(null, { status: 404 });
  const asset = await database().mediaAsset.findUnique({ where: { id }, select: { data: true } });
  if (!asset) return new Response(null, { status: 404 });

  return new Response(new Uint8Array(asset.data), {
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(asset.data.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
