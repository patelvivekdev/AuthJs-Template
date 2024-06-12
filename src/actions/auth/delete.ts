'use server';

import { deleteUser } from '@/db/query/User';
import { signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// =============================== deleteAccount ===============================
export async function deleteAccount(userId: string) {
  await deleteUser(userId);
  await signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}
