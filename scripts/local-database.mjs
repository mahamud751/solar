import { randomBytes } from "node:crypto";
import { existsSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

if (existsSync(".env")) {
  process.exitCode = 1;
  console.error(".env already exists. Use its configured database or move it before initializing a new database.");
} else {
  const password = randomBytes(24).toString("hex");
  const result = spawnSync("psql", ["-X", "-w", "-q", "-v", "ON_ERROR_STOP=1", "-d", "postgres"], {
    input: `CREATE ROLE solar_website_app LOGIN PASSWORD '${password}';\nCREATE DATABASE solar_website OWNER solar_website_app;\n`,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    console.error(result.error?.message ?? result.stderr.replaceAll(password, "[redacted]"));
    process.exitCode = 1;
  } else {
    writeFileSync(".env", `DATABASE_URL="postgresql://solar_website_app:${password}@127.0.0.1:5432/solar_website?schema=public"\n`, {
      mode: 0o600,
      flag: "wx",
    });
    console.log("Created solar_website and saved its connection settings to .env.");
  }
}
