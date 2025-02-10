import { z } from 'zod';

import { BrandToBrandTypeSelectSchema } from '@/core/domain/brand-to-brand-type/brand-to-brand-type.schema';
import { BrandType } from '@/core/domain/brand-type/brand-type.type';

export type BrandToBrandType = z.infer<typeof BrandToBrandTypeSelectSchema> & {
  brandType: BrandType;
};
