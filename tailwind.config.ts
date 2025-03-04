import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/global.css',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'Arial', 'Helvetica', 'sans-serif'],
        sans: ['Pretendard', 'Arial', 'Helvetica', 'sans-serif'], // 기본 sans 설정 변경
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gray: {
          900: '#191B1E',
          800: '#2E3032',
          700: '#41454A',
          600: '#747A83',
          500: '#9099A5',
          400: '#B5C1D2',
          300: '#D7DFEA',
          200: '#EDF2F8',
          100: '#F1F5FA',
        },
      },
    },
  },
  plugins: [],
};

export default config;
