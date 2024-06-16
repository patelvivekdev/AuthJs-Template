import Admin from '@/components/admin';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { User as DefaultUser } from 'next-auth';

// Extend User interface
interface User extends DefaultUser {
  role: string;
  username: string;
}
export default async function AdminPage() {
  const session = await auth();
  const user = session?.user as User;
  if (!user) {
    redirect('/sign-in');
  }

  if (user.role !== 'ADMIN') {
    redirect('/');
  }

  return <Admin />;
}
