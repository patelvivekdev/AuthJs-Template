import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function EditProfileForm({ userData }: { userData: any }) {
  return (
    <>
      <form className='space-y-4'>
        <div>
          <Label htmlFor='name'>Name</Label>
          <Input
            defaultValue={userData?.name ? userData?.name : ''}
            id='name'
            type='text'
            disabled
          />
        </div>
        <div>
          <Label htmlFor='role'>Username</Label>
          <Input
            defaultValue={userData?.username ? userData?.username : ''}
            id='role'
            type='text'
            disabled
          />
        </div>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            defaultValue={userData?.email ? userData?.email : ''}
            id='email'
            type='email'
            disabled
          />
        </div>
        <div>
          <Button className='w-full' disabled size='sm'>
            Update Profile
          </Button>
        </div>
      </form>
    </>
  );
}
