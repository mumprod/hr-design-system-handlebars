import { hr$, listenOnce } from 'hrQuery'
import ArdPlayerLoader from 'components/mediaplayer/ardPlayerLoader.subfeature'

const MediaplayerLoader = function (context) {
    'use strict'

    const { options } = context,
        { element: rootElement } = context,
        isAutoplay = options.isAutoplay,
        mediaplayerButton = hr$('.js-mediaplayer__button', rootElement.parentNode)[0],
        trackingData = rootElement.dataset.mediaplayerTracking ? JSON.parse(rootElement.dataset.mediaplayerTracking) : {}

    const removeVideoHover = function () {
        rootElement.parentNode.parentNode.classList.remove('-imageHover')
        rootElement.parentNode.parentNode.parentNode.classList.remove('-imageHover')
    }

    const loadArdPlayerLoader = function () {
        new ArdPlayerLoader(options, trackingData)
        removeVideoHover()
    }

    isAutoplay ? listenOnce('click', loadArdPlayerLoader, mediaplayerButton) : loadArdPlayerLoader()
}
export default MediaplayerLoader
