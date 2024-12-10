'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { verifyTwoFactor, twoFactorEmail } from '@/actions/auth';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const initialState = {
  type: '',
  message: '',
  errors: { otp: undefined },
};

export default function OtpForm({ userId }: { userId: string }) {
  const actionWithUserId = verifyTwoFactor.bind(null, userId as string);
  const [state, submitAction, isPending] = useActionState(
    actionWithUserId,
    initialState,
  );

  const twoFactorEmailWithUserID = twoFactorEmail.bind(null, userId as string);

  const [emailState, emailAction, isEmailPending] = useActionState(
    twoFactorEmailWithUserID,
    initialState,
  );

  const router = useRouter();
  useEffect(() => {
    if (emailState.type === 'success') {
      router.push('/sign-in/two-factor/email');
    }
  }, [emailState, router]);

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Verify your identity</CardTitle>
        <CardDescription>
          Enter the 6-digit code from your registered authenticator.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
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
          <Button className='w-full' disabled={isPending} size='sm'>
            {isPending ? 'Verifying...' : 'Verify OTP'}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className='space-y-2'>
          <form action={emailAction}>
            <Button className='w-full' disabled={isEmailPending} size='sm'>
              {isEmailPending ? 'Sending...' : 'Verify using email'}
            </Button>
          </form>
          <p className='text-muted-foreground'>
            Having problem accessing your account?{' '}
            <Link
              href='mailto: admin@patelvivek.dev'
              className='underline'
              prefetch={false}
            >
              Contact Admin
            </Link>
            .
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
