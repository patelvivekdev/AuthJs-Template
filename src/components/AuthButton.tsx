import React from 'react';
import { signIn, signOut } from '@/auth';
import { Button } from './ui/button';
import { Icons } from './icons';
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
      <Button className='w-full' variant='outline'>
        <Icons.gitHub className='mr-2 h-4 w-4' />
        GitHub
      </Button>
    </form>
  );
}

export function GithubSignIn() {
  return (
    <form
      className='w-full'
      action={async () => {
        'use server';
        await signIn('github', {
          callbackUrl: '/',
        });
      }}
    >
      <Button className='w-full' variant='outline'>
        <Icons.gitHub className='mr-2 h-4 w-4' />
        GitHub
      </Button>
    </form>
  );
}

export function GoogleSignIn() {
  return (
    <form
      className='w-full'
      action={async () => {
        'use server';
        await signIn('google', {
          callbackUrl: '/',
        });
      }}
    >
      <Button className='w-full' variant='outline'>
        <Icons.google className='mr-2 h-4 w-4' />
        Google
      </Button>
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
