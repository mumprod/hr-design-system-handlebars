import "../src/css/index.css";
import { themes } from "@storybook/theming";
import hrDesignsystemDark from "./HRDesignsystemDark";
import hrDesignsystemLight from "./HRDesignsystemLight";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    theme: hrDesignsystemLight,
  },
};
