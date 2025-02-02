import {
  BrandTypeRepositoryImpl,
  type BrandTypeRepository,
} from '@/core/domain/brand-type/brand-type.repository';
import type {
  BrandType,
  BrandTypePayload,
  PaginatedBrandType,
} from '@/core/domain/brand-type/brand-type.type';
import type { Filter } from '@/lib/types/filter';

export interface BrandTypeService {
  list(filter: Filter): Promise<PaginatedBrandType>;
  detail(slug: string): Promise<BrandType>;
  create(payload: BrandTypePayload): Promise<BrandType>;
  update(slug: string, payload: BrandTypePayload): Promise<{ message: string }>;
  delete(slug: string): Promise<{ message: string }>;
}

export class BrandTypeServiceImpl implements BrandTypeService {
  private readonly brandTypeRepository: BrandTypeRepository;

  constructor(brandTypeRepository: BrandTypeRepository = new BrandTypeRepositoryImpl()) {
    this.brandTypeRepository = brandTypeRepository;
  }

  async list(filter: Filter): Promise<PaginatedBrandType> {
    return await this.brandTypeRepository.list(filter);
  }

  async detail(slug: string): Promise<BrandType> {
    return await this.brandTypeRepository.detail(slug);
  }

  async create(payload: BrandTypePayload): Promise<BrandType> {
    return await this.brandTypeRepository.create(payload);
  }

  async update(slug: string, payload: BrandTypePayload): Promise<{ message: string }> {
    return await this.brandTypeRepository.update(slug, payload);
  }

  async delete(slug: string): Promise<{ message: string }> {
    return await this.brandTypeRepository.delete(slug);
  }
}
