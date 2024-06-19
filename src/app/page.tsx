import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] dark:from-gray-950 dark:to-gray-900'>
      <div className='container flex flex-col items-center justify-center gap-12 px-4 py-16'>
        <h1 className='text-3xl font-extrabold text-white dark:text-gray-50 sm:text-[5rem]'>
          Next
          <span className='text-[#9b59b6]'>Auth.js</span>
        </h1>
        <h2 className='text-xl font-extrabold text-white dark:text-gray-50 sm:text-[2rem]'>
          A starter authentication template for{' '}
          <span className='text-[#9b59b6]'>Next.js</span>
        </h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8'>
          <Link
            className='flex max-w-xs flex-col gap-4 rounded-xl bg-[#9b59b6]/10 p-6 text-white hover:bg-[#9b59b6]/20 dark:text-gray-50 dark:hover:bg-gray-800/20'
            href='/sign-in'
          >
            <h3 className='text-2xl font-bold'>Login →</h3>
            <div className='text-lg'>
              Sign in to your account and access the protected dashboard.
            </div>
          </Link>
          <Link
            className='flex max-w-xs flex-col gap-4 rounded-xl bg-[#9b59b6]/10 p-6 text-white hover:bg-[#9b59b6]/20 dark:text-gray-50 dark:hover:bg-gray-800/20'
            href='/sign-up'
          >
            <h3 className='text-2xl font-bold'>Sign Up →</h3>
            <div className='text-lg'>
              Create a new account and join our community.
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
