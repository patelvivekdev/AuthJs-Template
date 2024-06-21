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
import { SubmitButton } from '@/components/SubmitButton';
import { useFormState } from 'react-dom';
import { verifyTwoFactor } from '@/actions/auth';

const initialState = {
  type: '',
  message: '',
  errors: null,
};

export default function OtpForm({ userId }: { userId: string }) {
  // const [state, submitAction, isPending] = useActionState(verifyTwoFactor, initialState);
  const actionWithUserId = verifyTwoFactor.bind(null, userId as string);
  const [state, action] = useFormState(actionWithUserId, initialState as any);
  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Verify your identity</CardTitle>
        <CardDescription>
          Enter the 6-digit code from your registered authenticator.
        </CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            {state.errors && (
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
        </CardContent>
        <CardFooter>
          <SubmitButton size='sm'>Verify Code</SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
}
