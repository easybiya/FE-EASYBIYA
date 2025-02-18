import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        violet: {
          900: '#1E0E4B',
          800: '#240D63',
          700: '#311B92',
          600: '#4527A0',
          500: '#5E35B1',
          400: '#7E57C2',
          300: '#B39DDB',
          200: '#D1C4E9',
          100: '#EDE7F6',
        },
        gray: {
          900: '#121212',
          800: '#1F1F1F',
          700: '#333333',
          600: '#4F4F4F',
          500: '#828282',
          400: '#BDBDBD',
          300: '#E0E0E0',
          200: '#EEEEEE',
          100: '#F5F5F5',
        },
        red: {
          900: '#600000',
          600: '#E53935',
          500: '#EF5350',
          400: '#EF9A9A',
          100: '#FFEBEE',
        },
        green: {
          900: '#003300',
          600: '#43A047',
          500: '#4CAF50',
          400: '#81C784',
          100: '#E8F5E9',
        },
      },
    },
  },
  plugins: [],
};

export default config;
