'use server';
import { z } from 'zod';
import { signIn as signInUser } from '@/auth';
import { redirect } from 'next/navigation';

// =============================== signIn ===============================
const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
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
      data: {
        username: formData.get('username') as string,
        password: formData.get('password') as string,
      },
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields!!',
    };
  }

  try {
    await signInUser('credentials', {
      username: validatedFields.data.username,
      password: validatedFields.data.password,
      redirect: true,
    });
  } catch (error: any) {
    if (error.code === 'invalid-credentials') {
      return {
        type: 'error',
        errors: {
          username: undefined,
          password: undefined,
        },
        data: {
          username: validatedFields.data.username,
          password: validatedFields.data.password,
        },
        message: error.message,
      };
    } else if (error.code === 'OauthError') {
      return {
        type: 'error',
        errors: {
          username: undefined,
          password: undefined,
        },
        data: {
          username: validatedFields.data.username,
          password: validatedFields.data.password,
        },
        message: error.message,
      };
    } else {
      throw error;
    }
  }
  redirect('/profile');
}
