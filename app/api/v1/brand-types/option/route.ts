import { NextRequest, NextResponse } from 'next/server';

import { getOptionBrandTypes } from '@/core/application/brand-type/get-option-brand-types.usecase';
import { loadSearchParams } from '@/core/domain/brand/brand.param';

export async function GET(request: NextRequest) {
  const filter = loadSearchParams(request);
  const data = await getOptionBrandTypes(filter);

  return NextResponse.json(data);
}
