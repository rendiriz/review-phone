import { Option } from '@/components/ui/multiselect';
import {
  BrandTypeRepository,
  BrandTypeRepositoryImpl,
} from '@/core/domain/brand-type/brand-type.repository';
import { BrandRepositoryImpl, type BrandRepository } from '@/core/domain/brand/brand.repository';
import type { Brand, BrandPayload, PaginatedBrand } from '@/core/domain/brand/brand.type';
import {
  UploadRepositoryImpl,
  type UploadRepository,
} from '@/core/domain/upload/upload.repository';
import type { Filter } from '@/lib/types/filter';

export interface BrandService {
  list(filter: Filter): Promise<PaginatedBrand>;
  detail(slug: string): Promise<Brand>;
  create(payload: BrandPayload): Promise<Brand>;
  update(slug: string, payload: BrandPayload): Promise<{ message: string }>;
  delete(slug: string): Promise<{ message: string }>;
  optionBrandType(filter: Filter): Promise<Option[]>;
  filterBrandType(filter: Filter): Promise<Option[]>;
}

export class BrandServiceImpl implements BrandService {
  private readonly brandRepository: BrandRepository;
  private readonly brandTypeRepository: BrandTypeRepository;
  private readonly uploadRepository: UploadRepository;

  constructor(
    brandRepository: BrandRepository = new BrandRepositoryImpl(),
    brandTypeRepository: BrandTypeRepository = new BrandTypeRepositoryImpl(),
    uploadRepository: UploadRepository = new UploadRepositoryImpl(),
  ) {
    this.brandRepository = brandRepository;
    this.brandTypeRepository = brandTypeRepository;
    this.uploadRepository = uploadRepository;
  }

  async list(filter: Filter): Promise<PaginatedBrand> {
    return await this.brandRepository.list(filter);
  }

  async detail(slug: string): Promise<Brand> {
    return await this.brandRepository.detail(slug);
  }

  async create(payload: BrandPayload): Promise<Brand> {
    let imageUrl = null;
    if (payload.image) {
      imageUrl = await this.uploadRepository.uploadR2(payload.image);
    }

    return await this.brandRepository.create({ ...payload, image: imageUrl });
  }

  async update(slug: string, payload: BrandPayload): Promise<{ message: string }> {
    let imageUrl = null;
    if (typeof payload.image === 'string') {
      imageUrl = payload.image;
    } else if (payload.image) {
      imageUrl = await this.uploadRepository.uploadR2(payload.image);
    }

    return await this.brandRepository.update(slug, { ...payload, image: imageUrl });
  }

  async delete(slug: string): Promise<{ message: string }> {
    return await this.brandRepository.delete(slug);
  }

  async optionBrandType(filter: Filter): Promise<Option[]> {
    return await this.brandTypeRepository.option(filter);
  }

  async filterBrandType(filter: Filter): Promise<Option[]> {
    return await this.brandTypeRepository.filter(filter);
  }
}
