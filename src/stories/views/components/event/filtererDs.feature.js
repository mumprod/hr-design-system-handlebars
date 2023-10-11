import { pi, uxAction } from 'base/tracking/pianoHelper.subfeature'
import { hr$, isString, listen, reinitializeFeature, simulateClickOn } from 'hrQuery'
import $ from 'zepto-modules'

require('zepto-modules/callbacks')
require('zepto-modules/deferred')

const Filterer = (context) => {
    const { options } = context,
        { element: rootElement } = context,
        pushToBrowserHistory = options.pushToBrowserHistory || false,
        loadingCssTrigger = options.loadingCssTrigger || 'is-loading',
        hiddenElementCssTrigger = options.hiddenElementCssTrigger || 'hidden',
        navItemSelectedCssTrigger = options.navItemSelectedCssTrigger || 'selected',
        contentTargetClass = '.js-fr-content',
        errorTargetClass = 'js-fr-error-target',
        errorClass = 'js-fr-error',
        reloadTriggerClass = 'js-fr-reload-trigger',
        targetClass = 'js-fr-target',
        triggerClass = 'js-fr-trigger',
        triggerDomNodes = hr$(`.${triggerClass}`, rootElement),
        errorTargetDomNodes = hr$(`.${errorTargetClass}`, rootElement),
        errorDomNodes = hr$(`.${errorClass}`),
        contentTargetDomNode = hr$(contentTargetClass, rootElement)[0]
    let targetDomNodes = hr$(`.${targetClass}`, rootElement)

    const init = function () {
        for (let i = 0; i < triggerDomNodes.length; i++) {
            triggerDomNodes[i].addEventListener('click', doSetSelectedFilter.bind(this))
            triggerDomNodes[i].addEventListener('touch', doSetSelectedFilter.bind(this))
        }

        //die konfigration auf root ebene triggerd das verhalten beim starten
        if (options && options.crit && options.strat) {
            //finden des passenden triggers
            for (i = 0; i < triggerDomNodes.length; i++) {
                if (
                    JSON.parse(triggerDomNodes[i].getAttribute('data-prop-filterer')).crit ===
                    options.crit
                ) {
                    doSetSelectedFilter({ currentTarget: triggerDomNodes[i] }, false)
                    return
                }
            }
        }

        if (pushToBrowserHistory && !!(window.history && window.history.pushState)) {
            listen('popstate', handlePopstate, window)
            //initial state ersetzen so dass es ein rückkehrpunkt gibt
            const selectedTrigger = hr$(
                `.${triggerClass}.${navItemSelectedCssTrigger}`,
                rootElement
            )
            history.replaceState(
                {
                    sel: triggerClass,
                    cache: false,
                    crit:
                        selectedTrigger.length > 0
                            ? selectedTrigger[0].getAttribute('data-prop-crit')
                            : triggerDomNodes[0].getAttribute('data-prop-crit'),
                },
                null,
                window.location.href
            )
        }
    }

    const doSetSelectedFilter = function (e, forceReset) {
        clearSelected()

        if (!forceReset) {
            e.currentTarget.classList.add(navItemSelectedCssTrigger)
        }

        //hacky weil e beim start auch kein Event sein kann
        'preventDefault' in e && e.preventDefault()

        doFilter(e.currentTarget, forceReset, true, true)
    }

    const clearSelected = function () {
        let triggerDomNodes = hr$(`.${triggerClass}.${navItemSelectedCssTrigger}`, rootElement)

        triggerDomNodes.forEach(function (triggerDomNode) {
            triggerDomNode.classList.remove(navItemSelectedCssTrigger)
        })
    }

    const doFilter = function (currentTarget, forceReset, push, countXTClick) {
        let data = JSON.parse(currentTarget.getAttribute('data-prop-filterer')),
            crit = currentTarget.getAttribute('data-prop-crit'),
            time = new Date().getTime(),
            reset = forceReset,
            href = currentTarget.getAttribute('href'),
            strat,
            found = false

        console.log('targets-length:' + targetDomNodes.length)

        //falls kein array, string in array umheben
        if (isString(data.strat)) {
            strat = []
            strat.push(data.strat)
        } else {
            strat = data.strat
        }

        for (let i = 0; i < strat.length; i++) {
            if ('hobid' === strat[i]) {
                if ($(currentTarget, rootElement).closest('.' + reloadTriggerClass).length > 0) {
                    loadContent(currentTarget)
                } else {
                    stratHideOthersById(targetDomNodes, data.crit, reset)
                    if (push && pushToBrowserHistory) {
                        history.pushState(
                            {
                                sel: `.${currentTarget}.${navItemSelectedCssTrigger}`,
                                crit: data.crit,
                            },
                            null,
                            href
                        )
                        uxAction('Eventkalender-Monat:: Tag geklickt', 1)
                    } else {
                        uxAction('Eventkalender:: Tag geklickt', 1)
                    }
                }
            } else if ('hoswid' === strat[i]) {
                if ($(currentTarget, rootElement).closest('.' + reloadTriggerClass).length > 0) {
                    loadContent(currentTarget)
                } else {
                    stratHideOthersStartsWithId(targetDomNodes, data.crit, reset)
                    if (push && pushToBrowserHistory) {
                        history.pushState(
                            {
                                sel: `.${currentTarget}.${navItemSelectedCssTrigger}`,
                                crit: data.crit,
                            },
                            null,
                            href
                        )
                        uxAction('Eventkalender-Monat:: Monat geklickt', 1)
                    }
                }
            } else if ('cs' === strat[i]) {
                clearSelected()
            } else if ('initial' === strat[i]) {
                initial()
            }
        }

        /* if (countXTClick) {
            pi(
                xtpage +
                    '&pchap=' +
                    xt_chap +
                    '&pid=' +
                    xt_pageID +
                    '&pidt=' +
                    xt_pageDate +
                    xt_multc
            )
        }*/

        removeErrors()
    }
    const removeErrors = function () {
        if (errorTargetDomNodes.length > 0) {
            errorTargetDomNodes[0].classList.add(hiddenElementCssTrigger)
        }

        if (errorDomNodes.length > 0) {
            errorDomNodes[0].classList.add(hiddenElementCssTrigger)
        }
    }
    const loadContent = function (currentTarget) {
        var url = createInlineUrl(currentTarget),
            ts = new Date().getTime()

        console.log('load content ' + url)

        $.ajax({
            type: 'GET',
            dataType: 'html',
            url: url,
            timeout: 90 * 1000,
            cache: true,
            beforeSend: function () {
                console.log('before load')
                $(contentTargetClass, rootElement).addClass(loadingCssTrigger)
            },
        })
            .done(function (data, status, xhr) {
                var tsDelta = 500 - (new Date().getTime() - ts)

                //mindesten 500ms anzeigen
                setTimeout(
                    function () {
                        console.log('loaded')

                        $(contentTargetClass, rootElement).append(data)

                        targetDomNodes = hr$('.' + targetClass, rootElement)
                        $(contentTargetClass, rootElement).removeClass(loadingCssTrigger)
                        $(currentTarget, rootElement)
                            .closest('.' + reloadTriggerClass)
                            .removeClass(reloadTriggerClass)
                        doFilter(currentTarget, false, true, false)
                        reinitializeFeature(contentTargetDomNode)
                    },
                    tsDelta < 0 ? 0 : tsDelta
                )
            })
            .fail(function (data, status, xhr) {
                console.log('load error')
                $(contentTargetClass, rootElement).addClass(loadingCssTrigger)
            })
    }
    const createInlineUrl = function (element) {
        var href = element.getAttribute('href'),
            pos = href.indexOf('~') + 1

        return href.substr(0, pos) + 'inline' + href.substr(pos)
    }
    const handlePopstate = function (event) {
        var target
        //nur handlen wenn es ein state gibt
        if (event.state.sel) {
            target = $(
                '.' + triggerClass + "[data-prop-crit='" + event.state.crit + "']",
                rootElement
            )[0]
            doFilter(target, false, false)
            clearSelected()
            target.classList.add(navItemSelectedCssTrigger)
        }
    }
    const initial = function () {
        simulateClickOn(hr$('.js-fr-initial', rootElement)[0])
    }

    const stratHideOthersById = function (targetDomNodes, crit, reset) {
        var i = 0,
            found = false

        if (reset) {
            for (i = 0; i < targetDomNodes.length; i++) {
                targetDomNodes[i].classList.remove(hiddenElementCssTrigger)
            }
            return
        }

        for (i = 0; i < targetDomNodes.length; i++) {
            if (targetDomNodes[i].getAttribute('id') !== crit) {
                targetDomNodes[i].classList.add(hiddenElementCssTrigger)
            } else {
                targetDomNodes[i].classList.remove(hiddenElementCssTrigger)

                found = true
            }
        }

        displayErrorTarget()

        return found
    }
    const stratHideOthersStartsWithId = function (targetDomNodes, crit, reset) {
        var i = 0,
            found = false

        if (reset) {
            for (i = 0; i < targetDomNodes.length; i++) {
                targetDomNodes[i].classList.remove(hiddenElementCssTrigger)
            }
            return
        }

        for (i = 0; i < targetDomNodes.length; i++) {
            if (targetDomNodes[i].getAttribute('id').indexOf(crit) !== 0) {
                targetDomNodes[i].classList.add(hiddenElementCssTrigger)
            } else {
                targetDomNodes[i].classList.remove(hiddenElementCssTrigger)

                found = true
            }
        }

        displayErrorTarget()

        return found
    }
    const displayErrorTarget = function () {
        if (targetDomNodes.length >= 1) {
            if (errorTargetDomNodes.length > 0) {
                errorTargetDomNodes[0].classList.remove(hiddenElementCssTrigger)
            }
        }
    }
    init()
}
export default Filterer
