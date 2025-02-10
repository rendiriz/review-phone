import { sql } from 'drizzle-orm';

import type { Filter } from '@/lib/types/filter';

export function filterSearchCondition(columns: string[], searchTerm?: string) {
  if (!searchTerm) return undefined;

  const searchConditions = columns.map(
    (column) => sql`${sql.identifier(column)} @@@ paradedb.fuzzy_term(${column}, ${searchTerm})`,
  );

  return searchConditions.length === 1
    ? searchConditions[0]
    : sql`(${sql.join(searchConditions, sql` OR `)})`;
}

export function filterArrayCondition(table: string, column: string, values?: string[]) {
  if (!values?.length) return undefined;
  return sql`${sql.identifier(table)}.${sql.identifier(column)} IN (${sql.join(
    values.map((value) => sql`${value}`),
    sql`, `,
  )})`;
}

export function filterWhereClause(table: string, columns: string[], filter: Filter) {
  const conditions = [];

  if (filter.search) {
    const searchCondition = filterSearchCondition(columns, filter.search as string);
    if (searchCondition) conditions.push(searchCondition);
  }

  Object.entries(filter).forEach(([key, value]) => {
    if (key === 'search') return;
    if (Array.isArray(value)) {
      const condition = filterArrayCondition(table, key, value);
      if (condition) conditions.push(condition);
    }
  });

  conditions.push(sql`${sql.identifier(table)}.status NOT IN ('archived', 'deleted')`);

  if (!conditions.length) return undefined;

  return conditions.length === 1 ? conditions[0] : sql.join(conditions, sql` AND `);
}
