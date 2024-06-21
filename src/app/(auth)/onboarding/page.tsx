import { getVerificationToken } from '@/db/query/Token';
import OnBoardingForm from './OnBoardingForm';
import { TokenNotFound } from '@/components/TokenNotFound';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'A simple Register page',
};

export default async function onBoarding({
  searchParams,
}: {
  searchParams?: {
    code?: string;
  };
}) {
  const token = searchParams?.code || '';
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
        url='/sign-up'
        buttonText='Try again'
      />
    );
  }

  if (!data.success) {
    return (
      <TokenNotFound
        header='Token is invalid'
        description='Token is invalid, please try again with a new token.'
        url='/sign-up'
        buttonText='Sign Up'
      />
    );
  }
  return (
    <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
      <div className='m-4 mx-auto flex flex-col gap-2 rounded-lg p-8 shadow-lg shadow-black dark:shadow-white'>
        <div className='text-center'>
          <h1 className='mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Create new account
          </h1>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Fill these details to get started.
          </p>
        </div>
        <OnBoardingForm email={data.data?.identifier!} isAdmin={false} />
      </div>
    </div>
  );
}
