'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { verifyEmailTwoFactor } from '@/actions/auth';
import Link from 'next/link';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';

const initialState = {
  type: '',
  message: '',
  errors: { otp: undefined },
};

export default function TwoFactorEmailForm({ userId }: { userId: string }) {
  const actionWithUserId = verifyEmailTwoFactor.bind(null, userId as string);
  const [state, submitAction, isPending] = useActionState(
    actionWithUserId,
    initialState,
  );
  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Verify your identity</CardTitle>
        <CardDescription>
          Enter the 6-digit code from your email.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <form action={submitAction}>
          <div className='mb-4 space-y-2'>
            {state.type === 'error' && (
              <div className='rounded-md border-2 border-red-400 px-2 py-4 text-center'>
                <p className='text-red-500'>{state.message}</p>
              </div>
            )}
            <Label htmlFor='code'>Verification Code</Label>
            <InputOTP
              name='otp'
              containerClassName='justify-center'
              maxLength={6}
              pattern='^[0-9]+$'
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {state.errors?.otp && (
              <p className='text-red-500'>{state.errors.otp}</p>
            )}
          </div>
          <Button type='submit' disabled={isPending}>
            {isPending ? 'Verifying...' : 'Verify Code'}
          </Button>
        </form>
        <Link className='underline' href='/sign-in/two-factor'>
          Go back
        </Link>
      </CardContent>
    </Card>
  );
}
