export const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
}

export const API_ENDPOINTS = {
  brandTypes: {
    base: '/brand-types',
    list: (qs: string) => `/brand-types${qs}`,
    option: (qs: string) => `/brand-types/option${qs}`,
    filter: (qs: string) => `/brand-types/filter${qs}`,
    create: '/brand-types',
    detail: (slug: string) => `/brand-types/${slug}`,
    update: (slug: string) => `/brand-types/${slug}`,
    delete: (slug: string) => `/brand-types/${slug}`,
  },
  brands: {
    base: '/brands',
    list: (qs: string) => `/brands${qs}`,
    create: '/brands',
    detail: (slug: string) => `/brands/${slug}`,
    update: (slug: string) => `/brands/${slug}`,
    delete: (slug: string) => `/brands/${slug}`,
  },
  upload: {
    base: '/upload',
    r2: '/upload/r2',
  },
} as const;
