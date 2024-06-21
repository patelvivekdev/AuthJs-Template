'use client';

import { signIn } from 'next-auth/webauthn';
import { Button } from './ui/button';

export function WebAuthnRegister() {
  return (
    <Button
      onClick={() => signIn('passkey', { action: 'register' })}
      className='w-full'
      variant='outline'
    >
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
      Sign in with Passkey
    </Button>
  );
}
