'use server';

import { deleteUser } from '@/db/query/User';
import { signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// =============================== addAdmin ===============================
export async function addAdmin(email: string) {
  await deleteUser(email);
  await signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}
