import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import TwoFactorEmailForm from './emailVerifyForm';

export const metadata: Metadata = {
  title: '2FA Email Verify',
  description: 'Enter code from your authenticator',
};

export default async function emailTwoFactorVerify() {
  const cookieStore = cookies();
  const userId = cookieStore.get('authjs.secret');

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
      <TwoFactorEmailForm userId={userId.value} />
    </div>
  );
}
