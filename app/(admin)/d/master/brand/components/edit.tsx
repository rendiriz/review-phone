'use client';

import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { BrandForm } from '@/components/composite/brand/brand-form';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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

  const { data, isLoading, isError } = useQuery({
    queryKey: brandKeys.detail(slug),
    queryFn: () => new BrandServiceImpl().detail(slug),
  });

  const { mutate, isPending } = useMutation({
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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Brand</SheetTitle>

          {isLoading ? (
            'Loading...'
          ) : (
            <BrandForm
              initialData={data as Brand}
              onSubmit={handleSubmit}
              isLoading={isPending}
            />
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
