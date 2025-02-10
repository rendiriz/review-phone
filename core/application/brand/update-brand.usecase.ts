import 'server-only';

import { eq, sql } from 'drizzle-orm';

import { brandKeys } from '@/core/domain/brand/brand.key';
import { BrandPayload } from '@/core/domain/brand/brand.type';
import { db } from '@/drizzle/db';
import { brandsToBrandTypes } from '@/drizzle/schema';
import { brands } from '@/drizzle/schema/brands';
import { redis } from '@/lib/config/redis';

export async function updateBrand(slug: string, payload: BrandPayload) {
  const existingBrand = await db.query.brands.findFirst({
    where: eq(brands.slug, slug),
  });

  if (!existingBrand) {
    throw new Error('Brand not found');
  }

  // Update brands
  const [brand] = await db
    .update(brands)
    .set({ ...payload, updatedAt: sql`NOW()` })
    .where(eq(brands.slug, slug))
    .returning();

  // Delete brandsToBrandTypes
  await db.delete(brandsToBrandTypes).where(eq(brandsToBrandTypes.brandId, brand.brandId));

  // Insert brandsToBrandTypes
  const brandTypeValues = payload.brandType.map((item) => ({
    brandId: brand.brandId,
    brandTypeId: item.value,
  }));

  await db.insert(brandsToBrandTypes).values(brandTypeValues).returning();

  const cacheKey = [...brandKeys.all, '*'].join(':');
  const cache = await redis.keys(cacheKey);
  if (cache.length) {
    await redis.del(cache);
  }

  return;
}
