const path = require("path");
module.exports = {
  stories: [
    "../src/stories/Introduction.stories.mdx",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-postcss",
    "@whitespace/storybook-addon-html",
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push(
      {
        test: /\.handlebars|hbs$/,
        loader: "handlebars-loader",
        include: path.resolve(__dirname, "../"),
        query: {
          helperDirs: [path.resolve(__dirname, "../build/helpers")],
          partialDirs: [path.resolve(__dirname, "../src/components")],
        },
      },
      {
        test: /\,css&/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("tailwindcss"), require("autoprefixer")],
            },
          },
        ],
        include: path.resolve(__dirname, "../"),
      }
    );

    config.stats = "verbose";

    // Return the altered config
    return config;
  },
};
