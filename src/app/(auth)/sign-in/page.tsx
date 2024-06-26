import Link from 'next/link';
import SignInForm from './SignInForm';
import { GithubSignIn, GoogleSignIn } from '@/components/AuthButton';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import type { Metadata } from 'next';
import { WebAuthnLogin } from '@/components/WebAuthnButton';
import RadialGradient from '@/components/ui/radial-gradient';

export const metadata: Metadata = {
  title: 'Login',
  description: 'A simple login page',
};

export default async function SignIn({
  searchParams,
}: {
  searchParams?: {
    error?: string;
  };
}) {
  const error = searchParams?.error || '';
  if (error) {
    redirect(`/error?error=${error}`);
  }
  const session = await auth();
  const user = session?.user;
  if (user) {
    redirect('/profile');
  }
  return (
    <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
      <div className='mx-auto flex flex-col gap-2 rounded-lg p-8 shadow-lg shadow-black dark:shadow-white'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Welcome back
          </h1>
        </div>
        <SignInForm />
        <div className='relative m-4'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-base uppercase'>
            <span className='bg-neutral-100 px-4 dark:bg-neutral-900'>Or</span>
          </div>
        </div>
        <WebAuthnLogin />

        <GithubSignIn />
        <GoogleSignIn />
        <div className='mt-6 flex items-center justify-between'>
          <div className='text-sm text-gray-500 dark:text-gray-400'>
            Don&rsquo;t have an account ?{' '}
            <Link
              className='font-medium text-blue-500 hover:underline'
              href='/sign-up'
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <RadialGradient type='ellipse' origin='top' className='dark:invert' />
    </div>
  );
}
