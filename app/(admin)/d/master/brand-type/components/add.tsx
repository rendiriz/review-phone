'use client';

import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';

import { BrandTypeForm } from '@/components/composite/brand-type/brand-type-form';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { brandTypeKeys } from '@/core/domain/brand-type/brand-type.key';
import { BrandTypePayload } from '@/core/domain/brand-type/brand-type.type';

import { BrandTypeServiceImpl } from '../lib/brand-type.service';

export function Add() {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: BrandTypePayload) => {
      return new BrandTypeServiceImpl().create(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandTypeKeys.all });
    },
  });

  const handleSubmit = async (input: BrandTypePayload) => {
    await mutateAsync(input);
    setIsOpen(false);
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <SheetTrigger asChild>
        <Button>
          <Plus
            className="-ms-1 me-2"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          Add Brand Type
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w w-full md:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>Add Brand Type</SheetTitle>
          <SheetDescription>Click save when you're done.</SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <BrandTypeForm
            initialData={null}
            onSubmit={handleSubmit}
            isLoading={isPending}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
