import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getUserById } from '@/db/query/User';
export default async function ProfileEditPage() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect('/sign-in');
  }
  let userData = await getUserById(user?.id!);
  console.log(userData);
  return (
    <div>
      <h1>Profile Edit Page</h1>
    </div>
  );
}
