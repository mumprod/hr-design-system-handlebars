import { hr$, listenOnce, fireEvent, listen } from 'hrQuery'
import { uxAction } from 'base/tracking/atiHelperDs.subfeature'
import VideoOnDemandPlayer from 'components/video/videoOnDemandPlayerDs.subfeature'
import AudioElement from 'components/audio/audioElementDs.subfeature'
import VideoLivestream from 'components/video/livestream/videoLivestreamDs.subfeature'

const MediaplayerLoader = function (context) {
    'use strict'

    const { options } = context,
        { element: rootElement } = context,
        type = options.type,
        position = options.position,
        teaserSize = options.teaserSize,
        config = options.config,
        audioContent = hr$('.js-audioElement__audio', rootElement)[0],
        // containerId = options.containerId,
        rootParent = rootElement.parentNode,
        mediaplayerButton = hr$('.js-mediaplayer__button', rootParent)[0]

    let avObject = false
    console.log('MediaplayerLoader', options)

    const unloadPlayer = function () {
        console.log('video.pause()')
        avObject.pause()
    }

    const loadLivestream = function () {
        if (!avObject) {
            console.log('load Livestream')
            avObject = new VideoLivestream(options)
            uxAction('mediabuttonclick::' + teaserSize + '::playButtonClick')
            listenOnce('player_colosed', unloadPlayer)
        } else {
            console.log('video.play()')
            listenOnce('player_colosed', unloadPlayer)
            avObject.play()
        }
    }

    const loadOnDemand = function () {
        if (!avObject) {
            console.log('load OnDemand')
            avObject = new VideoOnDemandPlayer(options)
            uxAction('mediabuttonclick::' + teaserSize + '::playButtonClick')
            listenOnce('player_colosed', unloadPlayer)
        } else {
            console.log('video.play()')
            listenOnce('player_colosed', unloadPlayer)
            avObject.play()
        }
    }

    const loadAudio = function () {
        if (!avObject) {
            console.log('load Audio')
            avObject = new AudioElement(options, rootElement)
            uxAction('mediabuttonclick::' + teaserSize + '::playButtonClick')
            listenOnce('player_colosed', unloadPlayer)
        } else {
            console.log('Audio.play()')
            listenOnce('player_colosed', unloadPlayer)
            avObject.play()
        }
    }

    switch (type) {
        case 'live':
            console.log('live')
            if (position === 'teaser') {
                listen('click', loadLivestream, mediaplayerButton)
            } else {
                loadLivestream()
            }
            break

        case 'ondemand':
            console.log('ondemand')
            if (position === 'teaser') {
                // listenOnce('click', loadOnDemand, mediaplayerButton)
                listen('click', loadOnDemand, mediaplayerButton)
            } else {
                loadOnDemand()
            }
            break

        case 'audio':
            console.log('audio')
            if (position === 'teaser') {
                listen('click', loadAudio, mediaplayerButton)
            } else {
                audioContent.classList.remove('hide')
                new AudioElement(options, rootElement)
            }
            break
    }
}
export default MediaplayerLoader
