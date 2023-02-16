/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      sm: ["16px", "19px"],
    },
    colors: {
      sora: "#538EDF",
      nam: "#015397",
      parang: "#1098ED",
      textNavy: "#12396F",
    },
  },
  plugins: [],
};
