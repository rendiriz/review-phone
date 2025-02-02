import 'server-only';

import { eq, sql } from 'drizzle-orm';

import { brandTypeKeys } from '@/core/domain/brand-type/brand-type.key';
import { BrandTypePayload } from '@/core/domain/brand-type/brand-type.type';
import { db } from '@/drizzle/db';
import { brandTypes } from '@/drizzle/schema/brandTypes';
import { redis } from '@/lib/config/redis';

export async function updateBrandType(slug: string, payload: BrandTypePayload) {
  const existingBrandType = await db.query.brandTypes.findFirst({
    where: eq(brandTypes.slug, slug),
  });

  if (!existingBrandType) {
    throw new Error('Brand Type not found');
  }

  await db
    .update(brandTypes)
    .set({ ...payload, updatedAt: sql`NOW()` })
    .where(eq(brandTypes.slug, slug));

  const cacheKey = [...brandTypeKeys.all, '*'].join(':');
  const cache = await redis.keys(cacheKey);
  if (cache.length) {
    await redis.del(cache);
  }

  return;
}
