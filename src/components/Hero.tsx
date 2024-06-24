import Image from 'next/image';
import SparklesText from '@/components/ui/sparkles-text';
import OrbitingCircles from '@/components/ui/orbiting-circles';
import magicUiIcon from '@/../public/magicui.png';
import reactDarkIcon from '@/../public/react_dark.svg';
import vercelIcon from '@/../public/vercel.svg';
import nextIcon from '@/../public/nextjs.svg';
import authJsIcon from '@/../public/authjs.webp';
import drizzleIcon from '@/../public/drizzle.jpg';
import tursoIcon from '@/../public/turso.jpg';
import resendIcon from '@/../public/resend.jpg';

export default function OrbitingCirclesDemo() {
  return (
    <div className='relative flex h-[400] w-full max-w-[32rem] flex-col items-center justify-center gap-4 overflow-hidden rounded-lg sm:h-[700px] sm:max-w-[60rem]'>
      <SparklesText
        className='text-center text-3xl sm:text-[4rem]'
        text='AuthJs Template'
      />

      <h2 className='text-center text-xl font-extrabold text-white dark:text-gray-50 sm:text-[2rem]'>
        A starter authentication template for Next.js
      </h2>

      <OrbitingCircles
        className='block h-[40px] w-[40px] border-none bg-transparent sm:hidden'
        radius={150}
        duration={16}
        delay={2}
      >
        <Image src={nextIcon} alt='Next Js' />
      </OrbitingCircles>
      <OrbitingCircles
        className='block h-[40px] w-[40px] border-none bg-transparent sm:hidden'
        radius={150}
        duration={16}
        delay={4}
      >
        <Image className='rounded-full' src={drizzleIcon} alt='Drizzle ORM' />
      </OrbitingCircles>
      <OrbitingCircles
        className='block h-[40px] w-[40px] border-none bg-transparent sm:hidden'
        radius={150}
        duration={16}
        delay={6}
      >
        <Image className='rounded-full' src={resendIcon} alt='Resend' />
      </OrbitingCircles>

      <OrbitingCircles
        className='block h-[40px] w-[40px] border-none bg-transparent sm:hidden'
        radius={150}
        duration={16}
        delay={8}
      >
        <Image src={authJsIcon} alt='Auth Js' />
      </OrbitingCircles>
      <OrbitingCircles
        className='block h-[40px] w-[40px] border-none bg-transparent sm:hidden'
        radius={150}
        duration={16}
        delay={10}
      >
        <Image className='rounded-full' src={tursoIcon} alt='Turso' />
      </OrbitingCircles>
      <OrbitingCircles
        className='block h-[40px] w-[40px] border-none bg-transparent sm:hidden'
        radius={150}
        duration={16}
        delay={12}
      >
        <Image src={vercelIcon} alt='Vercel' />
      </OrbitingCircles>
      <OrbitingCircles
        className='block h-[40px] w-[40px] border-none bg-transparent sm:hidden'
        radius={150}
        duration={16}
        delay={14}
      >
        <Image src={reactDarkIcon} alt='React' />
      </OrbitingCircles>
      <OrbitingCircles
        className='block h-[40px] w-[40px] border-none bg-transparent sm:hidden'
        radius={150}
        duration={16}
        delay={16}
      >
        <Image src={magicUiIcon} alt='Magic UI' />
      </OrbitingCircles>

      {/* 100 Circles */}
      <OrbitingCircles
        className='hidden border-none bg-transparent sm:block sm:h-[50px] sm:w-[50px]'
        radius={280}
        duration={16}
        delay={2}
      >
        <Image src={nextIcon} alt='Next Js' />
      </OrbitingCircles>
      <OrbitingCircles
        className='hidden border-none bg-transparent sm:block sm:h-[50px] sm:w-[50px]'
        radius={280}
        duration={16}
        delay={4}
      >
        <Image className='rounded-full' src={drizzleIcon} alt='Drizzle ORM' />
      </OrbitingCircles>
      <OrbitingCircles
        className='hidden border-none bg-transparent sm:block sm:h-[50px] sm:w-[50px]'
        radius={280}
        duration={16}
        delay={6}
      >
        <Image className='rounded-full' src={resendIcon} alt='Resend' />
      </OrbitingCircles>

      <OrbitingCircles
        className='hidden border-none bg-transparent sm:block sm:h-[50px] sm:w-[50px]'
        radius={280}
        duration={16}
        delay={8}
      >
        <Image src={authJsIcon} alt='Auth Js' />
      </OrbitingCircles>
      <OrbitingCircles
        className='hidden border-none bg-transparent sm:block sm:h-[50px] sm:w-[50px]'
        radius={280}
        duration={16}
        delay={10}
      >
        <Image className='rounded-full' src={tursoIcon} alt='Turso' />
      </OrbitingCircles>
      <OrbitingCircles
        className='hidden border-none bg-transparent sm:block sm:h-[50px] sm:w-[50px]'
        radius={280}
        duration={16}
        delay={12}
      >
        <Image src={vercelIcon} alt='Vercel' />
      </OrbitingCircles>
      <OrbitingCircles
        className='hidden border-none bg-transparent sm:block sm:h-[50px] sm:w-[50px]'
        radius={280}
        duration={16}
        delay={14}
      >
        <Image src={reactDarkIcon} alt='React' />
      </OrbitingCircles>
      <OrbitingCircles
        className='hidden border-none bg-transparent sm:block sm:h-[50px] sm:w-[50px]'
        radius={280}
        duration={16}
        delay={16}
      >
        <Image src={magicUiIcon} alt='Magic UI' />
      </OrbitingCircles>
    </div>
  );
}
