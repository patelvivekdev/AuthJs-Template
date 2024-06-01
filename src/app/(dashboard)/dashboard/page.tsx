import Link from 'next/link';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card';

export default function Dashboard() {
  return (
    <div className='container mx-auto p-12'>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to your dashboard</CardTitle>
          <CardDescription>
            This is where you can manage your account and access your data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <h3 className='text-lg font-medium'>Your Profile</h3>
              <p className='text-gray-500 dark:text-gray-400'>
                View and update your profile information.
              </p>
              <Link className='text-blue-500 hover:underline' href='/profile'>
                Go to profile
              </Link>
            </div>
            <div>
              <h3 className='text-lg font-medium'>Settings</h3>
              <p className='text-gray-500 dark:text-gray-400'>
                Customize your app settings.
              </p>
              <Link className='text-blue-500 hover:underline' href='/settings'>
                Go to settings
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
