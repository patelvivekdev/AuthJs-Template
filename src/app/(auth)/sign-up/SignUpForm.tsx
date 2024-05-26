import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChromeIcon, GithubIcon } from '@/app/(dashboard)/profile/page';

export default function SignUpForm() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950'>
      <div className='mx-auto w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800'>
        <div className='mb-6 flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Sign up</h1>
          <Link
            className='text-sm font-medium text-blue-500 hover:underline'
            href='#'
          >
            Sign in
          </Link>
        </div>
        <form className='space-y-4'>
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' placeholder='John Doe' required type='text' />
          </div>
          <div>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              placeholder='name@example.com'
              required
              type='email'
            />
          </div>
          <div>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              placeholder='••••••••'
              required
              type='password'
            />
          </div>
          <Button className='w-full' type='submit'>
            Sign up
          </Button>
          <div className='flex items-center justify-center space-x-4'>
            <Button className='w-full' variant='outline'>
              <GithubIcon className='mr-2 h-5 w-5' />
              Sign up with GitHub
            </Button>
            <Button className='w-full' variant='outline'>
              <ChromeIcon className='mr-2 h-5 w-5' />
              Sign up with Google
            </Button>
          </div>
        </form>
        <div className='mt-6 flex items-center justify-between'>
          <div className='text-sm text-gray-500 dark:text-gray-400'>
            Already have an account?
            <Link
              className='font-medium text-blue-500 hover:underline'
              href='#'
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
