/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'slate': {
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        'emerald': {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        'yellow': {
          400: '#fbbf24',
        },
        'red': {
          400: '#f87171',
          600: '#dc2626',
        },
        'blue': {
          400: '#60a5fa',
        },
        'cyan': {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        'purple': {
          400: '#c084fc',
        },
        'orange': {
          400: '#fb923c',
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 