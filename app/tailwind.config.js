module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'grid-lg': '1800px',
        '3xl': '2200px',
      },
    },
    colors: {
      white: '#FFFEFF',
      primary: '#7671F0',
      secondary: '#E85F5C',
      tertiary: '#1E2D2F',
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      header: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
}
