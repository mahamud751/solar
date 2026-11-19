CREATE TABLE "AppliedContentSeed" (
  "collection" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  CONSTRAINT "AppliedContentSeed_pkey" PRIMARY KEY ("collection", "key")
);

INSERT INTO "AppliedContentSeed" ("collection", "key")
SELECT "collection", "key" FROM "ContentEntry"
ON CONFLICT DO NOTHING;
