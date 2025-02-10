'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/shared/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { BrandToBrandType } from '@/core/domain/brand-to-brand-type/brand-to-brand-type.type';
import { statuses } from '@/core/domain/brand/brand.constant';
import type { Brand } from '@/core/domain/brand/brand.type';
import { cn } from '@/lib/utils';

import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Brand>[] = [
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
    id: 'type',
    meta: 'Type',
    maxSize: 150,
    accessorFn: (row) => row.brandsToBrandTypes,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Type"
      />
    ),
    enableSorting: false,
    cell: ({ row }) => {
      const types = row.getValue('type') as BrandToBrandType[];

      return (
        <div className="flex gap-2">
          {types.map((item) => (
            <Badge key={item.id}>{item.brandType.name}</Badge>
          ))}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
