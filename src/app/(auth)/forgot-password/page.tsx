'use client';
// import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/SubmitButton';
import { forgotPassword } from '@/actions/authAction';
import toast from 'react-hot-toast';

const initialState = {
  type: '',
  message: '',
  errors: null,
};

export default function ForgotPasswordPage() {
  // const [state, submitAction, isPending] = useActionState(signUp, initialState);

  const [state, submitAction] = useFormState(forgotPassword, initialState);
  const router = useRouter();
  useEffect(() => {
    if (state.type === 'success') {
      toast.success(state.message);
      router.push('/');
    }
  }, [state]);
  return (
    <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
      <div className='m-4 mx-auto flex flex-col gap-2 rounded-lg p-8 shadow-lg shadow-black dark:shadow-white'>
        <div className='text-center'>
          <h1 className='mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Forgot password
          </h1>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Enter your email below to reset your password
          </p>
        </div>
        {state.errors && (
          <div className='rounded-md border-2 border-red-400 px-2 py-4 text-center'>
            <p className='text-red-500'>{state.message}</p>
          </div>
        )}
        <form action={submitAction}>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                name='email'
                required
              />
              {state.errors?.email && (
                <p className='text-red-500'>{state.errors.email}</p>
              )}
            </div>
            <SubmitButton name='Send an email' />
          </div>
        </form>
      </div>
    </div>
  );
}
