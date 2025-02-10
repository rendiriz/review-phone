import 'server-only';

import { eq } from 'drizzle-orm';
import slugify from 'slugify';

import { brandKeys } from '@/core/domain/brand/brand.key';
import { BrandPayload } from '@/core/domain/brand/brand.type';
import { db } from '@/drizzle/db';
import { brandsToBrandTypes } from '@/drizzle/schema';
import { brands } from '@/drizzle/schema/brands';
import { redis } from '@/lib/config/redis';

export async function createBrand(payload: BrandPayload) {
  const slug = slugify(payload.name, { lower: true });

  const existingBrand = await db.query.brands.findFirst({
    where: eq(brands.slug, slug),
  });

  if (existingBrand) {
    throw new Error('Brand with this name already exists');
  }

  // Insert brands
  const brandValue = { ...payload, slug, country: 'United States' };
  const [brand] = await db.insert(brands).values(brandValue).returning();

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

  return brand;
}
