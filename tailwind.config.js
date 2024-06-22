/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      rotate: {
        '-90': '-90deg',
      },
      colors: {
        primary: {
          100: '#10154B',
          80: '#1f2890',
          60: '#303ed3',
        },
        secondary: {
          200: '#FFCF00',
          100: '#F7D005',
        },
        ghost: {
          100: '#D8D8D8',
        },
      },
    },
  },
  plugins: [],
}
