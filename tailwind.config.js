module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        100: "21.875rem",
        104: "23.875rem",
      },
      width: {
        "12/13": "98.7142857%",
      },
      colors: {
        blue: {
          100: "#5996ab",
          200: "#99c9ed",
          300: "#66afe5",
          400: "#3394dc",
          500: "#0079d3",
          600: "#0061a9",
          700: "#00497f",
          800: "#003054",
          900: "#00182a",
        },
        grey: {
          100: "#464646",
          200: "#707070",
          300: "#404040",
        },
      },
      spacing: {
        160: "40rem",
      },
      fontFamily: {
        display: [""],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
