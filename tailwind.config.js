/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./snComponents/*.{html,js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      gridTemplateColumns: {
        // Ensure you haven't overwritten default values
        7: 'repeat(7, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}

