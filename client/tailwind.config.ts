import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsc}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
} satisfies Config;
