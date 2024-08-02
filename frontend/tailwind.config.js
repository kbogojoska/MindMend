/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/Home.{js,ts,jsx,tsx,mdx}",
    "./src/components/HabitDisclosures/*.{js,ts,jsx,tsx,mdx}",
    "./src/css/Home.{js,ts,jsx,tsx,mdx,css}"
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
  corePlugins: {
    preflight: false,
  }
}
