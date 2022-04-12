const path = require('path')
const fs = require('fs')
const FlatContextPlugin = require('../build/webpack/feature-loader/plugin/FlatContextPlugin')

module.exports = {
    staticDirs: ['../src/assets'],
    stories: [
        '../src/stories/Introduction.stories.mdx',
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                },
            },
        },
        '@whitespace/storybook-addon-html',
        '@storybook/addon-a11y',
        'storybook-conditional-toolbar-selector',
    ],

    webpackFinal: async (config, { configType }) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.

        // Make whatever fine-grained changes you need
        config.resolve.alias = {
            ...config.resolve.alias,
            scripts: path.resolve(__dirname, '../scripts'),
            components: path.resolve(__dirname, '../src/stories/views/components'),
            tailwind$: path.resolve(__dirname, '../src/assets/tailwind.css'),
            hrQueryNew$: path.resolve(
                __dirname,
                '../src/stories/views/components/generic/hrQueryNew.js'
            ),
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
                test: /\.handlebars|hbs$/,
                loader: 'handlebars-loader',
                include: path.resolve(__dirname, '../'),
                options: {
                    helperDirs: [path.resolve(__dirname, '../build/helpers')],
                    partialDirs: [path.resolve(__dirname, '../src/stories/views')],
                },
            },
            {
                test: /\,css&/,
                use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [require('tailwindcss'), require('autoprefixer')],
                        },
                    },
                ],
                include: path.resolve(__dirname, '../'),
            }
        )

        config.plugins.push(
            new FlatContextPlugin(
                '/feature',
                path.resolve(__dirname, '../src/stories/views/'),
                /\.feature\.js$/
            ),
            {
                apply: (compiler) => {
                    compiler.hooks.afterCompile.tap('UpdateTailwindPlugin', (compilation) => {
                        if (
                            undefined != compilation.compiler.watchFileSystem &&
                            Object.keys(compilation.compiler.watchFileSystem.watcher.mtimes)
                                .length > 0
                        ) {
                            if (
                                !Object.keys(
                                    compilation.compiler.watchFileSystem.watcher.mtimes
                                ).some((value) => value.includes('tailwind.css'))
                            ) {
                                fs.readFile(
                                    path.resolve(__dirname, '../src/assets/tailwind.css'),
                                    'utf8',
                                    (err, data) => {
                                        if (err) {
                                            console.error(err)
                                            return
                                        }
                                        fs.writeFile(
                                            path.resolve(__dirname, '../src/assets/tailwind.css'),
                                            data,
                                            (err) => {
                                                if (err) {
                                                    console.error(err)
                                                    return
                                                }
                                                //file written successfully
                                            }
                                        )
                                    }
                                )
                            }
                        }
                    })
                },
            }
        )

        config.stats = 'verbose'

        // Return the altered config
        return config
    },
}
