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
    <div className='relative flex h-[500px] w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg'>
      <span className='pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10'>
        <SparklesText
          className='text-2xl sm:text-[2rem]'
          text='AuthJs Template'
        />
      </span>

      {/* 100 Circles */}
      <OrbitingCircles
        className='h-[45px] w-[45px] border-none bg-transparent sm:h-[60px] sm:w-[60px]'
        radius={200}
        duration={16}
        delay={2}
        reverse
      >
        <Image src={nextIcon} alt='Next Js' />
      </OrbitingCircles>
      <OrbitingCircles
        className='h-[45px] w-[45px] border-none bg-transparent sm:h-[60px] sm:w-[60px]'
        radius={200}
        duration={16}
        delay={4}
        reverse
      >
        <Image className='rounded-full' src={drizzleIcon} alt='Drizzle ORM' />
      </OrbitingCircles>
      <OrbitingCircles
        className='h-[45px] w-[45px] border-none bg-transparent sm:h-[60px] sm:w-[60px]'
        radius={200}
        duration={16}
        delay={6}
        reverse
      >
        <Image className='rounded-full' src={resendIcon} alt='Resend' />
      </OrbitingCircles>

      <OrbitingCircles
        className='h-[45px] w-[45px] border-none bg-transparent sm:h-[60px] sm:w-[60px]'
        radius={200}
        duration={16}
        delay={8}
        reverse
      >
        <Image src={authJsIcon} alt='Auth Js' />
      </OrbitingCircles>
      <OrbitingCircles
        className='h-[45px] w-[45px] border-none bg-transparent sm:h-[60px] sm:w-[60px]'
        radius={200}
        duration={16}
        delay={10}
        reverse
      >
        <Image className='rounded-full' src={tursoIcon} alt='Turso' />
      </OrbitingCircles>
      <OrbitingCircles
        className='h-[45px] w-[45px] border-none bg-transparent sm:h-[60px] sm:w-[60px]'
        radius={200}
        duration={16}
        delay={12}
        reverse
      >
        <Image src={vercelIcon} alt='Vercel' />
      </OrbitingCircles>
      <OrbitingCircles
        className='h-[45px] w-[45px] border-none bg-transparent sm:h-[60px] sm:w-[60px]'
        radius={200}
        duration={16}
        delay={14}
        reverse
      >
        <Image src={reactDarkIcon} alt='React' />
      </OrbitingCircles>
      <OrbitingCircles
        className='h-[45px] w-[45px] border-none bg-transparent sm:h-[60px] sm:w-[60px]'
        radius={200}
        duration={16}
        delay={16}
        reverse
      >
        <Image src={magicUiIcon} alt='Magic UI' />
      </OrbitingCircles>
    </div>
  );
}
