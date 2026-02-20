import SettingsCookie from './globalSettingsCookie.subfeature'
import DataWrapperContentRefresher from './dataWrapperContentRefresher.subfeature'
import DataWrapperNoResponsiveIframe from './dataWrapperNoResponsiveIframe.subfeature'
import CreateWahlGemeindeErgebnis from './createWahlErgebnisGemeinde.subfeature'
import {
    fireEvent,
    hr$,
    listen,
    loadScript,
    removeScript,
    replaceAnimated,
    requestTimeout,
} from 'hrQuery'

const ExternalService = function (context) {
    const { options } = context,
        { element: rootElement } = context,
        rootParent = rootElement.parentNode
    let dataPolicyBox = hr$('.js-datapolicy', rootElement)[0]
    const dataPolicyBoxHTML = typeof dataPolicyBox !== 'undefined' ? dataPolicyBox.outerHTML : '',
        contentSettingsButton = hr$('.js-content-settings-button', rootParent)[0],
        embedType = options.embedType,
        dataPolicyCheck = options.dataPolicyCheck || false,
        id = options.id,
        iFrameConfig = options.iFrameConfig,
        lazyLoad = options.lazyLoad
    let acceptButton,
        acceptAlwaysCheckbox = hr$('.js-dataPolicy-acceptPermanentely', rootElement)[0]
    let embedCode = options.embedCode,
        iframe,
        settingsCookie = new SettingsCookie(),
        gemeindewahlergebnis,
        isExternalServiceLoaded = false,
        tiktokOnPage = []

    const testDOMElements = function () {
        console.log(rootElement)
        console.log(rootParent)
        console.log(acceptAlwaysCheckbox)
    }
    const embedExternalService = function (callback) {
        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: embedCode,
            headers: { 'Access-Control-Allow-Origin': '*' },
            timeout: 90 * 1000,
            cache: false,
            beforeSend: function () {
                return true
            },
        })
            //Add handlers to be called when the Deferred object is resolved.
            .done(function (data, status, xhr) {
                console.log('Done')
                if (undefined !== callback) {
                    replaceAnimated(rootElement, data.html, false, callback)
                } else {
                    replaceAnimated(rootElement, data.html, false)
                }
            })
            //Add handlers to be called when the Deferred object is rejected.
            .fail(function (xhr, errorType, error) {
                //anzeige irgendetwas hat nicht geklappt
                console.log('Fail:' + errorType)
            })
            .always(function () {
                //aufräumen wenn bedarf besteht.
                console.log('Always')
            })
    }

    const insertExternalService = function () {
        if (embedType !== 'js') {
            loadIframe() // Für alle Dienste, die nicht der DSGVO Datapolicy unterliegen
            return
        }

        const externalServiceMap = {
            '23degrees': createTwentyThreeDegreesEmbed,
            'facebook-post': createFacebookEmbed,
            'instagram': createInstagramEmbed,
            'tiktok': createTikTokEmbed,
            'twitter': createTwitterEmbed,
            'twitter-post': createTwitterPostEmbed,
            'datawrapper_cdn': createDataWrapperEmbed,
            'wahlmonitor': createWahlEmbed,
            'wahlmonitor_v2': createWahlEmbed,
            'wahlkreiskarte': createWahlEmbed,
            'wahlkreiskarte_v2': createWahlEmbed,
            'wahlomat-euwa': createWahlOMatEuwaEmbed,
            'wahlomat-butawa': createWahlOMatButawaEmbed,
            'wahl-gemeinde-ergebnis': createWahlGemeindeErgebnisEmbed,
            'wer-waehlte-wen': werWaehlteWenEmbed,
        }

        const service = externalServiceMap[id]
        if (service) {
            service()
        } else {
            console.error(`No JS Config for external service ${id}`)
        }
    }

    const createWahlGemeindeErgebnisEmbed = function () {
        gemeindewahlergebnis = new CreateWahlGemeindeErgebnis(embedCode, rootElement)
        gemeindewahlergebnis.createErgebnis()
    }
    const createWahlOMatEuwaEmbed = function () {
        const divTag = document.createElement('div')
        divTag.id = 'wahl-o-mat-europawahl-2024'
        rootElement.insertBefore(divTag, null)
        loadScript('wahl-o-mat-js', 'https://static.hr.de/wahl-o-mat/embed.js', true)
    }
    const createWahlOMatButawaEmbed = function () {
        const divTag = document.createElement('div')
        divTag.id = 'wahl-o-mat-bundestagswahl-2025'
        rootElement.insertBefore(divTag, null)
        loadScript('wahl-o-mat-js', 'https://static.hr.de/wahl-o-mat/bundestagswahl/embed.js', true)
    }

    const createWahlEmbed = function () {
        let script = document.createElement('script')
        let cleanUrl
        const parts = embedCode.split('*')
        if (parts.length === 2) {
            const params = parts[1].split(' ')
            cleanUrl = parts[0].trim()
            const queryParams = {}
            for (const param of params) {
                const [key, value] = param.split('=')
                queryParams[key] = value
                script.setAttribute(key, queryParams[key])
            }
        }
        script.src = cleanUrl
        script.type = 'text/javascript'
        rootElement.appendChild(script)
    }

    const werWaehlteWenEmbed = function () {
        let iframe = document.createElement('iframe')
        let cleanUrl
        const parts = embedCode.split('*')
        if (parts.length === 2) {
            const params = parts[1].split(' ')
            cleanUrl = parts[0].trim()
            for (const param of params) {
                const [key, value] = param.split('=')
                if (key === 'id') {
                    iframe.id = value
                } else {
                    iframe.setAttribute(key, value)
                }
            }
        }

        iframe.src = cleanUrl
        iframe.style.width = '100%'
        iframe.style.border = '0'
        if (lazyLoad) {
            iframe.loading = 'lazy'
        }
        rootElement.appendChild(iframe)

        window.addEventListener('message', function (e) {
            if (
                e.data.contentUrl &&
                e.data.contentUrl.includes('/wahl/embed/2025-02-23-BT-DE/wer-waehlte-wen/')
            ) {
                let h = parseInt(e.data.height, 10) + 2
                if (iframe.id === 'ts-embed-wer-waehlte-wen-2025-02-23-BT-DE') {
                    iframe.style.height = h + 'px'
                }
            }
        })
    }

    const getAspectRatioClass = function () {
        switch (iFrameConfig.aspectRatio) {
            case '16x9':
                return 'ar-16-9'
            case '16x7':
                return 'ar-16-7'
            case '4x3':
                return 'ar-4-3'
            case '100x27':
                return 'ar-100-27'
            case '100':
                return 'ar-1-1'
            case '9x16':
                return 'ar-9-16'
            case '7x16':
                return 'ar-7-16'
            default:
                return 'ar-16-9'
        }
    }

    const createDataWrapperEmbed = function () {
        removeDatapolicyBox()
        const uniqueId = createUniqueID()
        const {
            isNoResponsiveIframe,
            isWebcomponent,
            refreshContent,
            aspectRatio,
            fixedHeight,
            refreshIntervall,
        } = iFrameConfig

        const addContentRefresher = (isWebcomponent) => {
            new DataWrapperContentRefresher({
                rootElement,
                id: uniqueId,
                refreshIntervall,
                isWebcomponent,
            }).createRefresher()
        }

        if (isNoResponsiveIframe == 'true') {
            //Klassisches Iframe mit AR-Wrapper oder fester Höhe
            new DataWrapperNoResponsiveIframe({
                rootElement: rootElement,
                aspectRatio: aspectRatio,
                fixedHeight: fixedHeight,
                id: uniqueId,
                embedCode: embedCode,
                lazyLoad: lazyLoad,
            }).createNoResponsiveIframe()

            if (refreshContent == 'true') {
                addContentRefresher(false)
            }
            return
        }

        if (isWebcomponent == 'true') {
            // Webcomponent
            const divTag = document.createElement('div')
            divTag.id = `datawrapper-chart-${uniqueId}`
            rootElement.appendChild(divTag)

            const scriptTag = document.createElement('script')
            Object.assign(scriptTag, {
                id: 'datawrapper-component-js',
                type: 'text/javascript',
                defer: true,
                src: `${embedCode}embed.js?v=1`,
                charset: 'utf-8',
            })

            const noScriptTag = document.createElement('noscript')
            const imageTag = document.createElement('img')
            imageTag.src = `${embedCode}full.png`
            imageTag.alt = ''
            noScriptTag.appendChild(imageTag)

            divTag.append(scriptTag, noScriptTag)

            if (refreshContent == 'true') {
                addContentRefresher(true)
            }
            return
        }
        //Responsives Iframe
        const iframe = document.createElement('iframe')
        //Auflösen nach Tailwind-Klassen //dataWrapper-embed
        iframe.className = 'w-0 !min-w-full border-0'
        iframe.setAttribute('webkitallowfullscreen', '')
        iframe.setAttribute('mozallowfullscreen', '')
        iframe.setAttribute('allowfullscreen', '')
        iframe.setAttribute('scrolling', 'no')
        iframe.setAttribute('frameborder', '0')
        iframe.src = embedCode
        iframe.id = `datawrapper-chart-${uniqueId}`
        if (lazyLoad) {
            iframe.loading = 'lazy'
        }
        rootElement.appendChild(iframe)

        loadScript(
            'datawrapper-js',
            'https://static.hr.de/hessenschau/datawrapper/responsiveIframe.js',
            true
        )
        if (refreshContent == 'true') {
            addContentRefresher(false)
        }
    }

    const createUniqueID = function () {
        console.log('Erzeuge einzigartige ID')
        return Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substring(2, 10)
    }

    const createTwentyThreeDegreesEmbed = function () {
        removeDatapolicyBox()
        const regex = /embed\/([^?]+)\?(.*)&title=([^&]*)$/
        const match = decodeURIComponent(embedCode).match(regex)
        let slug = null
        let url = null
        let iframeTitle = null
        if (match) {
            slug = match[1]
            url = embedCode.split('&title')[0]
            iframeTitle = match[3] || '23degrees Embed'
        }
        if (!slug || !url) return

        // Style-Element erzeugen und einfügen
        const style = document.createElement('style')
        style.textContent = `
        .responsive23-${slug} { width: 100%; padding-top: 100%; }
        @media (max-width: 800px) { .responsive23-${slug} { padding-top: 80%; } }
        @media (max-width: 600px) { .responsive23-${slug} { padding-top: 90.91%; } }
        @media (max-width: 480px) { .responsive23-${slug} { padding-top: 111.11%; } }
        @media (max-width: 360px) { .responsive23-${slug} { padding-top: 142.86%; } }
    `
        rootElement.appendChild(style)

        // Responsive Container und Iframe erzeugen
        const div = document.createElement('div')
        div.className = `responsive23-${slug}`
        div.id = `container23-${slug}`
        div.style.position = 'relative'

        const iFrame = document.createElement('iframe')
        iFrame.src = decodeURIComponent(embedCode)
        Object.assign(iFrame.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            border: '0',
        })
        iFrame.allowFullscreen = true
        iFrame.title = iframeTitle

        div.appendChild(iFrame)
        rootElement.appendChild(div)

        // Script einfügen
        const script = document.createElement('script')
        script.src = `https://app.23degrees.io/services/public/embed-code/${slug}`
        script.type = 'text/javascript'
        rootElement.appendChild(script)
    }

    const createFacebookEmbed = function () {
        loadScript(
            'facebook-js',
            'https://connect.facebook.net/de_DE/sdk.js#xfbml=1&version=v3.2',
            true
        )
        var width =
            undefined != rootParent.clientWidth
                ? rootParent.clientWidth > 350
                    ? rootParent.clientWidth
                    : 'auto'
                : 'auto'
        var div =
            "<div class='fb-post' data-lazy='true' data-width='" +
            width +
            "' data-href='" +
            embedCode +
            "'></div>"

        replaceAnimated(rootElement, div, false, reloadFacebookEmbed)
    }

    const reloadFacebookEmbed = function () {
        requestTimeout(function () {
            if (typeof FB != 'undefined') {
                FB.init({
                    status: true,
                    xfbml: true,
                    version: 'v10.0',
                })
            } else {
                reloadFacebookEmbed()
            }
        }, 125)
    }

    const createInstagramEmbed = function () {
        loadScript('instagram-js', '//www.instagram.com/embed.js', true)
        embedCode = options.embedCode
        var instagramEmbedCode =
            "<blockquote class='instagram-media' data-instgrm-captioned " +
            "data-instgrm-permalink='" +
            embedCode +
            "?utm_source=ig_embed&amp;utm_campaign=loading'" +
            "data-instgrm-version='14'" +
            "style='background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:724px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);' >" +
            '</blockquote>'
        replaceAnimated(rootElement, instagramEmbedCode, false, reloadInstagramEmbed)
    }

    const reloadInstagramEmbed = function () {
        requestTimeout(function () {
            if (typeof instgrm != 'undefined') {
                instgrm.Embeds.process(rootElement)
            } else {
                reloadInstagramEmbed()
            }
        }, 250)
    }

    async function createTikTokEmbed() {
        if (!document.getElementById('tiktok-js')) {
            loadScript('tiktok-js', '//www.tiktok.com/embed.js', true)
        }
        const tiktokEmbedDataUrl = `https://www.tiktok.com/oembed?url=${options.embedCode}`
        const tiktokEmbedData = await fetch(tiktokEmbedDataUrl)
        const tiktokEmbedDataJson = await tiktokEmbedData.json()
        replaceAnimated(rootElement, tiktokEmbedDataJson.html, false, reloadTikTokEmbed)
    }

    const reloadTikTokEmbed = function () {
        if (!tiktokOnPage.length) {
            const selector = `blockquote.tiktok-embed[cite="${options.embedCode}"]`
            tiktokOnPage = Array.from(document.querySelectorAll(selector))
        }
        if (typeof tiktokEmbed !== 'undefined' && tiktokOnPage.length) {
            tiktokEmbed.lib.render(tiktokOnPage)
        } else {
            reloadTikTokEmbed()
        }
    }

    const createTwitterEmbed = function () {
        loadScript('twitter-js', '//platform.twitter.com/widgets.js', true)
        embedExternalService(reloadTwitterWidget)
    }

    const createTwitterPostEmbed = function () {
        loadScript('twitterpost-js', '//platform.twitter.com/widgets.js', true)
        embedCode = options.embedCode
        var twitterEmbedCode =
            "<blockquote class='twitter-tweet tw-align-center'>" +
            "<a href='" +
            embedCode +
            "'></a>" +
            '</blockquote>'
        replaceAnimated(rootElement, twitterEmbedCode, false, reloadTwitterWidget)
    }

    const reloadTwitterWidget = function () {
        requestTimeout(function () {
            if (typeof twttr != 'undefined') {
                twttr.widgets.load(rootElement)
            } else {
                reloadTwitterWidget()
            }
        }, 250)
    }

    const loadIframe = function () {
        console.log('load iframe ' + id)
        const loadingAttribute = lazyLoad ? "loading='lazy'" : ''
        iframe =
            "<iframe id='i_frame' " +
            loadingAttribute +
            " data-isloaded='0' src='" +
            embedCode +
            "' frameborder='0' class='w-full h-full' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
        if (iFrameConfig && iFrameConfig.aspectRatio) {
            iframe =
                "<div class='!h-full'><div class='" +
                getAspectRatioClass() +
                "'><iframe id='i_frame' " +
                loadingAttribute +
                " data-isloaded='0' src='" +
                embedCode +
                "' frameborder='0' class='w-full h-full' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div></div>"
            //TODO Weiche Animation der Inhalte
        } else {
            if (iFrameConfig && iFrameConfig.fixedHeight) {
                iframe =
                    "<div style='height:" +
                    iFrameConfig.fixedHeight +
                    "px'><iframe data-isloaded='0' " +
                    loadingAttribute +
                    " src='" +
                    embedCode +
                    "' frameborder='0' class='w-full h-full' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>"
            } else {
                iframe =
                    "<div class='!h-full'><iframe data-isloaded='0' " +
                    loadingAttribute +
                    " src='" +
                    embedCode +
                    "' frameborder='0' class='w-full h-full' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>"
            }
        }
        replaceAnimated(rootElement, iframe, false)
    }

    const initDataPolicy = function () {
        if (dataPolicyCheck) {
            acceptButton = hr$('.js-dataPolicy-accept', rootElement)[0]
            acceptButton && listen('click', handleDatapolicy, acceptButton)
            if (settingsCookie.isSettingsCookieExistent(id)) {
                console.log(
                    'Dienst ' +
                        id +
                        ' ist im Cookie enthalten und hat den Wert ' +
                        settingsCookie.isSettingsCookieAccepted(id)
                )
                if (settingsCookie.isSettingsCookieAccepted(id)) {
                    console.log('Lade den Dienst')
                    loadServiceWithDataPolicyButton()
                } else {
                    console.log('Zeige Datapolicy-Box')
                    dataPolicyBox.style.visibility = 'visible'
                }
            } else {
                console.log(
                    'Dienst ' + id + ' ist im Cookie nicht enthalten, prüfe daher den Default'
                )
                if (document.getElementById(id).getAttribute('data-whitelist') == 'true') {
                    console.log('Ist per Default eingeschaltet')
                    console.log('Lade den Dienst')
                    loadServiceWithDataPolicyButton()
                } else {
                    console.log('Ist per Default ausgeschaltet')
                    console.log('Zeige Datapolicy-Box')
                    dataPolicyBox.style.visibility = 'visible'
                }
            }
            listen('hr:externalService-activate-' + id, loadServiceWithDataPolicyButton)
            listen('hr:externalService-deactivate-' + id, removeExternalService)
        } else {
            insertExternalService()
        }
    }

    const handleDatapolicy = function (event) {
        if (acceptAlwaysCheckbox.checked == true) {
            fireEvent('hr:externalService-activate-' + id)
            settingsCookie.setCookieForOptions(id)
        } else {
            loadServiceWithDataPolicyButton()
            console.log('External Service once loaded - ' + id)
        }
        event.stopPropagation()
    }

    const loadServiceWithDataPolicyButton = function () {
        if (rootElement.children[0].classList.contains('js-datapolicy')) {
            insertExternalService()
            isExternalServiceLoaded = true
            toggleContentSettingsButton()
        }
    }
    const toggleContentSettingsButton = function () {
        if (isExternalServiceLoaded) {
            contentSettingsButton.classList.remove('hidden')
        } else {
            contentSettingsButton.classList.add('hidden')
        }
        console.log('Toggle den Einstellungsbutton außerhalb weil ' + isExternalServiceLoaded)
    }

    const removeDatapolicyBox = function () {
        rootElement.innerHTML = ''
        rootElement.classList.remove('c-dataPolicy')
    }

    const removeExternalService = function () {
        replaceAnimated(rootElement, dataPolicyBoxHTML, true, reinitiateDataPolicyBox)
    }

    const reinitiateDataPolicyBox = function () {
        removeScript('scrbbl-js')
        removeScript('js-wahlergebnis')
        dataPolicyBox = hr$('.js-datapolicy', rootElement)[0]
        dataPolicyBox.style.visibility = 'visible'
        isExternalServiceLoaded = false
        initDataPolicy()
        toggleContentSettingsButton()
    }

    const resetCheckboxForPermanentService = function () {
        /*Die Autocompletion des Browsers merkt sich die Zustände von Formularelementen nach einem Refresh, das wird hier hart zurückgesetzt*/
        var clist = document.getElementsByClassName('js-dataPolicy-acceptPermanentely')
        for (var i = 0; i < clist.length; ++i) {
            clist[i].checked = false
        }
    }
    initDataPolicy()
    resetCheckboxForPermanentService()
    testDOMElements()
}

export default ExternalService
