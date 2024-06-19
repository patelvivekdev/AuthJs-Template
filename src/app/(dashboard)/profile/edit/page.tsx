import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getUserById } from '@/db/query/User';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile edit',
  description: 'Update your profile.',
};

export default async function ProfileEditPage() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect('/sign-in');
  }
  await getUserById(user?.id!);
  return (
    <div>
      <h1>Profile Edit Page</h1>
    </div>
  );
}
