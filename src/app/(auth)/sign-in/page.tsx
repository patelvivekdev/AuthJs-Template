import Link from 'next/link';
import SignInForm from './SignInForm';
import { GithubSignIn, GoogleSignIn } from '@/components/AuthButton';

export default function SignIn() {
  return (
    <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
      <div className='mx-auto flex flex-col gap-2 rounded-lg p-8 shadow-lg shadow-black dark:shadow-white'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Welcome back
          </h1>
        </div>
        <SignInForm />
        <div className='px-2 text-center'>Or continue with</div>
        <div className='flex items-center justify-center space-x-4'>
          <GithubSignIn />
          <GoogleSignIn />
        </div>
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
    </div>
  );
}
