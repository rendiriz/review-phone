import { sql } from 'drizzle-orm';

type SortDirection = 'asc' | 'desc';

const isValidSortColumn = (columns: string[], column: string) => {
  return columns.includes(column);
};

const isValidSortDirection = (direction: string): direction is SortDirection => {
  return ['asc', 'desc'].includes(direction);
};

export const filterOrderByClause = (
  table: string,
  columns: string[],
  sortBy: string | undefined,
  sortDir: string | undefined,
) => {
  const normalizedSortBy = sortBy?.toLowerCase() || 'updated_at';
  const normalizedSortDir = sortDir?.toLowerCase() || 'desc';

  if (isValidSortColumn(columns, normalizedSortBy) && isValidSortDirection(normalizedSortDir)) {
    return sql`${sql.identifier(normalizedSortBy)} ${sql.raw(normalizedSortDir)}`;
  }

  return sql`${sql.identifier(table)}.updated_at desc`;
};
