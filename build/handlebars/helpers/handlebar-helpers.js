'use strict'

const fs = require('fs'),
    path = require('path')
const { type } = require('os')
let handlebars

var decoratorStack
var randomNumber
var generateRandom = function () {
    var min = Math.ceil(0)
    var max = Math.floor(999)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const extractBrandFromUrl = function () {
    let url = window.location.href
    let extractBrandFromUrlRegex = /(?<=theme\:).*?(?=\&)/g
    let brand = url.match(extractBrandFromUrlRegex)
    brand = null != brand ? brand[0] : 'hessenschau'
    return brand
}

const ParamPlaceHolder = function (placeholder, index) {
    this.placeholder = placeholder
    this.index = index

    const replace = function (text, params) {
        let replacedText
        if (undefined !== text && undefined !== params && this.index >= 0 && this.index < params.length && params[this.index] !== null) {
            replacedText = text.replace(this.placeholder, params[this.index])
        } else {
            replacedText = text
        }
        return replacedText
    }
    return {
        index: this.index,
        placeholder: this.placeholder,
        replace: replace
    }
}

const UserConsentPlaceHolder = function (placeholder, url) {
    this.placeholder = placeholder
    this.url = url

    const replace = function (text, params) {
        let replacedText
        if (undefined !== text && undefined !== this.url) {
            replacedText = text.replace(this.placeholder, '')
        }
        else {
            replacedText = text
        }
        return replacedText
    }
    return {
        placeholder: this.placeholder,
        url: this.url,
        replace: replace
    }
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
        let resourceUrl = text
        // ARD PLAYER Folder
        if (text.includes('assets/vendor/ardplayer/')) {
            resourceUrl = text.replace('assets/', './')
        }
        // PROGRAMREFERENCE Folder
        if (text.includes('assets/images/logos/')) {
            resourceUrl = text.replace('assets/images/logos/', './images/logos/')
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

    'appendToDefault': function (context, defaultValue) {
        if (context) {
            return defaultValue + context
        } else {
            return defaultValue.trim()
        }
    },

    'isUserConsentNeeded': function (url, options) {
        return false
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

    'default': function (value, options) {
        if (this.switch_break == false) {
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

    'loca': function () {
        let brand = extractBrandFromUrl()
        var loca = ''

        if (arguments.length >= 1) {
            loca = arguments[0]

            if (typeof loca === 'string') {
                // Check loca-tag
                if (typeof helpers.helperOptions.locaTags[brand][loca] === 'string') {
                    loca = helpers.helperOptions.locaTags[brand][loca]
                    const args = Array.prototype.slice.call(arguments);
                    // Extract params from arguments object. No params are present when length of arguments array is <= 2
                    let params = args.length > 2 ? args.slice(1, args.length - 1) : []
                    const regex = /(?<property>{<%(?<propertyKey>.*?)%>})|(?<userConsent>{nuc\s(?<userConsentUrl>.*?)\snuc})|(?<param>{(?<paramKey>\d*?)})/g
                    const matches = loca.matchAll(regex)
                    const placeHolders = []
                    for (const match of matches) {
                        if (undefined !== match.groups.userConsent) {
                            let placeHolder = match.groups.userConsent
                            let url = match.groups.userConsentKey
                            placeHolders.push(new UserConsentPlaceHolder(placeHolder, url))
                        }
                        if (undefined !== match.groups.param) {
                            let placeHolder = match.groups.param
                            let index = match.groups.paramKey
                            placeHolders.push(new ParamPlaceHolder(placeHolder, index))
                        }
                    }
                    for (const placeHolder of placeHolders) {
                        loca = placeHolder.replace(loca, params)
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
    },

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
        let configProperty = ''
        let brand = extractBrandFromUrl()
        console.log(brand)
        if (arguments.length >= 1) {
            configProperty = arguments[0]
            switch (configProperty) {
                case 'footer.onBackground':
                    configProperty = brand == 'hessenschau' || brand == 'hr-rundfunkrat' ? true : false;
                    break
                case 'dialogPolyfill.baseUrl':
                    configProperty = 'vendor/dialog-polyfill'
                    break
                case 'iconConfig.brandlogo.footer':
                    configProperty =
                        brand == 'you-fm'
                            ? 'brandlogo--footer-desk'
                            /* : brand == 'hr-bigband'
                            ? 'brandlogo--mobile'
                            : brand == 'hr-sinfonieorchester'
                            ? 'brandlogo--mobile'
                            : brand == 'hessenschau'
                            ? undefined
                            */
                            : brand == 'hr-inforadio'
                                ? 'brandlogo--footer'
                                : undefined
                    break
                case 'site.name':
                    configProperty = brand
                    break
                case 'templates.useStickyNav':
                    configProperty = brand == 'hessenschau' ? true : false;
                    break
            }
        } else {
            configProperty = 'No config-property defined.'
        }
        return configProperty
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

    'strip': function (input, param) {
        return input
    },
    /**
     * Handlebars Helper: joinString
     * 
     * This helper function concatenates multiple strings or numbers into a single string.
     * It filters out non-string and non-numeric values (such as objects, arrays, or null) 
     * to prevent invalid data from being included in the final result.
     * 
     * Usage:
     * {{joinString 'form' (generateRandom)}}
     * 
     * Example Output:
     * If 'form' is passed as the first argument and the `generateRandom` function returns 408,
     * the output will be: 'form408'.
     * 
     * Notes:
     * - Strings and numbers are included in the final concatenation.
     * - Objects, arrays, and other non-string, non-number types are ignored.
     * 
     * Function implementation:
     */
    'joinStrings': function (...args) {
        return args.filter(arg => typeof arg === 'string' || typeof arg === 'number').join('');
    }

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
