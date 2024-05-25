'use client';
// import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/actions/authAction';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { SubmitButton } from '@/components/SubmitButton';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const initialState = {
  type: '',
  message: '',
  errors: null,
};

export default function SignUpForm() {
  // const [state, submitAction, isPending] = useActionState(signUp, initialState);

  const [state, submitAction] = useFormState(signUp, initialState);

  const router = useRouter();
  useEffect(() => {
    if (state.type === 'success') {
      toast.success(state.message);
      router.push('/');
    } else if (state.type === 'error') {
      toast.error(state.message);
    }
  }, [state.type]);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-500 '>
      <div className='w-full max-w-md space-y-8 rounded-lg bg-gray-800 p-8 shadow-xl'>
        <div className='text-center'>
          <h1 className='mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Sign Up
          </h1>
        </div>
        <form action={submitAction} className='space-y-6'>
          {state.errors && <p className='text-red-500'>{state.message}</p>}
          <div>
            <label htmlFor='name' className='sr-only'>
              Name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              className='w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500'
              placeholder='Name'
            />
            {/* error  for name*/}
            {state.errors?.name && (
              <p className='text-red-500'>{state.errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor='username' className='sr-only'>
              Username
            </label>
            <input
              type='text'
              name='username'
              id='username'
              className='w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-black shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white'
              placeholder='Username'
            />
            {/* error  for username*/}
            {state.errors?.username && (
              <p className='text-red-500'>{state.errors.username}</p>
            )}
          </div>
          <div>
            <label htmlFor='email' className='sr-only'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              className='w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500'
              placeholder='Email'
            />
            {/* error  for email*/}
            {state.errors?.email && (
              <p className='text-red-500'>{state.errors.email}</p>
            )}
          </div>
          <div>
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
            {/* error  for password*/}
            {state.errors?.password && (
              <p className='text-red-500'>{state.errors.password}</p>
            )}
          </div>
          <SubmitButton name='Sign Up' />
        </form>
        <div className='mt-4 text-center'>
          <p>
            Already a member?{' '}
            <Link href='/sign-in' className='text-blue-600 hover:text-blue-800'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
