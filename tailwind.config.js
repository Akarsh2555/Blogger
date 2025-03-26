/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(50px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slidedown: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'zoom-in': 'zoomIn 1s ease-out forwards',
        'bounce-in': 'bounceIn 1.5s ease-out forwards',
        'slide-in': 'slideIn 1s ease-out forwards',
        'slide-down': 'slidedown 1s ease-out forwards',
        "spin-slow": "spin 3s linear infinite",
        "fade-in": "fadeIn 1s ease-in forwards",
        "slide-up": "slideUp 1.5s ease-out forwards",
      },
      transitionDelay: {
        150: "150ms",
        300: "300ms",
        450: "450ms",
        600: "600ms",
        750: "750ms",
        900: "900ms",
        1050: "1050ms",
        1200: "1200ms",
        1350: "1350ms",
        1500: "1500ms",
        1650: "1650ms",
        1800: "1800ms",
        1950: "1950ms",
        2100: "2100ms",
        2250: "2250ms",
        2400: "2400ms",
        2550: "2550ms",
        2700: "2700ms",
        2850: "2850ms",
        3000: "3000ms",
      },
    },
  },
  plugins: [],
};
