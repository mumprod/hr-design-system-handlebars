module.exports = {
    plugins: {
        'postcss-import': {},
        'tailwindcss': {},
        'postcss-preset-env': {
            features: { 'focus-visible-pseudo-class': false },
        },
    },
}
