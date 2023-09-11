import { hr$, listenOnce, listen } from 'hrQuery'
import { uxAction } from 'base/tracking/pianoHelper.subfeature'
import ArdPlayerLoader from 'components/mediaplayer/ardPlayerLoader.subfeature'

const MediaplayerLoader = function (context) {
    'use strict'

    const { options } = context,
        { element: rootElement } = context,
        isAutoplay = options.isAutoplay,
        teasersize = options.teasersize,
        mediaplayerButton = hr$('.js-mediaplayer__button', rootElement.parentNode)[0]

    const removeVideoHover = function () {
        rootElement.parentNode.parentNode.classList.remove('-imageHover')
        rootElement.parentNode.parentNode.parentNode.classList.remove('-imageHover')
    }

    const loadArdPlayerLoader = function () {
        new ArdPlayerLoader(options)
        removeVideoHover()
        uxAction('mediabuttonclick::' + teasersize + '::playButtonClick')
    }

    if (isAutoplay) {
        console.log('isAutoplay')
        listenOnce('click', loadArdPlayerLoader, mediaplayerButton)
    } else {
        loadArdPlayerLoader()
    }
}
export default MediaplayerLoader
