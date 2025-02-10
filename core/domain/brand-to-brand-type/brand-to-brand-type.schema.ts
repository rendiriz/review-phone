import { createSelectSchema } from 'drizzle-zod';

import { brandsToBrandTypes } from '@/drizzle/schema';

export const BrandToBrandTypeSelectSchema = createSelectSchema(brandsToBrandTypes);
