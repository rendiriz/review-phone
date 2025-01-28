import {
  AuthRepositoryImpl,
  type AuthRepository,
} from '@/core/domain/auth/auth.repository';
import type { LoginPayload, LoginResponse } from '@/core/domain/auth/auth.type';

export interface LoginUseCase {
  execute(credentials: LoginPayload): Promise<LoginResponse>;
}

export class LoginUseCaseImpl implements LoginUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository = new AuthRepositoryImpl()) {
    this.authRepository = authRepository;
  }

  async execute(credentials: LoginPayload): Promise<LoginResponse> {
    return this.authRepository.login(credentials);
  }
}
