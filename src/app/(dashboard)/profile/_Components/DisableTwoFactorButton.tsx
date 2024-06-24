import { disableTwoFactor } from '@/actions/auth';
import { SubmitButton } from '@/components/SubmitButton';

export default function DisableTwoFactorButton({ userId }: { userId: string }) {
  const bindUserId = disableTwoFactor.bind(null, userId as string);
  return (
    <form action={bindUserId}>
      <SubmitButton size='sm' variant='destructive'>
        Disable Two Factor
      </SubmitButton>
    </form>
  );
}
