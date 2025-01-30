import { type NextRequest } from 'next/server';

import { getBrands } from '@/core/application/brand/get-brands.usecase';
import { loadSearchParams } from '@/core/domain/brand/brand.param';

export async function GET(request: NextRequest) {
  const filter = loadSearchParams(request);

  const data = await getBrands(filter);

  return Response.json(data);
}
