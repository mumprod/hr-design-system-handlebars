import { hr$, listenOnce } from 'hrQueryNew'
import { uxAction } from '../../base/tracking/atiHelperNew'
import VideoOnDemandPlayer from '../video/videoOnDemandPlayer.subfeature'
import AudioElement from '../audio/audioElement.subfeature'
import VideoLivestream from '../video/livestream/videoLivestream.subfeature'

const MediaplayerLoader = function (context) {
    'use strict'
    
 
    const { options } = context,
        { element: rootElement } = context,
        type = options.type,
        position = options.position,
        teaserSize = options.teaserSize,
        config = options.config,
        audioContent = hr$('.js-audioElement__audio', rootElement)[0],
        mediaplayerButton = hr$('.js-mediaplayer__button', rootElement)[0]
        
    const removeVideoHover = function () {
        rootElement.parentNode.parentNode.classList.remove('-imageHover')
        rootElement.parentNode.parentNode.parentNode.classList.remove('-imageHover')
    }

    const removeAudioHover = function () {
        audioContent.classList.remove('hide')
        audioContent.parentNode.parentNode.parentNode.parentNode.classList.remove('-imageHover')
        audioContent.parentNode.parentNode.parentNode.classList.remove('-imageHover')
        mediaplayerButton.parentNode.removeChild(mediaplayerButton)
    }

    const loadLivestream = function () {
        new VideoLivestream(options)
        removeVideoHover()
        uxAction('mediabuttonclick::' + teaserSize + '::playButtonClick')
    }

    const loadOnDemand = function () {
        console.log("loadOnDemand");
        new VideoOnDemandPlayer(options)
        removeVideoHover()
        uxAction('mediabuttonclick::' + teaserSize + '::playButtonClick')
    }

    const loadAudio = function () {
        new AudioElement(options, rootElement)
        removeAudioHover()
        uxAction('mediabuttonclick::' + teaserSize + '::playButtonClick')
    }

    switch (type) {
        case 'live':
            console.log('live');
            if (position === 'teaser') {
                listenOnce('click', loadLivestream, mediaplayerButton)
            } else {
                loadLivestream()
            }
            break

        case 'ondemand':
            console.log('ondemand');
            if (position === 'teaser') {
                listenOnce('click', loadOnDemand, mediaplayerButton)
            } else {
                loadOnDemand()
            }
            break

        case 'audio':
            console.log('audio');
            if (position === 'teaser') {
                listenOnce('click', loadAudio, mediaplayerButton)
            } else {
                audioContent.classList.remove('hide')
                new AudioElement(options, rootElement)
            }
            break
    }
}
export default MediaplayerLoader
