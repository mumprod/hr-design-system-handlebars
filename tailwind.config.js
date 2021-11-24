const defaultTheme = require("tailwindcss/defaultTheme");
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;

module.exports = {
  mode: 'jit',
 
  purge: {
    content: ["./src/**/*.hbs"],
    options: {
      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:./]+/g) || [],
    },
  },
  theme: {
    fill: {
      current: 'currentColor',
      black: '#000000',
      white: '#ffffff'
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

     /*  'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... } */
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.25)',
      none: 'none',
    },
    letterSpacing: {
      tighter: "-.025em",
      tight: "-.0125em",
      normal: "0",
      wide: ".0125em",
      wider: ".025em",
      widest: ".05em",
    },
    extend: {
      fill: {
        black : '#000000'
      },
      borderWidth: {
       '7': '7px'
      },  
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding'
       },
      padding: {
        "1.5": "0.375rem",
        "2.5": "0.625rem",
        "13": "3.25rem"
      },
      right: {
        '80' : '80%'
      },
      zIndex: {
        '0':'0',
        '50':'50',
        '100':'100',
        '101':'101',
        '102':'102',
        '103':'103'
      },
      width: {
        "30": "7.5rem",
        "46": "11.5rem",
        "70": "17.5rem",
        "88": "22rem",
        "92": "23rem"
      },
      maxWidth: {
        "1/4": "25%",
        "1/3": "33.33333333%",
        "1/2": "50%",
        "2/3": "66.66666666%",
        "3/4": "75%",
        "1/1": "100%"
      },
      margin: {
        "13" : "3.125rem"
      },
      inset: {
        "13": "3.375rem",
        "14": "3.5rem",
        "15": "3.75rem",
        "37": "9.125rem",
        "-37": "-9.375rem",
        "38": "9.5rem",
        "42": "10.5rem"
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
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
    extend: {
      margin: ["important"],
      borderWidth: ['responsive','first','last'],
      padding: ['responsive','first','even'],
      backgroundColor: ['active'],
      inset: ['first']
    }
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
