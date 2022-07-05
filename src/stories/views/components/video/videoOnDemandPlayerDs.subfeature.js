import { fireEvent, hr$, listen, loadScript } from 'hrQueryDs'
import TrackingCookie from 'components/externalService/trackingCookieDs.subfeature'

const VideoOnDemandPlayer = function (options, rootElement) {
    'use strict'
console.log('VideoOnDemandPlayer');
    const skinPath = options.skinPath,
        isAdaptiveStream = options.isAdaptiveStream,
        basePlayerUrl = options.baseUrl,
        previewImageUrl = options.previewImageUrl,
        adaptiveStreamingUrl = options.adaptiveStreamingUrl || '',
        videoResolutionLevels = options.videoResolutionLevels,
        streamUrl = options.streamUrl,
        ardplayerUrl = options.ardplayerUrl,
        smarttagUrl = options.smarttagUrl,
        defaultQuality = ['auto'],
        agfMetadata = options.mediaMetadata.agf,
        agfAppId = options.agfAppId,
        atiMetadata = options.mediaMetadata.ati,
        playerId = options.containerId,
        subtitle = options.subtitle || '',
        autoplay = options.autoplay || false,
        trackingCookie = new TrackingCookie(),
        videoKey = options.videoKey || undefined,
        isTeaser = options.position && options.position === 'teaser'
    let playerConfig,
        player,
        mediaCollection,
        mediaStreamArray = []

    /* 	console.log(skinPath);
        console.log(isAdaptiveStream);
        console.log(basePlayerUrl);
        console.log(previewImageUrl);
        console.log(adaptiveStreamingUrl);
        console.log(videoResolutionLevels);
        console.log(streamUrl);
        console.log(ardplayerUrl);
        console.log(smarttagUrl);
        console.log(defaultQuality);
        console.log(agfMetadata);
        console.log(agfAppId);
        console.log(atiMetadata);
 */
    const loadFileFromUrl = function (url) {
        let client
        client = new XMLHttpRequest()
        client.open('GET', url)
        client.onreadystatechange = function () {
            if (client.readyState == 4 && client.status == 200) {
                if (client.responseText) {
                    processStreamDataFromFile(client).then(initPlayer())
                }
            }
        }
        client.send()
    }

    const processStreamDataFromFile = function (data) {
        return new Promise(function (resolve, reject) {
            let videoResolutionStreams = []

            for (let i = 0; videoResolutionLevels.length > i; i++) {
                videoResolutionStreams[i] = {
                    _quality: i + 1,
                    _server: '',
                    _stream: videoResolutionLevels[i].url,
                    _cdn: '',
                    _label: videoResolutionLevels[i].verticalResolution + 'p',
                }
                defaultQuality[i + 1] = i
            }

            mediaStreamArray = [
                {
                    _quality: 'auto',
                    _server: '',
                    _stream: adaptiveStreamingUrl,
                    _cdn: '',
                    _label: 'auto',
                },
            ].concat(videoResolutionStreams)

            resolve('Mediastream-Arrays erzeugt')
        })
    }

    const setupPlayer = function () {
        if (isAdaptiveStream == true) {     
            loadFileFromUrl(adaptiveStreamingUrl)
        } else {
            mediaStreamArray[0] = {
                _quality: 'auto',
                _server: '',
                _stream: streamUrl,
                _cdn: '',
                _label: 'auto',
            }

            initPlayer()
        }
    }

    const initPlayer = function () {
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
                console.log(link)
                const headScript = document.querySelector('script')
                headScript.parentNode.insertBefore(link, headScript)
                resolve('Style wurde neu geladen')
            }
        })
    }

    const createPlayer = function () {
        loadScriptsForAddons()
        createMediaCollection()

        createPlayerConfig()

        whenAvailable('ardplayer', function () {
            player = new ardplayer.Player(playerId, playerConfig, mediaCollection)
            bindPlayerEvents()
        })
    }

    const loadScriptsForAddons = function () {
        if (trackingCookie.isTrackingAccepted('ati')) {
            loadScript('js-smarttagProd', smarttagUrl)
        }
    }

    const createMediaCollection = function () {
        mediaCollection = {
            _type: 'video',
            _isLive: false,
            _defaultQuality: defaultQuality,
            _previewImage: previewImageUrl,
            _vttElements: createSubtitleElements(),
            _subtitleOffset: 0,
            _mediaArray: createMediaArray(),
        }
    }

    const createMediaArray = function () {
        let mediaArray = []

        mediaArray[0] = {
            _plugin: 1,
            _mediaStreamArray: mediaStreamArray,
        }

        return mediaArray
    }

    const createSubtitleElements = function () {
        let subtitleElements = []

        if (subtitle !== '') {
            subtitleElements[0] = {
                title: 'Deutsch',
                lang: 'de',
                src: subtitle,
            }
        }

        return subtitleElements
    }

    const createPlayerConfig = function () {
        playerConfig = {
            _representationArray: [
                {
                    _representationClass: 'm',
                },
            ],
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
        const atiConfig =
            typeof atiMetadata != 'undefined'
                ? {
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
                          mediaTheme1: 'OnDemand',
                          mediaLabel: atiMetadata.mediaLabel,
                          duration: agfMetadata.length,
                          broadcastMode: 'clip',
                          debug: 'true',
                      },
                      playclickData: {
                          chapter1: 'Video-Start',
                          chapter2: 'OnDemand',
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
                : {}

        const agfConfig =
            typeof agfMetadata != 'undefined'
                ? {
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
                : {}

        let pixelConfig = []

        if (trackingCookie.isTrackingAccepted('agf') && agfConfig) {
            pixelConfig.push(agfConfig)
        }

        if (trackingCookie.isTrackingAccepted('ati') && atiConfig) {
            pixelConfig.push(atiConfig)
        }

        return pixelConfig
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

        player.$.on(ardplayer.Player.SETUP_VIEW_COMPLETE, function (event) {
            if (isTeaser) {
                player.play()
            }
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
        // listen('hr:global:startVideo:'+playerId, function (event) {
        //     if (event.detail == 'ardplayer') {
        //         player.play()
        //     }
        // })
       
    }
    
    if (trackingCookie.isTrackingAccepted('agf') && window.gfkConnector && agfMetadata) {
        gfkConnector.init(function (gfkLinkID) {
            agfMetadata.nol_c20 = 'p20,' + gfkLinkID
            setupPlayer()
        })
    } else {
        setupPlayer()
    }

    return {
        play: function() {
            player.play()
        },
        pause: function() {
            player.pause()
        }
    }
}

export default VideoOnDemandPlayer
