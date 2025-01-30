import { BrandRepositoryImpl, type BrandRepository } from '@/core/domain/brand/brand.repository';
import type { PaginatedBrand } from '@/core/domain/brand/brand.type';
import type { Filter } from '@/lib/types/filter';

export interface BrandService {
  list(filter: Filter): Promise<PaginatedBrand>;
}

export class BrandServiceImpl implements BrandService {
  private readonly brandRepository: BrandRepository;

  constructor(brandRepository: BrandRepository = new BrandRepositoryImpl()) {
    this.brandRepository = brandRepository;
  }

  async list(filter: Filter): Promise<PaginatedBrand> {
    return this.brandRepository.list(filter);
  }
}
