'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

export function SubmitButton({ name }: { name: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' className='w-full' disabled={pending}>
      {pending ? 'Submitting...' : name}
    </Button>
  );
}
