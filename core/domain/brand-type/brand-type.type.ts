import { z } from 'zod';

import {
  BrandTypeFormSchema,
  BrandTypeSelectSchema,
} from '@/core/domain/brand-type/brand-type.schema';
import type { Pagination } from '@/lib/types/pagination';

export type BrandType = z.infer<typeof BrandTypeSelectSchema>;

export type BrandTypePayload = z.infer<typeof BrandTypeFormSchema>;

export interface PaginatedBrandType {
  data: BrandType[];
  meta: {
    pagination?: Pagination;
  };
}
