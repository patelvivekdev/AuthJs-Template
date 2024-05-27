import { db } from '..';
import { verificationTokens } from '../schema';
import { sendVerificationEmail } from '@/lib/resend';
import { eq } from 'drizzle-orm';

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

export const getVerificationToken = async (token: string) => {
  await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.token, token));
};
