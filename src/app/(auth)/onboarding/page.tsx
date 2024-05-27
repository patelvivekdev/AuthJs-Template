export default async function onBoarding({
  searchParams,
}: {
  searchParams?: {
    code?: string;
  };
}) {
  const code = searchParams?.code || '';

  console.log('code', code);
}
