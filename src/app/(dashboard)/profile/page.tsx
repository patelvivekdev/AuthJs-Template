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
            <form className='space-y-4'>
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
              {/* <div>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' placeholder='••••••••' type='password' />
              </div> */}
              <Button className='w-full' type='submit' disabled>
                Update Profile
              </Button>
            </form>
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
                  <Button size='sm' variant='destructive'>
                    Disconnect
                  </Button>
                ) : (
                  <Button size='sm' variant='outline'>
                    Connect
                  </Button>
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
                  <Button size='sm' variant='destructive'>
                    Disconnect
                  </Button>
                ) : (
                  <Button size='sm' variant='outline'>
                    Connect
                  </Button>
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
              <div className='mt-4 flex flex-col justify-between gap-2 border-t-2 pt-4'>
                <div className='flex items-center space-x-4'>
                  <div>
                    <h3 className='text-lg font-medium'>Delete Account</h3>
                    <p className='text-gray-500 dark:text-gray-400'>
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                  </div>
                </div>
                <Button size='sm' variant='destructive'>
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
