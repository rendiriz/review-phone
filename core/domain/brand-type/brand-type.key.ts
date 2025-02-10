import type { Filter } from '@/lib/types/filter';

export const brandTypeKeys = {
  all: ['brandType'] as const,
  lists: () => [...brandTypeKeys.all, 'list'] as const,
  list: (filter: Filter) => [...brandTypeKeys.lists(), filter] as const,
  options: () => [...brandTypeKeys.all, 'option'] as const,
  option: (filter: Filter) => [...brandTypeKeys.options(), filter] as const,
  filters: () => [...brandTypeKeys.all, 'filter'] as const,
  filter: (filter: Filter) => [...brandTypeKeys.filters(), filter] as const,
  detail: (slug: string) => [...brandTypeKeys.all, 'detail', slug] as const,
};

export const brandTypeCacheKeys = {
  all: ['brandType'],
  lists: () => [...brandTypeKeys.all, 'list'].join(':'),
  list: (filter: string) => [...brandTypeKeys.lists(), filter].join(':'),
  options: () => [...brandTypeKeys.all, 'option'].join(':'),
  option: (filter: string) => [...brandTypeKeys.options(), filter].join(':'),
  filters: () => [...brandTypeKeys.all, 'filter'].join(':'),
  filter: (filter: string) => [...brandTypeKeys.filters(), filter].join(':'),
  detail: (slug: string) => [...brandTypeKeys.all, 'detail', slug].join(':'),
};
