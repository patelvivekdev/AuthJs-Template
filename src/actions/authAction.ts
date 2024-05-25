'use server';
import { createUser, loginUser } from '@/db/query/User';
import { z } from 'zod';

// =============================== signUp ===============================
const signUpSchema = z.object({
  name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
  username: z.string().min(3, { message: 'Must be 3 or more characters long' }),
  email: z.string().email('Please enter valid message').min(5),
  password: z.string().min(8, { message: 'Must be 8 or more characters long' }),
});

export async function signUp(prevState: any, formData: FormData) {
  const validatedFields = signUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to signUp.',
    };
  }

  try {
    // Call the createUser function
    let user = await createUser(
      validatedFields.data.name,
      validatedFields.data.email,
      validatedFields.data.username,
      validatedFields.data.password,
    );

    if (!user) {
      return {
        type: 'error',
        errors: null,
        message: 'Failed to signUp.',
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
      errors: null,
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
      message: 'Missing Fields. Failed to signIn.',
    };
  }

  try {
    // Call the loginUser function
    let user = await loginUser(
      validatedFields.data.username,
      validatedFields.data.password,
    );

    if (!user) {
      return {
        type: 'error',
        errors: null,
        message: 'Invalid username or password.',
      };
    }

    return {
      type: 'success',
      errors: null,
      message: 'Successfully signed in.',
    };
  } catch (error: any) {
    console.error('Failed to signIn', error);
    return {
      type: 'error',
      errors: null,
      message: error.message || 'Failed to signIn.',
    };
  }
}
