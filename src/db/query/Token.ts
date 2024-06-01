import { db } from '..';
import { verificationTokens, users, accounts } from '../schema';
import {
  sendVerificationEmail,
  sendForgotPasswordEmail,
  sendAddPasswordEmail,
} from '@/lib/Email';
import { eq, and, or } from 'drizzle-orm';

export const createTokenForCreateUser = async (email: string) => {
  let token = crypto.randomUUID();
  let expires = new Date();
  expires.setMinutes(expires.getMinutes() + 5);

  // check if email is already taken
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email.trim()));

  // check if user is sign up with oauth
  if (existingUser.length > 0) {
    const existingOAuthAccount = await db
      .select()
      .from(accounts)
      .where(
        and(
          eq(accounts.userId, existingUser[0].id),
          or(eq(accounts.type, 'oauth'), eq(accounts.type, 'oidc')),
        ),
      );

    if (existingOAuthAccount.length > 0) {
      throw new Error(
        'It looks like you already have an account with Oauth provider.',
      );
    } else {
      throw new Error('Email already taken!');
    }
  }

  await db
    .insert(verificationTokens)
    .values({ identifier: email, token, expires })
    .returning();

  let emailData = await sendVerificationEmail(email, token, 5);
  return emailData;
};

export const getVerificationToken = async (token: string) => {
  let tokenData = await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.token, token));

  if (tokenData.length > 0) {
    return {
      success: true,
      data: tokenData[0],
    };
  } else {
    return {
      success: false,
      data: null,
    };
  }
};

export const createTokenForForgotPassword = async (email: string) => {
  // check if user exists with email and account provider as email
  const existingUser = await db
    .select()
    .from(users)
    .leftJoin(accounts, eq(accounts.userId, users.id))
    .where(and(eq(users.email, email.trim()), eq(accounts.type, 'email')))
    .groupBy(users.id);

  if (existingUser.length === 0) {
    return { success: false, message: 'User not found!' };
  }
  const user = existingUser[0].user;

  let token = crypto.randomUUID();
  let expires = new Date();
  expires.setMinutes(expires.getMinutes() + 10);

  await db
    .insert(verificationTokens)
    .values({ identifier: email, token, expires })
    .returning();

  const baseUrl = process.env.BASE_URL
    ? `${process.env.BASE_URL}`
    : 'http://localhost:3000';

  let resetPasswordLink = `${baseUrl}/reset-password?token=${token}`;

  let emailData = await sendForgotPasswordEmail(
    user.email,
    user.name!,
    resetPasswordLink,
    10,
  );
  return emailData;
};

export const createTokenForAddPassword = async (email: string) => {
  // check if user exists with email and account provider as email
  const existingUser = await db
    .select()
    .from(users)
    .leftJoin(accounts, eq(accounts.userId, users.id))
    .where(
      and(
        eq(users.email, email.trim()),
        or(eq(accounts.type, 'oauth'), eq(accounts.type, 'oidc')),
      ),
    )
    .groupBy(users.id);

  if (existingUser.length === 0) {
    return { success: false, message: 'User not found!' };
  }
  const user = existingUser[0].user;

  let token = crypto.randomUUID();
  let expires = new Date();
  expires.setMinutes(expires.getMinutes() + 10);

  await db
    .insert(verificationTokens)
    .values({ identifier: email, token, expires })
    .returning();

  const baseUrl = process.env.BASE_URL
    ? `${process.env.BASE_URL}`
    : 'http://localhost:3000';

  let addPasswordLink = `${baseUrl}/add-password?token=${token}`;

  let emailData = await sendAddPasswordEmail(
    user.email,
    user.name!,
    addPasswordLink,
    10,
  );
  return emailData;
};

export const deleteToken = async (email: string) => {
  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.identifier, email));
};
