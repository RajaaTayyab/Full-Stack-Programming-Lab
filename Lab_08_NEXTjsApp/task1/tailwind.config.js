/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#020617',
        surface: '#0f172a',
        border: '#1e293b',
        accent: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
          dark: '#b45309',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}