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
import { Button } from '@/components/ui/button';

export default function OtpForm() {
  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Verify your identity</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to your phone or email to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='code'>Verification Code</Label>
          <InputOTP maxLength={6} pattern='^[0-9]+$'>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>Verify Code</Button>
      </CardFooter>
    </Card>
  );
}
