import 'server-only';

import { sql } from 'drizzle-orm';

import { db } from '@/drizzle/db';
import { brands } from '@/drizzle/schema/brands';
import type { Filter } from '@/lib/types/filter';
import { calculatePagination } from '@/lib/utils/calculate-pagination';
import { createPagination } from '@/lib/utils/create-pagination';
import { filterOrderByClause } from '@/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/lib/utils/filter-where-clause';

export async function getBrands(filter: Filter) {
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
    .from(brands)
    .where(conditions);

  const { currentPage, itemsPerPage, offset } = calculatePagination(filter.page, filter.pageSize);
  const pagination = createPagination(count, currentPage, itemsPerPage, offset);

  const data = await db
    .select()
    .from(brands)
    .where(conditions)
    .orderBy(sort)
    .limit(itemsPerPage)
    .offset(offset);

  return {
    data,
    meta: {
      pagination,
    },
  };
}
