import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { createBrandType } from '@/core/application/brand-type/create-brand-type.usecase';
import { getBrandTypes } from '@/core/application/brand-type/get-brand-types.usecase';
import { loadSearchParams } from '@/core/domain/brand-type/brand-type.param';

export async function GET(request: NextRequest) {
  const filter = loadSearchParams(request);
  const data = await getBrandTypes(filter);

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const data = await createBrandType(body);

  return NextResponse.json(data);
}
