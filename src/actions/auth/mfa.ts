'use server';

import {
  deleteUserAccount,
  enableTwoFactor,
  getTotpSecret,
} from '@/db/query/User';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { signIn as signInUser } from '@/auth';
import { redirect } from 'next/navigation';
import { verifyTOTP } from '@epic-web/totp';
import { cookies } from 'next/headers';

// =============================== Enable MFA ===============================
const enableMfaSchema = z.object({
  otp: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});
export async function enableMfa(
  secret: string,
  email: string,
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
    const user = await enableTwoFactor(email, secret);
    if (user.length > 0) {
      return {
        type: 'success',
        errors: null,
        message: 'Two-factor enabled.',
      };
    } else {
      return {
        type: 'error',
        errors: {
          otp: undefined,
        },
        message: 'Failed to enable Two-factor',
      };
    }
    // await signIn(email);
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

// =============================== Verify MFA ===============================
const verifyTwoFactorSchema = z.object({
  otp: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});
export async function verifyTwoFactor(
  userId: string,
  prevState: any,
  formData: FormData,
) {
  const validatedFields = verifyTwoFactorSchema.safeParse({
    otp: formData.get('otp'),
  });

  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields!!',
    };
  }
  let user = await getTotpSecret(userId);
  if (!user) {
    return {
      type: 'error',
      errors: {
        otp: undefined,
      },
      message: 'Two factor authentication failed.',
    };
  }

  if (!user.totpSecret) {
    return {
      type: 'error',
      errors: {
        otp: undefined,
      },
      message: 'Two factor authentication failed.',
    };
  }

  let secret = user.totpSecret;

  try {
    const isValid = verifyTOTP({ otp: validatedFields.data.otp, secret });
    if (!isValid) {
      return {
        type: 'error',
        errors: {
          otp: undefined,
        },
        message: 'Two factor authentication failed! Code is invalid.',
      };
    }
    // remove cookie
    cookies().delete('authjs.secret');
    // login here to create new session
    await signInUser('TOTP', {
      userId: userId,
      TOTP: 'TOTP',
      redirect: false,
    });
  } catch (error: any) {
    if (error.code === 'invalid-credentials') {
      return {
        type: 'error',
        errors: {
          otp: undefined,
        },
        message: error.message,
      };
    } else {
      throw error;
    }
  }
  redirect('/profile');
}
