import DatapolicyCookie from 'components/externalService/datapolicyCookie.subfeature'
import TrackingCookie from 'components/externalService/trackingCookie.subfeature'
import SettingsCookie from 'components/externalService/globalSettingsCookie.subfeature'
import { fireEvent, getJSONCookie, hr$, setJSONCookie, listen } from 'hrQuery'
import { uxAction } from 'base/tracking/pianoHelper.subfeature'

import A11yDialog from 'a11y-dialog'
import { deleteCookie } from '../../generic/hrQuery.subfeature'

const DataPolicySettings = function (context) {
    const { options } = context,
        { element: rootElement } = context,
        container = hr$('#datapolicy-settings-dialog',document)[0],
        dialog = new A11yDialog(container),
        settingsButtons = hr$('.js-data-policy-settings-button', document),
        overlay = hr$('.js-data-policy-settings-overlay', rootElement)[0],
        closeButton = hr$('.js-data-policy-settings-close-button', rootElement)[0],
        bodyElement = document.getElementsByTagName('html')[0],
        datapolicyCookie = new DatapolicyCookie(),
        trackingCookie = new TrackingCookie(),
        settingsCookie = new SettingsCookie(),
        toggleSwitches = hr$('.js-toggleSwitch-checkbox', container),
        toggleSwitchesExternal = hr$('.js-toggleSwitch-external', container),
        toggleSwitchesTracking = hr$('.js-toggleSwitch-tracking', container),
        toggleAllSwitch = hr$('.js-toggleSwitch-checkbox-all', container)[0],
        providerTitle = hr$('.js-providerTitle', container)[0],
        trackingCookieLifetime = 1000 * 60 * 60 * 24 * 365 * 10
        let isWebview = window.parent.document.documentElement.classList.contains('webview'),
        appSettingsCookie = {},
        dataDataPolicyCookie = {},
        dataTrackingCookie = {},
        dataSettingsCookie = {}

    ///////////////////
    // OVERLAY START //
    ///////////////////

    //Überprüfung ob die alten Cookies zusammengeführt werden müssen
    const checkForExistingCookies = function () {
        if(getJSONCookie('datapolicy') || getJSONCookie('tracking')){
            console.log("Beide Cookies existieren")
            deleteOldCookiesandTransferData()
        }
        else{
            console.log("Alte Cookies nicht zur Verfügung")
            getAllToggleValues()
        }
    }

    const deleteOldCookiesandTransferData = function () {
        dataDataPolicyCookie = getJSONCookie('datapolicy') || {}
        dataTrackingCookie = getJSONCookie('tracking') || {}
        let objMerge 
        // Beide bestehenden JSONs aus Tracking und Service werden zusammengeführt.
        objMerge = JSON.stringify(dataTrackingCookie) + JSON.stringify(dataDataPolicyCookie);
        objMerge = objMerge.replace(/\}\{/, ",");
        objMerge = JSON.parse(objMerge);
        let objArray = Object.entries(objMerge);
        objArray.forEach(([key, value]) => {
            //hrSettingsCookie wird geschrieben
            setCookieForSettings(key, value)
        });
        //deleteCookie('datapolicy')
        //deleteCookie('tracking')
        setAllToggleValuesFromSettings()
    }

    const setCookieForSettings = function (key, value) {
        settingsCookie.setCookieForOptions(key, value)
    }

    const getAllToggleValues = function () {

    }

    const setAllToggleValuesFromSettings = function () {
        dataSettingsCookie = getJSONCookie('hrSettings') || {}
        for (let i = 0; i < toggleSwitches.length; ++i) {
         let settingId = toggleSwitches[i].id
         let settingState = dataSettingsCookie.settingId
            document.getElementById(toggleSwitches[i].id).checked = settingState 
        }
    }

    //Für die hs-App wird der Button ein und ausgeblendet
    const showSettingsButton = function () {
        let settingsButton = document.getElementById('globalSettingsButton')
        if (isWebview) {
            readAppSettingsButtonCookie()
            if (appSettingsCookie['hidePrivacySettingsButton'] === true) {
                settingsButton.style.display = 'none'
            } else {
                settingsButton.style.display = 'inline-flex'
            }
        } else {
            settingsButton.style.display = 'inline-flex'
        }
    }
    const readAppSettingsButtonCookie = function () {
        /* Das Cookie 'appSettings' wird in der App-Logik für die Webview erzeugt. Hier nur ausgelesen, um die Option für den Settings-Button abzufragen */
        appSettingsCookie = getJSONCookie('appSettings') || {}
    }

    const onDialogShow = function (event) {
        bodyElement.classList.add('optionOpen')
        const opener = event.detail == null && event.detail.target.closest('[data-a11y-dialog-show]') ? event.detail.target.closest('[data-a11y-dialog-show]') : null
        const pianoTracking = null != opener && undefined !== opener.dataset.pianoTracking ? JSON.parse(opener.dataset.pianoTracking) : {label:"Datenschutzerklärung"}
        if(undefined !== pianoTracking.secondLevelId){
            console.log(pianoTracking)
            uxAction('Einstellungsdialog geöffnet - ' + pianoTracking.label, pianoTracking.secondLevelId)
        }else{
            console.log(pianoTracking)
            uxAction('Einstellungsdialog geöffnet - ' + pianoTracking.label)
        }
    }

    const onDialogHide = function () {
        console.log("Hide")
        bodyElement.classList.remove('optionOpen')
    }
    const shouldDialogBeOpendOnLoad = function () {
        const urlParam = getUrlVars()['openDialog']
        if (typeof urlParam !== 'undefined' && urlParam === 'true') {
            dialog.show()
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
        listen('change', toggleAll, toggleAllSwitch)
        listen("show", onDialogShow, container)
        listen("hide", onDialogHide, container)
    }
    // steuert die Darstellung des Buttons für die hs-App ///
    checkForExistingCookies()
    showSettingsButton()
    
    //// 1. Toggle States aller Switches setzen ////
    ////    Cookies setzen usw.                 ////
    initializeToggleStateExternal()
    initializeToggleStateTracking()

    //// 2. Event Listener initialisieren ////
    initializeEventListeners()

    shouldDialogBeOpendOnLoad()

   
}

export default DataPolicySettings
