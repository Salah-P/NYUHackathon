/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Outfit", "Inter", "Poppins", ...fontFamily.sans],
      },
      colors: {
        "poolara-blue": "#007BFF",
        "blue-bright": "#00C6FF",
        "poolara-gold": "#FFD700",
        "gold-dark": "#FFB300",
        "gold-hover": "#FFC107",
        "gold-hov-dark": "#FF9800",
        "card-dark": "#1E1E2F",
        navy: '#151627',
        white: '#FFFFFF',
        black: '#000000',
      },
      backgroundImage: {
        'gradient-poolara-blue': 'linear-gradient(90deg, #007BFF 0%, #00C6FF 100%)',
        'gradient-poolara-gold': 'linear-gradient(90deg, #FFD700 0%, #FFB300 100%)',
        'gradient-poolara-gold-hover': 'linear-gradient(90deg, #FFC107 0%, #FF9800 100%)',
      },
      letterSpacing: {
        wider: '0.05em',
        wide: '0.03em',
      },
      borderRadius: {
        fullpill: "1.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

