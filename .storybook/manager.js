import { addons } from "@storybook/addons";
import { themes } from "@storybook/theming";
import hrDesignsystemDark from "./HRDesignsystemDark";
import hrDesignsystemLight from "./HRDesignsystemLight";

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: "bottom",
  enableShortcuts: true,
  isToolshown: true,
  theme: hrDesignsystemLight,
  selectedPanel: undefined,
  initialActive: "sidebar",
  sidebar: {
    showRoots: false,
    collapsedRoots: ["other"],
  },
});
