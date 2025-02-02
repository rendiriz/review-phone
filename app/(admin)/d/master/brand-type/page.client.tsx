'use client';

import { useEffect, useState } from 'react';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ColumnFiltersState, SortDirection } from '@tanstack/react-table';
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from 'nuqs';

import { brandTypeKeys } from '@/core/domain/brand-type/brand-type.key';

import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { BrandTypeServiceImpl } from './lib/brand-type.service';

export function BrandTypeClientPage() {
  const [search, setSearch] = useQueryState('q', { defaultValue: '' });
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState('pageSize', parseAsInteger.withDefault(10));
  const [sortBy, setSortBy] = useQueryState('sortBy', { defaultValue: '' });
  const [sortDir, setSortDir] = useQueryState('sortDir', { defaultValue: '' });
  const [status, setStatus] = useQueryState('status', parseAsArrayOf(parseAsString));
  const [filter, setFilter] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    const newFilters: ColumnFiltersState = [];

    if (status) {
      newFilters.push({ id: 'status', value: status });
    }

    setFilter(newFilters);
  }, [status]);

  const queryParams = {
    ...(search && { search }),
    ...(page && { page }),
    ...(pageSize && { pageSize }),
    ...(sortBy && { sortBy }),
    ...(sortDir && { sortDir }),
    ...(status && { status }),
  };

  const { data, isPending, isError } = useQuery({
    queryKey: brandTypeKeys.list(queryParams),
    queryFn: () => new BrandTypeServiceImpl().list(queryParams),
    placeholderData: keepPreviousData,
  });

  const handleFilterChange = (filters: ColumnFiltersState) => {
    setFilter(filters);

    const statusFilter = filters.find((f) => f.id === 'status')?.value as string[] | undefined;
    setStatus(statusFilter || null);
  };

  return (
    <DataTable
      columns={columns}
      data={data?.data ?? []}
      meta={{
        totalPages: data?.meta.pagination?.totalPages ?? 0,
        total: data?.meta.pagination?.total ?? 0,
      }}
      search={search}
      sortBy={sortBy}
      sortDir={sortDir as SortDirection}
      page={page}
      pageSize={pageSize}
      filter={filter}
      onSearchChange={setSearch}
      onSortByChange={setSortBy}
      onSortDirChange={setSortDir}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
      onFilterChange={handleFilterChange}
      isLoading={isPending}
      isError={isError}
    />
  );
}
