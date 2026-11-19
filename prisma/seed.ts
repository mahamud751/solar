import "dotenv/config";
import { Prisma } from "../src/generated/prisma/client";
import { seedEntries } from "../src/data/catalog";
import { database } from "../src/server/db";

async function seed() {
  const count = await database().$transaction(async (tx) => {
    const applied = await tx.appliedContentSeed.findMany();
    const existing = new Set(applied.map(({ collection, key }) => `${collection}/${key}`));
    const pending = seedEntries().filter(({ collection, key }) => !existing.has(`${collection}/${key}`));
    if (!pending.length) return 0;
    const result = await tx.contentEntry.createMany({
      data: pending.map((entry) => ({ ...entry, data: entry.data as Prisma.InputJsonValue })),
      skipDuplicates: true,
    });
    await tx.appliedContentSeed.createMany({
      data: pending.map(({ collection, key }) => ({ collection, key })),
      skipDuplicates: true,
    });
    return result.count;
  });
  console.log(`Added ${count} content records.`);
}

seed().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => {
  if (process.env.DATABASE_URL) return database().$disconnect();
});
