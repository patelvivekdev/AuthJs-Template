import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db';
import { loginUser } from './db/query/User';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    Github({ allowDangerousEmailAccountLinking: true }),
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          console.log(credentials);
          if (!credentials.username || !credentials.password) {
            return null;
          }

          const user = await loginUser(
            credentials.username as string,
            credentials.password as string,
          );

          if (!user) {
            return null;
          }
          return user;
        } catch (error: any) {
          console.log(error);
          return null;
          // if (error instanceof AuthError) {
          //   throw new InvalidTypeError(error.message);
          // } else {
          //   throw error;
          // }
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ['/profile', '/client-side', '/api/session'];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path),
      );

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL('/login', nextUrl.origin);
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
          randomKey: u.randomKey,
        };
      }
      return token;
    },
    session(params) {
      return {
        ...params.session,
        user: {
          ...params.session.user,
          id: params.token.id as string,
          randomKey: params.token.randomKey,
        },
      };
    },
  },
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
});
