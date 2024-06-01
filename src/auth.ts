import NextAuth, { AuthError } from 'next-auth';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db';
import { loginUser } from './db/query/User';
import bcrypt from 'bcryptjs';
import { encode, decode } from 'next-auth/jwt';

class InvalidCredentialsError extends AuthError {
  code = 'invalid-credentials';
  message = 'Invalid credentials';
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Github({
      async profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        };
      },
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const user = await loginUser(credentials.username as string);

          if (user.length === 0) {
            throw new InvalidCredentialsError();
          }

          const isValid = await bcrypt.compare(
            credentials.password as string,
            user[0].password!,
          );

          if (!isValid) {
            throw new InvalidCredentialsError();
          }
          return user[0];
        } catch (error: any) {
          if (error instanceof AuthError) {
            throw new InvalidCredentialsError(error.message);
          } else {
            throw error;
          }
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        // Here you can handle additional logic for linking accounts
      }
      return true;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ['/profile', '/dashboard'];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path),
      );

      const publicPath = ['/sign-in', '/sign-up'];
      const isPublic = publicPath.some((path) =>
        nextUrl.pathname.startsWith(path),
      );
      if (isPublic && isLoggedIn) {
        return Response.redirect(new URL('/profile', nextUrl.origin));
      }

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL('/sign-in', nextUrl.origin);
        redirectUrl.searchParams.append('callbackUrl', nextUrl.href);
        return Response.redirect(redirectUrl);
      }
      return true;
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.sub!;
      return session;
    },
  },
  session: { strategy: 'jwt' },
  jwt: { encode, decode },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
});
