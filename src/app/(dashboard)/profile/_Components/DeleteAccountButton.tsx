// import { useActionState } from 'react';
import { deleteAccount } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SubmitButton } from '@/components/SubmitButton';

export default function DeleteAccount({ userId }: { userId: string }) {
  // const [state, submitAction, isPending] = useActionState(deleteAccount, initialState);
  const deleteAccountWithEmail = deleteAccount.bind(null, userId as string);

  return (
    <div className='m-4 flex flex-col justify-between gap-2 border-t-2 p-4'>
      <Dialog>
        <DialogTrigger asChild>
          <Button size='sm' variant='destructive'>
            Delete Account
          </Button>
        </DialogTrigger>
        <DialogContent className='w-4/5 sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Account Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account?
            </DialogDescription>
          </DialogHeader>
          <div className='flex items-center space-x-2'>
            <p className='text-gray-500 dark:text-gray-400'>
              Once you delete your account, there is no going back. Please be
              certain. Deleting account will also delete Oauth accounts if you
              have it.
            </p>
          </div>
          <DialogFooter className='gap-2 sm:justify-end'>
            <DialogClose asChild>
              <Button size='sm' variant='outline'>
                Close
              </Button>
            </DialogClose>
            <form action={deleteAccountWithEmail}>
              <SubmitButton>Delete Account</SubmitButton>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
