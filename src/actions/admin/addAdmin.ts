'use server';

import { z } from 'zod';
import { createTokenForAddAdmin } from '@/db/query/Token';

// =============================== addAdmin ===============================
const addAdminSchema = z.object({
  email: z.string().email('Please enter valid email address.').min(5),
});
export async function addAdmin(
  adminName: string,
  prevState: any,
  formData: FormData,
) {
  const validatedFields = addAdminSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields!!',
      resetKey: '',
    };
  }

  try {
    let emailData = await createTokenForAddAdmin(
      validatedFields.data.email,
      adminName,
    );

    if (!emailData.success) {
      return {
        type: 'error',
        errors: {
          email: undefined,
        },
        message: emailData.message,
        resetKey: '',
      };
    }

    return {
      type: 'success',
      errors: null,
      message: emailData.message,
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
