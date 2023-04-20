import remarkGfm from 'remark-gfm'
const path = require('path')
const fs = require('fs')
const FlatContextPlugin = require('../build/webpack/feature-loader/plugin/FlatContextPlugin')
const config = {
    staticDirs: ['../src/assets', '../src/assets/js'],
    stories: [
        '../src/stories/Introduction.mdx',
        '../src/**/*.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        {
            name: '@storybook/addon-essentials',
            options: {
                docs: false,
            },
        },
        '@storybook/addon-a11y',
        {
            name: '@storybook/addon-styling',
            options: {
                postCss: {
                    implementation: require('postcss'),
                },
            },
        },
        {
            name: '@storybook/addon-docs',
            options: {
                mdxPluginOptions: {
                    mdxCompileOptions: {
                        remarkPlugins: [remarkGfm],
                    },
                },
            },
        },
    ],
    webpackFinal: async (config, { configType }) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.
        // Make whatever fine-grained changes you need
        config.resolve.alias = {
            ...config.resolve.alias,
            scripts: path.resolve(__dirname, '../scripts'),
            handlebars$: path.resolve(__dirname, '../node_modules/handlebars/dist/handlebars.js'),
            hrHandlebars$: path.resolve(__dirname, '../build/handlebars/handlebars.js'),
            handlebarPartials$: path.resolve(
                __dirname,
                '../build/handlebars/partials/handlebar-partials.js'
            ),
            handlebarHelpers$: path.resolve(
                __dirname,
                '../build/handlebars/helpers/handlebar-helpers.js'
            ),
            components: path.resolve(__dirname, '../src/stories/views/components'),
            base: path.resolve(__dirname, '../src/stories/views/base'),
            tailwind$: path.resolve(__dirname, '../src/assets/tailwind.css'),
            tailwindConfig$: path.resolve(__dirname, '../tailwind.config.js'),
            hrQuery$: path.resolve(__dirname, '../src/stories/views/generic/hrQuery.subfeature.js'),
            initializer$: path.resolve(
                __dirname,
                '../build/webpack/feature-loader/initializer/initializer.js'
            ),
            loadFeature$: path.resolve(
                __dirname,
                '../build/webpack/feature-loader/initializer/loader.js'
            ),
        }
        config.module.rules.push(
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                //include: path.resolve(__dirname, '../'),

                options: {
                    debug: false,
                    knownHelpers: [
                        'partial',
                        'block',
                        'append',
                        'decorator',
                        'decorator_body',
                        'defaultIfEmpty',
                        'if',
                        'inline-switch',
                        'json',
                        'withParam',
                        'loca',
                        'resourceUrl',
                        'isStorybook',
                        'switch',
                        'case',
                        'default',
                    ],
                    ignoreHelpers: true,
                    ignorePartials: true,
                    runtime: path.resolve(__dirname, '../build/handlebars/handlebars'),
                    precompileOptions: {
                        knownHelpersOnly: false,
                    },
                },
            },
            {
                test: /\.handlebars$/i,
                use: [
                    {
                        loader: 'raw-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
            }
        )
        config.plugins.push(
            new FlatContextPlugin(
                '/feature',
                path.resolve(__dirname, '../src/stories/views/'),
                /\.feature\.js$/
            )
        )

        config.stats = 'verbose'

        // Return the altered config
        return config
    },
    framework: {
        name: '@storybook/html-webpack5',
        options: {},
    },
    docs: {
        autodocs: true,
    },
}
export default config
