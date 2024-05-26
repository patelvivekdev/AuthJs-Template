import React from 'react';
import { auth } from '@/auth';
import Link from 'next/link';
import { Button } from './ui/button';

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;
  console.log('user', user);

  return (
    <header className='sticky top-0 z-50 border-b bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-800'>
      <div className='container mx-auto flex items-center justify-between'>
        <Link className='text-lg font-bold' href='/'>
          Drizzle + Turso
        </Link>
        {session ? (
          <div className='flex items-center space-x-4'>
            <Link
              className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
              href='/dashboard'
            >
              Dashboard
            </Link>
            <Link
              className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
              href='/profile'
            >
              Profile
            </Link>
            <Button size='sm' variant='outline'>
              Logout
            </Button>
          </div>
        ) : (
          <div className='flex items-center space-x-4'>
            <Link href='/sign-in'>
              <Button size='sm' variant='outline'>
                Sign In
              </Button>
            </Link>
            <Link href='/sign-up'>
              <Button size='sm' variant='outline'>
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
