import { getAdmin } from "@/server/admin";
import { listMedia } from "@/server/media";

export async function GET(request: Request) {
  const headers = { "Cache-Control": "private, no-store" };
  if (!(await getAdmin())) return Response.json({ error: "Sign in to open the media library." }, { status: 401, headers });

  const { searchParams } = new URL(request.url);
  return Response.json(await listMedia(searchParams.get("q")?.trim() ?? "", searchParams.get("page") ?? ""), { headers });
}
