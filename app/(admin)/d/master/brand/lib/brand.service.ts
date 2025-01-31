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
}

export class BrandServiceImpl implements BrandService {
  private readonly brandRepository: BrandRepository;
  private readonly uploadRepository: UploadRepository;

  constructor(
    brandRepository: BrandRepository = new BrandRepositoryImpl(),
    uploadRepository: UploadRepository = new UploadRepositoryImpl(),
  ) {
    this.brandRepository = brandRepository;
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

    return this.brandRepository.create({ ...payload, image: imageUrl });
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
}
