/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: '#C8F0DC',
        lavender: '#E0D4F7',
        peach: '#FFD9C0',
        butter: '#FFF3B0',
        babyblue: '#C5E8F7',
        rose: '#FFD6E0',
      },
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
        patrick: ['Patrick Hand', 'cursive'],
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
