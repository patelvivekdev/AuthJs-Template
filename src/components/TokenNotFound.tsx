import Link from 'next/link';
import { Button } from './ui/button';

export function TokenNotFound({
  header,
  description,
  url,
  buttonText,
}: {
  header: string;
  description: string;
  url: string;
  buttonText: string;
}) {
  return (
    <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
      <div className='m-4 mx-auto flex flex-col gap-2 rounded-lg p-8 text-center shadow-lg shadow-black dark:shadow-white'>
        <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
          {header}
        </h1>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          {description}
        </p>
        <Link href={url}>
          <Button>{buttonText}</Button>
        </Link>
      </div>
    </div>
  );
}
