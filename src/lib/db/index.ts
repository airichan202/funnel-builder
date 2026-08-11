import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { mkdirSync, existsSync } from "fs";
import { join } from "path";

const dataDir = process.env.DATA_DIR || join(process.cwd(), "data");
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

const sqlite = new Database(join(dataDir, "funnel.db"));
sqlite.pragma("journal_mode = WAL");
const db = drizzle(sqlite, { schema });

const migrationsFolder = join(process.cwd(), "drizzle");
if (existsSync(migrationsFolder)) {
  migrate(db, { migrationsFolder });
}

export { db, sqlite };
export * from "./schema";
