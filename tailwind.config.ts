import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    theme: {
      extend: {
        keyframes: {
          'caret-blink': {
            '0%,70%,100%': { opacity: '1' },
            '20%,50%': { opacity: '0' },
          },
        },
        animation: {
          'caret-blink': 'caret-blink 1.25s ease-out infinite',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
