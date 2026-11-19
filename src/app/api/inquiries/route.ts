import { z } from "zod";
import { database } from "@/server/db";

const base = {
  id: z.uuid(),
  source: z.string().max(200).regex(/^\/[a-z0-9/_-]*$/i),
  website: z.string().max(400).optional(),
};

const contact = {
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(24)
    .transform((value) => value.replace(/[০-৯]/g, (digit) => String(digit.charCodeAt(0) - 2534)).replace(/[\s()-]/g, ""))
    .pipe(z.string().regex(/^\+?\d{10,15}$/)),
  city: z.string().trim().min(2).max(120),
};

const email = z.string().trim().max(254).pipe(z.email());
const segments = z.enum(["Residential", "Commercial", "Industrial", "EPC Partner"]);
const quoteBills = z.enum(["1500-3000", "3000-8000", "8000-30000", "30000-200000", "200000+"]);
const consultationBills = z.enum(["<1500", "1500-2500", "2500-4000", "4000-8000", "8000+"]);

const inquiry = z.discriminatedUnion("kind", [
  z.object({ ...base, ...contact, kind: z.literal("QUOTE"), email, monthlyBill: quoteBills, segment: segments }),
  z.object({ ...base, ...contact, kind: z.literal("PARTNERSHIP"), email, monthlyBill: quoteBills, segment: segments }),
  z.object({ ...base, ...contact, kind: z.literal("CONSULTATION"), monthlyBill: consultationBills }),
  z.object({ ...base, kind: z.literal("ESTIMATE"), email }),
]);

async function readJson(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return;
  const decoder = new TextDecoder();
  let size = 0;
  let body = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 8192) {
      await reader.cancel();
      return;
    }
    body += decoder.decode(value, { stream: true });
  }
  return JSON.parse(body + decoder.decode()) as unknown;
}

export async function POST(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json") {
    return Response.json({ error: "Use a JSON request." }, { status: 415 });
  }

  const result = inquiry.safeParse(await readJson(request).catch(() => undefined));
  if (!result.success) {
    return Response.json({ error: "Check your contact details and try again." }, { status: 400 });
  }

  const { website, ...data } = result.data;
  if (website) return Response.json({ saved: true });

  try {
    await database().inquiry.createMany({ data: [data], skipDuplicates: true });
    return Response.json({ saved: true }, { status: 201 });
  } catch {
    console.error("Unable to store a solar inquiry.");
    return Response.json({ error: "Please try again shortly." }, { status: 503 });
  }
}
