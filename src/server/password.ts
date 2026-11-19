import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const deriveKey = promisify(scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = await deriveKey(password, salt, 64) as Buffer;
  return `${salt}:${hash.toString("hex")}`;
}

export async function verifyPassword(password: string, stored?: string) {
  const [salt, expected] = (stored ?? "").split(":");
  const candidate = await deriveKey(password, salt || "solar-unknown-account", 64) as Buffer;
  return Boolean(expected) && timingSafeEqual(candidate, Buffer.from(expected, "hex"));
}
