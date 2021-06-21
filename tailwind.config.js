const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  important: "#hr-ds",
  purge: {
    content: ["./src/**/*.hbs"],
    options: {
      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    },
  },
  theme: {
    extend: {
      fontFamily: {
        copy: ["DIN", "sans-serif"],
      },
    },
  },
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  plugins: [],
};
