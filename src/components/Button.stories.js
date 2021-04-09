import { createButton } from "./Button";
import button from "./Button.hbs";

export default {
  title: "Komponenten/Button",
  argTypes: {
    label: { control: "text" },
    primary: { control: "boolean" },
    backgroundColor: { control: "color" },
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
  books: [
    { title: "A book", synopsis: "With a description" },
    { title: "Another book", synopsis: "From a very good author" },
    { title: "Book without synopsis" },
  ],
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
