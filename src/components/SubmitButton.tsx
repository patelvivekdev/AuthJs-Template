'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

export function SubmitButton({
  variant,
  size,
  children,
}: {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null;
  size?: 'sm' | 'default' | 'lg' | 'icon' | null;
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      size={size}
      variant={variant}
      className='w-full'
      disabled={pending}
    >
      {pending ? 'Submitting...' : children}
    </Button>
  );
}
