'use client';

import { useState } from 'react';

import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BrandSelectSchema } from '@/core/domain/brand/brand.schema';

import { Delete } from './delete';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);

  const brand = BrandSelectSchema.parse(row.original);

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[160px]"
      >
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <Delete
          slug={brand.slug}
          isOpenDropdown={isOpen}
          setIsOpenDropdown={setIsOpen}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
