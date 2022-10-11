const { src, dest, series, parallel, watch } = require('gulp')
const mergeStream = require('merge-stream')
const glob = require('glob')
const svgStore = require('gulp-svgstore')
const svgMin = require('gulp-svgmin')
const path = require('path')
const cheerio = require('gulp-cheerio')
const rename = require('gulp-rename')
const jsonTransform = require('gulp-json-transform')
const JSONIncluder = require('./build/scripts/jsoninclude.js')
const htmlToJs = require('gulp-html-to-js')
const log = require('fancy-log')
const modernizr = require('gulp-modernizr')
const modernizrConfig = require('./build/modernizr/config.json')
const concat = require('gulp-concat')
const gftc = require('gulp-file-transform-cache')

const options = require('./config.js')

// css file paths
const iconsDirRoot = 'src/assets/icons'
const brandDirRoot = 'src/assets/brand'

const iconFoldersToCleanUp = ['icons', 'logo']
const svgmapFilename = 'svgmap.min.svg'

function createSvgMaps() {
    return mergeStream(
        glob.sync(`${iconsDirRoot}/*`).map(function (iconsDir) {
            let icon = path.basename(iconsDir)
            return src(`${iconsDir}/svgmap/*.svg`)
                .pipe(
                    svgMin({
                        multipass: true,
                        full: true,
                        plugins: [
                            {
                                name: 'preset-default',
                                params: {
                                    overrides: {
                                        removeViewBox: false,
                                        removeUnknownsAndDefaults: false,
                                    },
                                },
                            },

                            'convertStyleToAttrs',
                        ],
                    })
                )
                .pipe(svgStore({ inlineSvg: true }))
                .pipe(
                    cheerio({
                        run: function ($, file) {
                            $('svg > symbol').attr('preserveAspectRatio', 'xMidYMid meet')
                            $('[fill]').map(function () {
                                if (
                                    $(this).attr('fill') !== 'currentColor' &&
                                    iconFoldersToCleanUp.includes(icon)
                                ) {
                                    $(this).removeAttr('fill')
                                }
                            })
                            $('[preserve--fill]').map(function () {
                                let value = $(this).attr('preserve--fill')
                                $(this).removeAttr('preserve--fill')
                                $(this).attr('fill', value)
                            })
                            $('[preserve--style]').map(function () {
                                let value = $(this).attr('preserve--style')
                                $(this).removeAttr('preserve--style')
                                $(this).attr('style', value)
                            })
                        },
                        parserOptions: { xmlMode: true },
                    })
                )
                .pipe(rename(svgmapFilename))
                .pipe(dest(`${iconsDirRoot}/${icon}`))
        })
    )
}

function createSvgMapsForBrands() {
    return mergeStream(
        glob.sync(`${brandDirRoot}/*`).map(function (brandDir) {
            return glob.sync(`${brandDir}/icons/*`).map(function (iconsDir) {
                let icon = path.basename(iconsDir)
                return src(`${iconsDir}/svgmap/*.svg`)
                    .pipe(
                        svgMin({
                            full: true,
                            plugins: [
                                {
                                    name: 'preset-default',
                                    params: {
                                        overrides: {
                                            removeViewBox: false,
                                            removeUnknownsAndDefaults: false,
                                        },
                                    },
                                },
                                'convertStyleToAttrs',
                            ],
                        })
                    )
                    .pipe(svgStore({ inlineSvg: true }))
                    .pipe(
                        cheerio({
                            run: function ($, file) {
                                $('svg > symbol').attr('preserveAspectRatio', 'xMidYMid meet')
                                $('[fill]').map(function () {
                                    if (
                                        $(this).attr('fill') !== 'currentColor' &&
                                        iconFoldersToCleanUp.includes(icon)
                                    ) {
                                        $(this).removeAttr('fill')
                                    }
                                })
                                $('[preserve--fill]').map(function () {
                                    let value = $(this).attr('preserve--fill')
                                    $(this).removeAttr('preserve--fill')
                                    $(this).attr('fill', value)
                                })
                                $('[preserve--style]').map(function () {
                                    let value = $(this).attr('preserve--style')
                                    $(this).removeAttr('preserve--style')
                                    $(this).attr('style', value)
                                })
                            },
                            parserOptions: { xmlMode: true },
                        })
                    )
                    .pipe(rename(svgmapFilename))
                    .pipe(dest(iconsDir))
            })
        })
    )
}

