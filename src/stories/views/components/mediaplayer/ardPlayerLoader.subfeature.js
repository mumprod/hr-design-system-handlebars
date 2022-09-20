import { fireEvent, hr$, listen, loadScript } from 'hrQuery'
import TrackingCookie from 'components/externalService/trackingCookieDs.subfeature'

const ArdPlayerLoader = function (options, rootElement) {
    'use strict'

    const skinPath = options.cssUrl,
        ardplayerUrl = options.jsUrl,
        smarttagUrl = options.atiSmarttagUrl,
        playerId = options.playerId,
        trackingCookie = new TrackingCookie()
    let mediaCollection = options.mediaCollection,
        playerConfig = options.playerConfig,
        player

    const setupPlayer = function () {
        if (
            undefined != playerConfig.pluginData['trackingAti@all'] &&
            playerConfig.pluginData['trackingAti@all'].isEnabled
        ) {
            playerConfig.pluginData['trackingAti@all'].config.cookieSecure =
                'https:' === document.location.protocol
        }
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
        if (
            trackingCookie.isTrackingAccepted('ati') &&
            playerConfig.pluginData['trackingAti@all'].isEnabled
        ) {
            loadScript('js-smarttagProd', smarttagUrl)
        } else {
            playerConfig.pluginData['trackingAti@all'].isEnabled = false
        }
        if (!trackingCookie.isTrackingAccepted('agf')) {
            playerConfig.pluginData['trackingAgf@all'].isEnabled = false
        }
        whenAvailable('ardplayer', function () {
            player = new ardplayer.Player(playerId, playerConfig, mediaCollection)
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
        player.$.on(ardplayer.Player.EVENT_PLAY_STREAM, function (event) {
            const geotag = hr$('.js-geotag', rootElement)[0]
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
            player.stop()
        })

        listen('player_start', function (event) {
            if (player) {
                if (undefined != mediaCollection.live) {
                    player.seekToLive()
                }
                player.play()
            }
        })
    }

    if (
        trackingCookie.isTrackingAccepted('agf') &&
        window.gfkConnector &&
        playerConfig.pluginData['trackingAgf@all']
    ) {
        gfkConnector.init(function (gfkLinkID) {
            playerConfig.pluginData['trackingAgf@all'].clipData.nol_c20 = 'p20,' + gfkLinkID
            setupPlayer()
        })
    } else {
        setupPlayer()
    }
}

export default ArdPlayerLoader
