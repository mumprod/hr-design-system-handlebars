const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors')

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
    maxWidth: {
      '1/4': '25%',
      '1/3': '33.33333333%',
      '1/2': '50%',
      '2/3': '66.66666666%',
      '3/4': '75%',
      '1/1': '100%',
     },
    extend: {
      fontFamily: {
        copy:         ["DIN", "sans-serif"],
        headingSerif: ["RobotoSlab", "serif"],
        heading:      ["RobotoCond", "sans-serif"],
      },
      colors: {
        blue: {
          science: '#006dc1'
        }, 
        black: {
          DEFAULT:'#000000'
        },
        red: {
          thunderbird: '#cc1a14'
        },
        labelMedia: 'var(--color-label-media)',
        labelEvent: 'var(--color-label-event)',
        labelBreakingnews: 'var(--color-label-breakingnews)'      
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
