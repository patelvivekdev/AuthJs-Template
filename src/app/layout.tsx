import React from 'react';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Toaster } from 'react-hot-toast';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'mx-auto bg-neutral-100 dark:bg-neutral-900',
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem={true}
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster position='top-right' />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
