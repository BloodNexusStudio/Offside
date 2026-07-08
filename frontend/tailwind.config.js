/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'offside-black': '#000000',
        'offside-white': '#ffffff',
        'offside-gray': '#f3f4f6', // Light gray for sections/cards
        'offside-darkgray': '#111111', // Very dark for footer/blocks
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
}