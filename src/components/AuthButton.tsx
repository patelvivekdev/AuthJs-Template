import React from 'react';
import { signIn, signOut } from '@/auth';
import { Button } from './ui/button';
import { Icons } from './icons';
import { unstable_noStore } from 'next/cache';
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
          redirectTo: '/profile',
          redirect: true,
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
  unstable_noStore();
  return (
    <form
      action={async () => {
        'use server';
        await signOut({
          redirectTo: '/',
          redirect: true,
        });
      }}
      className='w-full'
    >
      <Button size='sm' variant='destructive'>
        Logout
      </Button>
    </form>
  );
}
