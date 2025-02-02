import type { Filter } from '@/lib/types/filter';

export const brandTypeKeys = {
  all: ['brandType'] as const,
  lists: () => [...brandTypeKeys.all, 'list'] as const,
  list: (filter: Filter) => [...brandTypeKeys.lists(), filter] as const,
  detail: (slug: string) => [...brandTypeKeys.all, 'detail', slug] as const,
};

export const brandTypeCacheKeys = {
  all: ['brandType'],
  lists: () => [...brandTypeKeys.all, 'list'].join(':'),
  list: (filter: string) => [...brandTypeKeys.lists(), filter].join(':'),
  detail: (slug: string) => [...brandTypeKeys.all, 'detail', slug].join(':'),
};
