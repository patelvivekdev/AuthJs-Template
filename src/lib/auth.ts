// // pages/api/auth/[...nextauth].ts
// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import FacebookProvider from 'next-auth/providers/facebook';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { DrizzleAdapter } from '@auth/drizzle-adapter';
// import { db } from '../../../schema';
// import { getAdapterUser, createAdapterUser, linkAccountToUser, createAccount } from '../../../utils/db';

// export default NextAuth({
//   adapter: DrizzleAdapter(db),
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: 'Username', type: 'text' },
//         password: { label: 'Password', type: 'password' }
//       },
//       authorize: async (credentials) => {
//         const user = await getAdapterUser(credentials.email as string);
//         if (user) {
//           return user;
//         }

//         // Create a new user and their account
//         const newUser = await createAdapterUser(credentials);
//         await createAccount(newUser.id, credentials);

//         return newUser;
//       }
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       allowDangerousEmailAccountLinking: true
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       allowDangerousEmailAccountLinking: true
//     }),
//   ],
//   callbacks: {
//     async signIn({ account, profile, user }) {
//       if (account.provider === 'google' || account.provider === 'facebook') {
//         const existingUser = await getAdapterUser(profile.email as string);
//         if (existingUser) {
//           await linkAccountToUser(existingUser.id, account);
//         }
//       }
//       return true;
//     },
//   },
// });

// -----------------------------------------------------

// app/api/auth/unlink-account/route.ts
// import { NextResponse } from 'next/server';
// import { unlinkAccount } from '../../../../utils/db';

// export async function POST(request: Request) {
//   const { userId, provider, providerAccountId } = await request.json();

//   if (!userId || !provider || !providerAccountId) {
//     return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//   }

//   try {
//     await unlinkAccount(userId, provider, providerAccountId);
//     return NextResponse.json({ message: 'Account unlinked successfully' }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Error unlinking account' }, { status: 500 });
//   }
// }

// -----------------------------------------------------

// app/api/auth/link-account/route.ts
// import { NextResponse } from 'next/server';
// import { linkAccount } from '../../../../utils/db';
// import type { AdapterAccount } from '@auth/core/adapters';

// export async function POST(request: Request) {
//   const { userId, accountData } = await request.json();

//   if (!userId || !accountData) {
//     return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//   }

//   try {
//     await linkAccount(userId, accountData as AdapterAccount);
//     return NextResponse.json({ message: 'Account linked successfully' }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Error linking account' }, { status: 500 });
//   }
// }

// -----------------------------------------------------

// app/api/auth/delete-user/route.ts
// import { NextResponse } from 'next/server';
// import { deleteUser } from '../../../../utils/db';

// export async function POST(request: Request) {
//   const { userId } = await request.json();

//   if (!userId) {
//     return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//   }

//   try {
//     await deleteUser(userId);
//     return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
//   }
// }
