'use client';

import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addPassword } from '@/actions/auth';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const initialState = {
  type: '',
  message: '',
  data: {
    password: '',
    password2: '',
  },
  errors: null,
};

export default function AddPasswordForm({ email }: { email: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const action = addPassword.bind(null, email as string);

  const [state, submitAction, isPending] = useActionState(action, initialState);

  const router = useRouter();

  useEffect(() => {
    if (state.type === 'success') {
      toast.success(state.message);
      router.push('/profile');
    }
  }, [router, state]);

  return (
    <form action={submitAction} className='space-y-4'>
      {state.errors && (
        <div className='rounded-md border-2 border-red-400 px-2 py-4 text-center'>
          <p className='text-red-500'>{state.message}</p>
        </div>
      )}
      <div className='grid gap-2'>
        <Label htmlFor='password'>Password</Label>
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
      <div className='grid gap-2'>
        <Label htmlFor='password2'>Password Confirmation</Label>
        <div className='relative'>
          <Input
            id='password2'
            name='password2'
            placeholder='••••••••'
            required
            defaultValue={state.data.password2}
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
      <Button className='w-full' disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Password'}
      </Button>
    </form>
  );
}
