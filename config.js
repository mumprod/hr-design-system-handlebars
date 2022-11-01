module.exports = {
    paths: {
        root: './',
        assets: {
            fixtures: 'src/assets/fixtures',
            components: 'src/stories/views/components',
            views: 'src/stories/views',
            brand: 'src/assets/brand',
            icons: 'src/assets/icons',
            js: 'src/assets/js',
            vendor: 'src/assets/vendor',
        },
        build: {
            modernizr: 'build/modernizr',
            gulp: 'build/gulp',
        },
        dist: {
            components: 'src/stories/views/components',
            handlebarPartials: 'build/handlebars/partials',
        },
    },
}
