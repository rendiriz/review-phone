import { relations, sql } from 'drizzle-orm';
import { index, pgTable, uuid } from 'drizzle-orm/pg-core';

import { brands, brandTypes } from '@/drizzle/schema';

export const brandsToBrandTypes = pgTable(
  'brands_to_brand_types',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    brandId: uuid('brand_id')
      .notNull()
      .references(() => brands.brandId),
    brandTypeId: uuid('brand_type_id')
      .notNull()
      .references(() => brandTypes.brandTypeId),
  },
  (table) => ({
    searchIdx: index('idx_brands_to_brand_types_search')
      .using('bm25', sql`id, brand_id, brand_type_id`)
      .with({ key_field: "'id'" }),
  }),
);

export const brandsToBrandTypesRelations = relations(brandsToBrandTypes, ({ one }) => ({
  brandType: one(brandTypes, {
    fields: [brandsToBrandTypes.brandTypeId],
    references: [brandTypes.brandTypeId],
  }),
  brand: one(brands, {
    fields: [brandsToBrandTypes.brandId],
    references: [brands.brandId],
  }),
}));
