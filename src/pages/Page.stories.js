import { createPage } from "./Page";
import * as HeaderStories from "../stories/Header.stories";

export default {
  title: "Seiten/Page",
  argTypes: {
    onLogin: { action: "onLogin" },
    onLogout: { action: "onLogout" },
    onCreateAccount: { action: "onCreateAccount" },
  },
};

const Template = (args) => createPage(args);

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
