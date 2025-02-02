import 'server-only';

import { eq } from 'drizzle-orm';
import slugify from 'slugify';

import { brandTypeKeys } from '@/core/domain/brand-type/brand-type.key';
import { BrandTypePayload } from '@/core/domain/brand-type/brand-type.type';
import { db } from '@/drizzle/db';
import { brandTypes } from '@/drizzle/schema/brandTypes';
import { redis } from '@/lib/config/redis';

export async function createBrandType(payload: BrandTypePayload) {
  const slug = slugify(payload.name, { lower: true });

  const existingBrandType = await db.query.brandTypes.findFirst({
    where: eq(brandTypes.slug, slug),
  });

  if (existingBrandType) {
    throw new Error('Brand Type with this name already exists');
  }

  const [brandType] = await db
    .insert(brandTypes)
    .values({ ...payload, slug })
    .returning();

  const cacheKey = [...brandTypeKeys.all, '*'].join(':');
  const cache = await redis.keys(cacheKey);
  if (cache.length) {
    await redis.del(cache);
  }

  return brandType;
}
