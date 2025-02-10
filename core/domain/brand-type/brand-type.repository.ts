import { Option } from '@/components/ui/multiselect';
import { serializeSearchParams } from '@/core/domain/brand-type/brand-type.param';
import type {
  BrandType,
  BrandTypePayload,
  PaginatedBrandType,
} from '@/core/domain/brand-type/brand-type.type';
import { API_ENDPOINTS, API_URL } from '@/lib/config/api';
import type { Filter } from '@/lib/types/filter';

export interface BrandTypeRepository {
  list(filter: Filter): Promise<PaginatedBrandType>;
  detail(slug: string): Promise<BrandType>;
  create(payload: BrandTypePayload): Promise<BrandType>;
  update(slug: string, payload: BrandTypePayload): Promise<{ message: string }>;
  delete(slug: string): Promise<{ message: string }>;
  option(filter: Filter): Promise<Option[]>;
  filter(filter: Filter): Promise<Option[]>;
}

export class BrandTypeRepositoryImpl implements BrandTypeRepository {
  async list(filter: Filter): Promise<PaginatedBrandType> {
    const serialize = serializeSearchParams(filter);
    const endpoint = API_ENDPOINTS.brandTypes.list(serialize);

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch brand types');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async detail(slug: string): Promise<BrandType> {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.brandTypes.detail(slug)}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch brand type');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async create(payload: BrandTypePayload): Promise<BrandType> {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.brandTypes.create}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to create brand type');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async update(slug: string, payload: BrandTypePayload): Promise<{ message: string }> {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.brandTypes.update(slug)}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to update brand type');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async delete(slug: string): Promise<{ message: string }> {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.brandTypes.delete(slug)}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete brand type');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async option(filter: Filter): Promise<Option[]> {
    const serialize = serializeSearchParams(filter);
    const endpoint = API_ENDPOINTS.brandTypes.option(serialize);

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch brand types');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async filter(filter: Filter): Promise<Option[]> {
    const serialize = serializeSearchParams(filter);
    const endpoint = API_ENDPOINTS.brandTypes.filter(serialize);

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch brand types');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }
}
