import "../src/assets/css/index.css";
import "../src/assets/css/tailwind.css";

import { themes } from "@storybook/theming";
import hrDesignsystemDark from "./HRDesignsystemDark";
import hrDesignsystemLight from "./HRDesignsystemLight";

import hessenschau          from "!!style-loader?injectType=lazyStyleTag!css-loader!postcss-loader?{'postcssOptions': {'plugins': ['tailwindcss', 'autoprefixer']}}!../src/assets/css/tailwind.hessenschau.css";
import hr                   from "!!style-loader?injectType=lazyStyleTag!css-loader!postcss-loader?{'postcssOptions': {'plugins': ['tailwindcss', 'autoprefixer']}}!../src/assets/css/tailwind.hr.css";
import hr1                  from "!!style-loader?injectType=lazyStyleTag!css-loader!postcss-loader?{'postcssOptions': {'plugins': ['tailwindcss', 'autoprefixer']}}!../src/assets/css/tailwind.hr1.css";
import hr2                  from "!!style-loader?injectType=lazyStyleTag!css-loader!postcss-loader?{'postcssOptions': {'plugins': ['tailwindcss', 'autoprefixer']}}!../src/assets/css/tailwind.hr2.css";
import hr3                  from "!!style-loader?injectType=lazyStyleTag!css-loader!postcss-loader?{'postcssOptions': {'plugins': ['tailwindcss', 'autoprefixer']}}!../src/assets/css/tailwind.hr3.css";
import hr4                  from "!!style-loader?injectType=lazyStyleTag!css-loader!postcss-loader?{'postcssOptions': {'plugins': ['tailwindcss', 'autoprefixer']}}!../src/assets/css/tailwind.hr4.css";
import youFm                from "!!style-loader?injectType=lazyStyleTag!css-loader!postcss-loader?{'postcssOptions': {'plugins': ['tailwindcss', 'autoprefixer']}}!../src/assets/css/tailwind.you-fm.css";
import hrBigband            from "!!style-loader?injectType=lazyStyleTag!css-loader!postcss-loader?{'postcssOptions': {'plugins': ['tailwindcss', 'autoprefixer']}}!../src/assets/css/tailwind.hr-bigband.css";
import hrFernsehen          from "!!style-loader?injectType=lazyStyleTag!css-loader!postcss-loader?{'postcssOptions': {'plugins': ['tailwindcss', 'autoprefixer']}}!../src/assets/css/tailwind.hr-fernsehen.css";
import hrInforadio          from "!!style-loader?injectType=lazyStyleTag!css-loader!postcss-loader?{'postcssOptions': {'plugins': ['tailwindcss', 'autoprefixer']}}!../src/assets/css/tailwind.hr-inforadio.css";
import hrRundfunkrat        from "!!style-loader?injectType=lazyStyleTag!css-loader!postcss-loader?{'postcssOptions': {'plugins': ['tailwindcss', 'autoprefixer']}}!../src/assets/css/tailwind.hr-rundfunkrat.css";
import hrSinfonieorchester  from "!!style-loader?injectType=lazyStyleTag!css-loader!postcss-loader?{'postcssOptions': {'plugins': ['tailwindcss', 'autoprefixer']}}!../src/assets/css/tailwind.hr-sinfonieorchester.css";
import hrWerbung            from "!!style-loader?injectType=lazyStyleTag!css-loader!postcss-loader?{'postcssOptions': {'plugins': ['tailwindcss', 'autoprefixer']}}!../src/assets/css/tailwind.hr-werbung.css";


import cssVariablesTheme from "@etchteam/storybook-addon-css-variables-theme";
import postcss from "postcss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    theme: hrDesignsystemLight,
  },
  // Storybook a11y addon configuration
  a11y: {
    // the target DOM element
    element: "#root",
    // sets the execution mode for the addon
    manual: false,
  },
  cssVariables: {
    files: {
      hessenschau,
      hr,
      hr1,
      hr2,
      hr3,
      hr4,
      youFm,
      hrBigband,
      hrFernsehen,
      hrInforadio,
      hrRundfunkrat,
      hrSinfonieorchester,
      hrWerbung, 
    },
  },
};

export const decorators = [
  (Story) => '<div class="max-w-screen-lg mx-auto">' + Story() + "</div>",
  cssVariablesTheme,
];
