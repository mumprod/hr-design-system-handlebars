import DatapolicyCookie from 'components/externalService/datapolicyCookie.subfeature'
import TrackingCookie from 'components/externalService/trackingCookie.subfeature'
import { fireEvent, getJSONCookie, hr$, setJSONCookie, listen } from 'hrQuery'
import { uxAction } from 'base/tracking/atiHelper.subfeature'

const DataPolicySettings = function (context) {
    const { options } = context,
        { element: rootElement } = context,
        settingsButtons = hr$('.js-data-policy-settings-button', document),
        overlay = hr$('.js-data-policy-settings-overlay', rootElement)[0],
        closeButton = hr$('.js-data-policy-settings-close-button', rootElement)[0],
        bodyElement = document.getElementsByTagName('html')[0],
        datapolicyCookie = new DatapolicyCookie(),
        trackingCookie = new TrackingCookie(),
        toggleSwitches = hr$('.js-toggleSwitch-checkbox', rootElement),
        toggleSwitchesExternal = hr$('.js-toggleSwitch-external', rootElement),
        toggleSwitchesTracking = hr$('.js-toggleSwitch-tracking', rootElement),
        toggleAllSwitch = hr$('.js-toggleSwitch-checkbox-all', rootElement)[0],
        providerTitle = hr$('.js-providerTitle', rootElement)[0],
        trackingCookieLifetime = 1000 * 60 * 60 * 24 * 365 * 10
    let atiSecondLevelId = window.xtn2,
        isWebview = window.parent.document.documentElement.classList.contains('webview'),
        //isWebview = window.location.href.match(/(app)(\.[a-zA-Z]*)(\.de)/i), //App URL ...app.hr.de
        //isWebview = window.location.href.match(/(app)/i), //App URL ...app.hr.de
        cookie = {}

        console.log("gelaaaadeeeeeeeen")
    ///////////////////
    // OVERLAY START //
    ///////////////////
    const showSettingsButton = function () {
        let settingsButton = document.getElementById('globalSettingsButton')
        if (isWebview) {
            console.log('Button Anzeige steuern')
            readAppSettingsButtonCookie()
            console.log(cookie['hidePrivacySettingsButton'])
            if (cookie['hidePrivacySettingsButton'] === true) {
                settingsButton.style.display = 'none'
            } else {
                settingsButton.style.display = 'inline-flex'
            }
        } else { 
            settingsButton.style.display = 'inline-flex'
            console.log('Button immer anzeigen, weil nicht App')
        }
    }
    const readAppSettingsButtonCookie = function () {
        cookie = getJSONCookie('appSettings') || {}
    }
    const writeAppSettingsButtonCookie = function () {
        cookie = 'true'
        setJSONCookie('hsAppSettingsButton', cookie, trackingCookieLifetime)
    }
    const initializeSettingsButtons = function () {
        for (let i = 0; i < settingsButtons.length; ++i) {
            if (settingsButtons.length - i == 1) {
                listen(
                    'click',
                    function () {
                        openDialog('Footer')
                        atiSecondLevelId = 1
                    },
                    settingsButtons[i]
                )
            } else {
                if (!settingsButtons[i].getAttribute('listener')) {
                    listen(
                        'click',
                        function () {
                            openDialog('DSGVO-Overlay')
                        },
                        settingsButtons[i]
                    )
                    settingsButtons[i].setAttribute('listener', 'true')
                }
            }
        }
    }
    const openDialog = function (settingsButtonLocation) {
        overlay.classList.add('!flex')
        bodyElement.classList.add('optionOpen')
        uxAction('Einstellungsdialog geöffnet - ' + settingsButtonLocation, atiSecondLevelId)
    }
    const closeDialogeOnOverlay = function (e) {
        if (e.target !== this) return
        closeDialog()
    }
    const closeDialog = function () {
        overlay.classList.remove('!flex')
        bodyElement.classList.remove('optionOpen')
    }
    const shouldDialogBeOpendOnLoad = function () {
        const urlParam = getUrlVars()['openDialog']
        if (typeof urlParam !== 'undefined' && urlParam === 'true') {
            openDialog('Datenschutzerklärung')
        }
    }
    const getUrlVars = function () {
        let vars = {}
        const parts = window.location.href.replace(
            /[?&]+([^=&]+)=([^&]*)/gi,
            function (m, key, value) {
                vars[key] = value
            }
        )
        return vars
    }
    ///////////////////
    // OVERLAY END ////
    ///////////////////

    /////////////////////
    // TOGGLES START ////
    /////////////////////

    const initializeToggleStateExternal = function () {
        for (let i = 0; i < toggleSwitchesExternal.length; ++i) {
            initializeEventListenerForService(i)

            setListenerForService(toggleSwitchesExternal[i])

            if (isCookieSetForService(toggleSwitchesExternal[i].id)) {
                toggleSwitchesExternal[i].checked = true
            } else if (
                !isCookieExistForService(toggleSwitchesExternal[i].id) &&
                toggleSwitchesExternal[i].getAttribute('initial') == 'checked'
            ) {
                toggleSwitchesExternal[i].checked = true
                setCookieForService(toggleSwitchesExternal[i])
            }
        }

        toggleAllSwitch.checked = allTogglesChecked()
        changeProviderTitle()
    }
    const initializeToggleStateTracking = function () {
        for (let i = 0; i < toggleSwitchesTracking.length; ++i) {
            initializeEventListenerForTracking(i)

            setListenerForTracking(toggleSwitchesTracking[i])

            if (isCookieSetForTracking(toggleSwitchesTracking[i].id)) {
                toggleSwitchesTracking[i].checked = true
            }

            if (
                !isCookieExistForTracking(toggleSwitchesTracking[i].id) &&
                toggleSwitchesTracking[i].getAttribute('initial') == 'checked'
            ) {
                toggleSwitchesTracking[i].checked = true
                setCookieForTracking(toggleSwitchesTracking[i])
            }
        }
    }
    const initializeEventListenerForService = function (serviceId) {
        listen(
            'hr:externalService-activate-' + toggleSwitchesExternal[serviceId].id,
            function () {
                toggleSwitchesExternal[serviceId].checked = true
            },
            document
        )
    }
    const initializeEventListenerForTracking = function (serviceId) {
        listen(
            'hr:trackingService-activate-' + toggleSwitchesTracking[serviceId].id,
            function () {
                toggleSwitchesTracking[serviceId].checked = true
            },
            document
        )
    }
    const setListenerForService = function (element) {
        listen(
            'change',
            function () {
                setCookieForService(element)
                toggleAllSwitch.checked = allTogglesChecked()
                changeProviderTitle()
            },
            element
        )
    }
    const setListenerForTracking = function (element) {
        listen(
            'change',
            function () {
                setCookieForTracking(element)
            },
            element
        )
    }
    const setCookieForService = function (element) {
        datapolicyCookie.setCookieForExternalService(element.id, element.checked)
        if (element.checked) {
            fireEvent('hr:externalService-activate-' + element.id)
        } else {
            console.log('fireEvent: hr:externalService-deactivate-' + element.id)
            fireEvent('hr:externalService-deactivate-' + element.id)
        }
    }
    const setCookieForTracking = function (element) {
        trackingCookie.setCookieForTracking(element.id, element.checked)
        if (element.checked) {
            fireEvent('hr:trackingService-activate-' + element.id)
        } else {
            fireEvent('hr:trackingService-deactivate-' + element.id)
        }
    }
    const toggleAll = function () {
        console.log('Toggle All' + toggleAllSwitch.checked)

        for (let i = 0; i < toggleSwitchesExternal.length; ++i) {
            if (toggleSwitchesExternal[i].checked != toggleAllSwitch.checked) {
                toggleSwitchesExternal[i].checked = toggleAllSwitch.checked
                setCookieForService(toggleSwitchesExternal[i])
            }
        }

        changeProviderTitle()
    }
    const allTogglesChecked = function () {
        let allChecked

        for (let i = 0; i < toggleSwitchesExternal.length; ++i) {
            if (toggleSwitchesExternal[i].checked) {
                allChecked = true
            } else {
                allChecked = false

                break
            }
        }
        return allChecked
    }
    const changeProviderTitle = function () {
        if (toggleAllSwitch.checked == true) {
            providerTitle.textContent = 'Alle Anbieter deaktivieren'
        } else {
            providerTitle.textContent = 'Alle Anbieter aktivieren'
        }
    }
    const isCookieSetForService = function (externalService) {
        return datapolicyCookie.isDatapolicyAccepted(externalService)
    }
    const isCookieSetForTracking = function (trackingService) {
        return trackingCookie.isTrackingAccepted(trackingService)
    }
    const isCookieExistForService = function (externalService) {
        return datapolicyCookie.isDatapolicyExistent(externalService)
    }
    const isCookieExistForTracking = function (trackingService) {
        return trackingCookie.isTrackingCookieExistent(trackingService)
    }
    const initializeEventListeners = function () {
        listen('hr:settingsButtonInsideDataPolicyBoxClicked', function () {
            openDialog('DSGVO-Overlay')
        })
        listen('change', toggleAll, toggleAllSwitch)
        listen('click', closeDialog, closeButton)
        listen('click', closeDialogeOnOverlay, overlay)
    }
    // steuert die Darstellung des Buttons für die hs-App ///
    showSettingsButton()
    //// 1. Alle Settings Buttons initialisieren ////
    initializeSettingsButtons()

    //// 2. Toggle States aller Switches setzen ////
    ////    Cookies setzen usw.                 ////
    initializeToggleStateExternal()

    initializeToggleStateTracking()

    //// 3. Event Listener initialisieren ////
    initializeEventListeners()

    shouldDialogBeOpendOnLoad()

    //// 4. Funktion extern aufrufbar machen ////
    return {
        initializeSettingsButtons: initializeSettingsButtons,
    }
}

export default DataPolicySettings
