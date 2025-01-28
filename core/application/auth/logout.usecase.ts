import {
  AuthRepositoryImpl,
  type AuthRepository,
} from '@/core/domain/auth/auth.repository';
import type { LogoutPayload, LogoutResponse } from '@/core/domain/auth/auth.type';

export interface LogoutUseCase {
  execute(body: LogoutPayload): Promise<LogoutResponse>;
}

export class LogoutUseCaseImpl implements LogoutUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository = new AuthRepositoryImpl()) {
    this.authRepository = authRepository;
  }

  async execute(body: LogoutPayload): Promise<LogoutResponse> {
    return this.authRepository.logout(body);
  }
}
