'use client';
// import { useActionState } from 'react';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import { SubmitButton } from '@/components/SubmitButton';
import { sendAddPasswordEmail } from '@/actions/authAction';

const initialState = {
  type: '',
  message: '',
};

export default function AddPasswordButton({ email }: { email: string }) {
  // const [state, submitAction, isPending] = useActionState(sendAddPasswordEmail, initialState);
  const action = sendAddPasswordEmail.bind(null, email as string);
  const [state, submitAction] = useFormState(action, initialState);
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
        <SubmitButton name='Add Password' />
      </form>
    </>
  );
}
