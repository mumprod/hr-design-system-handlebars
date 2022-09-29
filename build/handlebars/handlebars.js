// Import Handlebars runtime lib
const handlebars = require('handlebars'),
    partials = require('./partials/handlebar-partials'),
    runtime = require('handlebars/runtime'),
    fs = require('fs'),
    path = require('path'),
    options = {
        extname: '.hbs',
        partialsDir: './src/stories/views',
        partialsBaseDir: './src/stories/views',
        precompile: false,
        writeJson: true,
    }

/*
 * Start Template Inheritance Übernommen von
 * https://github.com/wycats/handlebars.js/issues/208
 */
handlebars.loadPartial = function loadPartial(name) {
    partial = partials[`${name}.hbs`]
    if (typeof partial === 'string') {
        console.log(partial)
        compiledPartial = handlebars.compile(partial)
    }

    return compiledPartial
}

const loadFiles = function (dir) {
    var results = [],
        list = null

    if (dir.length <= 0) {
        console.log('loadFiles - no such directory "' + dir + '"')
    }

    list = fs.readdirSync(dir, 'UTF-8')

    dir = replaceTrailingChar(dir, '/')

    list.forEach(function (file) {
        file = dir + '/' + file
        var stat = fs.statSync(file)
        if (stat && stat.isDirectory()) {
            results = results.concat(loadFiles(file))
        } else {
            results.push(file)
        }
    })

    return results
}

const loadFilesFromArray = function (dirArray) {
    var results = []
    console.log(`Test ${dirArray}`)
    dirArray.forEach(function (dir) {
        results = results.concat(loadFiles(dir))
    })

    return results
}

const replaceLeadingChar = function (s, c, r) {
    r = r === undefined ? '' : r
    return r + (s.length >= c.length && s.substring(0, c.length) === c ? s.substring(c.length) : s)
}

const replaceTrailingChar = function (s, c, r) {
    r = r === undefined ? '' : r
    return (
        (s.length >= c.length && s.substring(s.length - c.length) === c
            ? s.substring(0, s.length - c.length)
            : s) + r
    )
}

const register = require('./helpers/handlebar-helpers').register

//const partial = require('../../src/stories/views/components/base/link.hbs')
//console.log(partial)

/*if (undefined === partial) {
    partial = fs.readFileSync(`${options.partialsDir}/components/base/link.hbs`, 'UTF-8')
}
console.log(partial)*/

//setPartial()
//runtime.registerPartial('components/base/link', handlebars.precompile(partial))

/*const partialFiles = loadFiles(options.partialsDir)

for (var k in partialFiles) {
    console.debug('p files: ' + partialFiles[k])

    if (path.extname(partialFiles[k]) === options.extname) {
        var partialName = replaceLeadingChar(
            replaceLeadingChar(
                replaceTrailingChar(partialFiles[k], options.extname),
                options.partialsBaseDir
            ),
            '/'
        )

        var partial = fs.readFileSync(partialFiles[k], 'UTF-8')

        console.debug('register partial: ' + partialName)

        runtime.registerPartial(partialName, handlebars.precompile(partial))
    }
}*/

//console.log(runtime.partials['components/base/link'])

// Register extra helpers
register(handlebars, {
    partialsDir: options.partialsDir,
})

/**
 * Handlebars runtime with custom helpers.
 * Used by handlebars-loader.
 */
module.exports = handlebars
