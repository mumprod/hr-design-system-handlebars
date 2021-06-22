const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
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
        heading: ["RobotoSlab", "serif"],
      },
    },
  },
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {
      margin: ["important"],
    },
  },
  plugins: [require("tailwindcss-important")()],
};
