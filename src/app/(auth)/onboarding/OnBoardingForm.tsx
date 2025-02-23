'use client';
import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onBoarding } from '@/actions/auth';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const initialState = {
  type: '',
  message: '',
  errors: null,
};

export default function OnBoardingForm({
  email,
  isAdmin,
}: {
  email: string;
  isAdmin: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let onBoardingWithEmail = onBoarding.bind(null, email as string);
  let onBoardingWithIsAdmin = onBoardingWithEmail.bind(
    null,
    isAdmin as boolean,
  );

  const [state, submitAction, isPending] = useActionState(
    onBoardingWithIsAdmin,
    initialState,
  );

  const router = useRouter();
  useEffect(() => {
    if (state.type === 'success') {
      toast.success(state.message);
      router.push('/sign-in');
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
          defaultValue={email}
          disabled
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
      <Button className='w-full' disabled={isPending} type='submit'>
        {isPending ? 'Sending...' : 'Complete Registration'}
      </Button>
    </form>
  );
}
