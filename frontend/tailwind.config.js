/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/css/*.{js,ts,jsx,tsx,mdx,css}",
    "./src/css/**/*.{js,ts,jsx,tsx,mdx,css}"
  ],
  theme: {
    extend: {
      colors: {
        darkBackground: '#1a202c',
        darkPanel: '#2d3748',
        darkText: '#e2e8f0',
        darkBorder: '#4a5568',
        darkHover: '#2b6cb0'
      },
    },
  },
  plugins: [],
}

