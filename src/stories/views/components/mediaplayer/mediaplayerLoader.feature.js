import { hr$, listenOnce, listen } from 'hrQuery'
import { uxAction } from 'base/tracking/atiHelper.subfeature'
import ArdPlayerLoader from 'components/mediaplayer/ardPlayerLoader.subfeature'

const MediaplayerLoader = function (context) {
    'use strict'

    const { options } = context,
        { element: rootElement } = context,
        type = options.type,
        isAutoplay = options.isAutoplay,
        teaserSize = options.teaserSize,
        audioContent = hr$('.js-audioElement__audio', rootElement)[0],
        mediaplayerButton = hr$('.js-mediaplayer__button', rootElement)[0]

    const removeVideoHover = function () {
        rootElement.parentNode.parentNode.classList.remove('-imageHover')
        rootElement.parentNode.parentNode.parentNode.classList.remove('-imageHover')
    }

    const loadArdPlayerLoader = function () {
        new ArdPlayerLoader(options)
        removeVideoHover()
        uxAction('mediabuttonclick::' + teaserSize + '::playButtonClick')
    }

    if (isAutoplay) {
        listenOnce('click', loadArdPlayerLoader, mediaplayerButton)
    } else {
        loadArdPlayerLoader()
    }
}
export default MediaplayerLoader
