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

const iconFoldersToCleanUp = ['icons', 'logo']
const svgmapFilename = 'svgmap.min.svg'

function svgMap() {
    return mergeStream(
        glob.sync(`${iconsDirRoot}/*`).map(function (iconsDir) {
            let icon = path.basename(iconsDir)
            return src(`${iconsDir}/svgmap/*.svg`)
                .pipe(
                    svgMin({
                        plugins: [
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

exports.default = series(svgMap)
