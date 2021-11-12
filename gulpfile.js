const { src, dest, series } = require('gulp')
const mergeStream = require('merge-stream')
const glob = require('glob')
const svgStore = require('gulp-svgstore')
const svgMin = require('gulp-svgmin')
const path = require('path')
const cheerio = require('gulp-cheerio')
const rename = require('gulp-rename')

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
                        plugins: [
                            {
                                name: 'removeAttrs',
                                params: {
                                    attrs: 'transform',
                                },
                            },
                            {
                                name: 'removeViewBox',
                                active: false,
                            },
                            {
                                name: 'inlineStyles',
                                active: false,
                            },
                            {
                                name: 'removeUnknownsAndDefaults',
                                active: false,
                            },
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
                            plugins: [
                                {
                                    name: 'removeAttrs',
                                    params: {
                                        attrs: 'transform',
                                    },
                                },
                                {
                                    name: 'removeViewBox',
                                    active: false,
                                },
                                {
                                    name: 'inlineStyles',
                                    active: false,
                                },
                                {
                                    name: 'removeUnknownsAndDefaults',
                                    active: false,
                                },
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
                    svgMin({
                        plugins: [
                            { name: 'convertStyleToAttrs', active: true },
                            {
                                name: 'convertPathData',
                                params: {
                                    straightCurves: false,
                                },
                            },
                            {
                                name: 'convertTransform',
                                params: {
                                    shortScale: false,
                                    floatPrecision: 2,
                                },
                            },
                            { name: 'collapseGroups', active: false },
                            { name: 'cleanupAttrs', active: false },
                            { name: 'cleanupIDs', active: false },
                            { name: 'removeViewBox', active: false },
                        ],
                    })
                )
                .pipe(
                    cheerio({
                        run: function ($, file) {
                            console.log(file.basename)
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
                    })
                )
                .pipe(
                    rename(function (path) {
                        return {
                            dirname: path.dirname,
                            basename: path.basename.replace('src', 'min'),
                            extname: path.extname,
                        }
                    })
                )
                .pipe(dest(`${iconsDir}`))
        })
    )
}

exports.default = series(createSvgMaps, createSvgMapsForBrands, minimizeSvgSrcFiles)
