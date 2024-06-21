import { db } from '..';
import { users, accounts } from '../schema';
import { eq, or, and } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { TUser } from '@/app/admin/columns';

export async function getUsers(): Promise<TUser[]> {
  const result = (await db.query.users.findMany({
    columns: {
      id: true,
      name: true,
      email: true,
      username: true,
      role: true,
    },
  })) as unknown as TUser[];
  return result;
}

export const getUserByUsername = async (username: string) => {
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
    where: (users: { id: any }, { eq }: any) => eq(users.id, id),
    columns: {
      // Include only fields you want from users table, excluding password
      id: true,
      name: true,
      email: true,
      username: true,
      emailVerified: true,
      role: true,
      image: true,
      isTotpEnabled: true,
      totpSecret: true,
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

// export const getUserByProviderAccountId = async (id: string) => {
//   const result = await db.query.accounts.findFirst({
//     where: (accounts: { providerAccountId: any }, { eq }: any) =>
//       eq(accounts.providerAccountId, id),
//     columns: {
//       // Include only fields you want from users table, excluding password
//       userId: true,
//     },
//   });
//   return result;
// };

export const createUser = async (
  name: string,
  email: string,
  username: string,
  password: string,
  isAdmin: boolean,
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
    .values({
      name,
      email,
      username,
      password: hashedPassword,
      role: isAdmin ? 'ADMIN' : 'USER',
    })
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
      .set({ password: hashedPassword })
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

// Change user role to ADMIN
export async function changeUserToAdmin(userEmail: string) {
  const user = await db
    .update(users)
    .set({ role: 'ADMIN' })
    .where(eq(users.email, userEmail))
    .returning();

  if (user.length > 0) {
    return {
      success: true,
      message: 'You are now Admin.',
    };
  } else {
    return {
      success: false,
      message: 'Failed to upgrade as Admin',
    };
  }
}

// Enable Two-factor
export async function enableTwoFactor(userEmail: string, secret: string) {
  const user = await db
    .update(users)
    .set({ isTotpEnabled: true, totpSecret: secret })
    .where(eq(users.email, userEmail))
    .returning();

  return user;
}

// Get TOTPSecret
export const getTotpSecret = async (id: string) => {
  const result = await db.query.users.findFirst({
    where: (users: { id: any }, { eq }: any) => eq(users.id, id),
    columns: {
      // Include only fields you want from users table, excluding password
      id: true,
      email: true,
      isTotpEnabled: true,
      totpSecret: true,
    },
  });
  return result;
};

export const getUserForTotp = async (userId: string) => {
  // check if user is sign up with oauth
  let user = await db.select().from(users).where(eq(users.id, userId.trim()));

  return user;
};
