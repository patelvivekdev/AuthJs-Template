import { db } from '..';
import { users, accounts, InsertAccounts } from '../schema';
import { eq, or, and } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const loginUser = async (username: string) => {
  // check if user is sign up with oauth
  const user = await db
    .select()
    .from(users)
    .where(
      or(eq(users.username, username.trim()), eq(users.email, username.trim())),
    );

  return user;
};

export const getUserById = async (id: string) => {
  const result = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id),
    columns: {
      // Include only fields you want from users table, excluding password
      id: true,
      name: true,
      email: true,
      username: true,
      emailVerified: true,
      image: true,
    },
    with: {
      accounts: {
        columns: {
          // Include only the provider field from accounts table
          provider: true,
        },
      },
    },
  });
  return result;
};

export const getUserByProviderAccountId = async (id: string) => {
  const result = await db.query.accounts.findFirst({
    where: (accounts, { eq }) => eq(accounts.providerAccountId, id),
    columns: {
      // Include only fields you want from users table, excluding password
      userId: true,
    },
  });
  return result;
};

export const createUser = async (
  name: string,
  email: string,
  username: string,
  password: string,
) => {
  // check if username is already taken
  const existingUsername = await db
    .select()
    .from(users)
    .where(eq(users.username, username.trim()));

  if (existingUsername.length > 0) {
    throw new Error('Username already taken');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db
    .insert(users)
    .values({ name, email, username, password: hashedPassword })
    .returning();

  // create a account for the user
  await db
    .insert(accounts)
    .values({
      userId: user[0].id,
      type: 'email',
      provider: 'email',
      providerAccountId: email,
    })
    .returning();
  return user;
};

export const savePassword = async (
  isChangePassword: boolean,
  email: string,
  password: string,
  oldPassword?: string,
) => {
  if (isChangePassword) {
    // have to check old password
    const user = await db.select().from(users).where(eq(users.email, email));

    if (user.length === 0) {
      return {
        success: false,
        message: 'User not found.',
      };
    }

    const isValid = await bcrypt.compare(oldPassword!, user[0].password!);

    if (!isValid) {
      return {
        success: false,
        message: 'Old password is wrong.',
      };
    }
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.email, email))
    .returning();

  if (user.length > 0) {
    return {
      success: true,
      message: 'Password updated successfully',
    };
  } else {
    return {
      success: false,
      message: 'Failed to update password',
    };
  }
};

// Function to addPassword and create new account
export const addPasswordWithAccount = async (
  email: string,
  password: string,
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await db
      .update(users)
      .set({ username: email, password: hashedPassword })
      .where(eq(users.email, email))
      .returning();

    // create a account for the user
    await db.insert(accounts).values({
      userId: user[0].id,
      type: 'email',
      provider: 'email',
      providerAccountId: email,
    });
    return {
      success: true,
      message: 'Password added successfully',
    };
  } catch (error: any) {
    console.error('Error adding password and account:', error);
    return {
      success: false,
      message: error.message || 'Failed to add password',
    };
  }
};

// Function to get user by email
export async function getAdapterUser(email: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user;
}

// Function to link account to user
export async function linkAccountToUser(
  userId: string,
  accountData: InsertAccounts,
) {
  await db.insert(accounts).values({
    userId,
    type: accountData.type,
    provider: accountData.provider,
    providerAccountId: accountData.providerAccountId,
    access_token: accountData.access_token,
    refresh_token: accountData.refresh_token,
    expires_at: accountData.expires_at,
    token_type: accountData.token_type,
    scope: accountData.scope,
    id_token: accountData.id_token,
    session_state: accountData.session_state,
  });
}

// Delete user
export async function deleteUser(userId: string) {
  await db.delete(users).where(eq(users.id, userId));
}

// Delete account
export async function deleteUserAccount(userId: string, provider: string) {
  await db
    .delete(accounts)
    .where(and(eq(accounts.userId, userId), eq(accounts.provider, provider)));
}
