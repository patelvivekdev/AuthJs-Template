'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { OAuthAccountNotLinked } from '@auth/core/errors';
import { deleteUserAccount } from '@/db/query/User';
import { revalidatePath } from 'next/cache';

// =============================== Oauth Login ===============================
export async function oAuthLogin(provider: string) {
  try {
    await signIn(provider);
  } catch (error) {
    if (error instanceof OAuthAccountNotLinked) {
      redirect('/error?error=OAuthAccountNotLinked');
    } else {
      // for Redirect to work
      throw error;
    }
  }
}

// =============================== Oauth Remove ===============================
export async function oAuthRemove(userId: string, provider: string) {
  await deleteUserAccount(userId, provider);
  revalidatePath('/', 'layout');
}
