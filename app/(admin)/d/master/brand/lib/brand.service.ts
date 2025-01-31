import { BrandRepositoryImpl, type BrandRepository } from '@/core/domain/brand/brand.repository';
import type { Brand, BrandPayload, PaginatedBrand } from '@/core/domain/brand/brand.type';
import type { Filter } from '@/lib/types/filter';

export interface BrandService {
  list(filter: Filter): Promise<PaginatedBrand>;
  detail(slug: string): Promise<Brand>;
  create(payload: BrandPayload): Promise<Brand>;
  update(slug: string, payload: BrandPayload): Promise<{ message: string }>;
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

  async detail(slug: string): Promise<Brand> {
    return this.brandRepository.detail(slug);
  }

  async create(payload: BrandPayload): Promise<Brand> {
    return this.brandRepository.create(payload);
  }

  async update(slug: string, payload: BrandPayload): Promise<{ message: string }> {
    return this.brandRepository.update(slug, payload);
  }

  async delete(slug: string): Promise<{ message: string }> {
    return this.brandRepository.delete(slug);
  }
}
