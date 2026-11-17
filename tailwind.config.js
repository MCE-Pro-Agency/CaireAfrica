/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E0E0E', // fond principal
        coal: '#161616', // surfaces (cartes, modales)
        ivory: '#F3F1EC', // texte principal
                // Couleurs du logo CAIREAFRICA (accents uniquement)
        brand: { red: '#CD1719', yellow: '#FAB40E', green: '#399336' },
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
