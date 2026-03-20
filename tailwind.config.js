/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FFFFFF',
        gold: '#D4AF37',
        'gold-deep': '#C9A227',
        ink: '#111111',
        sky: '#6EC6FF',
        azure: '#2F80ED',
        coral: '#FF6B6B',
        ruby: '#D7263D',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        halo: '0 30px 80px rgba(47, 128, 237, 0.18)',
        gold: '0 20px 60px rgba(212, 175, 55, 0.18)',
      },
      backgroundImage: {
        'editorial-mesh':
          'radial-gradient(circle at top left, rgba(110,198,255,0.18), transparent 32%), radial-gradient(circle at bottom right, rgba(215,38,61,0.16), transparent 28%), linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.72))',
      },
      animation: {
        float: 'float 9s ease-in-out infinite',
        shimmer: 'shimmer 7s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
    },
  },
  plugins: [],
};
