import { createClient } from 'redis';

export const redis = await createClient({
  url: process.env.CACHE_URL!,
})
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect();
