'use client';

import { Table } from '@tanstack/react-table';
import { Search } from 'lucide-react';

import { DataTableFacetedFilter } from '@/components/shared/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/shared/data-table-view-options';
import { DebouncedInput } from '@/components/ui/debounced-input';
import { statuses } from '@/core/domain/brand-type/brand-type.constant';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <DebouncedInput
            placeholder="Search brand type..."
            value={table.getState().globalFilter ?? ''}
            onChange={(value) => table.setGlobalFilter(value)}
            className="h-8 w-[150px] ps-9 lg:w-[250px]"
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <Search
              size={16}
              strokeWidth={2}
            />
          </div>
        </div>

        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statuses}
          />
        )}
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
}
