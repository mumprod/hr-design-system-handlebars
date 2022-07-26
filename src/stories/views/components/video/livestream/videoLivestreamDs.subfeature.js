import { fireEvent, hr$, listen, loadScript } from 'hrQuery'
import TrackingCookie from 'components/externalService/trackingCookieDs.subfeature'

const VideoLivestream = function (options, rootElement) {
    'use strict'

    const config = options.config,
        isTeaser = options.position && options.position === 'teaser',
        skinPath = config.skinPath,
        streamUrl = config.streamUrl,
        agfMetadata = config.mediaMetadata.agf,
        agfAppId = config.agfAppId,
        atiMetadata = config.mediaMetadata.ati,
        ardplayerUrl = config.ardplayerUrl,
        smarttagUrl = config.smarttagUrl,
        basePlayerUrl = config.baseUrl,
        previewImageUrl = config.previewImageUrl,
        playerId = config.containerId,
        hasOverlay = config.overlay == 'true',
        overlay = hasOverlay == true ? hr$('.overlay-' + config.overlayId)[0] : '',
        trackingCookie = new TrackingCookie(),
        autoplay = config.autoplay || false
    let sourceNode, player, mediaCollection, playerConfig
    const fetchPlayerStyle = function (url, id) {
        return new Promise(function (resolve, reject) {
            if (document.getElementById(id)) {
                resolve()
                console.log('style was already loaded before')
            } else {
                var link = document.createElement('link')
                link.type = 'text/css'
                link.rel = 'stylesheet'
                link.id = id
                link.onload = function () {
                    resolve()
                    console.log('style has loaded')
                }
                link.href = url

                var headScript = document.querySelector('script')
                headScript.parentNode.insertBefore(link, headScript)
            }
        })
    }
    const initPlayer = function (mediaStreams) {
        loadArdPlayerScript()

        loadScriptsForAddons()

        createMediaCollection()

        createPlayerConfig()

        whenAvailable('ardplayer', function () {
            player = new ardplayer.Player(playerId, playerConfig, mediaCollection)
            bindPlayerEvents()
        })
    }
    const whenAvailable = function (name, callback) {
        const interval = 100 // ms
        const intervalId = window.setInterval(function () {
            if (window[name]) {
                window.clearInterval(intervalId)
                callback(window[name])
            }
        }, interval)
    }
    const loadArdPlayerScript = function () {
        loadScript('js-ardplayerHr', ardplayerUrl)
    }
    const loadScriptsForAddons = function () {
        if (trackingCookie.isTrackingAccepted('ati')) {
            loadScript('js-smarttagProd', smarttagUrl)
        }
    }
    const createMediaCollection = function () {
        mediaCollection = {
            _type: 'video',
            _isLive: true,
            _dvrEnabled: true,
            _defaultQuality: 'auto',
            _previewImage: previewImageUrl,
            _mediaArray: [
                {
                    _plugin: 1,

                    _mediaStreamArray: [
                        {
                            _quality: 'auto',
                            _server: '',
                            _stream: streamUrl,
                            _cdn: '',
                            _label: 'live',
                        },
                    ],
                },
            ],
        }
    }
    const createPlayerConfig = function () {
        playerConfig = {
            _representationArray: [
                {
                    _representationClass: 'm',
                },
            ],
            _streamed_webvtt_enabled: true,
            _autoplay: autoplay,
            _showOptions: true,
            _showOptions_Plugins: true,
            _showOptions_Quality: true,
            _startTime: 0,
            _endTime: null,
            _autosave: true,
            _baseUrl: basePlayerUrl,
            _rememberCurrentTime: true,
            _showSubtitelAtStart: false,
            _forceControlBarVisible: false,
            _initialVolume: 1,
            _pixelConfig: createPixelConfig(),
        }
    }
    const createPixelConfig = function () {
        const atiConfig = {
            tracker: 'ATIdebug',
            tagConfig: {
                site: atiMetadata.atiSiteId,
                collectDomainSSL: atiMetadata.atiTrackingHost
                    ? atiMetadata.atiTrackingHost.substring(
                          atiMetadata.atiTrackingHost.lastIndexOf('/') + 1
                      ) + '.xiti.com'
                    : '',
                cookieSecure: 'https:' === document.location.protocol,
                secure: 'true',
            },

            clipData: {
                mediaType: 'video',
                playerId: playerId,
                mediaLevel2: atiMetadata.secondLevelId,
                mediaTheme1: 'Live',
                mediaLabel: atiMetadata.mediaLabel,
                duration: '',
                broadcastMode: 'live',
                debug: 'true',
            },
            playclickData: {
                name: atiMetadata.mediaLabel + ':video:videoPlay',
                chapter1: 'Video-Start',
                chapter2: 'Live',
                customVars: {
                    site: {
                        1: atiMetadata.documentName,
                        2: atiMetadata.documentType,
                        5: atiMetadata.documentDate,
                    },
                },
            },

            playclick: true,
        }

        const agfConfig = {
            tracker: 'AGF',

            // Offizielle Customer ID, für Prod vorne P,
            appId: agfAppId,

            // required for multiple players on one page
            playerID: playerId,
            clipData: {
                type: agfMetadata.type, //static?

                assetid: agfMetadata.assetid,
                program: agfMetadata.program,
                title: agfMetadata.title, // valid chars filtern
                length: agfMetadata.length,

                // Mandatory Custom Properties
                // nol_c0: 'p0,0', // entry_index || "0"
                nol_c2: agfMetadata.nol_c2, // flag webonly
                nol_c5: agfMetadata.nol_c5, // Domain
                nol_c7: agfMetadata.nol_c7, // Clip CRID
                nol_c8: agfMetadata.nol_c8, // 28:54 -> sek
                // Sendereihe, Cliptitel, PubDate yyyy.mm.dd hh:mm
                nol_c9: agfMetadata.nol_c9,
                nol_c10: agfMetadata.nol_c10, // Kanal
                nol_c12: agfMetadata.nol_c12,

                nol_c15: agfMetadata.nol_c15 || '', // entry_agffmt
                nol_c16: agfMetadata.nol_c16 || '',

                nol_c18: agfMetadata.nol_c18,
                nol_c20: agfMetadata.nol_c20,
            },
        }

        let pixelConfig = []
        if (trackingCookie.isTrackingAccepted('agf')) {
            pixelConfig.push(agfConfig)
        }

        if (trackingCookie.isTrackingAccepted('ati')) {
            pixelConfig.push(atiConfig)
        }

        return pixelConfig
    }
    const bindPlayerEvents = function () {
        player.$.on(ardplayer.Player.EVENT_PLAY_STREAM, function (event) {
            switchOverlay()
            fireEvent('hr:global:stopOtherAVs', 'ardplayer', true)
        })

        player.$.on(ardplayer.Player.SETUP_VIEW_COMPLETE, function (event) {
            if (isTeaser) {
                player.play()
            }
        })

        player.$.on(ardplayer.Player.EVENT_PAUSE_STREAM, function (event) {
            switchOverlay()
        })

        player.$.on(ardplayer.Player.EVENT_STOP_STREAM, function (event) {
            switchOverlay()
        })

        listen('hr:global:stopOtherAVs', function (event) {
            if (event.detail != 'ardplayer') {
                player.pause()
            }
        })
    }
    const switchOverlay = function () {
        if (hasOverlay && typeof overlay !== 'undefined') {
            if (overlay.classList.contains('hideOverlay')) {
                overlay.classList.remove('hideOverlay')
            } else {
                overlay.classList.add('hideOverlay')
            }
        }
    }
    if (window.gfkConnector && trackingCookie.isTrackingAccepted('agf') && agfMetadata) {
        gfkConnector.init(function (gfkLinkID) {
            agfMetadata.nol_c20 = 'p20,' + gfkLinkID
            fetchPlayerStyle(skinPath).then(initPlayer())
        })
    } else {
        fetchPlayerStyle(skinPath).then(initPlayer())
    }

    return {
        play: function () {
            player.play()
        },
        pause: function () {
            player.pause()
        },
    }
}

export default VideoLivestream
