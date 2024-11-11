import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Droid Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        droid: ['Droid Sans', 'sans-serif'],
        swear: ['SwearDisplay', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
