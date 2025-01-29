import { sql } from 'drizzle-orm';
import { index, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';

export const tests = pgTable(
  'tests',
  {
    id: varchar()
      .primaryKey()
      .default(sql`gen_ulid()`),
    name: varchar('name', { length: 255 }).notNull(),

    createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
  },
  (table) => {
    return {
      searchIdx: index('idx_tests_search')
        .using('bm25', sql`id, name, created_at, updated_at`)
        .with({ key_field: "'id'" }),
    };
  },
);

export const testSelectSchema = createSelectSchema(tests);
export const testCreateSchema = createInsertSchema(tests).pick({
  name: true,
});
export const testUpdateSchema = createUpdateSchema(tests).partial();

export type SelectTest = z.infer<typeof testSelectSchema>;
export type CreateTest = z.infer<typeof testCreateSchema>;
export type UpdateTest = z.infer<typeof testUpdateSchema>;
