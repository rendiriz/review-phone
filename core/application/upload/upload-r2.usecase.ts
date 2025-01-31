import 'server-only';

import { randomUUID } from 'crypto';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { r2 } from '@/lib/config/r2';

export async function uploadR2({ filename, contentType }: { filename: string; contentType: any }) {
  const fileKey = `${randomUUID()}-${filename}`;

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: `${process.env.R2_BUCKET_PATH}/${fileKey}`,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(r2, putObjectCommand, {
    expiresIn: 3600,
  });

  const publicUrl = `${process.env.PUBLIC_IMAGE_URL}/${fileKey}`;

  return {
    uploadUrl,
    publicUrl,
  };
}
