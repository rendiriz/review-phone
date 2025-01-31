import { sql } from 'drizzle-orm';
import { index, json, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const brandStatusEnum = pgEnum('brand_status', [
  'active',
  'inactive',
  'archived',
  'deleted',
]);

export const brands = pgTable(
  'brands',
  {
    brandId: uuid('brand_id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    country: varchar('country', { length: 255 }).notNull(),
    image: text('image'),
    status: brandStatusEnum().notNull(),
    description: text('description'),
    metadata: json().$type<any>(),

    createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
  },
  (table) => {
    return {
      searchIdx: index('idx_brands_search')
        .using(
          'bm25',
          sql`brand_id, slug, name, country, image, status, description, metadata, created_at, updated_at`,
        )
        .with({ key_field: "'brand_id'" }),
    };
  },
);
