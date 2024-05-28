'use client';
// import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/actions/authAction';
import { useFormState } from 'react-dom';
import { SubmitButton } from '@/components/SubmitButton';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
      router.push('/sign-up/next');
    }
  }, [state]);

  return (
    <form action={submitAction} className='space-y-4'>
      {state.errors && (
        <div className='rounded-md border-2 border-red-400 px-2 py-4 text-center'>
          <p className='text-red-500'>{state.message}</p>
        </div>
      )}
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
      <SubmitButton name='Sign Up' />
    </form>
  );
}
