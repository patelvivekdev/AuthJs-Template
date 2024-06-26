import Link from 'next/link';
import { GithubSignIn, GoogleSignIn } from '@/components/AuthButton';
import SignUpForm from './SignUpForm';
import type { Metadata } from 'next';
import RadialGradient from '@/components/ui/radial-gradient';

export const metadata: Metadata = {
  title: 'Register',
  description: 'A simple Register page',
};

export default function SignUp() {
  return (
    <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
      <div className='m-4 mx-auto flex flex-col gap-2 rounded-lg p-8 shadow-lg shadow-black dark:shadow-white'>
        <div className='text-center'>
          <h1 className='mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Create an account
          </h1>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Enter your email below to create your account
          </p>
        </div>
        <SignUpForm />
        <div className='relative m-4'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-base uppercase'>
            <span className='bg-neutral-100 px-4 dark:bg-neutral-900'>Or</span>
          </div>
        </div>
        <GithubSignIn />
        <GoogleSignIn />
        <div className='mt-6 flex items-center justify-between'>
          <div className='text-sm text-gray-500 dark:text-gray-400'>
            Already have an account ?{' '}
            <Link
              className='font-medium text-blue-500 hover:underline'
              href='/sign-in'
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <RadialGradient type='ellipse' origin='top' className='dark:invert' />
    </div>
  );
}
