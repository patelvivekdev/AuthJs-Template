'use server';

import { deleteUser } from '@/db/query/User';
import { signOut } from '@/auth';
import { redirect } from 'next/navigation';

// =============================== deleteAccount ===============================
export async function deleteAccount(userId: string) {
  await deleteUser(userId);
  await signOut();
  redirect('/');
}
