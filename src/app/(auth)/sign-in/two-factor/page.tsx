import { auth } from '@/auth';
import { User as DefaultUser } from 'next-auth';
import { redirect } from 'next/navigation';

// Extend User interface
interface User extends DefaultUser {
  role: string;
  username: string;
  isTotpEnabled: boolean;
}
export default async function TwoFactorLogin() {
  const session = await auth();
  const user = session?.user as User;

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div>
      <h1>Two factor enable</h1>
    </div>
  );
}
