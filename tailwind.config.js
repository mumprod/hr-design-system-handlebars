const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    content: ["./src/**/*.hbs"],
    options: {
      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    },
  },
  theme: {
    letterSpacing: {
      tighter: '-.025em',
      tight: '-.0125em',
      normal: '0',
      wide: '.0125em',
      wider: '.025em',
      widest: '.05em',

    },
    extend: {
      fontFamily: {
        copy:         ["DIN", "sans-serif"],
        headingSerif: ["RobotoSlab", "serif"],
        heading:      ["RobotoCond", "sans-serif"],
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
