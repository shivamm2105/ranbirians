/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          450: '#F7A000',
          550: '#E68A00',
        },
        gold: {
          50: '#FFFDF0',
          100: '#FFF9C4',
          200: '#FFF176',
          300: '#FFEE58',
          400: '#FFEE33',
          500: '#FFD700',
          600: '#FFC107',
          700: '#FFB300',
          800: '#FFA000',
          900: '#FF6F00',
        },
        cinematic: {
          dark: '#080503',
          card: '#120d09',
          glass: 'rgba(25, 18, 12, 0.65)',
          border: 'rgba(245, 158, 11, 0.25)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive', 'sans-serif'],
      },
      animation: {
        'swing-slow': 'swing 4s ease-in-out infinite',
        'swing-medium': 'swing 3s ease-in-out infinite',
        'swing-fast': 'swing 2.2s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        swing: {
          '0%, 100%': { transform: 'rotate(var(--tw-rotate, 0deg))' },
          '50%': { transform: 'rotate(calc(var(--tw-rotate, 0deg) + 3.5deg))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(245, 158, 11, 0.4))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 35px rgba(245, 158, 11, 0.8))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
