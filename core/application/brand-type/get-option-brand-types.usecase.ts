import 'server-only';

import { createHash } from 'crypto';

import { brandTypeCacheKeys } from '@/core/domain/brand-type/brand-type.key';
import { serializeSearchParams } from '@/core/domain/brand-type/brand-type.param';
import { db } from '@/drizzle/db';
import { redis } from '@/lib/config/redis';
import type { Filter } from '@/lib/types/filter';
import { filterOrderByClause } from '@/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/lib/utils/filter-where-clause';

const CACHE_TTL = 3600;

export async function getOptionBrandTypes(filter: Filter) {
  const serialize = serializeSearchParams(filter);
  const hash = createHash('md5').update(serialize).digest('hex');
  const cacheKey = brandTypeCacheKeys.option(hash);

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const table = 'brandTypes';
  const searchColumns = [`${table}.name`];
  const sortColumns = ['name', 'status', 'updated_at'];

  const whereClause = {
    search: filter.search,
    ...(filter.status ? { status: filter.status } : {}),
  };
  const conditions = filterWhereClause(table, searchColumns, whereClause);
  const sort = filterOrderByClause(table, sortColumns, filter.sortBy, filter.sortDir);

  const data = await db.query.brandTypes.findMany({
    where: conditions,
    orderBy: sort,
  });

  const result = data.map((item) => {
    return {
      value: item.brandTypeId,
      label: item.name,
    };
  });

  await redis.set(cacheKey, JSON.stringify(result), { EX: CACHE_TTL });

  return result;
}
