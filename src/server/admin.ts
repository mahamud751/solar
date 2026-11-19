import { createHash, randomBytes } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { database } from "./db";
import { verifyPassword } from "./password";

const cookieName = "solar_admin_session";
const sessionAge = 8 * 60 * 60;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export const getAdmin = cache(async () => {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const session = await database().adminSession.findUnique({
    where: { tokenHash: hashToken(token) },
    select: { expiresAt: true, admin: { select: { id: true, email: true } } },
  });
  return session && session.expiresAt > new Date() ? session.admin : null;
});

export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function signIn(email: string, password: string) {
  const db = database();
  const admin = await db.admin.findUnique({ where: { email } });
  const key = admin?.id ?? "unknown";
  const [limit] = await db.$queryRaw<{ attempts: number }[]>`
    INSERT INTO "LoginThrottle" ("key", "attempts", "expiresAt")
    VALUES (${key}, 1, NOW() + INTERVAL '15 minutes')
    ON CONFLICT ("key") DO UPDATE SET
      "attempts" = CASE
        WHEN "LoginThrottle"."expiresAt" <= NOW() THEN 1
        ELSE LEAST("LoginThrottle"."attempts" + 1, 11)
      END,
      "expiresAt" = CASE
        WHEN "LoginThrottle"."expiresAt" <= NOW() THEN NOW() + INTERVAL '15 minutes'
        ELSE "LoginThrottle"."expiresAt"
      END
    RETURNING "attempts"
  `;

  if (limit.attempts > 10) return "Too many attempts. Try again in 15 minutes.";
  if (!(await verifyPassword(password, admin?.passwordHash)) || !admin) return "The email or password is incorrect.";

  const token = randomBytes(32).toString("hex");
  const jar = await cookies();
  const oldToken = jar.get(cookieName)?.value;
  await db.$transaction([
    db.loginThrottle.deleteMany({ where: { key } }),
    db.adminSession.deleteMany({
      where: { adminId: admin.id, OR: [{ expiresAt: { lte: new Date() } }, ...(oldToken ? [{ tokenHash: hashToken(oldToken) }] : [])] },
    }),
    db.adminSession.create({
      data: { tokenHash: hashToken(token), adminId: admin.id, expiresAt: new Date(Date.now() + sessionAge * 1000) },
    }),
  ]);

  const secure = process.env.ADMIN_SECURE_COOKIES === "true" || (await headers()).get("x-forwarded-proto") === "https";
  jar.set(cookieName, token, { httpOnly: true, secure, sameSite: "lax", path: "/admin", maxAge: sessionAge });
}

export async function signOut() {
  const jar = await cookies();
  const token = jar.get(cookieName)?.value;
  if (token) {
    await database().adminSession.deleteMany({ where: { tokenHash: hashToken(token) } });
  }
  jar.set(cookieName, "", { httpOnly: true, sameSite: "lax", path: "/admin", maxAge: 0 });
}
