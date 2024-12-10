'use client';

import { useActionState, useState } from 'react';
import { signIn } from '@/actions/auth';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const initialState = {
  type: '',
  message: '',
  data: {
    username: '',
    password: '',
  },
  errors: {
    username: undefined,
    password: undefined,
  },
};

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, submitAction, isPending] = useActionState(signIn, initialState);

  return (
    <form action={submitAction} className='space-y-6'>
      {state.type === 'error' && (
        <div className='rounded-md border-2 border-red-400 px-2 py-4 text-center'>
          <p className='text-red-500'>{state.message}</p>
        </div>
      )}
      <div className='grid gap-2'>
        <Label htmlFor='username'>Username/Email</Label>
        <Input
          id='username'
          name='username'
          placeholder='Username'
          required
          type='text'
          defaultValue={state.data.username}
        />
        {state.errors?.username && (
          <p className='text-sm text-red-500'>{state.errors.username}</p>
        )}
      </div>
      <div className='grid gap-2'>
        <div className='flex items-center'>
          <Label htmlFor='password'>Password</Label>
          <Link
            href='/forgot-password'
            className='ml-auto inline-block text-sm underline'
          >
            Forgot your password?
          </Link>
        </div>
        <div className='relative'>
          <Input
            id='password'
            name='password'
            placeholder='••••••••'
            required
            defaultValue={state.data.password}
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
      <Button className='w-full' disabled={isPending} type='submit'>
        {isPending ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}
