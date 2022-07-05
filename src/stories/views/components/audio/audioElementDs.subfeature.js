import { fireEvent, hr$, listen } from 'hrQueryDs'
import { uxAction } from 'base/tracking/atiHelperDs'
import ATIMediaHelper from 'base/tracking/atiMediaHelperDs'

const AudioElement = function (options, rootElement) {
    'use strict'

    const audio = hr$('audio', rootElement)[0],
        downloadInfo = hr$('.audioElement__downloadInfo', rootElement)[0],
        downloadText = hr$('.audioElement__downloadText', rootElement)[0],
        mediaTracking = new ATIMediaHelper(
            'audio',
            options.mediaMetadata.ati.pageName,
            options.mediaMetadata.ati.secondLevelId,
            options.mediaMetadata.agf.length,
            options.mediaMetadata.ati.documentName,
            options.mediaMetadata.ati.documentType,
            options.mediaMetadata.ati.documentDate,
            options.mediaMetadata.ati.chapter
        )
    let autoplay = options.autoplay || false,
        isPlaying = false

    const errorHandling = function (e) {
        console.dir(audio)

        if (audio.canPlayType && audio.canPlayType('audio/mpeg').length <= 0) {
            showPlaybackNotSupported()
            return
        }

        switch (audio.networkState) {
            //file not found - 404
            case HTMLMediaElement.NETWORK_NO_SOURCE:
                showFileNotFound()
                return

            default:
                break
        }

        //falls es mit einem event aufgerufen wurde
        //und bis hierhin kam gibt es einen generellen fehler
        if (e) {
            showGeneralError()
            return
        }

        return
    }
    const showGeneralError = function () {
        console.log('Audio: Error')
        downloadText.innerHTML = options.playbackError
        rootElement.insertBefore(downloadInfo, rootElement.firstChild)
        downloadInfo.style.display = 'inline-block'

        uxAction('audioPlayer', 'generalError')
    }
    const showFileNotFound = function () {
        console.log('Audio: File Not Found')
        downloadInfo.innerHTML = options.playbackFileNotFound
        rootElement.insertBefore(downloadInfo, rootElement.firstChild)
        downloadInfo.style.display = 'inline-block'

        uxAction('audioPlayer', 'fileNotFound')
    }
    const showPlaybackNotSupported = function () {
        console.log('Audio: Playback unsupported')
        downloadText.innerHTML = options.playbackUnsupported
        rootElement.insertBefore(downloadInfo, rootElement.firstChild)
        downloadInfo.style.display = 'inline-block'

        uxAction('audioPlayer', 'playbackNotSupported')
    }
    const shouldIStopPlaying = function (event) {
        console.log(event.detail)
        if (event.detail != audio && isPlaying) {
            audio.pause()
            pauseAudio(event)
        }
    }
    const startAudio = function (e) {
        console.log('start')
        uxAction('audioPlayer', 'audioPlay')
        mediaTracking.trackInitialMediaPlay()
        fireEvent('hr:global:stopOtherAVs', audio, true)
        isPlaying = true
        const geotag = hr$('.js-geotag', rootElement)[0]
        if (typeof geotag != 'undefined') {
            geotag.classList.add('hide')
        }
    }
    const pauseAudio = function (e) {
        console.log('pause')
        const ended = e.target.ended
        isPlaying = false
        if (!ended) {
            uxAction('audioPlayer', 'pause')
        } else {
            uxAction('audioPlayer', 'ended')
        }
    }

    //falls ein fehler auftrat bevor das js, geladen wurde
    errorHandling()

    listen('error', errorHandling, rootElement)
    listen('play', startAudio, audio)
    listen('pause', pauseAudio, audio)

    if (autoplay) {
        audio.play()
    }

    listen('hr:global:stopOtherAVs', shouldIStopPlaying)
}

export default AudioElement
