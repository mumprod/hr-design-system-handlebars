'use strict'

const fs = require('fs'),
    path = require('path')
let handlebars

var decoratorStack
var randomNumber
var generateRandom = function () {
    var min = Math.ceil(0)
    var max = Math.floor(999)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

var helpers = {
    'helperOptions': null,

    'partial': function (name, options) {
        handlebars.registerPartial(name, options.fn)
    },

    'block': function (name, options) {
        /* Look for partial by name. */
        var partial = handlebars.loadPartial(name) || options.fn

        handlebars.partials[name] = undefined

        return partial(this, {
            data: options.hash,
        })
    },

    /*
     * Mit dem block helper {{#append}} lassen sich inhalte sammeln die später
     * mit dem partial {{>append}} ausgegeben werden können.
     *
     * Usage: Collect: irgendeindatei.hbs {{#append}} <script>
     * console.log("Ausgabe am Ende der Seite"); </script> {{/append}} Disperse:
     * footer.hbs {{>append}}
     *
     * Output: <script> console.log("Ausgabe am Ende der Seite"); </script>
     *
     */
    'append': function (options) {
        // falls append schon vorhanden dieses nutzen
        // wenn nicht -> neuen array anlegen
        var append = handlebars.append || []

        // dem kram im append block ausführen und als string speichern
        append.push(options.fn(options))

        // lokale variable dem globalen zuweisen
        handlebars.append = append

        // PARTIAL anlegen
        // wenn das ausspiel partial für append
        // noch nicht existiert -> anlegen
        if (!handlebars.partials['append']) {
            handlebars.partials['append'] = function () {
                // hbs führt die funktion aus wenn das partial geforder wird
                // da wir ohne parameter arbeiten reicht ein join des string arrays
                return handlebars.append.join('\n')
            }

            console.log('append partial registriert')
        }

        // inhalt des append block helpers löschen
        return ''
    },

    /*
     * Umhüllt den Inhalt des Block Helpers mit einem Partial. Im Partial steht
     * der Inhalt als privates Partial "decorator_body" zu Verfügung.
     *
     * Partial: name-of-partial <div> {{> decorator_body}} </div>
     *
     * Usage: {{#decorator "name-of-partial"}} Der Inhalt verfügbar als Partial
     * "decorator_body" {{/decorator}}
     *
     * Output: <div> Der Inhalt verfügbar als Partial "decorator_body" </div>
     *
     * @see: https://github.com/wycats/handlebars.js/pull/368
     * https://github.com/wycats/handlebars.js/issues/182
     * https://github.com/jknack/handlebars.java/issues/141
     */
    'decorator': function (partialName, options) {
        var context,
            decorator,
            result,
            mergeContext = function (obj) {
                for (var k in obj) context[k] = obj[k]
            }
        if (arguments.length === 2) {
            decorator = handlebars.loadPartial(partialName)

            if (decorator) {
                context = {}
                mergeContext(this)
                mergeContext(options.hash)

                decoratorStack = options.fn

                result = decorator(context, options)

                decoratorStack = undefined

                return result
            } else {
                console.error(
                    'Decorator: A partial with the name "' + partialName + '" doesn\'t exist.\n'
                )
            }
        }

        return options.fn(this)
    },

    'decorator_body': function () {
        console.log('in decorator_body')
        return undefined != decoratorStack ? new handlebars.SafeString(decoratorStack(this)) : ''
    },

    // Adds the possiblity to pass context to a partial
    // This is compatible to Handlebars.java
    //
    // See https://github.com/jknack/handlebars.java/issues/141
    // https://github.com/wycats/handlebars.js/pull/368
    'include': function (name, options) {
        var context = {},
            mergeContext = function (obj) {
                for (var k in obj) context[k] = obj[k]
            }

        mergeContext(this)
        mergeContext(options.hash)

        var partial = handlebars.loadPartial(name)
        if (partial === undefined) {
            console.warn('Include: A partial with the name "' + name + '" doesn\'t exist.')
        }

        return new handlebars.SafeString(partial(context, {}))
    },

    'inlineAsset': function (name, options) {
        var fileName =
            helpers.helperOptions.outputDir +
            '/assets_' +
            helpers.helperOptions.buildVersion +
            '/' +
            name

        console.log('InlineAsset:' + fileName)

        var file = fs.readFileSync(fileName, 'UTF-8')

        if (file === undefined) {
            console.warn('InlineAsset: Asset "' + fileName + '" doesn\'t exist.')
        }

        if (
            helpers.helperOptions.resourceUrl.useRelativeUrls &&
            helpers.helperOptions.resourceUrl.relativePath &&
            !helpers.helperOptions.resourceUrl.useScriptlet
        ) {
            file = file.replace(
                /{{resourceUrl\s\"(assets)(.*)\"\s?}}/g,
                helpers.helperOptions.resourceUrl.relativePath +
                    '$1_' +
                    helpers.helperOptions.buildVersion +
                    '$2'
            )
        }

        return new handlebars.SafeString(file)
    },

    // Register Helpers
    'resourceUrl': function (text, options) {
        var resourceUrl
        // ARD PLAYER Folder
        if (text.includes('assets/vendor/ardplayer/')) {
            resourceUrl = text.replace('assets/', './')
        }
        // VENDOR Folder
        if (text.includes('assets/js/vendor/')) {
            resourceUrl = text.replace('assets/js/vendor', './vendor/js')
        }
        if (text.includes('assets/base/')) {
            if (text.includes('assets/base/icons/logo/') && options.hash['_brand']) {
                resourceUrl = text.replace(
                    'assets/base/icons/logo',
                    `./brand/${options.hash['_brand']}/icons/logo`
                )
            } else {
                if (text.includes('assets/base/icons/rsslogo/') && options.hash['_brand']) {
                    resourceUrl = text.replace(
                        'assets/base/icons/rsslogo',
                        `./brand/${options.hash['_brand']}/icons/rsslogo`
                    )
                } else {
                    resourceUrl = text.replace('assets/base/', './')
                }
            }
        }
        if (text.includes('suche/index.nocache'))
            resourceUrl = text.replace('suche/index.nocache', 'suche/index.nc.html')
        if (text.includes('suche/index~suggest.jsp'))
            resourceUrl = text.replace(
                'suche/index~suggest.jsp',
                'https://hessenschau-dev-red.hr.de/suche/index~suggest.jsp'
            )

        return resourceUrl
    },

    'inline-switch': function (input, cases, values) {
        // console.log(`Test:${input} Cases:${cases} values:${values}`)
        const casesArray = eval(cases)
        const valuesArray = eval(values)
        const defaultValue =
            casesArray.length < valuesArray.length ? valuesArray[valuesArray.length - 1] : ''

        return casesArray.indexOf(input) > -1
            ? valuesArray[casesArray.indexOf(input)]
            : defaultValue
    },

    'json': function (object) {
        return JSON.stringify(object)
    },

    'defaultIfEmpty': function (context, defaultValue) {
        if (context) {
            return context
        } else {
            return defaultValue
        }
    },

    'isStorybook': function () {
        return true
    },

    'if': function (conditional, options) {
        var conditional = arguments[0]
        var options = arguments[1]
        if (undefined !== options && options.fn) {
            // copy of buildin if helper https://github.com/wycats/handlebars.js/blob/7535e48a7969229f44489124a8ef07bd17363f06/lib/handlebars/helpers/if.js

            if (handlebars.Utils.isFunction(conditional)) {
                conditional = conditional.call(this)
            }

            // Default behavior is to render the positive path if the value is truthy and not empty.
            // The `includeZero` option may be set to treat the condtional as purely not empty based on the
            // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
            if (
                (!options.hash.includeZero && !conditional) ||
                handlebars.Utils.isEmpty(conditional)
            ) {
                return options.inverse(this)
            } else {
                return options.fn(this)
            }
        } else {
            // additional inline if helper
            if (handlebars.Utils.isEmpty(arguments[0])) {
                return arguments.length <= 3 ? '' : arguments[2]
            } else {
                return arguments.length <= 4 ? arguments[1] : ''
            }
        }
    },

    'ifCond': function (v1, operator, v2, options) {
        var options = arguments[3]
        switch (operator) {
            case '==':
                return v1 == v2 ? options.fn(this) : options.inverse(this)
            case '===':
                return v1 === v2 ? options.fn(this) : options.inverse(this)
            case '!=':
                return v1 != v2 ? options.fn(this) : options.inverse(this)
            case '!==':
                return v1 !== v2 ? options.fn(this) : options.inverse(this)
            case '<':
                return v1 < v2 ? options.fn(this) : options.inverse(this)
            case '<=':
                return v1 <= v2 ? options.fn(this) : options.inverse(this)
            case '>':
                return v1 > v2 ? options.fn(this) : options.inverse(this)
            case '>=':
                return v1 >= v2 ? options.fn(this) : options.inverse(this)
            case '&&':
                return v1 && v2 ? options.fn(this) : options.inverse(this)
            case '||':
                return v1 || v2 ? options.fn(this) : options.inverse(this)
            default:
                return options.inverse(this)
        }
    },

    'switch': function (value, options) {
        this.switch_value = value
        this.switch_break = false
        return options.fn(this)
    },

    'case': function (value, options) {
        if (value == this.switch_value) {
            this.switch_break = true
            return options.fn(this)
        }
    },

    'defaultIfEmpty': function (context, defaultValue) {
        if (context) {
            return context
        } else {
            return defaultValue
        }
    },

    'default': function (value, options) {
        if (this.switch_break == false) {
            return value
        }
    },

    'withParam': function (context) {
        //normaler with helper code aus handlebars.js

        var options = arguments[arguments.length - 1]

        if (handlebars.Utils.isFunction(context)) {
            context = context.call(this, arguments.splice(1, arguments.length - 1))
        }

        var fn = options.fn

        if (!handlebars.Utils.isEmpty(context)) {
            var data = options.data
            if (options.data && options.ids) {
                data = handlebars.Utils.createFrame(options.data)
                data.contextPath = handlebars.Utils.appendContextPath(
                    options.data.contextPath,
                    options.ids[0]
                )
            }

            return fn(context, {
                data: data,
                //blockParams: handlebars.Utils.blockParams([context], [data && data.contextPath])
            })
        } else {
            return options.inverse(this)
        }

        return null
    },

    /*loca: function () {
        var loca = ''

        if (arguments.length >= 1) {
            loca = arguments[0]

            if (typeof loca === 'string') {
                // Check loca-tag
                if (typeof helpers.helperOptions.locaTags[loca] === 'string') {
                    loca = helpers.helperOptions.locaTags[loca]

                    // Exchange variables in loca-text
                    // - the last argument is the "context" object which can be
                    // ignored
                    for (var i = 1; i < arguments.length - 1; ++i) {
                        var locaRegExp = new RegExp('\\{' + (i - 1) + '\\}', 'gi')
                        loca = loca.replace(locaRegExp, arguments[i])
                    }
                } else {
                    loca = "Loca-tag '" + loca + "' not found"
                }
            } else {
                loca = 'Incorrectly defined loca-tag'
            }
        } else {
            loca = 'No loca-tag defined'
        }

        return new handlebars.SafeString(loca)
    },*/

    'getRandom': function () {
        return randomNumber
    },
    'changeRandom': function () {
        randomNumber = generateRandom()
        return null
    },
    'nextRandom': function () {
        randomNumber = generateRandom()
        return randomNumber
    },

    'configProperty': function () {
        return null
    },

    'addCacheEntry': function () {
        return null
    },

    'replaceTokens': function () {
        var tokenStr = null

        if (arguments.length >= 1) {
            tokenStr = arguments[0]

            // Exchange variables in token-string
            // - the last argument is the "context" object which can be ignored
            for (var i = 1; i < arguments.length - 1; ++i) {
                var tokenStrRegExp = new RegExp('\\{' + (i - 1) + '\\}', 'gi')
                tokenStr = tokenStr.replace(tokenStrRegExp, arguments[i])
            }
        }

        return tokenStr
    },
    'loca': function (text, options) {
        var loca
        var locas = {
            anchor_brandNav: 'Übersicht der Marken des HR anspringen',
            anchor_headline: 'Sprungmarken',
            anchor_mainContent: 'Inhalt anspringen',
            anchor_sectionNav: 'Bereichsnavigation anspringen',
            anchor_serviceNav: 'Servicenavigation anspringen',
            anchor_subNav: 'Subnavigation des Bereichs {0} anspringen',
            search_input_aria_submit: 'Suche starten',
            search_input_placeholder: 'Ort oder Thema suchen',
            feature_box_anchor: 'Livestream Player anspringen',
            header_homepage_link_title: 'Startseite hessenschau . d e',
            comment_anchor_1: 'zu den ',
            comment_label_text: 'Kommentar',
            comment_label_text_many: 'Kommentare',
            comment_anchor_2: ' Kommentaren des Artikels springen',
            date_simple_at: options + ' Uhr',
            label_ticker: 'Ticker',
            label_download: 'Download',
            label_media: 'Media',
            label_podcast: 'Podcast',
            label_event: 'Konzert',
            group_tabbed_more: 'weitere Meldungen aus ' + options,
        }

        for (let key in locas) {
            if (key == text) {
                loca = text.replace(text, locas[key])
                return loca
            }
        }
    },

    /*staticSSI: function (filepath) {
        var template = grunt.file.read(helpers.helperOptions.libraryDir + '/' + filepath, {
            encoding: 'UTF-8',
        })

        var pageBuilder = handlebars.compile(template)

        return new handlebars.SafeString(pageBuilder(this))
    },

    webAppVersion: function () {
        return null
    },*/
}

// Export helpers
module.exports.register = function (Handlebars, options) {
    handlebars = Handlebars
    helpers.helperOptions = options

    /*
     * DEBUG grunt.log.ok(JSON.stringify(helpers.helperOptions,null,4));
     * grunt.log.ok(JSON.stringify(helpers,null,4));
     *
     * Object.keys(helpers).forEach(function(e){ grunt.log.warn("P:"+e); if(typeof
     * helpers[e] === 'function'){ grunt.log.warn("F:"+helpers[e]); }else {
     * grunt.log.warn("J:"+JSON.stringify(helpers[e],null,4)); } } );
     */

    for (var helper in helpers) {
        if (helpers.hasOwnProperty(helper)) {
            Handlebars.registerHelper(helper, helpers[helper])
        }
    }
}
