import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsc}'],
  theme: {
    extend: {
      colors: {
        'secondary-vibrant': 'oklch(var(--secondary-vibrant) / <alpha-value>)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          '--secondary-vibrant': '72% 0.1727 3.33',
          '--secondary-vibrant-complementary': '79% 0.168553 163.6889',
        },
      },
      {
        black: {
          ...require('daisyui/src/theming/themes')['black'],
          '--secondary-vibrant': '36% 0.1789 303.81',
          '--secondary-vibrant-complementary': '55% 0.1615 136.56',
        },
      },
    ],
  },
} satisfies Config;
