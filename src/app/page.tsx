import OrbitingCirclesDemo from '@/components/Hero';
import { cn } from '@/lib/utils';
import DotPattern from '@/components/ui/dot-pattern';

export default function Home() {
  return (
    <main className='flex h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-600 to-gray-400 dark:from-[#2e026d] dark:to-[#15162c]'>
      <OrbitingCirclesDemo />
      <DotPattern
        width={40}
        height={40}
        cx={1}
        cy={1}
        cr={2}
        className={cn(
          'fill-current [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]',
        )}
      />
    </main>
  );
}
