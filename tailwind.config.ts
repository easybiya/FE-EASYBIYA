import type { Config } from 'tailwindcss';
import * as tailwindAnimate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
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
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        violet: {
          '100': '#EDE7F6',
          '200': '#D1C4E9',
          '300': '#B39DDB',
          '400': '#7E57C2',
          '500': '#5E35B1',
          '600': '#4527A0',
          '700': '#311B92',
          '800': '#240D63',
          '900': '#1E0E4B',
        },
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
        red: {
          '100': '#FFEBEE',
          '400': '#EF9A9A',
          '500': '#EF5350',
          '600': '#E53935',
          '900': '#600000',
        },
        green: {
          '100': '#E8F5E9',
          '400': '#81C784',
          '500': '#4CAF50',
          '600': '#43A047',
          '900': '#003300',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default config;
