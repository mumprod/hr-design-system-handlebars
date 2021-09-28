const defaultTheme = require("tailwindcss/defaultTheme");
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;

module.exports = {
  mode: 'jit',
  purge: {
    content: ["./src/**/*.hbs"],
    options: {
      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    },
  },
  theme: {
    letterSpacing: {
      tighter: "-.025em",
      tight: "-.0125em",
      normal: "0",
      wide: ".0125em",
      wider: ".025em",
      widest: ".05em",
    },
    extend: {
      right: {
        '80' : '80%'
      },
      zIndex: {
        '0':'0',
        '50':'50',
        '101':'101',
        '102':'102'
      },
      maxWidth: {
        "1/4": "25%",
        "1/3": "33.33333333%",
        "1/2": "50%",
        "2/3": "66.66666666%",
        "3/4": "75%",
        "1/1": "100%",
      },
      fontFamily: {
        copy: ["DIN", "sans-serif"],
        headingSerif: ["RobotoSlab", "serif"],
        heading: ["RobotoCond", "sans-serif"],
      },
      colors: {
        blue: {
          jellyBean: "#276b9e",
          pacificBlue: "#009bc6",
          science: "#006dc1",
          congress: "#005293",
          deepCerulean: "#006eb7", 
        },
        black: {
          DEFAULT: "#000000",
        },
        red: {
          thunderbird: "#cc1a14",
          monza: "#c20016",
        },
        pink: {
          ripeRaspberries: "#be005a",
          rose: "#e5007d",
        },
        orange: {
          terraX: "#bb4827",
          spicyCarrot: "#d34600",
        },
        teal: {
          deeperPool: "#097d8e",
        },
        grey: {
          scorpion: "#606060",
        },
        labelMedia: "var(--color-label-media)",
        labelEvent: "var(--color-label-event)",
        labelBreakingnews: "var(--color-label-breakingnews)",
        labelComment: "var(--color-label-comment)",
        labelInfografik: "var(--color-label-infografik)",
        labelProgram: "var(--color-label-program)",
        labelDownload: "var(--color-label-download)",
        labelPm: "var(--color-label-pm)",
        labelLive: "var(--color-label-live)",
      },
    },
  },
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {
      margin: ["important"],
      borderWidth: ['first','last'],
      padding: ['first'],
      backgroundColor: ['active']
    },
  },
  plugins: [
    require("tailwindcss-important")(),
    
    // plugin to separate border colors, found here: https://github.com/tailwindlabs/tailwindcss/pull/560
    ({ addUtilities, e, theme, variants }) => {
      const colors = flattenColorPalette(theme('borderColor'));
      delete colors['default'];

      const colorMap = Object.keys(colors)
        .map(color => ({
          [`.border-t-${color}`]: {borderTopColor: colors[color]},
          [`.border-r-${color}`]: {borderRightColor: colors[color]},
          [`.border-b-${color}`]: {borderBottomColor: colors[color]},
          [`.border-l-${color}`]: {borderLeftColor: colors[color]},
        }));
      const utilities = Object.assign({}, ...colorMap);

      addUtilities(utilities, variants('borderColor'));
    },
  ],
};
