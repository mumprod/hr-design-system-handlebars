import { fireEvent, hr$, listen, loadScript } from 'hrQuery'
import { uxAction } from 'base/tracking/pianoHelper.subfeature'
import SettingsCookie from 'components/externalService/globalSettingsCookie.subfeature'

const ArdPlayerLoader = function (options, trackingData, rootElement) {
    'use strict'

    const skinPath = options.cssUrl,
        ardplayerUrl = options.jsUrl,
        smarttagUrl = options.atiSmarttagUrl,
        playerId = options.playerId,
        type = options.type,
        settingsCookie = new SettingsCookie(),
        isPlayerDebug = options.isPlayerDebug || false,
        playerLocation = trackingData.playerLocation || "Default",
        playerSize = trackingData.playerSize || options.teaserSize,
        isDarkmodeAllowed = options.isDarkmodeAllowed,
        darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
    let mediaCollection = options.mediaCollection,
        playerConfig = options.playerConfig,
        isPlayerStarted = false,
        player

    const setupPlayer = function () {
        loadArdPlayerScript()
        fetchPlayerStyle(skinPath).then(createPlayer())
    }

    const loadArdPlayerScript = function () {
        loadScript('js-ardplayerHr', ardplayerUrl)
    }

    const fetchPlayerStyle = function (url, id) {
        return new Promise(function (resolve, reject) {
            if (document.getElementById(id)) {
                resolve('Style wurde bereits geladen')
                console.log('style was already loaded before')
            } else {
                const link = document.createElement('link')
                link.type = 'text/css'
                link.rel = 'stylesheet'
                link.id = id
                link.onload = function () {
                    resolve()
                }
                link.href = url
                const headScript = document.querySelector('script')
                headScript.parentNode.insertBefore(link, headScript)
                resolve('Style wurde neu geladen')
            }
        })
    }

    const createPlayer = function () {
        if (!settingsCookie.isSettingsCookieAccepted('ati')) {
            if (undefined != playerConfig.pluginData['trackingPiano@all'])
                playerConfig.pluginData['trackingPiano@all'].isEnabled = false
        }
        if (
            !settingsCookie.isSettingsCookieAccepted('agf') &&
            undefined != playerConfig.pluginData['trackingAgf@all']
        ) {
            playerConfig.pluginData['trackingAgf@all'].isEnabled = false
        }
        whenAvailable('ardplayer', function () {
            player = new ardplayer.Player(playerId, playerConfig, mediaCollection)

            player.setLightMode(isDarkmodeAllowed ? !darkModePreference.matches : true)

            if (isPlayerDebug) {
                ardplayer.debug(true, true, true, true)
            }
            bindPlayerEvents()
        })
    }

    const whenAvailable = function (name, callback) {
        const interval = 100 // ms
        const intervalId = window.setInterval(function () {
            if (typeof ardplayer != 'undefined') {
                window.clearInterval(intervalId)
                callback(window[name])
            }
        }, interval)
    }

    const handleThemeSwitch = function (event) {
        player.setLightMode(!event.matches)
    }

    const bindPlayerEvents = function () {
        player.$.on(ardplayer.Player.EVENT_PLAY_STREAM, function (event) {
            const geotag = hr$('.js-geotag', rootElement)[0]
            if (!isPlayerStarted) {
                trackPlayerStart()
                isPlayerStarted = true
            }
            if (typeof geotag != 'undefined') {
                geotag.classList.add('hide')
            }
            fireEvent('hr:global:stopOtherAVs', 'ardplayer', true)
        })

        player.$.on(ardplayer.Player.EVENT_ERROR, function (event) {
            if (undefined !== videoKey) {
                fireEvent('hr:global:ardPlayerError', { key: videoKey }, true)
            }
        })

        listen('hr:global:stopOtherAVs', function (event) {
            if (event.detail != 'ardplayer') {
                player.pause()
            }
        })

        listen('player_closed', function (event) {
            let playerIdFromConfig = parseInt(playerId)
            playerIdFromConfig = isNaN(playerIdFromConfig) ? 0 : playerIdFromConfig
            if (playerIdFromConfig === event.detail.playerId) {
                player.stop()
            }
        })



        listen('player_start', function (event) {
            if (player) {
                let playerIdFromConfig = parseInt(playerId)
                playerIdFromConfig = isNaN(playerIdFromConfig) ? 0 : playerIdFromConfig
                if (playerIdFromConfig === event.detail.playerId) {
                    if (undefined != mediaCollection.live) {
                        player.seekToLive()
                    }
                    player.play()
                }
            }
        })

        listen("change", handleThemeSwitch, darkModePreference)
    }

    const trackPlayerStart = function () {
        switch (type) {
            case "audioOndemand":
                console.debug(`Playbutton geklickt::Audio \"${mediaCollection.meta.title}\"::${playerLocation}::Breite ${playerSize}`)
                uxAction(`Playbutton geklickt::Audio \"${mediaCollection.meta.title}\"::${playerLocation}::Breite ${playerSize}`)
                break;
            case "audioLivestream":
                console.debug(`Playbutton geklickt::Audio-Event-Livestream \"${mediaCollection.meta.title}\"::${playerLocation}::Breite ${playerSize}`)
                uxAction(`Playbutton geklickt::Audio-Event-Livestream \"${mediaCollection.meta.title}\"::${playerLocation}::Breite ${playerSize}`)
                break;
            case "videoOndemand":
                console.debug(`Playbutton geklickt::Video \"${mediaCollection.meta.title}\"::${playerLocation}::Breite ${playerSize}`)
                uxAction(`Playbutton geklickt::Video \"${mediaCollection.meta.title}\"::${playerLocation}::Breite ${playerSize}`)
                break;
            case "videoLivestream":
                console.debug(`Playbutton geklickt::Video - Livestream \"${mediaCollection.meta.title}\"::${playerLocation}::Breite ${playerSize}`)
                uxAction(`Playbutton geklickt::Video - Livestream \"${mediaCollection.meta.title}\"::${playerLocation}::Breite ${playerSize}`)
                break;
        }
    }

    setupPlayer()
}



export default ArdPlayerLoader
