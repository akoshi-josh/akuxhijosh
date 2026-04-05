/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'fadeUp': 'fadeUp 0.8s forwards',
        'blink': 'blink 0.7s infinite',
        'hexPulse': 'hexPulse 4s ease-in-out infinite',
        'scan': 'scan 3s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'spin-slow-reverse': 'spin 28s linear infinite reverse',
        'pulse-dot': 'pulse-dot 2s infinite',
      },
      fontFamily: {
        mono: ['"Share Tech Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}