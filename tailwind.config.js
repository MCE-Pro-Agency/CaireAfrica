/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E0E0E', // fond principal
        coal: '#161616', // surfaces (cartes, modales)
        ivory: '#F3F1EC', // texte principal
        // Charte graphique du logo CAIREAFRICA
        'brand-red': '#CD1719',
        'brand-yellow': '#FAB40E',
        'brand-green': '#3A9437',
        'yellow-light': '#FFF4DB', // jaune très clair : header + footer
        // Couleurs utilisées dans Home.jsx
        sand: '#F3ECE0',
        forest: '#17342A',
        clay: '#A8432A',
        char: '#1D1915',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Jost', 'ui-sans-serif', 'system-ui', '-apple-system', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
        fadeUp: 'fadeUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}