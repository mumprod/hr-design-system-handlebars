module.exports = {
    plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        'tailwindcss': {},
        'postcss-preset-env': {
            features: { 'nesting-rules': false, 'focus-visible-pseudo-class': false, 'has-pseudo-class': false },
        },
    },
}
