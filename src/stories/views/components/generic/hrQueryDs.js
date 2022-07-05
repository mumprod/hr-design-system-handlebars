import Initializer from 'initializer'
import loadFeature from 'loadFeature'

const hr$ = (selector, element) => {
    // if element set, use it
    // if not use document as default
    const rootElement = element || document

    // falls kein selector angegeben
    // gib das element zurück
    if (!selector) {
        return rootElement
    }

    // wenn ein , oder ein leerzeichen '.class1 .class2'
    // in der query dann qSA
    if (
        selector.indexOf(',') > 0 ||
        selector.split(' ').length > 1 ||
        selector.split('.').length > 1
    ) {
        return rootElement.querySelectorAll(selector)
    }

    if (selector[0] === '.') {
        return rootElement.getElementsByClassName(selector.substring(1))
    }

    if (selector[0] === '#') {
        return new Array(document.getElementById(selector.substring(1)))
    }

    // gib eine NodeList zurück
    return rootElement.querySelectorAll(selector)
}

const stripTags = text => {
    if (text) {
        return text.replace(/(<([^>]+)>)/gi, '')
    }
    return false
}

const getViewportWidth = () =>
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

const isString = value => Object.prototype.toString.call(value) === '[object String]'

const isElementInViewport = el => {
    const rect = el.getBoundingClientRect()
    return rect.top <= (document.documentElement || document.body).clientHeight
}

const getClosestParentWithTag = (tagName, node) => {
    while (node !== null && node.tagName !== 'BODY') {
        if (node.tagName && node.tagName.toLowerCase() === tagName) {
            return node
        }
        node = node.parentNode
    }
    return false
}

const getNodeWithClassInPath = (className, startNode) => {
    let node = startNode

    while (node && node !== document) {
        if (node.classList.contains(className)) {
            return node
        }
        node = node.parentNode
    }
    return false
}

const isDescendant = (parent, child) => {
    let node = child.parentNode
    while (node !== null) {
        if (node === parent) {
            return true
        }
        node = node.parentNode
    }
    return false
}

/* wartet x ms seit dem letzen aufruf bis es ausgeführt wird */
const debounce = (fn, delay) => {
    let timer = null
    return (...args) => {
        const context = this
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay)
    }
}
/* feuert all x ms */
const throttle = (fn, threshhold, scope) => {
    threshhold = threshhold || 250
    let last
    let deferTimer
    return (...args) => {
        const context = scope || this

        const now = +new Date()
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer)
            deferTimer = setTimeout(() => {
                last = now
                fn.apply(context, args)
            }, threshhold)
        } else {
            last = now
            fn.apply(context, args)
        }
    }
}

/* Once, führt eine Funktion genau einmal aus, egal wie oft sie aufgerufen wird
 * Usage
    var canOnlyFireOnce = hr$.once(function() {
        console.log('Fired!');
    });

    canOnlyFireOnce(); // "Fired!"
    canOnlyFireOnce(); // nada
 *
 */
const once = (fn, context) => {
    let result

    return (...args) => {
        if (fn) {
            result = fn.apply(context || this, args)
            fn = null
        }

        return result
    }
}

const listen = (eventName, fn, documentNode) => {
    documentNode = documentNode === undefined ? document : documentNode

    if (window.attachEvent) {
        documentNode.attachEvent(eventName, fn)
    } else {
        documentNode.addEventListener(eventName, fn)
    }
}
const unlisten = (eventName, fn, documentNode) => {
    documentNode = documentNode === undefined ? document : documentNode

    if (window.attachEvent) {
        documentNode.detachEvent(eventName, fn)
    } else {
        documentNode.removeEventListener(eventName, fn)
    }
}
const listenOnce = (eventName, fn, documentNode) => {
    documentNode = documentNode === undefined ? document : documentNode

    documentNode.addEventListener(eventName, fn, { once: true })
}

const fireEvent = (event_name, data, handleIframe) => {
    const event = document.createEvent('CustomEvent')

    event.initCustomEvent(event_name, true, true, data)

    document.dispatchEvent(event)

    if (handleIframe) {
        if (hr$('#js-iFrame')[0]) {
            hr$('#js-iFrame')[0].contentWindow.document.dispatchEvent(event)
        }
        if (inIframe()) {
            parent.document.dispatchEvent(event)
        }
    }
}

const inIframe = () => {
    try {
        return window.self !== window.top
    } catch (e) {
        return true
    }
}

