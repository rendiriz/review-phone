import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi.')
    .email('Harap masukkan alamat email yang valid.'),
  password: z.string().min(1, 'Password wajib diisi.'),
});
