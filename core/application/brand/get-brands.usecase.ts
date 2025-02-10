import 'server-only';

import { createHash } from 'crypto';

import { and, eq, inArray, sql } from 'drizzle-orm';

import { brandCacheKeys } from '@/core/domain/brand/brand.key';
import { serializeSearchParams } from '@/core/domain/brand/brand.param';
import { db } from '@/drizzle/db';
import { brandsToBrandTypes, brandTypes } from '@/drizzle/schema';
import { brands } from '@/drizzle/schema/brands';
import { redis } from '@/lib/config/redis';
import type { Filter } from '@/lib/types/filter';
import { calculatePagination } from '@/lib/utils/calculate-pagination';
import { createPagination } from '@/lib/utils/create-pagination';
import { filterOrderByClause } from '@/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/lib/utils/filter-where-clause';

const CACHE_TTL = 3600;

export async function getBrands(filter: Filter) {
  const serialize = serializeSearchParams(filter);
  const hash = createHash('md5').update(serialize).digest('hex');
  const cacheKey = brandCacheKeys.list(hash);

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const table = 'brands';
  const searchColumns = [`${table}.name`];
  const sortColumns = ['name', 'status', 'updated_at'];

  const whereClause = {
    search: filter.search,
    ...(filter.status ? { status: filter.status } : {}),
  };
  const conditions = filterWhereClause(table, searchColumns, whereClause);
  const sort = filterOrderByClause(table, sortColumns, filter.sortBy, filter.sortDir);

  const [{ count }] = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(brands)
    .leftJoin(brandsToBrandTypes, eq(brandsToBrandTypes.brandId, brands.brandId))
    .leftJoin(brandTypes, eq(brandTypes.brandTypeId, brandsToBrandTypes.brandTypeId))
    .where(
      and(
        conditions,
        filter.brandType
          ? inArray(sql`${brandTypes.slug}`, filter.brandType as string[])
          : undefined,
      ),
    );

  const { currentPage, itemsPerPage, offset } = calculatePagination(filter.page, filter.pageSize);
  const pagination = createPagination(count, currentPage, itemsPerPage, offset);

  const data = await db.query.brands.findMany({
    where: and(
      conditions,
      filter.brandType
        ? sql`exists (
              select 1 from ${brandsToBrandTypes} bt 
              join ${brandTypes} bt_type on bt_type.brand_type_id = bt.brand_type_id
              where bt.brand_id = ${brands.brandId} 
              and bt_type.slug in (${sql.join(filter.brandType as string[])})
            )`
        : undefined,
    ),
    orderBy: sort,
    limit: itemsPerPage,
    offset: offset,
    with: {
      brandsToBrandTypes: {
        with: {
          brandType: true,
        },
      },
    },
  });

  const result = {
    data,
    meta: {
      pagination,
    },
  };

  await redis.set(cacheKey, JSON.stringify(result), { EX: CACHE_TTL });

  return result;
}
