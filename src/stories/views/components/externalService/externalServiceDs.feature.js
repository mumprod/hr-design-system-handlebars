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
    requestTimeout
} from 'hrQuery'

const ExternalService = function (context) {
    const   { options } = context,
            { element: rootElement } = context,
            rootParent = rootElement.parentNode
    let dataPolicyBox = hr$('.js-datapolicy', rootElement)[0]
    const dataPolicyBoxHTML = typeof dataPolicyBox !== 'undefined' ? dataPolicyBox.outerHTML : '',
        contentSettingsButton = hr$('.js-content-settings-button', rootParent)[0],
        embedType = options.embedType,
        dataPolicyCheck = options.dataPolicyCheck || false,
        id = options.id,
        iFrameConfig = options.iFrameConfig
    let acceptButton,
        acceptAlwaysCheckbox = hr$('.js-dataPolicy-acceptPermanentely', rootElement)[0]
    let embedCode = options.embedCode,
        iframe,
        settingsCookie,
        noResponsiveIframe,
        contentRefresher,
        gemeindewahlergebnis,
        uniqueId,
        isExternalServiceLoaded = false
        
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
        switch (embedType) {
            case 'js':
                switch (id) {
                    case 'facebook-post':
                        createFacebookEmbed()
                        break
                    case 'instagram':
                        createInstagramEmbed()
                        break
                    case 'twitter':
                        createTwitterEmbed()
                        break
                    case 'twitter-post':
                        createTwitterPostEmbed()
                        break
                    case 'datawrapper_cdn':
                        createDataWrapperEmbed()
                        break
                    case 'wahlmonitor':
                        createWahlEmbed()
                        break
                    case 'wahlkreiskarte':
                        createWahlEmbed()
                        break
                    case 'wahlomat':
                        createWahlOMatEmbed()
                        break  
                    case 'wahl-gemeinde-ergebnis':
                        createWahlGemeindeErgebnisEmbed()
                        break  
                    default:
                        console.error('No JS Config for external service ' + id)
                        break
                }
                break
            default:
                loadIframe() //für alle Dienste die nicht der DSGVO Datapolicy unterliegen
        }
    }
   
    const createWahlGemeindeErgebnisEmbed = function () {
        gemeindewahlergebnis = new CreateWahlGemeindeErgebnis(embedCode,rootElement)
        gemeindewahlergebnis.createErgebnis()
    }
    const createWahlOMatEmbed = function () {

        const divTag = document.createElement('div')
        divTag.id = 'wahl-o-mat'
        rootElement.insertBefore(divTag, null)
        loadScript(
            'wahl-o-mat-js',
            'https://static.hr.de/wahl-o-mat/embed.js',
            true
        )

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
    const createUniqueID = function() {
       console.log("Erzeuge einzigartige ID")
       uniqueId = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(2, 10)
    }

    const getAspectRatioClass = function () {
        switch (iFrameConfig.aspectRatio) {
            case '16x9':
                return "ar-16-9"
            case '16x7':
                return "ar-16-7"
            case '4x3':
                return "ar-4-3"
            case '100x27':
                return "ar-100-27"
            case '100':
                return "ar-1-1"                
            case '9x16':
                return "ar-9-16"
            case '7x16':
                return "ar-7-16"
            default:
                return "ar-16-9"
        }   
    }

    const createDataWrapperEmbed = function () {
        removeDatapolicyBox()
        createUniqueID()
        console.log("UniqueID"+uniqueId)
        if (iFrameConfig.noResponsiveIframe == 'true') {

             //Klassisches Iframe mit AR-Wrapper oder fester Höhe
             noResponsiveIframe = new DataWrapperNoResponsiveIframe(context, iFrameConfig.aspectRatio, iFrameConfig.fixedHeight, uniqueId, embedCode)
             noResponsiveIframe.createNoResponsiveIframe()
 
             if (iFrameConfig.refreshContent == 'true') {
                 console.log("contentRefresher anfügen")
                 contentRefresher = new DataWrapperContentRefresher(context, uniqueId, iFrameConfig.refreshIntervall, false)
                 contentRefresher.createRefresher()
             }
            
        } 
        else {
            if(iFrameConfig.webcomponent == 'true') {
                
                // Webcomponent
                const divTag = document.createElement('div')
                divTag.id = 'datawrapper-chart-' + uniqueId
                rootElement.insertBefore(divTag, null)
                const scriptTag = document.createElement('script')
                scriptTag.setAttribute('id', 'datawrapper-component-js')
                scriptTag.setAttribute('type', 'text/javascript')
                scriptTag.setAttribute('defer', 'defer')
                scriptTag.setAttribute('src', embedCode + 'embed.js?v=1')
                scriptTag.setAttribute('charset', 'utf-8')
                const noScriptTag = document.createElement('noscript')
                const imageTag = document.createElement('img')
                imageTag.src = embedCode + 'full.png'
                imageTag.alt = ''
                noScriptTag.appendChild(imageTag)
                divTag.appendChild(scriptTag)
                divTag.appendChild(noScriptTag)

                if (iFrameConfig.refreshContent == 'true') {
                    console.log("contentRefresher anfügen")
                    contentRefresher = new DataWrapperContentRefresher(context, uniqueId, iFrameConfig.refreshIntervall, true)
                    contentRefresher.createRefresher()
                }
            }
            else {

                //Responsives Iframe
                var iframe = document.createElement('iframe')
                //Auflösen nach Tailwind-Klassen //dataWrapper-embed
                iframe.className = 'w-0 !min-w-full border-0'
                iframe.setAttribute('webkitallowfullscreen', '')
                iframe.setAttribute('mozallowfullscreen', '')
                iframe.setAttribute('allowfullscreen', '')
                iframe.setAttribute('scrolling', 'no')
                iframe.setAttribute('frameborder', '0')
                iframe.src = embedCode
                iframe.id = 'datawrapper-chart-' + uniqueId
                rootElement.insertBefore(iframe, null)

                loadScript(
                    'datawrapper-js',
                    'https://static.hr.de/hessenschau/datawrapper/responsiveIframe.js',
                    true
                ) 
                if (iFrameConfig.refreshContent == 'true') {
                    console.log("contentRefresher anfügen")
                    contentRefresher = new DataWrapperContentRefresher(context, uniqueId, iFrameConfig.refreshIntervall, false)
                    contentRefresher.createRefresher()
                }
               
            }
           
           
        }
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
        iframe = "<iframe id='i_frame' data-isloaded='0' src='"+ embedCode +"' frameborder='0' class='w-full h-full' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
        if (iFrameConfig.aspectRatio) {
            iframe ="<div class='!h-full'><div class='"+ getAspectRatioClass() +"'><iframe id='i_frame' data-isloaded='0' src='"+ embedCode +"' frameborder='0' class='w-full h-full' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div></div>"
            //TODO Weiche Animation der Inhalte
        } else {
            if (iFrameConfig.fixedHeight) {
                iframe = "<div style='height:"+ iFrameConfig.fixedHeight +"px'><iframe data-isloaded='0' src='"+ embedCode +"' frameborder='0' class='w-full h-full' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>"
            } else {
                iframe = "<div class='!h-full'><iframe data-isloaded='0' src='"+ embedCode +"' frameborder='0' class='w-full h-full' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>"
            }
        }
        replaceAnimated(rootElement, iframe, false)
    }

    const initDataPolicy = function () {
        if (dataPolicyCheck) {
            settingsCookie = new SettingsCookie()
            acceptButton = hr$('.js-dataPolicy-accept', rootElement)[0]
            listen('click', handleDatapolicy, acceptButton)
            if (settingsCookie.isSettingsCookieAccepted(id)) {
                    loadServiceWithDataPolicyButton()
            } else {
                    dataPolicyBox.style.visibility = 'visible'
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
