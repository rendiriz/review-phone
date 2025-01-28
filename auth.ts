import NextAuth from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

import { LoginUseCaseImpl } from '@/core/application/auth/login.usecase';
import { LogoutUseCaseImpl } from '@/core/application/auth/logout.usecase';
import { RefreshTokenUseCaseImpl } from '@/core/application/auth/refresh-token.usecase';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        try {
          const loginUseCase = new LoginUseCaseImpl();
          const response = await loginUseCase.execute({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          return {
            id: response.user.id,
            email: response.user.email,
            name: response.user.name,
            image: response.user.image,
            emailVerified: response.user.emailVerified,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          };
        } catch {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          email: user.email,
          name: user.name,
          picture: user.image,
          emailVerified: user.emailVerified,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 15 * 60 * 1000,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      try {
        const refreshTokenUseCase = new RefreshTokenUseCaseImpl();
        const response = await refreshTokenUseCase.execute({
          refreshToken: token.refreshToken!,
        });

        return {
          ...token,
          accessToken: response.accessToken,
          accessTokenExpires: Date.now() + 15 * 60 * 1000,
          error: undefined,
        };
      } catch {
        return {
          ...token,
          error: 'RefreshAccessTokenError',
        };
      }
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.error = token.error;
        session.user = {
          id: token.sub!,
          email: token.email!,
          name: token.name!,
          image: token.picture!,
          emailVerified: token.emailVerified as Date,
        };
      }
      return session;
    },
  },
  events: {
    async signOut(message: { token?: JWT | null; session?: unknown }) {
      if (message?.token?.refreshToken) {
        try {
          const logoutUseCase = new LogoutUseCaseImpl();
          await logoutUseCase.execute({ refreshToken: message.token.refreshToken });
        } catch {
          throw new Error('Error during sign out');
        }
      }
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
});
