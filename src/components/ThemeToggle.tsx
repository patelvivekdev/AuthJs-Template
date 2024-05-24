'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      className='fixed bottom-10 right-4 z-50 rounded-full border-2 border-white bg-black/90 p-3 dark:border-black dark:bg-white/90 md:right-10'
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        stroke='currentColor'
        className='h-4 w-4 text-white dark:text-black'
      >
        {loaded ? (
          resolvedTheme === 'dark' ? (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
            />
          ) : (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
            />
          )
        ) : (
          <></>
        )}
      </svg>
    </button>
  );
}
