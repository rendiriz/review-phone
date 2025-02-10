import { z } from 'zod';

import { BrandFormSchema, BrandSelectSchema } from '@/core/domain/brand/brand.schema';
import type { Pagination } from '@/lib/types/pagination';

import { BrandToBrandType } from '../brand-to-brand-type/brand-to-brand-type.type';

export type Brand = z.infer<typeof BrandSelectSchema> & { brandsToBrandTypes: BrandToBrandType[] };

export type BrandPayload = z.infer<typeof BrandFormSchema>;

export interface PaginatedBrand {
  data: Brand[];
  meta: {
    pagination?: Pagination;
  };
}
