'use client';

import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { BrandForm } from '@/components/composite/brand/brand-form';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { brandKeys } from '@/core/domain/brand/brand.key';
import { Brand, BrandPayload } from '@/core/domain/brand/brand.type';

import { BrandServiceImpl } from '../lib/brand.service';

interface EditProps {
  slug: string;
  isOpenDropdown: boolean;
  setIsOpenDropdown: (open: boolean) => void;
}

export function Edit({ slug, isOpenDropdown, setIsOpenDropdown }: EditProps) {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const { data, isPending, isError } = useQuery({
    queryKey: brandKeys.detail(slug),
    queryFn: () => new BrandServiceImpl().detail(slug),
  });

  const { mutate, isPending: isPendingMutation } = useMutation({
    mutationFn: (payload: BrandPayload) => {
      return new BrandServiceImpl().update(slug, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.all });
    },
  });

  const handleSubmit = async (input: BrandPayload) => {
    mutate(input);
    setIsOpen(false);
    setIsOpenDropdown(false);
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <SheetTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit</DropdownMenuItem>
      </SheetTrigger>
      <SheetContent className="max-w w-full md:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>Edit Brand</SheetTitle>
          <SheetDescription>Click save when you're done.</SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          {isPending ? (
            'Loading...'
          ) : (
            <BrandForm
              initialData={data as Brand}
              onSubmit={handleSubmit}
              isLoading={isPendingMutation}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
