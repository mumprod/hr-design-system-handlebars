import { hr$, listenOnce, fireEvent, listen } from 'hrQueryDs'
import { uxAction } from 'base/tracking/atiHelperDs'
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
        mediaplayerButton = hr$('.js-mediaplayer__button', rootParent)[0];
    
    let video = false; 


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

    
    const unloadPlayer = function() {
        console.log("video.pause()");
        video.pause();
    }

    const loadOnDemand = function () {    
        if(!video){
            console.log("loadOnDemand");
            video = new VideoOnDemandPlayer(options)
            removeVideoHover()
            uxAction('mediabuttonclick::' + teaserSize + '::playButtonClick')
            listenOnce('player_colosed', unloadPlayer)  
        } else {
            console.log("video.play()");
            listenOnce('player_colosed', unloadPlayer) 
            video.play();
        }
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
              // listenOnce('click', loadOnDemand, mediaplayerButton)
              listen('click', loadOnDemand, mediaplayerButton)
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
