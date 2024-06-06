module.exports = {
    plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        'tailwindcss': {},
        'postcss-preset-env': {
            features: { 'focus-visible-pseudo-class': false },
        },
    },
}
