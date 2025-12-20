/** This tells tailwindcss to scan all files in src/ folder for class names
 * @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Goorgia', 'Serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fef7ed',
          100: '#fdecd3',
          200: '#f9d5a7',
          300: '#f5b870',
          400: '#f09337',
          500: '#ec7912',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      }
    },
  },
  plugins: [],
}