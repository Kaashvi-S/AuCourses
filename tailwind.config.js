/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#F9F6F0', // warm cream
          secondary: '#EFE9E1', // light beige
          card: '#E5E0D8', // slightly darker beige
        },
        accent: '#7C9082', // sage green
        text: {
          dark: '#2C3639', // charcoal
          medium: '#666666', // medium gray
          light: '#9CA3AF', // light gray
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system',
               'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue',
               'Arial', 'Noto Sans', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};