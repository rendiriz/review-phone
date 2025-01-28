import type {
  LoginPayload,
  LoginResponse,
  LogoutPayload,
  LogoutResponse,
  RefreshTokenPayload,
  RefreshTokenResponse,
} from '@/core/domain/auth/auth.type';
import { API_ENDPOINTS } from '@/lib/config/api';
import { fetchApi } from '@/lib/utils/api';

export interface AuthRepository {
  login(credentials: LoginPayload): Promise<LoginResponse>;
  logout(body: LogoutPayload): Promise<LogoutResponse>;
  refreshToken(body: RefreshTokenPayload): Promise<RefreshTokenResponse>;
}

export class AuthRepositoryImpl implements AuthRepository {
  async login(credentials: LoginPayload): Promise<LoginResponse> {
    return fetchApi<LoginResponse>(API_ENDPOINTS.auth.login, {
      method: 'POST',
      body: JSON.stringify(credentials),
      skipAuth: true,
    });
  }

  async logout(body: LogoutPayload): Promise<LogoutResponse> {
    return fetchApi<LogoutResponse>(API_ENDPOINTS.auth.logout, {
      method: 'POST',
      body: JSON.stringify(body),
      skipAuth: true,
    });
  }

  async refreshToken(body: RefreshTokenPayload): Promise<RefreshTokenResponse> {
    return fetchApi<RefreshTokenResponse>(API_ENDPOINTS.auth.refreshToken, {
      method: 'POST',
      body: JSON.stringify(body),
      skipAuth: true,
    });
  }
}
