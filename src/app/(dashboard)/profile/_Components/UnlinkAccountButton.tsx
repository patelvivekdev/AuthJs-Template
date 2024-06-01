import { oAuthRemove } from '@/actions/authAction';
import { Button } from '@/components/ui/button';

export default function UnlinkAccountButton({
  userId,
  provider,
}: {
  userId: string;
  provider: string;
}) {
  const bindUserId = oAuthRemove.bind(null, userId as string);
  const bindProvider = bindUserId.bind(null, provider as string);
  return (
    <form action={bindProvider}>
      <Button size='sm' variant='destructive'>
        Disconnect
      </Button>
    </form>
  );
}
