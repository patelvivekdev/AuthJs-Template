'use client';
// import { useActionState } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/actions/authAction';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { SubmitButton } from '@/components/SubmitButton';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Eye, EyeOff } from 'lucide-react';

const initialState = {
  type: '',
  message: '',
  errors: null,
};

export default function SignUp() {
  // const [state, submitAction, isPending] = useActionState(signUp, initialState);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [state, submitAction] = useFormState(signUp, initialState);

  const router = useRouter();
  useEffect(() => {
    if (state.type === 'success') {
      toast.success(state.message);
      router.push('/');
    } else if (state.type === 'error') {
      toast.error(state.message);
    }
  }, [state]);

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
        <form action={submitAction} className='space-y-4'>
          {state.errors && (
            <p className='rounded-md border-2 bg-red-400 px-2 py-4'>
              {state.message}
            </p>
          )}
          <div className='grid gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              placeholder='John Doe'
              required
              type='text'
            />
            {state.errors?.name && (
              <p className='text-sm text-red-500'>{state.errors.name}</p>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='username'>Username</Label>
            <Input
              id='username'
              name='username'
              placeholder='Username'
              required
              type='text'
            />
            {state.errors?.username && (
              <p className='text-sm text-red-500'>{state.errors.username}</p>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              placeholder='name@example.com'
              required
              type='email'
            />
          </div>
          {state.errors?.email && (
            <p className='text-red-500'>{state.errors.email}</p>
          )}
          <div className='grid gap-2'>
            <Label htmlFor='password'>Password</Label>
            <div className='relative'>
              <Input
                id='password'
                name='password'
                placeholder='••••••••'
                required
                className='form-input block w-full px-3 py-2 placeholder-gray-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
                type={showPassword ? 'text' : 'password'}
              />
              <div
                className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className='h-5 w-5 text-gray-500' />
                ) : (
                  <Eye className='h-5 w-5 text-gray-500' />
                )}
              </div>
            </div>
            {state.errors?.password && (
              <p className='text-red-500'>{state.errors.password}</p>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password2'>Password Confirmation</Label>
            <div className='relative'>
              <Input
                id='password2'
                name='password2'
                placeholder='••••••••'
                required
                className='form-input block w-full px-3 py-2 placeholder-gray-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5'
                type={showConfirmPassword ? 'text' : 'password'}
              />
              <div
                className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className='h-5 w-5 text-gray-500' />
                ) : (
                  <Eye className='h-5 w-5 text-gray-500' />
                )}
              </div>
            </div>
            {state.errors?.password2 && (
              <p className='text-red-500'>{state.errors.password2}</p>
            )}
          </div>
          <SubmitButton name='Sign Up' />
        </form>
        <div className='px-2 text-center'>Or continue with</div>
        <div className='flex items-center justify-center space-x-4'>
          <Button className='w-full' variant='outline'>
            <Icons.gitHub className='mr-2 h-4 w-4' />
            GitHub
          </Button>
          <Button className='w-full' variant='outline'>
            <Icons.google className='mr-2 h-4 w-4' />
            Google
          </Button>
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <div className='text-sm text-gray-500 dark:text-gray-400'>
            Already have an account ?{' '}
            <Link
              className='font-medium text-blue-500 hover:underline'
              href='#'
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
