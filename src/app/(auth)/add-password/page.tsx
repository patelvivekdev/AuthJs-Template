import { getVerificationToken } from '@/db/query/Token';
import AddPasswordForm from './addPasswordForm';
import { TokenNotFound } from '@/components/TokenNotFound';

import type { Metadata } from 'next';
import RadialGradient from '@/components/ui/radial-gradient';

export const metadata: Metadata = {
  title: 'Add password',
  description: 'Add password to your account',
};

export default async function AddPasswordPage(props: {
  searchParams?: Promise<{
    token?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const token = searchParams?.token || '';
  if (token === '') {
    return (
      <TokenNotFound
        header='Token not found'
        description='Please check your email for the token'
        url='/'
        buttonText='Back to home'
      />
    );
  }

  const data = await getVerificationToken(token);

  // check expires of token
  if (data.data?.expires! < new Date()) {
    return (
      <TokenNotFound
        header='Token expired'
        description='Token expired, please try again with a new token.'
        url='/profile'
        buttonText='Try again'
      />
    );
  }

  if (!data.success) {
    return (
      <TokenNotFound
        header='Token is invalid'
        description='Token is invalid, please try again with a new token.'
        url='/profile'
        buttonText='Sign Up'
      />
    );
  }
  return (
    <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
      <div className='m-4 mx-auto flex flex-col gap-2 rounded-lg p-8 shadow-lg shadow-black dark:shadow-white'>
        <div className='text-center'>
          <h1 className='mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Add Password
          </h1>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Enter your new strong and unique password.
          </p>
        </div>
        <AddPasswordForm email={data.data?.identifier!} />
      </div>
      <RadialGradient type='ellipse' origin='top' className='dark:invert' />
    </div>
  );
}
