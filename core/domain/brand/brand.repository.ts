import { serializeSearchParams } from '@/core/domain/brand/brand.param';
import type { PaginatedBrand } from '@/core/domain/brand/brand.type';
import { API_ENDPOINTS, API_URL } from '@/lib/config/api';
import type { Filter } from '@/lib/types/filter';

export interface BrandRepository {
  list(filter: Filter): Promise<PaginatedBrand>;
}

export class BrandRepositoryImpl implements BrandRepository {
  async list(filter: Filter): Promise<PaginatedBrand> {
    const serialize = serializeSearchParams(filter);
    const endpoint = API_ENDPOINTS.brands.list(serialize);

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }
}