function minimizeSvgSrcFiles() {
    return mergeStream(
        glob.sync(`${iconsDirRoot}/*`).map(function (iconsDir) {
            return src(`${iconsDir}/*.src.svg`)
                .pipe(
                    gftc({
                        path: './build/gulp/cache/.minimizeSvgSrcFilesCache',
                        transformStreams: [
                            svgMin({
                                full: true,
                                plugins: [
                                    {
                                        name: 'preset-default',
                                        params: {
                                            overrides: {
                                                removeViewBox: false,
                                                cleanupAttrs: false,
                                                collapseGroups: false,
                                                cleanupIDs: false,
                                                convertPathData: {
                                                    straightCurves: false,
                                                },
                                                convertTransform: {
                                                    shortScale: false,
                                                    floatPrecision: 2,
                                                },
                                            },
                                        },
                                    },
                                    'convertStyleToAttrs',
                                ],
                            }),
                            cheerio({
                                run: function ($, file) {
                                    log(file.basename)
                                    if (
                                        file.dirname.includes('unweather') &&
                                        file.basename === 'regiomap.src.svg'
                                    ) {
                                        $('[fill]').map(function () {
                                            $(this).removeAttr('fill')
                                        })
                                        $('[stroke]').map(function () {
                                            $(this).removeAttr('stroke')
                                        })
                                        $('[stroke-width]').map(function () {
                                            $(this).removeAttr('stroke-width')
                                        })
                                        $('[font-family]').map(function () {
                                            $(this).removeAttr('font-family')
                                        })
                                        $('[display]').map(function () {
                                            $(this).removeAttr('display')
                                        })
                                    } else {
                                        if (file.basename === 'regiomap_regions_cities.src.svg') {
                                            $('[fill]').map(function () {
                                                $(this).removeAttr('fill')
                                            })
                                            $('[font-family]').map(function () {
                                                $(this).removeAttr('font-family')
                                            })
                                            $('[display]').map(function () {
                                                $(this).removeAttr('display')
                                            })
                                        }
                                    }
                                },
                                parserOptions: { xmlMode: true },
                            }),
                            rename(function (path) {
                                return {
                                    dirname: path.dirname,
                                    basename: path.basename.replace('src', 'min'),
                                    extname: path.extname,
                                }
                            }),
                        ],
                    })
                )
                .pipe(dest(`${iconsDir}`))
        })
    )
}

function parseJson() {
    return src([
        `${options.paths.assets.fixtures}/**/*.json`,
        `!${options.paths.assets.fixtures}/**/*.inc.json`,
    ])
        .pipe(
            gftc({
                path: './build/gulp/cache/.fixturesCache',
                transformStreams: [
                    jsonTransform(function (data, file) {
                        const jsonWithIncludes = JSONIncluder.parse(JSON.stringify(data))
                        return jsonWithIncludes
                    }),
                    rename(function (path) {
                        return {
                            dirname: `${path.dirname}/fixtures`,
                            basename: path.basename,
                            extname: path.extname,
                        }
                    }),
                ],
            })
        )
        .pipe(dest(options.paths.dist.components))
}

function watchForChanges() {
    watch(`${options.paths.assets.fixtures}/**/*.json`, series(parseJson))
    log('Watching for Changes..\n')
}

function watchFiles() {
    watch(`${options.paths.assets.fixtures}/**/*.json`, parseJson)
    watch(`${options.paths.assets.views}/**/*.hbs`, convertPartialsToJs)
    watch(
        [`${options.paths.assets.brand}/**/*.svg`, `!${options.paths.assets.brand}/**/*.min.svg`],
        createSvgMapsForBrands
    )
    watch(
        [
            `${options.paths.assets.icons}/**/*.svg`,
            `!${options.paths.assets.icons}/**/*.src.svg`,
            `!${options.paths.assets.icons}/**/*.min.svg`,
        ],
        createSvgMaps
    )
    watch(`${options.paths.assets.icons}/**/*.src.svg`, minimizeSvgSrcFiles),
        watch(
            `${options.paths.build.modernizr}/**/*.{js,json}`,
            series(createModernizr, addCustomModernizrTests)
        )
}

async function convertPartialsToJs() {
    src(`${options.paths.assets.views}/**/*.hbs`)
        .pipe(htmlToJs({ concat: 'handlebar-partials.js' }))
        .pipe(dest(options.paths.dist.handlebarPartials))
}

function createModernizr() {
    return src(`${options.paths.assets.views}/**/*.js`)
        .pipe(modernizr(require('./build/modernizr/config.json')))
        .pipe(dest(`${options.paths.assets.vendor}/modernizr`))
}

function addCustomModernizrTests() {
    return src(['./src/assets/vendor/modernizr/modernizr.js', './build/modernizr/customTests.js'])
        .pipe(concat('modernizr.cust.js'))
        .pipe(dest(`${options.paths.assets.vendor}/modernizr`))
}

exports.default = series(
    parallel(
        createSvgMaps,
        createSvgMapsForBrands,
        minimizeSvgSrcFiles,
        parseJson,
        convertPartialsToJs,
        series(createModernizr, addCustomModernizrTests)
    ),
    watchFiles
)
exports.optimizeSvgs = parallel(createSvgMaps, createSvgMapsForBrands, minimizeSvgSrcFiles)
exports.parseJson = series(parseJson, watchForChanges)
exports.createModernizrConfig = series(createModernizr, addCustomModernizrTests)
exports.convertPartialsToJs = convertPartialsToJs
