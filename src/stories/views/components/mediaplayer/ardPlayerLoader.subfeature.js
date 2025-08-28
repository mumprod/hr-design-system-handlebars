import { fireEvent, hr$, listen, loadScript } from 'hrQuery'
import { uxAction } from 'base/tracking/pianoHelper.subfeature'
import SettingsCookie from 'components/external-service/globalSettingsCookie.subfeature'

const ArdPlayerLoader = function (options, trackingData, rootElement) {
    'use strict'

    const skinPath = options.cssUrl,
        ardplayerUrl = options.jsUrl,
        playerId = isNaN(parseInt(options.playerId)) ? 0 : parseInt(options.playerId),
        typeLabel = options.typeLabel,
        settingsCookie = new SettingsCookie(),
        isPlayerDebug = options.isPlayerDebug || false,
        playerLocation = trackingData.playerLocation || "Default",
        playerSize = trackingData.playerSize || options.teaserSize,
        isDarkmodeAllowed = options.isDarkmodeAllowed,
        darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
    let mediaCollection = options.mediaCollection,
        playerConfig = options.playerConfig,
        isPlayerStarted = false,
        isWebview = window.parent.document.documentElement.classList.contains('webview'),
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
        if (undefined != playerConfig.pluginData['trackingPiano@all']) {
            playerConfig.pluginData['trackingPiano@all'].isEnabled = settingsCookie.isSettingsCookieExistent('ati') ? settingsCookie.isSettingsCookieAccepted('ati') : !isWebview
        }
        if (undefined != playerConfig.pluginData['trackingAgf@all']) {
            playerConfig.pluginData['trackingAgf@all'].isEnabled = settingsCookie.isSettingsCookieExistent('agf') ? settingsCookie.isSettingsCookieAccepted('agf') : !isWebview
        }
        whenAvailable('ardplayer', function () {
            player = new ardplayer.Player(playerId.toString(), playerConfig, mediaCollection)


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


    const bindPlayerEvents = function () {
        listen(ardplayer.Player.EVENT_PLAY_STREAM, handlePlayStream, player)

        listen(ardplayer.Player.EVENT_ERROR, handlePlayerErrors, player)

        listen('hr:global:stopOtherAVs', function (event) {
            if (event.detail != 'ardplayer') {
                player.pause()
            }
        })

        listen('player_closed', function (event) {
            if (playerId === event.detail.playerId) {
                player.stop()
            }
        })

        listen('player_start', function (event) {
            if (player) {
                if (playerId === event.detail.playerId) {
                    if (undefined != mediaCollection.live) {
                        player.seekToLive()
                    }
                    player.play()
                }
            }
        })

        listen("change", handleThemeSwitch, darkModePreference)
    }

    const handlePlayStream = function (event) {
        const geotag = hr$('.js-geotag', rootElement)[0]
        if (!isPlayerStarted) {
            trackPlayerStart()
            isPlayerStarted = true
        }
        if (typeof geotag != 'undefined') {
            geotag.classList.add('hide')
        }
        fireEvent('hr:global:stopOtherAVs', 'ardplayer', true)
    }

    const handlePlayerErrors = function (event) {
        if (undefined !== videoKey) {
            fireEvent('hr:global:ardPlayerError', { key: videoKey }, true)
        }
    }

    const handleThemeSwitch = function (event) {

        player.setLightMode(isDarkmodeAllowed ? !event.matches : true)
    }

    const trackPlayerStart = function () {
        uxAction(`Playbutton geklickt::${typeLabel} \"${mediaCollection.meta.title}\"::${playerLocation}::Breite ${playerSize}`)
    }

    setupPlayer()
}

export default ArdPlayerLoader
