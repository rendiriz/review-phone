import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { brands } from '@/drizzle/schema/brands';

export const BrandSelectSchema = createSelectSchema(brands);

export const BrandFormSchema = createInsertSchema(brands, {
  name: (s) => s.min(1, 'Name is required.').max(255, 'Name must be at most 255 characters.'),
  description: (s) => s.nullable(),
}).pick({
  name: true,
  description: true,
});
