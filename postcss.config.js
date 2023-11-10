module.exports = {
    plugins: {
        'postcss-nested':{},
        'postcss-import': {},    
        'postcss-preset-env': {
            features: { 'focus-visible-pseudo-class': false },
        },
        'tailwindcss/nesting':{},
        'tailwindcss': {}
    },
}
