import { oAuthLogin } from '@/actions/authAction';
import { Button } from '@/components/ui/button';

export default function LinkAccountButton({ provider }: { provider: string }) {
  // const [state, submitAction, isPending] = useActionState(deleteAccount, initialState);
  const action = oAuthLogin.bind(null, provider as string);

  return (
    <form action={action}>
      <Button size='sm' variant='outline'>
        Connect
      </Button>
    </form>
  );
}
