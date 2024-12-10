'use server';

import {
  disableUserTwoFactor,
  enableTwoFactor,
  getTotpSecret,
} from '@/db/query/User';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { signIn as signInUser } from '@/auth';
import { redirect } from 'next/navigation';
import { verifyTOTP } from '@epic-web/totp';
import { cookies } from 'next/headers';
import {
  createOtpForVerifyUserWithEmail,
  deleteToken,
  getVerificationTokenByUser,
} from '@/db/query/Token';

// =============================== Enable Two Factor ===============================
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
    const isValid = await verifyTOTP({ otp: validatedFields.data.otp, secret });
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

// =============================== Disable Two Factor ===============================
export async function disableTwoFactor(userId: string) {
  await disableUserTwoFactor(userId);
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
    const isValid = await verifyTOTP({ otp: validatedFields.data.otp, secret });
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
    (await cookies()).delete('authjs.secret');
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

// =============================== twoFactorEmail ===============================
export async function twoFactorEmail(userId: string) {
  try {
    let emailData = await createOtpForVerifyUserWithEmail(userId);

    if (!emailData.success) {
      return {
        type: 'error',
        message: emailData.message || 'Failed to send email. Please try again.',
      };
    }

    return {
      type: 'success',
      message: 'Please check your email for next step',
    };
  } catch (error: any) {
    console.error('Failed to send email', error);
    return {
      type: 'error',
      message: error.message || 'Failed to send email.',
    };
  }
}

// =============================== Verify Email MFA ===============================
const verifyEmailTwoFactorSchema = z.object({
  otp: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});
export async function verifyEmailTwoFactor(
  userId: string,
  prevState: any,
  formData: FormData,
) {
  const validatedFields = verifyEmailTwoFactorSchema.safeParse({
    otp: formData.get('otp'),
  });

  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields!!',
    };
  }
  let user = await getVerificationTokenByUser(userId);
  if (!user) {
    return {
      type: 'error',
      errors: {
        otp: undefined,
      },
      message: 'Two factor authentication failed.',
    };
  }
  if (user.data?.expires! < new Date()) {
    return {
      type: 'error',
      errors: {
        otp: undefined,
      },
      message: 'Two factor authentication expired.',
    };
  }

  try {
    if (user.data?.token === validatedFields.data.otp) {
      // remove cookie
      (await cookies()).delete('authjs.secret');

      // delete the token
      await deleteToken(userId);
      // login here to create new session
      await signInUser('TOTP', {
        userId: userId,
        TOTP: 'TOTP',
        redirect: false,
      });
    } else {
      return {
        type: 'error',
        errors: {
          otp: undefined,
        },
        message: 'Error! Please try again with new code.',
      };
    }
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
