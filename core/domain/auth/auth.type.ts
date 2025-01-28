import { z } from 'zod';

import { LoginFormSchema } from '@/core/domain/auth/auth.schema';

export type LoginPayload = z.infer<typeof LoginFormSchema>;

export interface User {
  id: string;
  email: string;
  name: string;
  image: string;
  emailVerified: Date;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LogoutPayload {
  refreshToken: string;
}

export interface LogoutResponse {
  message: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
