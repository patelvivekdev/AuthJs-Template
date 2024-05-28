'use server';
import {
  createTokenForCreateUser,
  createTokenForForgotPassword,
} from '@/db/query/Token';
import { createUser, savePassword } from '@/db/query/User';
import { z } from 'zod';
import { signIn as signInUser } from '@/auth';
import { redirect } from 'next/navigation';

// =============================== signUp ===============================
const signUpSchema = z.object({
  email: z.string().email('Please enter valid email address.').min(5),
});

export async function signUp(prevState: any, formData: FormData) {
  const validatedFields = signUpSchema.safeParse({
    email: formData.get('email'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields!!',
    };
  }

  try {
    let emailData = await createTokenForCreateUser(validatedFields.data.email);

    if (!emailData.success) {
      return {
        type: 'error',
        errors: {
          email: undefined,
        },
        message: 'Failed to signUp.',
      };
    }

    return {
      type: 'success',
      errors: null,
      message: 'Please check your email for next step',
    };
  } catch (error: any) {
    console.error('Failed to signUp', error);
    return {
      type: 'error',
      errors: {
        email: undefined,
      },
      message: error.message || 'Failed to signUp.',
    };
  }
}

// =============================== signUp > onBoarding ===============================
const onBoardingSchema = z.object({
  name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
  username: z.string().min(3, { message: 'Must be 3 or more characters long' }),
  email: z.string().email('Please enter valid email address.').min(5),
  password: z.string().min(8, { message: 'Must be 8 or more characters long' }),
  password2: z.string(),
});

export async function onBoarding(
  email: string,
  prevState: any,
  formData: FormData,
) {
  const validatedFields = onBoardingSchema.safeParse({
    name: formData.get('name'),
    email: email,
    username: formData.get('username'),
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
        name: undefined,
        username: undefined,
        email: undefined,
        password: undefined,
        password2: undefined,
      },
      message: 'Passwords do not match.',
    };
  }

  try {
    let user = await createUser(
      validatedFields.data.name,
      email,
      validatedFields.data.username,
      validatedFields.data.password,
    );

    if (user.length === 0) {
      return {
        type: 'error',
        errors: {
          name: undefined,
          username: undefined,
          email: undefined,
          password: undefined,
          password2: undefined,
        },
        message: 'Failed to signUp. Please try again.',
      };
    }

    return {
      type: 'success',
      errors: null,
      message: 'Successfully signed up.',
    };
  } catch (error: any) {
    console.error('Failed to signUp', error);
    return {
      type: 'error',
      errors: {
        name: undefined,
        username: undefined,
        email: undefined,
        password: undefined,
        password2: undefined,
      },
      message: error.message || 'Failed to signUp.',
    };
  }
}

// =============================== signIn ===============================
const signInSchema = z.object({
  username: z.string().min(3, { message: 'Must be 3 or more characters long' }),
  password: z.string().min(8, { message: 'Must be 8 or more characters long' }),
});

export async function signIn(prevState: any, formData: FormData) {
  const validatedFields = signInSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields!!',
    };
  }

  try {
    await signInUser('credentials', {
      username: validatedFields.data.username,
      password: validatedFields.data.password,
      redirect: false,
    });
  } catch (error: any) {
    if (error.code === 'invalid-credentials') {
      return {
        type: 'error',
        errors: {
          username: undefined,
          password: undefined,
        },
        message: error.message,
      };
    } else {
      return {
        type: 'error',
        errors: {
          username: undefined,
          password: undefined,
        },
        message: 'Something went wrong. Please try again.',
      };
    }
  }
  redirect('/profile');
}

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
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields!!',
    };
  }

  // check for password match
  if (validatedFields.data.newPassword !== validatedFields.data.password2) {
    return {
      type: 'error',
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
      errors: null,
      message: user.message || 'Password change successfully.',
    };
  } catch (error: any) {
    console.error('Failed to change password.', error);
    return {
      type: 'error',
      errors: {
        oldPassword: undefined,
        newPassword: undefined,
        password2: undefined,
      },
      message: error.message || 'Failed to change password.',
    };
  }
}
