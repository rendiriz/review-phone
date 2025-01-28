import { getSession, signOut } from 'next-auth/react';

import { API_URL } from '@/lib/config/api';
import type { FetchOptions } from '@/lib/utils/api';
import { ApiError } from '@/lib/utils/error';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function clientFetchApi<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { skipAuth = false, retryCount = 0, ...fetchOptions } = options;

  try {
    const session = skipAuth ? null : await getSession();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(session?.accessToken && { Authorization: `Bearer ${session.accessToken}` }),
      ...fetchOptions.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if (response.status === 401 && !skipAuth) {
      await signOut({ redirect: true, callbackUrl: '/' });
      throw new ApiError(401, 'Session expired');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new ApiError(
        response.status,
        errorData?.message || `API request failed: ${response.statusText}`,
        errorData,
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status >= 500 && retryCount < MAX_RETRIES) {
        await sleep(RETRY_DELAY * Math.pow(2, retryCount));
        return clientFetchApi<T>(endpoint, {
          ...options,
          retryCount: retryCount + 1,
        });
      }
      throw error;
    }

    throw new ApiError(0, error instanceof Error ? error.message : 'Network error');
  }
}
