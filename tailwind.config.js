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
      tighter: "-.025em",
      tight: "-.0125em",
      normal: "0",
      wide: ".0125em",
      wider: ".025em",
      widest: ".05em",
    },
    extend: {
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
    },
  },
  plugins: [require("tailwindcss-important")()],
};
