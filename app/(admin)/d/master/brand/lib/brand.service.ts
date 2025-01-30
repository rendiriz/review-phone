import { getBrands } from '@/core/application/brand/get-brands.action';
import type { PaginatedBrand } from '@/core/domain/brand/brand.type';
import type { Filter } from '@/lib/types/filter';

export interface BrandService {
  list(filter: Filter): Promise<PaginatedBrand>;
}

export class BrandServiceImpl implements BrandService {
  async list(filter: Filter): Promise<PaginatedBrand> {
    return getBrands(filter);
  }
}
