// // utils/db.ts
// import { db } from '../schema';
// import { users, accounts } from '../schema';
// import type { AdapterUser, AdapterAccount } from '@auth/core/adapters';

// // Function to get user by email
// export async function getAdapterUser(email: string): Promise<AdapterUser | null> {
//   return await db.select(users).where(users.email.eq(email)).first();
// }

// // Function to create a new user
// export async function createAdapterUser({ email, username }: { email: string, username: string, password: string }): Promise<AdapterUser> {
//   const user: AdapterUser = {
//     id: generateUniqueId(), // Implement unique ID generation
//     name: username,
//     email,
//     emailVerified: new Date(),
//     image: ''
//   };
//   await db.insert(users).values(user);
//   return user;
// }

// // Function to create a new account for the user
// export async function createAccount(userId: string, credentials: { username: string, password: string }): Promise<void> {
//   const account: AdapterAccount = {
//     userId,
//     type: 'credentials',
//     provider: 'credentials',
//     providerAccountId: credentials.username,
//     access_token: null,
//     refresh_token: null,
//     expires_at: null,
//     token_type: null,
//     scope: null,
//     id_token: null,
//     session_state: null,
//   };
//   await db.insert(accounts).values(account);
// }

// // Function to link account to user
// export async function linkAccountToUser(userId: string, accountData: AdapterAccount): Promise<void> {
//   const account: AdapterAccount = {
//     ...accountData,
//     userId,
//   };
//   await db.insert(accounts).values(account);
// }

// Function to unlink an account from a user
// export async function unlinkAccount(userId: string, provider: string, providerAccountId: string): Promise<void> {
//     await db.delete(accounts)
//       .where(accounts.userId.eq(userId))
//       .and(accounts.provider.eq(provider))
//       .and(accounts.providerAccountId.eq(providerAccountId));
//   }

// Function to link an account to a user
// export async function linkAccount(userId: string, accountData: AdapterAccount): Promise<void> {
//     await db.insert(accounts).values({
//       userId,
//       type: accountData.type,
//       provider: accountData.provider,
//       providerAccountId: accountData.providerAccountId,
//       access_token: accountData.access_token,
//       refresh_token: accountData.refresh_token,
//       expires_at: accountData.expires_at,
//       token_type: accountData.token_type,
//       scope: accountData.scope,
//       id_token: accountData.id_token,
//       session_state: accountData.session_state,
//     });
//   }

// Function to delete a user and their associated accounts and sessions
// export async function deleteUser(userId: string): Promise<void> {
//     await db.transaction(async (trx) => {
//       // Delete accounts
//       await trx.delete(accounts).where(accounts.userId.eq(userId));
//       // Delete sessions
//       await trx.delete(sessions).where(sessions.userId.eq(userId));
//       // Delete user
//       await trx.delete(users).where(users.id.eq(userId));
//     });
//   }
