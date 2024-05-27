import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function Next() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Check your email for next step.</CardTitle>
        </CardHeader>
        <CardFooter className='flex justify-between'>
          <Link href='/'>
            <Button variant='outline'>Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
