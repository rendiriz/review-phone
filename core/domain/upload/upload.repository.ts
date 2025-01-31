import { API_ENDPOINTS, API_URL } from '@/lib/config/api';

export interface UploadRepository {
  uploadR2(file: File): Promise<string>;
}

export class UploadRepositoryImpl implements UploadRepository {
  async uploadR2(file: File): Promise<string> {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.upload.r2}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, publicUrl } = await response.json();

      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload to R2');
      }

      return publicUrl;
    } catch (error) {
      console.error('R2 upload error:', error);
      throw error;
    }
  }
}
