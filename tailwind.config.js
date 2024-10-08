/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["bg-range-vector-icon"],
  theme: {
    extend: {
      backgroundImage: {
        "range-vector-icon": "url('./assets/images/range-vector.svg')",
      },
    },
  },
  plugins: [],
};
