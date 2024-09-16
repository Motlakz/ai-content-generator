import { pgTable, serial, varchar, timestamp, text, boolean } from "drizzle-orm/pg-core";

// Existing AIOutput table
export const AIOutput = pgTable("aiOutput", {
    id: serial("id").primaryKey(),
    formData: varchar("formData").notNull(),
    aiResponse: text("aiResponse"),
    templateSlug: varchar("templateSlug").notNull(),
    createdBy: varchar("email").notNull(),
    createdAt: varchar("createdAt")
});

// Subscriptions table
export const Subscriptions = pgTable("subscriptions", {
    id: serial("id").primaryKey(),
    userId: varchar("userId").notNull(),
    level: varchar("level").notNull(), 
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(), 
});

// New Notifications table
export const Notifications = pgTable("notifications", {
    id: serial("id").primaryKey(),
    userId: varchar("userId").notNull(),
    type: varchar("type").notNull(),
    title: varchar("title").notNull(),
    message: text("message").notNull(),
    isRead: boolean("isRead").default(false),
    createdAt: timestamp("createdAt").defaultNow(),
});
