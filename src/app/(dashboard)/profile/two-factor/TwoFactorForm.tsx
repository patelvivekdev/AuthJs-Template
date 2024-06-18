'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { enableMfa } from '@/actions/auth';
import { SubmitButton } from '@/components/SubmitButton';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const initialState = {
  type: '',
  message: '',
  errors: null,
};

export default function TwoFactorForm({
  secret,
  email,
}: {
  secret: string;
  email: string;
}) {
  // const [state, submitAction, isPending] = useActionState(enableMfa, initialState);
  const actionWithSecret = enableMfa.bind(null, secret as string);
  const actionWithEmail = actionWithSecret.bind(null, email as string);
  const [state, action] = useFormState(actionWithEmail, initialState);

  const router = useRouter();
  useEffect(() => {
    if (state.type === 'success') {
      toast.success(state.message);
      router.push('/profile');
    }
  }, [state]);

  return (
    <div className='w-full space-y-2'>
      {state.errors && (
        <div className='rounded-md border-2 border-red-400 px-2 py-4 text-center'>
          <p className='text-red-500'>{state.message}</p>
        </div>
      )}
      <form className='flex flex-col gap-4' action={action}>
        <div className='grid gap-2'>
          <Label htmlFor='otp'>Enter your one-time password</Label>
          <Input id='otp' name='otp' type='text' placeholder='123456' />
          {state.errors?.otp && (
            <p className='text-red-500'>{state.errors.otp}</p>
          )}
        </div>
        <SubmitButton size='sm'>Enable Two-Factor Authentication</SubmitButton>
      </form>
    </div>
  );
}
