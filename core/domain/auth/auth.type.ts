import { z } from 'zod';

import { LoginFormSchema } from '@/core/domain/auth/auth.schema';

export type LoginPayload = z.infer<typeof LoginFormSchema>;

export interface LoginResponse {
  id: string;
  email: string;
  name: string;
}
