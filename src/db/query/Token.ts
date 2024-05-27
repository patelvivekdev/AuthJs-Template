import { db } from '..';
import { verificationTokens, users, accounts } from '../schema';
import { sendVerificationEmail } from '@/lib/Email';
import { eq, and, or } from 'drizzle-orm';

export const createVerificationToken = async (email: string) => {
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

  let emailData = await sendVerificationEmail(email, token);
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
