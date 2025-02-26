import type { Metadata } from 'next';

import { Add } from './components/add';
import { BrandTypeClientPage } from './page.client';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function BrandPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Brand Type</h1>

        <Add />
      </div>

      <BrandTypeClientPage />
    </div>
  );
}
