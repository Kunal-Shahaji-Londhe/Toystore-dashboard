/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#80bcbd',
        tertiaryColor: '#92C7CF',
        textColor: '#0C0C0C', // Replace with your custom color code
      },
    },
  },
  plugins: [],
}

