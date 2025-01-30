import { z } from 'zod';

import { BrandSelectSchema } from '@/core/domain/brand/brand.schema';
import type { Pagination } from '@/lib/types/pagination';

export type Brand = z.infer<typeof BrandSelectSchema>;

export interface PaginatedBrand {
  data: Brand[];
  meta: {
    pagination?: Pagination;
  };
}
