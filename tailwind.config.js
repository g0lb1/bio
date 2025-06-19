/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        }
      },
      animation: {
        'breathing': 'breathing 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        breathing: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 20px rgba(192, 132, 252, 0.2)' },
          '50%': { transform: 'scale(1.02)', boxShadow: '0 0 30px rgba(192, 132, 252, 0.4)' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 10px rgba(192, 132, 252, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(192, 132, 252, 0.8)' },
        }
      }
    },
  },
  plugins: [],
} 