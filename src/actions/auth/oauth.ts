'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';

import { deleteUserAccount } from '@/db/query/User';
import { revalidatePath } from 'next/cache';

// =============================== Oauth Login ===============================
export async function oAuthLogin(provider: string) {
  let user = '/';
  try {
    user = await signIn(provider, { redirect: false });
    console.log('user', user);
  } catch (error) {
    console.log('error', error);
  }
  // console.log(user);

  if (user) redirect(user);
}

// =============================== Oauth Remove ===============================
export async function oAuthRemove(userId: string, provider: string) {
  await deleteUserAccount(userId, provider);
  revalidatePath('/', 'layout');
}
