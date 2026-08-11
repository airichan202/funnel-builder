import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";

// Users
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Funnels
export const funnels = sqliteTable("funnels", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  status: text("status", { enum: ["draft", "live"] })
    .notNull()
    .default("draft"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Pages
export const pages = sqliteTable("pages", {
  id: text("id").primaryKey(),
  funnelId: text("funnel_id")
    .notNull()
    .references(() => funnels.id, { onDelete: "cascade" }),
  stepOrder: integer("step_order").notNull(),
  title: text("title").notNull(),
  jsonBlocks: text("json_blocks", { mode: "json" }).notNull(),
  settings: text("settings", { mode: "json" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Templates (hardcoded, not user-editable)
export const templates = sqliteTable("templates", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  thumbnail: text("thumbnail"),
  jsonBlocks: text("json_blocks", { mode: "json" }).notNull(),
});

// Events
export const events = sqliteTable("events", {
  id: text("id").primaryKey(),
  funnelId: text("funnel_id")
    .notNull()
    .references(() => funnels.id, { onDelete: "cascade" }),
  pageId: text("page_id").references(() => pages.id, { onDelete: "set null" }),
  visitorId: text("visitor_id"),
  eventType: text("event_type").notNull(),
  meta: text("meta", { mode: "json" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});