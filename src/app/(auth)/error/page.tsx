/* eslint-disable no-unused-vars */
'use client';

import RadialGradient from '@/components/ui/radial-gradient';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

enum Error {
  Configuration = 'Configuration',
  AccessDenied = 'AccessDenied',
  Verification = 'Verification',
  OAuthAccountNotLinked = 'OAuthAccountNotLinked',
  Default = 'Default',
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{' '}
      <code className='rounded-sm bg-slate-100 p-1 text-xs'>Configuration</code>
    </p>
  ),
  [Error.AccessDenied]: (
    <div className='flex flex-col items-center justify-center gap-4'>
      <h2 className='text-xl font-bold'>
        You are not authorized to access this page.
      </h2>
      <p>
        Unique error code:{' '}
        <code className='rounded-sm bg-slate-100 p-1 text-xs'>
          AccessDenied
        </code>
      </p>
      <Link className='text-blue-500' href='/'>
        Go to Home
      </Link>
    </div>
  ),
  [Error.OAuthAccountNotLinked]: (
    <div className='flex flex-col items-center justify-center gap-4'>
      <h2 className='text-xl font-bold'>
        Oauth Account is already linked to another account.
      </h2>
      <p>
        Unique error code:{' '}
        <code className='rounded-sm bg-slate-100 p-1 text-xs'>
          OAuthAccountNotLinked
        </code>
      </p>
      <Link className='text-blue-500' href='/profile'>
        Go to Profile
      </Link>
    </div>
  ),
  [Error.Verification]: (
    <p>
      Verification error. Please contact us if this error persists. Unique error
      code:{' '}
      <code className='rounded-sm bg-slate-100 p-1 text-xs'>Verification</code>
    </p>
  ),
  [Error.Default]: (
    <p>
      An unexpected error occurred. Please contact us if this error persists.
      Unique error code:{' '}
      <code className='rounded-sm bg-slate-100 p-1 text-xs'>Default</code>
    </p>
  ),
};

export default function AuthErrorPage() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}

function Search() {
  const search = useSearchParams();
  const error = search.get('error') as Error;

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <div className='block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
        {/* <h5 className='mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
          Something went wrong
        </h5> */}
        <div className='font-normal text-gray-700 dark:text-gray-400'>
          {errorMap[error] || 'Please contact us if this error persists.'}
        </div>
      </div>
      <RadialGradient type='ellipse' origin='top' className='dark:invert' />
    </div>
  );
}
