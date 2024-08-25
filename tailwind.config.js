/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    container: {
      screens: {
        'sm': '375px',
        'md': '768px',
        'lg': '1440px',
      }
    },
    screens: {
      'sm': '375px',
      'md': '768px',
      'lg': '1440px',
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}