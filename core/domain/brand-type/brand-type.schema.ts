import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { brandTypes } from '@/drizzle/schema/brandTypes';

export const BrandTypeSelectSchema = createSelectSchema(brandTypes);

export const BrandTypeFormSchema = createInsertSchema(brandTypes, {
  name: (s) => s.min(1, 'Name is required.').max(50, 'Name must be at most 50 characters.'),
  description: (s) => s.optional(),
  status: (s) => s,
}).pick({
  name: true,
  description: true,
  status: true,
});
