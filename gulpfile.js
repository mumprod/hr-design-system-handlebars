const { src, dest, series, parallel, watch } = require('gulp')
const debug = require('gulp-debug')
const replace = require('gulp-replace')
const fs = require('fs')
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
const mergeJson = require('gulp-merge-json')
const filter = require('gulp-filter')
const FileCache = require('gulp-file-cache')

const options = require('./config.js')

// css file paths
const iconsDirRoot = 'src/assets/icons'
const brandDirRoot = 'src/assets/brand'

const iconFoldersToCleanUp = ['icons', 'logo']
const svgmapFilename = 'svgmap.min.svg'

const svgMapsCache = new FileCache(`${options.paths.build.gulp}/cache/.svgMapsCache`)
function createSvgMaps() {
    return mergeStream(
        glob.sync(`${iconsDirRoot}/*`).map(function (iconsDir) {
            let icon = path.basename(iconsDir)
            return src(`${iconsDir}/svgmap/*.svg`)
                .pipe(svgMapsCache.filter())
                .pipe(svgMapsCache.cache())
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

const svgMapsForBrandsCache = new FileCache(
    `${options.paths.build.gulp}/cache/.svgMapsForBrandsCache`
)
function createSvgMapsForBrands() {
    return mergeStream(
        glob.sync(`${brandDirRoot}/*`).map(function (brandDir) {
            return glob.sync(`${brandDir}/icons/*`).map(function (iconsDir) {
                let icon = path.basename(iconsDir)
                return src(`${iconsDir}/svgmap/*.svg`)
                    .pipe(svgMapsForBrandsCache.filter())
                    .pipe(svgMapsForBrandsCache.cache())
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
                                //$('svg > symbol').attr('preserveAspectRatio', 'xMidYMid meet')
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

const svgLogoFilesCache = new FileCache(`${options.paths.build.gulp}/cache/.svgLogoFilesCache`)
function saveLogoFilesToFolder() {
    return mergeStream(
        glob.sync(`${iconsDirRoot}/*`).map(function (iconsDir) {
            return src(`${iconsDir}/*.src.svg`)
                .pipe(svgLogoFilesCache.filter())
                .pipe(svgLogoFilesCache.cache())
                .pipe(dest(`${iconsDir}`))    
        })    
    )
}

const svgSrcFileCache = new FileCache(`${options.paths.build.gulp}/cache/.svgSrcFileCache`)
function minimizeSvgSrcFiles() {
    return mergeStream(
        glob.sync(`${iconsDirRoot}/*`).map(function (iconsDir) {
            return src(`${iconsDir}/*.src.svg`)
                .pipe(svgSrcFileCache.filter())
                .pipe(svgSrcFileCache.cache())
                .pipe(
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
                    })
                )
                .pipe(
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

const fixturesFileCache = new FileCache(`${options.paths.build.gulp}/cache/.fixturesCache`)
function parseJson() {
    return src([
        `${options.paths.assets.fixtures}/**/*.inc.json`,
        `${options.paths.assets.fixtures}/**/*.json`,
    ])
        .pipe(fixturesFileCache.filter())
        .pipe(fixturesFileCache.cache())
        .pipe(
            filter((file) => {
                let pathsOfTransformableJsons = glob.sync(
                    `${options.paths.assets.fixtures}/**/!(*.inc).json`,
                    { absolute: true }
                )
                let regex = new RegExp('.*inc.json')
                let excludeFile = regex.test(file.path)
                if (excludeFile) {
                    let cacheKeys = Object.keys(fixturesFileCache._cache)
                    if (
                        pathsOfTransformableJsons.length > 0 &&
                        cacheKeys.includes(pathsOfTransformableJsons[0].replaceAll('/', '\\'))
                    ) {
                        pathsOfTransformableJsons.forEach((path) => {
                            delete fixturesFileCache._cache[path.replaceAll('/', '\\')]
                        })
                    }
                }
                return !excludeFile
            })
        )
        .pipe(
            jsonTransform(function (data, file) {
                //log(`JSONTRansform for ${file.path}`)
                const jsonWithIncludes = JSONIncluder.parse(JSON.stringify(data))
                return jsonWithIncludes
            })
        )
        .pipe(
            rename(function (path) {
                return {
                    dirname: `${path.dirname}/fixtures`,
                    basename: path.basename,
                    extname: path.extname,
                }
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
    watch(`${options.paths.assets.icons}/**/*.src.svg`, minimizeSvgSrcFiles)
    watch(
        `${options.paths.build.modernizr}/**/*.{js,json}`,
        series(createModernizr, addCustomModernizrTests)
    )
    watch(`${options.paths.assets.brand}/**/locatags.json`, mergeLocatags)
}

async function convertPartialsToJs() {
    src(`${options.paths.assets.views}/**/*.hbs`)
        .pipe(replace(/(_[0-9a-zA-Z_]+)-adjust_context/g, '$1'))
        .pipe(replace(/(\\")/g, '\\$1')) // replace occurences of \" by \\" to make sure that " are correctly rendered in json strings
        .pipe(htmlToJs({ concat: 'handlebar-partials.js' }))
        .pipe(dest(options.paths.dist.handlebarPartials))
}

async function preparePartialsForDelivery() {
    src(`${options.paths.assets.components}/**/*.hbs`)
        .pipe(replace(/(_[0-9a-zA-Z_]+)-adjust_context/g, '../../$1-adjust_context'))
        .pipe(dest(options.paths.dist.dist_components))
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

function mergeLocatags() {
    const defaultLocaTags = JSON.parse(
        fs.readFileSync(`${options.paths.assets.brand}/_default/conf/locatags.json`, 'UTF-8')
    )
    return mergeStream(
        glob
            .sync(`${options.paths.assets.brand}/*`, {
                ignore: ['**/_default/**'],
            })
            .map(function (brandDir) {
                return src(`${brandDir}/conf/locatags.json`)
                    .pipe(
                        mergeJson({
                            fileName: `locatags.merged.json`,
                            startObj: defaultLocaTags,
                        })
                    )
                    .pipe(dest(`${brandDir}/conf`))
            })
    )
}

exports.default = series(
    parallel(
        saveLogoFilesToFolder,
        createSvgMaps,
        createSvgMapsForBrands,
        minimizeSvgSrcFiles,
        parseJson,
        convertPartialsToJs,
        mergeLocatags,
        series(createModernizr, addCustomModernizrTests)
    ),
    watchFiles
)
exports.optimizeSvgs = parallel(createSvgMaps, createSvgMapsForBrands, minimizeSvgSrcFiles)
exports.parseJson = series(parseJson, watchForChanges)
exports.createModernizrConfig = series(createModernizr, addCustomModernizrTests)
exports.mergeLocatags = mergeLocatags
exports.convertPartialsToJs = convertPartialsToJs
exports.preparePartialsForDelivery = preparePartialsForDelivery
exports.saveLogoFilesToFolder = saveLogoFilesToFolder