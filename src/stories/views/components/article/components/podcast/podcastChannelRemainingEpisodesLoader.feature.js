import { fireEvent, hr$, listen } from 'hrQuery'
import $ from 'zepto-modules'

require('zepto-modules/callbacks')
require('zepto-modules/deferred')
const PodcastChannelRemainingEpisodesLoader = function (context) {
    'use strict'
    const { options } = context,
        { element: rootElement } = context,
        dynLoadTrigSelector = options.dynLoadTrigSelector,
        dynLoadTrigElement = hr$(dynLoadTrigSelector, rootElement)[0],
        dynLoadReplaceSelector = options.dynLoadReplaceSelector,
        url = options.url

    const handleDynLoad = function (event) {
        event.preventDefault()
        dynLoadTrigElement.classList.add('-loading')
        ajaxLoad(event.currentTarget, true)
    }
    const ajaxLoad = function (target, push, cache) {
        $.ajax({
            type: 'GET',
            dataType: 'html',
            url: url,
            timeout: 90 * 1000,
            cache: cache && true,
            beforeSend: function () {
                console.log('beforeSend')
            },
        })
            .done(function (data, status, xhr) {
                hr$(dynLoadReplaceSelector)[0].outerHTML = data

                setTimeout(function () {
                    fireEvent('hr:podcastChannel:episodeReload')
                    dynLoadTrigElement.remove()
                }, 1000)
            })
            .fail(function (data, status, xhr) {
                dynLoadTrigElement.classList.remove('-loading')
                console.log('fail')
            })
    }
    listen('click', handleDynLoad, dynLoadTrigElement)
}

export default PodcastChannelRemainingEpisodesLoader
