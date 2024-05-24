'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton({ name }: { name: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className='w-full rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      disabled={pending}
    >
      {pending ? 'Submitting...' : name}
    </button>
  );
}
