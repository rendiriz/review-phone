import type { Filter } from '@/lib/types/filter';

export const brandKeys = {
  all: ['brand'] as const,
  lists: () => [...brandKeys.all, 'list'] as const,
  list: (filter: Filter) => [...brandKeys.lists(), filter] as const,
};
