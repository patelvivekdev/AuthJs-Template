'use client';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgotPassword } from '@/actions/auth';
import { toast } from 'sonner';
import RadialGradient from '@/components/ui/radial-gradient';
import { Button } from '@/components/ui/button';

const initialState = {
  type: '',
  message: '',
  errors: null,
};

export default function ForgotPasswordPage() {
  const [state, submitAction, isPending] = useActionState(
    forgotPassword,
    initialState,
  );
  const router = useRouter();
  useEffect(() => {
    if (state.type === 'success') {
      toast.success(state.message);
      router.push('/');
    }
  }, [router, state]);
  return (
    <div className='mx-auto flex h-[calc(100vh-65px)] flex-col items-center justify-center'>
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
            <Button disabled={isPending} type='submit'>
              {isPending ? 'Sending...' : 'Send reset link'}
            </Button>
          </div>
        </form>
      </div>
      <RadialGradient type='ellipse' origin='top' className='dark:invert' />
    </div>
  );
}
