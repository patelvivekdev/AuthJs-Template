import { getVerificationToken } from '@/db/query/Token';
import OnBoardingForm from './OnBoardingForm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TokenNotFound } from '@/components/TokenNotFound';

export default async function onBoarding({
  searchParams,
}: {
  searchParams?: {
    code?: string;
  };
}) {
  const token = searchParams?.code || '';
  if (token === '') {
    return <TokenNotFound />;
  }

  const data = await getVerificationToken(token);

  // check expires of token
  if (data.data?.expires! < new Date()) {
    return (
      <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
        <div className='m-4 mx-auto flex flex-col gap-2 rounded-lg p-8 text-center shadow-lg shadow-black dark:shadow-white'>
          <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Token expired!
          </h1>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Please create a new account
          </p>
          <Link href='/sign-up'>
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!data.success) {
    return <TokenNotFound />;
  }
  return (
    <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
      <div className='m-4 mx-auto flex flex-col gap-2 rounded-lg p-8 shadow-lg shadow-black dark:shadow-white'>
        <div className='text-center'>
          <h1 className='mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Create new account
          </h1>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Fill these details to get started.
          </p>
        </div>
        <OnBoardingForm email={data.data?.identifier!} />
      </div>
    </div>
  );
}
