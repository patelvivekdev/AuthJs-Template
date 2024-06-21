import AddAdminForm from './AddAdminForm';
import { auth } from '@/auth';
import { User as DefaultUser } from 'next-auth';
import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Admin',
  description: 'Send invitation for user to register as Admin',
};

// Extend User interface
interface User extends DefaultUser {
  role: string;
  username: string;
}

export default async function AddAdmin() {
  const session = await auth();
  const user = session?.user as User;
  if (!user) {
    redirect('/sign-in');
  }

  if (user.role !== 'ADMIN') {
    redirect('/');
  }
  return (
    <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
      <div className='m-4 mx-auto flex flex-col gap-2 rounded-lg p-8 shadow-lg shadow-black dark:shadow-white'>
        <div className='text-center'>
          <h1 className='mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Invite user for Admin
          </h1>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Enter email below to create send invitation.
          </p>
        </div>
        <AddAdminForm adminName={user.name!} />
      </div>
    </div>
  );
}
