import button from "./Button.hbs";
const colors = require("../../../../tailwind.config");

export default {
  title: "Komponenten-Beispiele/Button",
  argTypes: {
    label: { control: "text" },
    size: {
      control: { type: "select", options: ["sm", "ms", "lg", "xl"] },
    },
    type: { control: { type: "select", options: ["primary", "secondary"] } },
    onClick: { action: "onClick" },
  },
};

const Template = ({ label, ...args }) => {
  // You can either use a function to create DOM elements or use a plain html string!
  // return `<div>${label}</div>`;
  console.log(colors);
  return button({ label, ...args });
};

export const Primary = Template.bind({});
Primary.args = {
  label: "Button",
};

Primary.parameters = {
  docs: {
    source: {
      code: `
<Button class="storybook-button storybook-button--primary">Button</button>
        `,
    },
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: "secondary",
  label: "Button",
};

export const XLarge = Template.bind({});
XLarge.args = {
  size: "xl",
  label: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "lg",
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "sm",
  label: "Button",
};
