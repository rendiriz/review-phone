import { atom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';

import { brandTypeKeys } from '@/core/domain/brand-type/brand-type.key';

import { BrandServiceImpl } from './brand.service';

export const queryParamsOptionsAtom = atom({ sortBy: 'name', sortDir: 'asc' });
export const brandTypesOptionsAtom = atomWithQuery((get) => ({
  queryKey: brandTypeKeys.option(get(queryParamsOptionsAtom)),
  queryFn: () => new BrandServiceImpl().optionBrandType(get(queryParamsOptionsAtom)),
}));

export const queryParamsFilterAtom = atom({ sortBy: 'name', sortDir: 'asc' });
export const brandTypesFilterAtom = atomWithQuery((get) => ({
  queryKey: brandTypeKeys.filter(get(queryParamsFilterAtom)),
  queryFn: () => new BrandServiceImpl().filterBrandType(get(queryParamsFilterAtom)),
}));
