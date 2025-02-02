import {
  createLoader,
  createSerializer,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server';

export const brandTypesSearchParams = {
  search: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
  sortBy: parseAsString.withDefault(''),
  sortDir: parseAsString.withDefault(''),
  status: parseAsArrayOf(parseAsString),
};

export const loadSearchParams = createLoader(brandTypesSearchParams);
export const serializeSearchParams = createSerializer(brandTypesSearchParams);
