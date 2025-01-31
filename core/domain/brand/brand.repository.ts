import { serializeSearchParams } from '@/core/domain/brand/brand.param';
import type { Brand, BrandPayload, PaginatedBrand } from '@/core/domain/brand/brand.type';
import { API_ENDPOINTS, API_URL } from '@/lib/config/api';
import type { Filter } from '@/lib/types/filter';

export interface BrandRepository {
  list(filter: Filter): Promise<PaginatedBrand>;
  create(payload: BrandPayload): Promise<Brand>;
  delete(slug: string): Promise<{ message: string }>;
}

export class BrandRepositoryImpl implements BrandRepository {
  async list(filter: Filter): Promise<PaginatedBrand> {
    const serialize = serializeSearchParams(filter);
    const endpoint = API_ENDPOINTS.brands.list(serialize);

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
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

  async create(payload: BrandPayload): Promise<Brand> {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.brands.create}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to create brand');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async delete(slug: string): Promise<{ message: string }> {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.brands.delete(slug)}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete brand');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }
}
