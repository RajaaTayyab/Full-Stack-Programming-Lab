/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        wood: {
          50: '#fdf8f3',
          100: '#f9edd9',
          200: '#f0d5aa',
          300: '#e4b87a',
          400: '#d4944a',
          500: '#c47a2e',
          600: '#a86325',
          700: '#8a4d21',
          800: '#6b3b20',
          900: '#4a2a18',
        },
        forest: {
          50: '#f1f5f0',
          100: '#dde8d8',
          200: '#b8d1af',
          300: '#8ab57f',
          400: '#5d9550',
          500: '#3d7533',
          600: '#2e5e27',
          700: '#234820',
          800: '#1a351a',
          900: '#0f2010',
        },
        cream: '#faf7f2',
        charcoal: '#1c1c1c',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-jost)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      fontWeight: {
        500: '500',
        600: '600',
        700: '700',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-in': 'slideIn 0.5s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
