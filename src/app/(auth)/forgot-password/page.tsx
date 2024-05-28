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
    } else if (state.type === 'error') {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <div className='dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex  h-screen w-full items-center justify-center bg-white dark:bg-black lg:grid lg:min-h-[600px] lg:grid-cols-1 xl:min-h-[800px]'>
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)] dark:bg-black sm:[mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]'></div>
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>Password Reset</h1>
            <p className='text-muted-foreground text-balance'>
              Enter your email below to reset your password
            </p>
          </div>
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
              </div>
              <SubmitButton name='Send an email' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
