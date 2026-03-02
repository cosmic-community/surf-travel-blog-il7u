/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#eef8ff',
          100: '#d9efff',
          200: '#bce3ff',
          300: '#8ed3ff',
          400: '#59b8ff',
          500: '#3399ff',
          600: '#1a7af5',
          700: '#1363e1',
          800: '#1650b6',
          900: '#18458f',
          950: '#142b57',
        },
        sand: {
          50: '#faf8f2',
          100: '#f3efe1',
          200: '#e6ddc2',
          300: '#d5c59b',
          400: '#c4aa74',
          500: '#b8955a',
          600: '#ab804e',
          700: '#8f6542',
          800: '#74523b',
          900: '#604433',
          950: '#33221a',
        },
        coral: {
          50: '#fff4ed',
          100: '#ffe6d5',
          200: '#ffc9a9',
          300: '#ffa373',
          400: '#ff7a45',
          500: '#fe5316',
          600: '#ef380c',
          700: '#c6270c',
          800: '#9d2112',
          900: '#7e1f12',
          950: '#440c07',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}