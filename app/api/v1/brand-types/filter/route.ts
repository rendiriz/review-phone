import { NextRequest, NextResponse } from 'next/server';

import { getFilterBrandTypes } from '@/core/application/brand-type/get-filter-brand-types.usecase';
import { loadSearchParams } from '@/core/domain/brand/brand.param';

export async function GET(request: NextRequest) {
  const filter = loadSearchParams(request);
  const data = await getFilterBrandTypes(filter);

  return NextResponse.json(data);
}