const setJSONCookie = (cookieName, cookieValue, cookieLifetime) => {
    setCookie(cookieName, JSON.stringify(cookieValue), cookieLifetime)
}

const setCookie = (cookieName, cookieValue, cookieLifetime) => {
    let expires

    const domain = getDomain()

    if (cookieLifetime) {
        expires = new Date()
        expires.setMilliseconds(expires.getMilliseconds() + cookieLifetime)
        expires = expires.toUTCString()
    } else {
        expires = ''
    }

    document.cookie =
        cookieName + '=' + cookieValue + ';expires=' + expires + ';domain=' + domain + ';path=/;'
}

const getJSONCookie = cookieName => {
    let cookie

    try {
        cookie = JSON.parse(getCookie(cookieName))
    } catch (e) {}

    return cookie
}

const getCookie = cookieName => {
    let cookieString = RegExp('' + cookieName + '[^;]+').exec(document.cookie)
    return unescape(!!cookieString ? cookieString.toString().replace(/^[^=]+./, '') : '')
}

const deleteCookie = cookieName => {
    const domain = getDomain()
    document.cookie =
        cookieName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=' + domain + ';path=/;'
}

const getDomain = () => {
    return window.location.hostname.substring(window.location.hostname.indexOf('.') + 1)
}
const requestTimeout = (fn, delay) => {
    var requestAnimFrame = (function() {
            return (
                window.requestAnimationFrame ||
                function(callback, element) {
                    window.setTimeout(callback, 1000 / 60)
                }
            )
        })(),
        start = new Date().getTime(),
        handle = {}
    function loop() {
        var current = new Date().getTime(),
            delta = current - start
        if (delta >= delay) {
            fn.call()
        } else {
            handle.value = requestAnimFrame(loop)
        }
    }
    handle.value = requestAnimFrame(loop)
    return handle
}

const replaceAnimated = (
    elem,
    data,
    rescan,
    callback,
    timeoutDelay,
    valueFrom,
    valueTo,
    easing,
    duration
) => {
    const property = 'opacity'
    timeoutDelay = timeoutDelay || 800
    valueFrom = valueFrom || 0.2
    valueTo = valueTo || 1.0
    easing = easing || 'ease-in-out'
    duration = duration || '0.8s'

    elem.style.WebkitTransition = property + ' ' + duration + ' ' + easing
    elem.style.MozTransition = property + ' ' + duration + ' ' + easing
    elem.style.transition = property + ' ' + duration + ' ' + easing

    elem.style[property] = valueFrom

    requestTimeout(function() {
        if (data) {
            elem.innerHTML = data
        }
        elem.style[property] = valueTo

        if (rescan) {
            Initializer.run(elem, loadFeature)
            hrScriptLoad.rescanForModulesAndVariants(elem)
        }

        if (callback) {
            callback()
        }
    }, timeoutDelay)
}

hr$.loadScript = function(id, scriptUrl, async, callback) {
    if (document.getElementById(id)) return

    var firstScriptTagInPage = hr$('script')[0],
        scriptTag = document.createElement('script')

    scriptTag.id = id
    scriptTag.src = scriptUrl

    if (async) {
        scriptTag.setAttribute('async', !!async)
    }

    if (callback) {
        scriptTag.addEventListener(
            'load',
            function(e) {
                callback(null, e)
            },
            false
        )
    }

    firstScriptTagInPage.parentNode.insertBefore(scriptTag, firstScriptTagInPage)
}

const loadScript = (id, scriptUrl, async, callback) => {
    if (document.getElementById(id)) return

    let firstScriptTagInPage = hr$('script')[0],
        scriptTag = document.createElement('script')

    scriptTag.id = id
    scriptTag.src = scriptUrl

    if (async) {
        scriptTag.setAttribute('async', !!async)
    }

    if (callback) {
        scriptTag.addEventListener(
            'load',
            function(e) {
                callback(null, e)
            },
            false
        )
    }

    firstScriptTagInPage.parentNode.insertBefore(scriptTag, firstScriptTagInPage)
}

export {
    hr$,
    stripTags,
    getViewportWidth,
    isString,
    isElementInViewport,
    getClosestParentWithTag,
    getNodeWithClassInPath,
    isDescendant,
    debounce,
    throttle,
    once,
    listen,
    unlisten,
    listenOnce,
    fireEvent,
    inIframe,
    setCookie,
    setJSONCookie,
    getJSONCookie,
    getCookie,
    deleteCookie,
    requestTimeout,
    replaceAnimated,
    loadScript
}
