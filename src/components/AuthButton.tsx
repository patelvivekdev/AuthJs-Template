import React from 'react';
import { signIn, signOut } from '@/auth';
export function SignIn({ provider }: { provider?: string }) {
  return (
    <form
      action={async () => {
        'use server';
        await signIn(provider || 'google', {
          callbackUrl: '/',
        });
      }}
    >
      {/* Create button with tailwind css */}

      <button className='w-full'> Login with {provider || 'Google'}</button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
      className='w-full'
    >
      <button className='w-full'>Sign Out</button>
    </form>
  );
}
