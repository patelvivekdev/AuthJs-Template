import { getVerificationToken } from '@/db/query/Token';
import { TokenNotFound } from '@/components/TokenNotFound';
import { changeUserToAdmin, getUserByUsername } from '@/db/query/User';
import OnBoardingForm from '../../onboarding/OnBoardingForm';
import RadialGradient from '@/components/ui/radial-gradient';

export default async function ResetPasswordPage(props: {
  searchParams?: Promise<{
    token?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const token = searchParams?.token || '';
  if (token === '') {
    return (
      <TokenNotFound
        header='Token not found'
        description='Please check your email for the token'
        url='/'
        buttonText='Back to home'
      />
    );
  }

  const data = await getVerificationToken(token);

  // check expires of token
  if (data.data?.expires! < new Date()) {
    return (
      <TokenNotFound
        header='Token expired'
        description='Token expired, please try again with a new token.'
        url='/sign-up'
        buttonText='Try again'
      />
    );
  }

  if (!data.success) {
    return (
      <TokenNotFound
        header='Token is invalid'
        description='Token is invalid, please try again with a new token.'
        url='/sign-up'
        buttonText='Sign Up'
      />
    );
  }

  // check if user already have account as USER
  let user = await getUserByUsername(data.data?.identifier!);

  if (user.length === 0) {
    return <OnBoardingForm email={data.data?.identifier!} isAdmin />;
  } else {
    let response = await changeUserToAdmin(data.data?.identifier!);
    return (
      <div className='mx-auto flex min-h-screen flex-col items-center justify-center'>
        <div className='m-4 mx-auto flex flex-col gap-2 rounded-lg p-8 shadow-lg shadow-black dark:shadow-white'>
          <div className='text-center'>
            {!response.success && (
              <div className='rounded-md border-2 border-red-400 px-2 py-4 text-center'>
                <p className='text-red-500'>{response.message}</p>
              </div>
            )}
            {response.success && (
              <div className='rounded-md border-2 border-green-400 px-2 py-4 text-center'>
                <p className='text-green-500'>{response.message}</p>
              </div>
            )}
          </div>
        </div>
        <RadialGradient type='ellipse' origin='top' className='dark:invert' />
      </div>
    );
  }
}
