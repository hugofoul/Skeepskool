/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        red: '#E3051B',
        royalBlue: '#002654',
        yellow: '#FABC00',
        white: '#FFFFFF',
        lightGray: '#F4F4F4',
        dark: '#1A1A1A',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
}
