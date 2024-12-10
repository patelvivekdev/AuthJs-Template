'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

export function SubmitButton({
  variant,
  size,
  children,
  pendingText,
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
  pendingText?: string;
}) {
  const { pending } = useFormStatus();

  pendingText = pendingText || 'Submitting...';

  return (
    <Button
      type='submit'
      size={size}
      variant={variant}
      className='w-full'
      disabled={pending}
    >
      {pending ? pendingText : children}
    </Button>
  );
}
