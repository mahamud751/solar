import "dotenv/config";
import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { z } from "zod";
import { database } from "../src/server/db";
import { hashPassword } from "../src/server/password";

async function main() {
  const email = z.email().parse(process.argv[2]?.toLowerCase().trim());
  const generate = process.argv.includes("--generate");
  const password = generate ? randomBytes(24).toString("base64url") : (await Array.fromAsync(process.stdin)).join("").replace(/\r?\n$/, "");
  if (password.length < 12 || password.length > 128) throw new Error("Use a password of 12 to 128 characters.");
  const passwordHash = await hashPassword(password);
  const db = database();

  if (generate) {
    const path = ".local/admin-credentials.txt";
    await mkdir(".local", { recursive: true, mode: 0o700 });
    await writeFile(path, `Email: ${email}\nPassword: ${password}\n`, { mode: 0o600, flag: "wx" });
    try {
      await db.admin.create({ data: { email, passwordHash } });
    } catch (error) {
      const { unlink } = await import("node:fs/promises");
      await unlink(path);
      throw error;
    }
    console.log(`Created ${email}. Credentials are saved in ${path}.`);
    return;
  }

  await db.$transaction(async (tx) => {
    const admin = await tx.admin.upsert({
      where: { email },
      create: { email, passwordHash },
      update: { passwordHash },
    });
    await tx.adminSession.deleteMany({ where: { adminId: admin.id } });
    await tx.loginThrottle.deleteMany({ where: { key: admin.id } });
  });
  console.log(`Saved the admin account for ${email} and ended previous sessions.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Could not save the admin account.");
  process.exitCode = 1;
}).finally(() => {
  if (process.env.DATABASE_URL) return database().$disconnect();
});
