'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/shared/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { statuses } from '@/core/domain/brand-type/brand-type.constant';
import type { BrandType } from '@/core/domain/brand-type/brand-type.type';
import { cn } from '@/lib/utils';

import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<BrandType>[] = [
  {
    id: 'name',
    meta: 'Name',
    accessorFn: (row) => row.name,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
      />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('name')}</div>;
    },
  },
  {
    id: 'status',
    meta: 'Status',
    maxSize: 150,
    accessorFn: (row) => row.status,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue('status'));

      if (!status) {
        return null;
      }

      return (
        <Badge
          className={cn(
            status.value === 'inactive' && 'bg-muted-foreground/60 text-primary-foreground',
          )}
        >
          {status.label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    maxSize: 75,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
