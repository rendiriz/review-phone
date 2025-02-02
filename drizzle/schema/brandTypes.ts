import { relations, sql } from 'drizzle-orm';
import { index, json, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { brandsToBrandTypes } from '@/drizzle/schema';

export const brandTypeStatusEnum = pgEnum('brand_type_status', [
  'active',
  'inactive',
  'archived',
  'deleted',
]);

export const brandTypes = pgTable(
  'brand_types',
  {
    brandTypeId: uuid('brand_type_id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    slug: varchar('slug', { length: 50 }).notNull().unique(),
    name: varchar('name', { length: 50 }).notNull(),
    status: brandTypeStatusEnum().notNull(),
    description: text('description'),
    metadata: json().$type<any>(),

    createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
  },
  (table) => {
    return {
      searchIdx: index('idx_brand_types_search')
        .using(
          'bm25',
          sql`brand_type_id, slug, name, status, description, metadata, created_at, updated_at`,
        )
        .with({ key_field: "'brand_type_id'" }),
    };
  },
);

export const brandTypesRelations = relations(brandTypes, ({ many }) => ({
  brandsToBrandTypes: many(brandsToBrandTypes),
}));
