/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./puck.config.tsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#a5883c',
        secondary: '#f5f5f3',
        green: '#8ab0b1',
      },
      fontFamily: {
        serif: ["serif-regular", "serif"],
        futura: ["futura", "serif"],
      },
    },
  },
  plugins: [],
}