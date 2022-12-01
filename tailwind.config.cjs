/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#202632",
        secondary: "#313a49",
        accent: "#53ffab",
      },
    },
  },
  plugins: [],
};
