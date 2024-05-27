import { db } from '..';
import { users, accounts } from '../schema';
import { eq, or } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const loginUser = async (username: string, password: string) => {
  // check if user is sign up with oauth
  const user = await db
    .select()
    .from(users)
    .where(
      or(eq(users.username, username.trim()), eq(users.email, username.trim())),
    );

  if (user.length === 0) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user[0].password!);

  if (!isValid) {
    return null;
  }
  return user[0];
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
