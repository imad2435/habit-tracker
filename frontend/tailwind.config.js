/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lexend', 'sans-serif'],
      },
      colors: {
        'brand-dark': '#0A192F',
        'brand-light': '#CCD6F6',
        'brand-mint': '#64FFDA',
        'brand-amber': '#FFC064',
        'brand-slate': '#8892B0',
      },
    },
  },
  plugins: [],
}