import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const activityLogs = sqliteTable("activity_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  action: text("action").notNull(),
  tag: text("tag"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const financeLogs = sqliteTable("finance_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  amount: integer("amount").notNull(),
  category: text("category"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const dailyMetrics = sqliteTable("daily_metrics", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: text("date"),
  focusScore: integer("focus_score"),
  tasksCompleted: integer("tasks_completed"),
  tasksTotal: integer("tasks_total"),
});

export const targets = sqliteTable("targets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  dueDate: text("due_date"),
  isCompleted: integer("is_completed", { mode: "boolean" }),
});

// TABEL BARU: SETTINGS
export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value"),
});