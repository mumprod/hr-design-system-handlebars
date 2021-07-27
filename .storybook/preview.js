import "../src/assets/css/index.css";
import "../src/assets/css/tailwind.css";
//import "../src/assets/css/tailwind.hessenschau.css";
import { themes } from "@storybook/theming";
import hrDesignsystemDark from "./HRDesignsystemDark";
import hrDesignsystemLight from "./HRDesignsystemLight";

import hessenschau from '!!style-loader?injectType=lazyStyleTag!css-loader!../src/assets/css/tailwind.hessenschau.css'
import hr3 from '!!style-loader?injectType=lazyStyleTag!css-loader!../src/assets/css/tailwind.hr3.css'

import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme'


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
      hr3,
    }
  }
};

export const decorators = [
  (Story) => (
    '<div class="max-w-screen-lg mx-auto">' + Story() + '</div>'
  ),
  cssVariablesTheme
];
