import { fireEvent, getJSONCookie, hr$, listen, setJSONCookie, unlisten } from 'hrQuery'
import { uxAction } from 'base/tracking/pianoHelper.subfeature'

const ShareCompact = (context) => {
    const { options } = context
    const { element: rootElement } = context
    const isClosedClass = '-isClosed'
    const mainButton = hr$('.c-shareCompact__mainButton', rootElement)[0]
    const shareButtons = hr$('.c-shareCompact__shareButtons', rootElement)[0]
    const messageDiv = hr$('.c-shareCompact__message', rootElement)[0]
    const { url, title } = options
    const isMobileApple = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i)
    const isMobileOther = navigator.userAgent.match(
        /(Android)|(webOS)|(Blackberry)|(Windows Phone)/i
    )
    const isWebview = window.parent.document.documentElement.classList.contains('webview')
    //const isWebview = window.location.href.match(/(app)(\.[a-zA-Z]*)(\.de)/i) //App URL ...app.hr.de
    //const isWebview = window.location.href.match(/(app)/i)
    let cookie = {}
    const trackingCookieLifetime = 1000 * 60 * 60 * 24 * 365 * 10

    const shareLinks = {
        twitter: hr$('.js-shareLinkTwitter', rootElement)[0],
        facebook: hr$('.js-shareLinkFacebook', rootElement)[0],
        whatsapp: hr$('.js-shareLinkWhatsapp', rootElement)[0],
        mail: hr$('.js-shareLinkMail', rootElement)[0],
        copy2clip: hr$('.js-shareLinkCopy', rootElement)[0],
    }

    let isClosed = true
    const readAppVersionCookie = function () {
        cookie = getJSONCookie('appSettings') || {}
    }
    const writeAppVersionCookie = function () {
        cookie = '209'
        setJSONCookie('hsAppBuildNumber', cookie, trackingCookieLifetime)
    }
    const closeMenu = () => {
        console.log('closeMenu')
        rootElement.classList.add(isClosedClass)
        shareButtons.classList.add('hide')
        isClosed = true
    }
    const openMenu = () => {
        console.log('openMenu')
        rootElement.classList.remove(isClosedClass)
        shareButtons.classList.remove('hide')
        isClosed = false
    }
    const nativeShare = () => {
        navigator
            .share({
                title,
                url,
            })
            .then(function () {
                console.log('Danke fürs Teilen!')
            })
            .catch(console.error)
        uxAction('newSocialShareClick::mainButton-nativeShare')
    }
    const handleClickOnMainButton = (event) => {
        event.stopPropagation()
        if (isWebview) {
            readAppVersionCookie()
            if (isMobileApple) {
                console.log('apple mobile browser')
                nativeShare()
            } else if (isMobileOther) {
                console.log('non-apple mobile browser')
                /*Check Build Version of App*/
                if (cookie['fireCustomJsShareEvent'] === true) {
                    /*Custom Event für App unter Android*/
                    fireEvent('hr:global:shareCompactClickAndroidApp', {
                        title: title,
                        url: url,
                    })
                    console.log('Custom-Event für Android')
                } else {
                    fireEvent('hr:global:shareCompactClick', {
                        origin: rootElement,
                        currentTarget: event.currentTarget,
                    })
                }
            }
            console.log('sharing - for app channel')
        } else {
            if ((navigator.share && isMobileApple) || (navigator.share && isMobileOther)) {
                console.log('native share in mobile view supported')
                nativeShare()
            } else {
                fireEvent('hr:global:shareCompactClick', {
                    origin: rootElement,
                    currentTarget: event.currentTarget,
                })
            }
            console.log('sharing - no app channel')
        }
    }

    const copyToClipboard = (event) => {
        const el = document.createElement('textarea')
        el.value = url
        el.setAttribute('readonly', '')
        el.style.position = 'absolute'
        el.style.left = '-9999px'
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)

        messageDiv.classList.remove('hide')

        window.setTimeout(() => {
            messageDiv.classList.add('hide')
        }, 2000)
    }

    const checkIfCloseOrOpen = (event) => {
        if (isClosed) {
            if (event.detail.origin === rootElement) {
                uxAction('newSocialShareClick::mainButton-open')
                openMenu()
                listen('click', handleClickOnMainButton, document)
            }
        } else {
            if (event.detail.currentTarget === mainButton) {
                uxAction('newSocialShareClick::mainButton-close')
            } else {
                uxAction('newSocialShareClick::mainButton-close-outside')
            }
            closeMenu()
            unlisten('click', handleClickOnMainButton, document)
        }
    }
    const initializeShareLinksTracking = () => {
        listen(
            'click',
            function () {
                console.log('twitter')
                uxAction('newSocialShareClick::twitter')
            },
            shareLinks.twitter
        )
        listen(
            'click',
            function () {
                console.log('facebook')
                uxAction('newSocialShareClick::facebook')
            },
            shareLinks.facebook
        )
        listen(
            'click',
            function () {
                console.log('whatsapp')
                uxAction('newSocialShareClick::whatsapp')
            },
            shareLinks.whatsapp
        )
        listen(
            'click',
            function () {
                console.log('mail')
                uxAction('newSocialShareClick::mail')
            },
            shareLinks.mail
        )
        listen(
            'click',
            function () {
                console.log('copy2clipboard')
                uxAction('newSocialShareClick::copy2clipboard')
            },
            shareLinks.copy2clip
        )
    }

    listen('hr:global:shareCompactClick', checkIfCloseOrOpen)
    listen('click', handleClickOnMainButton, mainButton)
    listen('click', copyToClipboard, shareLinks.copy2clip)
    initializeShareLinksTracking()
    /*if (isWebview) {
        writeAppVersionCookie()
    }*/
}
export default ShareCompact
