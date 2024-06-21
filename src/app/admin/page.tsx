import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { columns } from './columns';
import { DataTable } from './data-table';
import { getUsers } from '@/db/query/User';
import { User as DefaultUser } from 'next-auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin page',
  description: 'Manage users',
};

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

  const users = await getUsers();

  return (
    <div className='container mx-auto p-10'>
      <div className='mb-4 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            Welcome back {user.name} !
          </h2>
        </div>
        <div className='flex items-center space-x-2'>
          <Link href='/add-admin'>
            <Button>Add Admin</Button>
          </Link>
        </div>
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
