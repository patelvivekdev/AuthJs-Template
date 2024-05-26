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

export default function Dashboard() {
  return (
    <div className='container mx-auto px-8 py-12'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>
              Update your personal information and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className='space-y-4'>
              <div>
                <Label htmlFor='name'>Name</Label>
                <Input defaultValue='John Doe' id='name' type='text' />
              </div>
              <div>
                <Label htmlFor='email'>Email</Label>
                <Input
                  defaultValue='john@example.com'
                  id='email'
                  type='email'
                />
              </div>
              <div>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' placeholder='••••••••' type='password' />
              </div>
              <Button className='w-full' type='submit'>
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
                  <ChromeIcon className='h-6 w-6 text-gray-500 dark:text-gray-400' />
                  <div>
                    <h3 className='text-lg font-medium'>Google</h3>
                    <p className='text-gray-500 dark:text-gray-400'>
                      Connected as john@example.com
                    </p>
                  </div>
                </div>
                <Button size='sm' variant='outline'>
                  Disconnect
                </Button>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-4'>
                  <GithubIcon className='h-6 w-6 text-gray-500 dark:text-gray-400' />
                  <div>
                    <h3 className='text-lg font-medium'>GitHub</h3>
                    <p className='text-gray-500 dark:text-gray-400'>
                      Connected as johndoe
                    </p>
                  </div>
                </div>
                <Button size='sm' variant='outline'>
                  Disconnect
                </Button>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-4'>
                  <TwitterIcon className='h-6 w-6 text-gray-500 dark:text-gray-400' />
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
              </div>
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

export function ChromeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <circle cx='12' cy='12' r='4' />
      <line x1='21.17' x2='12' y1='8' y2='8' />
      <line x1='3.95' x2='8.54' y1='6.06' y2='14' />
      <line x1='10.88' x2='15.46' y1='21.94' y2='14' />
    </svg>
  );
}

export function GithubIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
      <path d='M9 18c-4.51 2-5-2-7-2' />
    </svg>
  );
}

export function TwitterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
    </svg>
  );
}
