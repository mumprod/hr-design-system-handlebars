// Import Handlebars runtime lib
const handlebars = require('handlebars'),
    partials = require('./partials/handlebar-partials'),
    runtime = require('handlebars/runtime'),
    locatagsHessenschau = require('../../src/assets/brand/hessenschau/conf/locatags.merged.json'),
    locatagsHr = require('../../src/assets/brand/hr/conf/locatags.merged.json'),
    locatagsHrBigband = require('../../src/assets/brand/hr-bigband/conf/locatags.merged.json'),
    locatagsHrFernsehen = require('../../src/assets/brand/hr-fernsehen/conf/locatags.merged.json'),
    locatagsHrInforadio = require('../../src/assets/brand/hr-inforadio/conf/locatags.merged.json'),
    locatagsHrRundfunkrat = require('../../src/assets/brand/hr-rundfunkrat/conf/locatags.merged.json'),
    locatagsHrSinfonieorchester = require('../../src/assets/brand/hr-sinfonieorchester/conf/locatags.merged.json'),
    locatagsHrWerbung = require('../../src/assets/brand/hr-werbung/conf/locatags.merged.json'),
    locatagsHr1 = require('../../src/assets/brand/hr1/conf/locatags.merged.json'),
    locatagsHr2 = require('../../src/assets/brand/hr2/conf/locatags.merged.json'),
    locatagsHr3 = require('../../src/assets/brand/hr3/conf/locatags.merged.json'),
    locatagsHr4 = require('../../src/assets/brand/hr4/conf/locatags.merged.json'),
    locatagsYouFm = require('../../src/assets/brand/you-fm/conf/locatags.merged.json'),
    fs = require('fs'),
    path = require('path'),
    options = {
        extname: '.hbs',
        partialsDir: './src/stories/views',
        partialsBaseDir: './src/stories/views',
        precompile: false,
        writeJson: true,
        locaTags: {
            'hessenschau': locatagsHessenschau,
            'hr': locatagsHr,
            'hr-bigband': locatagsHrBigband,
            'hr-fernsehen': locatagsHrFernsehen,
            'hr-inforadio': locatagsHrInforadio,
            'hr-rundfunkrat': locatagsHrRundfunkrat,
            'hr-sinfonieorchester': locatagsHrSinfonieorchester,
            'hr-werbung': locatagsHrWerbung,
            'hr1': locatagsHr1,
            'hr2': locatagsHr2,
            'hr3': locatagsHr3,
            'hr4': locatagsHr4,
            'you-fm': locatagsYouFm,
        },
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
    locaTags: options.locaTags,
})

/**
 * Handlebars runtime with custom helpers.
 * Used by handlebars-loader.
 */
module.exports = handlebars
