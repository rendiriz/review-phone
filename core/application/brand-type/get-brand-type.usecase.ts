import { createHash } from 'crypto';

import { eq } from 'drizzle-orm';

import { brandTypeCacheKeys } from '@/core/domain/brand-type/brand-type.key';
import { db } from '@/drizzle/db';
import { brandTypes } from '@/drizzle/schema';
import { redis } from '@/lib/config/redis';

const CACHE_TTL = 3600;

export async function getBrandType(slug: string) {
  const hash = createHash('md5').update(slug).digest('hex');
  const cacheKey = brandTypeCacheKeys.detail(hash);

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const data = await db.query.brandTypes.findFirst({
    where: eq(brandTypes.slug, slug),
  });

  if (!data) {
    throw new Error('Brand Type not found');
  }

  await redis.set(cacheKey, JSON.stringify(data), { EX: CACHE_TTL });

  return data;
}
