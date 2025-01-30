import type { Metadata } from 'next';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { BrandClientPage } from './page.client';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function BrandPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Brand</h1>

        <Button>
          <Plus />
          Create
        </Button>
      </div>

      <BrandClientPage />
    </div>
  );
}
