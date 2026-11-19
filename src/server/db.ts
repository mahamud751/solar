import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const globalDatabase = globalThis as typeof globalThis & {
  solarClients?: WeakMap<typeof PrismaClient, PrismaClient>;
};
const clients = globalDatabase.solarClients ??= new WeakMap();

export function database() {
  let client = clients.get(PrismaClient);
  if (!client) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error("DATABASE_URL is required.");
    client = new PrismaClient({
      adapter: new PrismaPg({ connectionString, connectionTimeoutMillis: 5000 }),
    });
    clients.set(PrismaClient, client);
  }
  return client;
}
