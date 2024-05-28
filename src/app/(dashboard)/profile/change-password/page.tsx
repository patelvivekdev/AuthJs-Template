import { redirect } from 'next/navigation';
import ChangePasswordForm from './changePasswordForm';
import { auth } from '@/auth';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change Password',
  description: 'Change your password',
};

export default async function ChangePasswordPage() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect('/sign-in');
  }
  return (
    <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
      <div className='mx-auto flex flex-col gap-2 rounded-lg p-8 shadow-lg shadow-black dark:shadow-white'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Change Password
          </h1>
        </div>
        <ChangePasswordForm email={user.email!} />
        <div className='mt-6 flex items-center justify-between'>
          <div className='text-sm text-gray-500 dark:text-gray-400'>
            Don&rsquo;t remember current password ?{' '}
            <Link
              className='font-medium text-blue-500 hover:underline'
              href='/forgot-password'
            >
              Forgot password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
