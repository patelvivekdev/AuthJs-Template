import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import OtpForm from './otp';

export default async function TwoFactorLogin() {
  const cookieStore = cookies();
  const userId = cookieStore.get('authjs.secret');

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
      <OtpForm userId={userId.value} />
    </div>
  );
}
