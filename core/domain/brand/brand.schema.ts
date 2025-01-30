import { createSelectSchema } from 'drizzle-zod';

import { brands } from '@/drizzle/schema/brands';

export const BrandSelectSchema = createSelectSchema(brands);
