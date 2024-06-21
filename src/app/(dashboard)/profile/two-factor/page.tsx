import { generateTOTP, getTOTPAuthUri } from '@epic-web/totp';
import * as QRCode from 'qrcode';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import TwoFactorForm from './TwoFactorForm';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register 2FA',
  description: 'Register two factor authentication.',
};

export default async function Component() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect('/sign-in');
  }
  const { secret, period, digits, algorithm } = generateTOTP();
  const otpUri = getTOTPAuthUri({
    period,
    digits,
    algorithm,
    secret,
    accountName: user.email!,
    issuer: 'AuthJs Template',
  });

  const qrCode = await QRCode.toDataURL(otpUri);
  return (
    <main className='mx-auto max-w-md px-4 py-12'>
      <div className='space-y-6'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold'>
            Enable Two-Factor Authentication
          </h1>
          <p className='mt-2 text-gray-500 dark:text-gray-400'>
            Protect your account with an extra layer of security by setting up
            two-factor authentication (2FA).
          </p>
        </div>
        <div className='rounded-lg bg-gray-100 p-6 dark:bg-gray-800'>
          <div className='flex flex-col items-center justify-center space-y-4'>
            <div className='w-full max-w-[200px]'>
              <Image src={qrCode} width={200} height={200} alt='2FA QR Code' />
            </div>
            <div className='space-y-2'>
              <p>Scan the QR code with your authenticator app to set up 2FA.</p>
              <div className='rounded-md border-2 border-green-600 bg-green-200 px-2 py-2 text-center'>
                <p className='text-md font-medium tracking-wider text-green-600'>
                  {secret}
                </p>
              </div>
            </div>
            <TwoFactorForm secret={secret} email={user.email!} />
          </div>
        </div>
      </div>
    </main>
  );
}
