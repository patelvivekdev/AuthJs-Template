'use server';

import {
  createTokenForAddPassword,
  createTokenForForgotPassword,
  deleteToken,
} from '@/db/query/Token';
import { addPasswordWithAccount, savePassword } from '@/db/query/User';
import { z } from 'zod';

// =============================== forgotPassword ===============================
const forgetPasswordSchema = z.object({
  email: z.string().email('Please enter valid email address.').min(5),
});
export async function forgotPassword(prevState: any, formData: FormData) {
  const validatedFields = forgetPasswordSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields!!',
    };
  }

  try {
    let emailData = await createTokenForForgotPassword(
      validatedFields.data.email,
    );

    if (!emailData.success) {
      return {
        type: 'error',
        errors: {
          email: undefined,
        },
        message: emailData.message || 'Failed to send email. Please try again.',
      };
    }

    return {
      type: 'success',
      errors: null,
      message: 'Please check your email for next step',
    };
  } catch (error: any) {
    console.error('Failed to send email', error);
    return {
      type: 'error',
      errors: {
        email: undefined,
      },
      message: error.message || 'Failed to send email.',
    };
  }
}

// =============================== resetPassword ===============================
const resetPasswordSchema = z.object({
  password: z.string().min(8, { message: 'Must be 8 or more characters long' }),
  password2: z.string(),
});
export async function resetPassword(
  email: string,
  prevState: any,
  formData: FormData,
) {
  const validatedFields = resetPasswordSchema.safeParse({
    password: formData.get('password'),
    password2: formData.get('password2'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields!!',
    };
  }

  // check for password match
  if (validatedFields.data.password !== validatedFields.data.password2) {
    return {
      type: 'error',
      errors: {
        password: undefined,
        password2: undefined,
      },
      message: 'Passwords do not match.',
    };
  }

  try {
    let user = await savePassword(false, email, validatedFields.data.password);

    if (!user.success) {
      return {
        type: 'error',
        errors: {
          password: undefined,
          password2: undefined,
        },
        message: user.message || 'Failed to reset password.',
      };
    }

    // delete the token
    await deleteToken(email);

    return {
      type: 'success',
      errors: null,
      message: user.message || 'Password reset successfully.',
    };
  } catch (error: any) {
    console.error('Failed to reset password.', error);
    return {
      type: 'error',
      errors: {
        password: undefined,
        password2: undefined,
      },
      message: error.message || 'Failed to reset password.',
    };
  }
}

// =============================== addPassword ===============================
const addPasswordSchema = z.object({
  password: z.string().min(8, { message: 'Must be 8 or more characters long' }),
  password2: z.string(),
});
export async function addPassword(
  email: string,
  prevState: any,
  formData: FormData,
) {
  const validatedFields = addPasswordSchema.safeParse({
    password: formData.get('password'),
    password2: formData.get('password2'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: 'error',
      data: {
        password: formData.get('password') as string,
        password2: formData.get('password2') as string,
      },
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields!!',
    };
  }

  // check for password match
  if (validatedFields.data.password !== validatedFields.data.password2) {
    return {
      type: 'error',
      data: {
        password: validatedFields.data.password,
        password2: validatedFields.data.password2,
      },
      errors: {
        password: undefined,
        password2: undefined,
      },
      message: 'Passwords do not match.',
    };
  }

  try {
    let user = await addPasswordWithAccount(
      email,
      validatedFields.data.password,
    );

    if (!user.success) {
      return {
        type: 'error',
        data: {
          password: validatedFields.data.password,
          password2: validatedFields.data.password2,
        },
        errors: {
          password: undefined,
          password2: undefined,
        },
        message: user.message || 'Failed to reset password.',
      };
    }

    // delete the token
    await deleteToken(email);

    return {
      type: 'success',
      data: {
        password: '',
        password2: '',
      },
      errors: null,
      message: user.message || 'Password added successfully.',
    };
  } catch (error: any) {
    console.error('Failed to add password.', error);
    return {
      type: 'error',
      data: {
        password: validatedFields.data.password,
        password2: validatedFields.data.password2,
      },
      errors: {
        password: undefined,
        password2: undefined,
      },
      message: error.message || 'Failed to add password.',
    };
  }
}

// =============================== sendAddPasswordEmail ===============================
export async function sendAddPasswordEmail(email: string) {
  try {
    let emailData = await createTokenForAddPassword(email);

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

// =============================== changePassword ===============================
const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z
    .string()
    .min(8, { message: 'Must be 8 or more characters long' }),
  password2: z.string(),
});
export async function changePassword(
  email: string,
  prevState: any,
  formData: FormData,
) {
  const validatedFields = changePasswordSchema.safeParse({
    oldPassword: formData.get('oldPassword'),
    newPassword: formData.get('newPassword'),
    password2: formData.get('password2'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: 'error',
      data: {
        oldPassword: formData.get('oldPassword') as string,
        password: formData.get('password') as string,
        password2: formData.get('password2') as string,
      },
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields!!',
    };
  }

  // check for password match
  if (validatedFields.data.newPassword !== validatedFields.data.password2) {
    return {
      type: 'error',
      data: {
        oldPassword: validatedFields.data.oldPassword,
        newPassword: validatedFields.data.newPassword,
        password2: validatedFields.data.password2,
      },
      errors: {
        oldPassword: undefined,
        newPassword: undefined,
        password2: undefined,
      },
      message: 'Passwords do not match.',
    };
  }

  try {
    let user = await savePassword(
      true,
      email,
      validatedFields.data.newPassword,
      validatedFields.data.oldPassword,
    );

    if (!user.success) {
      return {
        type: 'error',
        data: {
          oldPassword: validatedFields.data.oldPassword,
          newPassword: validatedFields.data.newPassword,
          password2: validatedFields.data.password2,
        },
        errors: {
          oldPassword: undefined,
          newPassword: undefined,
          password2: undefined,
        },
        message: user.message || 'Failed to change password.',
      };
    }
    return {
      type: 'success',
      data: {
        oldPassword: '',
        newPassword: '',
        password2: '',
      },
      errors: null,
      message: user.message || 'Password change successfully.',
    };
  } catch (error: any) {
    console.error('Failed to change password.', error);
    return {
      type: 'error',
      data: {
        oldPassword: validatedFields.data.oldPassword,
        newPassword: validatedFields.data.newPassword,
        password2: validatedFields.data.password2,
      },
      errors: {
        oldPassword: undefined,
        newPassword: undefined,
        password2: undefined,
      },
      message: error.message || 'Failed to change password.',
    };
  }
}
