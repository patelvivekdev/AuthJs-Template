import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';
import { Rubik } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export const metadata: Metadata = {
  title: 'AuthJs Template',
  description: 'A starter authentication template for Next.js',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'mx-auto h-screen bg-neutral-100 dark:bg-neutral-900',
          inter.variable,
          rubik.variable,
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
          <Toaster />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
