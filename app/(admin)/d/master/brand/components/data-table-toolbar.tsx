'use client';

import { Table } from '@tanstack/react-table';

import { DataTableFacetedFilter } from '@/components/shared/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/shared/data-table-view-options';
import { DebouncedInput } from '@/components/ui/debounced-input';
import { statuses } from '@/core/domain/brand/brand.constant';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DebouncedInput
          placeholder="Search brand..."
          value={table.getState().globalFilter ?? ''}
          onChange={(value) => table.setGlobalFilter(value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

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
