'use server';

export async function signUp(prevState: any, formData: FormData) {
  console.log(formData.get('username'));

  // delay of 3 sec
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return {
    message: '',
    errors: null,
  };
}
