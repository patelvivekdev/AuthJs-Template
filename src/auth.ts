import NextAuth, { AuthError } from 'next-auth';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db';
import { getUserById, loginUser } from './db/query/User';
import bcrypt from 'bcryptjs';
import { sessions } from '@/db/schema';

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
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ['/profile', '/dashboard'];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path),
      );

      const publicPath = ['/sign-up'];
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
    jwt: async ({ token }) => {
      const user = await getUserById(token.sub!);
      if (user) {
        // Create session in database with this userId
        let sessionToken = crypto.randomUUID();
        let expiry = new Date();
        // 10 Days
        expiry.setDate(expiry.getDate() + 10);

        let sessionData = await db
          .insert(sessions)
          .values({ sessionToken, userId: user.id, expires: expiry })
          .returning();

        token.sessionToken = sessionData[0].sessionToken;

        return token;
      } else {
        return null;
      }
    },
    session: async ({ session, token }) => {
      if (token) {
        // @ts-ignore
        session.user = token.user;
        session.user.id = token.sub!;
        return session;
      }
      return session;
    },
  },
  session: { strategy: 'database' },
  jwt: {
    async encode({ token }) {
      return token?.sessionToken as unknown as string;
    },
    async decode() {
      return null;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/sign-in',
    error: '/error',
  },
});
