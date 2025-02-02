import 'server-only';

import { eq, sql } from 'drizzle-orm';

import { brandTypeKeys } from '@/core/domain/brand-type/brand-type.key';
import { db } from '@/drizzle/db';
import { brandTypes } from '@/drizzle/schema/brandTypes';
import { redis } from '@/lib/config/redis';

export async function deleteBrandType(slug: string) {
  const existingBrandType = await db.query.brandTypes.findFirst({
    where: eq(brandTypes.slug, slug),
  });

  if (!existingBrandType) {
    throw new Error('Brand Type not found');
  }

  await db
    .update(brandTypes)
    .set({ status: 'deleted', updatedAt: sql`NOW()` })
    .where(eq(brandTypes.slug, slug));

  const cacheKey = [...brandTypeKeys.all, '*'].join(':');
  const cache = await redis.keys(cacheKey);
  if (cache.length) {
    await redis.del(cache);
  }

  return;
}
