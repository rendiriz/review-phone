import 'server-only';

import { createHash } from 'crypto';

import { sql } from 'drizzle-orm';

import { brandTypeCacheKeys } from '@/core/domain/brand-type/brand-type.key';
import { serializeSearchParams } from '@/core/domain/brand-type/brand-type.param';
import { db } from '@/drizzle/db';
import { brandTypes } from '@/drizzle/schema/brandTypes';
import { redis } from '@/lib/config/redis';
import type { Filter } from '@/lib/types/filter';
import { calculatePagination } from '@/lib/utils/calculate-pagination';
import { createPagination } from '@/lib/utils/create-pagination';
import { filterOrderByClause } from '@/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/lib/utils/filter-where-clause';

const CACHE_TTL = 3600;

export async function getBrandTypes(filter: Filter) {
  const serialize = serializeSearchParams(filter);
  const hash = createHash('md5').update(serialize).digest('hex');
  const cacheKey = brandTypeCacheKeys.list(hash);

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const searchColumns = ['name'];
  const sortColumns = ['name', 'updated_at'];

  const whereClause = {
    search: filter.search,
    ...(filter.status ? { status: filter.status } : {}),
  };
  const conditions = filterWhereClause(searchColumns, whereClause);
  const sort = filterOrderByClause(sortColumns, filter.sortBy, filter.sortDir);

  const [{ count }] = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(brandTypes)
    .where(conditions);

  const { currentPage, itemsPerPage, offset } = calculatePagination(filter.page, filter.pageSize);
  const pagination = createPagination(count, currentPage, itemsPerPage, offset);

  const data = await db
    .select()
    .from(brandTypes)
    .where(conditions)
    .orderBy(sort)
    .limit(itemsPerPage)
    .offset(offset);

  const result = {
    data,
    meta: {
      pagination,
    },
  };

  await redis.set(cacheKey, JSON.stringify(result), { EX: CACHE_TTL });

  return result;
}
