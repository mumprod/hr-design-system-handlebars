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
    let partial = handlebars.partials[name]
    if (typeof partial === 'string') {
        partial = handlebars.compile(partial)
        handlebars.partials[name] = partial
    }

    return partial
}

// Register partials
for (const [key, partial] of Object.entries(partials)) {
    handlebars.registerPartial(key.substring(0, key.length - 4), partial)
}

// Register extra helpers
const register = require('./helpers/handlebar-helpers').register
register(handlebars, {
    partialsDir: options.partialsDir,
})

/**
 * Handlebars runtime with custom helpers.
 * Used by handlebars-loader.
 */
module.exports = handlebars
