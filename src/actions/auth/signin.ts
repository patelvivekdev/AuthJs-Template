'use server';
import { z } from 'zod';
import { signIn as signInUser } from '@/auth';
import { redirect } from 'next/navigation';

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
