'use server';

import { createTokenForCreateUser, deleteToken } from '@/db/query/Token';
import { createUser } from '@/db/query/User';
import { z } from 'zod';

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
      resetKey: '',
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
        resetKey: '',
      };
    }

    return {
      type: 'success',
      errors: null,
      message: 'Please check your email for next step',
      resetKey: Date.now().toString(),
    };
  } catch (error: any) {
    console.error('Failed to signUp', error);
    return {
      type: 'error',
      errors: {
        email: undefined,
      },
      message: error.message || 'Failed to signUp.',
      resetKey: '',
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

    // delete the token
    await deleteToken(email);

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
