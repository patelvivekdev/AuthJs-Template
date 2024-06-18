'use server';

import { deleteUserAccount } from '@/db/query/User';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { verifyTOTP } from '@epic-web/totp';

// =============================== Enable MFA ===============================
const enableMfaSchema = z.object({
  otp: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});
export async function enableMfa(
  secret: string,
  prevState: any,
  formData: FormData,
) {
  const validatedFields = enableMfaSchema.safeParse({
    otp: formData.get('otp'),
  });

  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields!!',
    };
  }

  try {
    const isValid = verifyTOTP({ otp: validatedFields.data.otp, secret });
    console.log('isValid', isValid);
    if (!isValid) {
      return {
        type: 'error',
        errors: {
          otp: undefined,
        },
        message: 'Two factor authentication failed.',
      };
    }
    // save to db.
    // await signIn(email);
    return {
      type: 'success',
      errors: null,
      message: 'Password added successfully.',
    };
  } catch (error: any) {
    console.error('Two factor authentication failed.', error);
    return {
      type: 'error',
      errors: null,
      message: error.message || 'Two factor authentication failed.',
    };
  }
}

// =============================== Disable MFA ===============================
export async function disableMfa(userId: string, provider: string) {
  await deleteUserAccount(userId, provider);
  revalidatePath('/', 'layout');
}
