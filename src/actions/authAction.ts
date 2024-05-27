'use server';
import { createUser, createVerificationToken } from '@/db/query/User';
import { z } from 'zod';
import { signIn as signInUser } from '@/auth';

// =============================== signUp ===============================
const signUpSchema = z.object({
  email: z.string().email('Please enter valid message').min(5),
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
      message: 'Missing Fields. Failed to signUp.',
    };
  }

  try {
    // Call the createUser function
    let emailData = await createVerificationToken(validatedFields.data.email);

    if (!emailData.success) {
      return {
        type: 'error',
        errors: null,
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
      errors: null,
      message: error.message || 'Failed to signUp.',
    };
  }
}

// =============================== signUp > onBoarding ===============================
const onBoardingSchema = z.object({
  name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
  username: z.string().min(3, { message: 'Must be 3 or more characters long' }),
  email: z.string().email('Please enter valid message').min(5),
  password: z.string().min(8, { message: 'Must be 8 or more characters long' }),
  password2: z.string(),
});

export async function onBoarding(prevState: any, formData: FormData) {
  const validatedFields = onBoardingSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
    password2: formData.get('password2'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to signUp.',
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
        password2: 'Passwords do not match',
      },
      message: 'Passwords do not match. Failed to signUp.',
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

  // Call the loginUser function
  let user = await signInUser('credentials', {
    username: validatedFields.data.username,
    password: validatedFields.data.password,
    redirect: true,
    redirectTo: '/profile',
  });

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

  // try {
  // } catch (error: any) {
  //   console.error('Failed to signIn', error);
  //   return {
  //     type: 'error',
  //     errors: null,
  //     message: error.message || 'Failed to signIn.',
  //   };
  // }
}
