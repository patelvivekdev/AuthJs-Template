import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getUserById } from '@/db/query/User';
import Link from 'next/link';
import DeleteAccount from './_Components/DeleteAccountButton';
import LinkAccountButton from './_Components/LinkAccountButton';
import UnlinkAccountButton from './_Components/UnlinkAccountButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit } from 'lucide-react';
import AddPasswordButton from './_Components/AddPasswordButton';

export default async function Dashboard() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect('/sign-in');
  }

  let userData = await getUserById(user?.id!);

  let accounts = userData?.accounts.map((account) => account.provider);
  return (
    <div className='container mx-auto px-8 py-12'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>{user?.name} Profile</CardTitle>
            <CardDescription>
              Update your personal information and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex flex-row items-center gap-2'>
                <Avatar>
                  <AvatarImage src={user.image!} alt={user.name!} />
                  <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Edit className='h-4 w-4' />
              </div>
              <div>
                <Label htmlFor='name'>Name</Label>
                <Input
                  defaultValue={user?.name ? user?.name : ''}
                  id='name'
                  type='text'
                  disabled
                />
              </div>
              <div>
                <Label htmlFor='email'>Email</Label>
                <Input
                  defaultValue={user?.email ? user?.email : ''}
                  id='email'
                  type='email'
                  disabled
                />
              </div>
              <div className='flex flex-row justify-center gap-2'>
                {accounts?.includes('email') ? (
                  <Link href='/profile/change-password'>
                    <Button
                      className='w-full bg-sky-400 text-black hover:bg-sky-600 dark:bg-sky-400 dark:hover:bg-sky-600'
                      type='submit'
                    >
                      Change Password
                    </Button>
                  </Link>
                ) : (
                  <AddPasswordButton email={user?.email!} />
                )}
                <Link href='/profile/edit'>
                  <Button className='w-full' type='submit'>
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
            <CardDescription>
              Manage your connected social media accounts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-4'>
                  <Icons.google className='mr-2 h-6 w-6' />
                  <div>
                    <h3 className='text-lg font-medium'>Google</h3>
                    <p className='text-gray-500 dark:text-gray-400'>
                      {accounts?.includes('google')
                        ? 'Connected'
                        : 'Not Connected'}
                    </p>
                  </div>
                </div>
                {accounts?.includes('google') ? (
                  <UnlinkAccountButton />
                ) : (
                  <LinkAccountButton />
                )}
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-4'>
                  <Icons.gitHub className='mr-2 h-6 w-6' />
                  <div>
                    <h3 className='text-lg font-medium'>GitHub</h3>
                    <p className='text-gray-500 dark:text-gray-400'>
                      {accounts?.includes('github')
                        ? 'Connected'
                        : 'Not Connected'}
                    </p>
                  </div>
                </div>
                {accounts?.includes('github') ? (
                  <UnlinkAccountButton />
                ) : (
                  <LinkAccountButton />
                )}
              </div>
              {/* <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-4'>
                  <Icons.twitter className='mr-2 h-6 w-6 fill-current' />
                  <div>
                    <h3 className='text-lg font-medium'>Twitter</h3>
                    <p className='text-gray-500 dark:text-gray-400'>
                      Not connected
                    </p>
                  </div>
                </div>
                <Button size='sm' variant='outline'>
                  Connect
                </Button>
              </div> */}
              <DeleteAccount userId={user?.id!} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
