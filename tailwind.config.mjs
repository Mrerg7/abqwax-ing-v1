/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f6f4f1',
          100: '#e8e3db',
          800: '#2a2420',
          900: '#1a1614',
          950: '#0d0b0a',
        },
        gold: {
          200: '#ead9b0',
          300: '#dcc48a',
          400: '#c9a75a',
          500: '#b8923f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      letterSpacing: { widestx: '0.24em' },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
