import {
  AuthRepositoryImpl,
  type AuthRepository,
} from '@/core/domain/auth/auth.repository';
import type {
  RefreshTokenPayload,
  RefreshTokenResponse,
} from '@/core/domain/auth/auth.type';

export interface RefreshTokenUseCase {
  execute(body: RefreshTokenPayload): Promise<RefreshTokenResponse>;
}

export class RefreshTokenUseCaseImpl implements RefreshTokenUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository = new AuthRepositoryImpl()) {
    this.authRepository = authRepository;
  }

  async execute(body: RefreshTokenPayload): Promise<RefreshTokenResponse> {
    return this.authRepository.refreshToken(body);
  }
}
