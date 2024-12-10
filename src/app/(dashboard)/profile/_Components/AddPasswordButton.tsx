'use client';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { sendAddPasswordEmail } from '@/actions/auth';
import { Button } from '@/components/ui/button';

const initialState = {
  type: '',
  message: '',
};

export default function AddPasswordButton({ email }: { email: string }) {
  const action = sendAddPasswordEmail.bind(null, email as string);
  const [state, submitAction, isPending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.type === 'success') {
      toast.success(state.message);
    } else if (state.type === 'error') {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <>
      <form action={submitAction}>
        <Button
          className='w-full'
          disabled={isPending}
          variant='outline'
          size='sm'
        >
          {isPending ? 'Sending...' : 'Send password addition request'}
        </Button>
      </form>
    </>
  );
}
