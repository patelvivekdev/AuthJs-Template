'use client';

import { signIn } from 'next-auth/webauthn';
import { Button } from './ui/button';
import { Icons } from './icons';

export function WebAuthnRegister() {
  return (
    <Button
      onClick={() => signIn('passkey', { action: 'register' })}
      className='w-full'
      variant='outline'
    >
      <Icons.passkey className='mr-2 h-4 w-4' />
      Register new Passkey
    </Button>
  );
}

export function WebAuthnLogin() {
  return (
    <Button
      onClick={() => signIn('passkey')}
      className='w-full'
      variant='outline'
    >
      <Icons.passkey className='mr-2 h-4 w-4' />
      Sign in with Passkey
    </Button>
  );
}
