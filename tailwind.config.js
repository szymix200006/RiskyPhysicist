/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 6s linear infinite',
      }
    },
  },
  plugins: [
    function({addUtilities}) {
      addUtilities({
        '.transform-box-fill': {'transform-box': 'fill-box'}
      })
    }
  ],
}

