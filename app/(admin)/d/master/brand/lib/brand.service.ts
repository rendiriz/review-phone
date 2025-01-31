import { BrandRepositoryImpl, type BrandRepository } from '@/core/domain/brand/brand.repository';
import type { Brand, BrandPayload, PaginatedBrand } from '@/core/domain/brand/brand.type';
import type { Filter } from '@/lib/types/filter';

export interface BrandService {
  list(filter: Filter): Promise<PaginatedBrand>;
  create(payload: BrandPayload): Promise<Brand>;
  delete(slug: string): Promise<{ message: string }>;
}

export class BrandServiceImpl implements BrandService {
  private readonly brandRepository: BrandRepository;

  constructor(brandRepository: BrandRepository = new BrandRepositoryImpl()) {
    this.brandRepository = brandRepository;
  }

  async list(filter: Filter): Promise<PaginatedBrand> {
    return this.brandRepository.list(filter);
  }

  async create(payload: BrandPayload): Promise<Brand> {
    return this.brandRepository.create(payload);
  }

  async delete(slug: string): Promise<{ message: string }> {
    return this.brandRepository.delete(slug);
  }
}
