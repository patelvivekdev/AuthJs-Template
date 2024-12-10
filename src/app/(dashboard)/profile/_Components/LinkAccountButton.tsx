import { oAuthLogin } from '@/actions/auth';
import { SubmitButton } from '@/components/SubmitButton';

export default function LinkAccountButton({ provider }: { provider: string }) {
  const action = oAuthLogin.bind(null, provider as string);

  return (
    <form action={action}>
      <SubmitButton size='sm' variant='outline' pendingText='Connecting...'>
        Connect
      </SubmitButton>
    </form>
  );
}
