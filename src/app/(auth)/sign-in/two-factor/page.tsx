import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import OtpForm from './otp';

import type { Metadata } from 'next';
import RadialGradient from '@/components/ui/radial-gradient';

export const metadata: Metadata = {
  title: '2FA Verify',
  description: 'Enter code from your authenticator',
};

export default async function TwoFactorLogin() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('authjs.two-factor');

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
      <OtpForm userId={userId.value} />
      <RadialGradient type='ellipse' origin='top' className='dark:invert' />
    </div>
  );
}
