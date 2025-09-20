// tailwind.config.cjs
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2F855A',  // deep green
        accent: '#F97316'    // orange
      }
    }
  },
  plugins: []
}
