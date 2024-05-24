'use client';
// import { useActionState } from 'react';
// import { useRouter } from 'next/navigation';
import { signUp } from '@/actions/authAction';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { SubmitButton } from '@/components/SubmitButton';

const initialState = {
  message: '',
  errors: null,
};

export default function SignUpForm() {
  // const [state, submitAction, isPending] = useActionState(signUp, initialState);

  const [state, submitAction] = useFormState(signUp, initialState);

  //   const router = useRouter();

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-500 '>
      <div className='w-full max-w-md space-y-8 rounded-lg bg-gray-800 p-8 shadow-xl'>
        <div className='text-center'>
          <h1 className='mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Join True Feedback
          </h1>
          <p className='mb-4'>Sign In to start your anonymous adventure</p>
        </div>
        <form action={submitAction} className='space-y-6'>
          {state.errors && <p className='text-red-500'>{state.errors}</p>}
          <label htmlFor='username' className='sr-only'>
            Username
          </label>
          <input
            type='text'
            name='username'
            id='username'
            className='w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500'
            placeholder='Username'
          />
          <label htmlFor='password' className='sr-only'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            className='w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500'
            placeholder='Password'
          />
          <SubmitButton name='Sign In' />
        </form>
        <div className='mt-4 text-center'>
          <p>
            Already a member?{' '}
            <Link href='/sign-up' className='text-blue-600 hover:text-blue-800'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
