const { src, dest, series } = require('gulp')
const mergeStream = require('merge-stream')
const glob = require('glob')
const svgStore = require('gulp-svgstore')
const svgMin = require('gulp-svgmin')
const path = require('path')

// css file paths
const iconsDirRoot = 'src/assets/icons'

function svgMap() {
    return mergeStream(
        glob.sync(`${iconsDirRoot}/*`).map(function (iconsDir) {
            console.log(iconsDir)
            let icon = path.basename(iconsDir)
            return src(`${iconsDir}/svgmap/*.svg`)
                .pipe(svgMin())
                .pipe(svgStore())
                .pipe(dest(`${iconsDirRoot}/${icon}`))
        })
    )
}

exports.default = series(svgMap)
