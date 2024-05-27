import { db } from '..';
import { users, accounts, verificationTokens } from '../schema';
import { eq, or } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '@/lib/resend';

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

export const getUserById = async (id: number) => {
  const user = await db.select().from(users).where(eq(users.id, id.toString()));
  return user[0];
};

export const createUser = async (
  name: string,
  email: string,
  username: string,
  password: string,
) => {
  // check if username is already taken
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, username.trim()));

  if (existingUser.length > 0) {
    throw new Error('Username already taken');
  }

  // check if email is already taken
  const existingEmail = await db
    .select()
    .from(users)
    .where(eq(users.email, email.trim()));

  // check if user is sign up with oauth
  if (existingEmail.length > 0) {
    const existingOAuthAccount = await db
      .select()
      .from(accounts)
      .where(or(eq(accounts.type, 'oauth'), eq(accounts.type, 'oidc')));
    if (existingOAuthAccount) {
      throw new Error(
        'It looks like you already have an account with Oauth provider.',
      );
    } else {
      throw new Error('Email already taken!');
    }
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

export const createVerificationToken = async (email: string) => {
  let token = crypto.randomUUID();
  let expires = new Date();
  expires.setMinutes(expires.getMinutes() + 5);

  await db
    .insert(verificationTokens)
    .values({ identifier: email, token, expires })
    .returning();

  let emailData = await sendVerificationEmail(email, token);
  return emailData;
};
