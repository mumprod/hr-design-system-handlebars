import SettingsCookie from 'components/external-service/globalSettingsCookie.subfeature'
import { fireEvent, getJSONCookie, hr$, setJSONCookie, listen } from 'hrQuery'
import { uxAction } from 'base/tracking/pianoHelper.subfeature'

import A11yDialog from 'a11y-dialog'
import { deleteCookie } from '../../generic/hrQuery.subfeature'

const DataPolicySettings = function (context) {
    const { options } = context,
        { element: rootElement } = context,
        container = hr$('#datapolicy-settings-dialog', document)[0],
        dialog = new A11yDialog(container),
        bodyElement = document.getElementsByTagName('html')[0],
        settingsCookie = new SettingsCookie(),
        toggleSwitches = hr$('.js-toggleSwitch-checkbox', container),
        toggleSwitchesExternal = hr$('.js-toggleSwitch-external', container),
        toggleAllSwitch = hr$('.js-toggleSwitch-checkbox-all', container)[0],
        providerTitle = hr$('.js-providerTitle', container)[0]

    let isWebview = window.parent.document.documentElement.classList.contains('webview'),
        appSettingsCookie = {}

    //Überprüfung ein Settings-Cookie da ist
    const checkForExistingCookies = function () {

        if (getJSONCookie('hrSettings')) {
            getAllToggleValuesFromSettings()
        }
        else {
            console.log("Kein Cookie vorhanden");
            //Wenn kein Cookie vorhanden wird diese initial über die Checkbox "Dienst ist initial immer aktiviert (Whitelist)"
            //im Konfig-Dokument bestückt.
            for (var i = 0; i < toggleSwitches.length; ++i) {
                if (toggleSwitches[i].getAttribute('data-whitelist') == "true") {
                    toggleSwitches[i].checked = true;
                }
                else {
                    toggleSwitches[i].checked = false;
                }
                setAllToggleEventListeners(toggleSwitches[i]);
                initializeAllToggleEventListeners(i);
            }
            changeProviderTitle();
        }
    }

    const setCookieForSettings = function (key, value) {
        settingsCookie.setCookieForOptions(key, value)
        if (value) {
            fireEvent('hr:externalService-activate-' + key)
        } else {
            fireEvent('hr:externalService-deactivate-' + key)
        }
    }

    const getAllToggleValuesFromSettings = function () {
        setAllToggleValuesFromSettings()
        changeProviderTitle()
    }

    const setAllToggleValuesFromSettings = function () {
        var id;
        console.log("Setze alle Settings-Regler")
        for (var i = 0; i < toggleSwitches.length; ++i) {
            id = toggleSwitches[i].id;
            if (settingsCookie.isSettingsCookieExistent(id)) {
                console.log("Dienst " + id + " ist im Cookie enthalten und hat den Wert " + settingsCookie.isSettingsCookieAccepted(id))
                if (settingsCookie.isSettingsCookieAccepted(id)) {
                    console.log("Aktiviere den Toggle")
                    toggleSwitches[i].checked = true;
                }
                else {
                    console.log("Deaktiviere den Toggle")
                    toggleSwitches[i].checked = false;
                }
            }
            else {
                console.log("Dienst " + id + " ist im Cookie nicht enthalten, prüfe daher den Default")
                var whiteList = document.getElementById(id).getAttribute("data-whitelist")
                if (whiteList == 'true') {
                    console.log("Ist per Default eingeschaltet")
                    console.log("Aktiviere den Toggle")
                    toggleSwitches[i].checked = true;
                }
                else {
                    console.log("Ist per Default ausgeschaltet")
                    console.log("Deaktiviere den Toggle")
                    toggleSwitches[i].checked = false;
                }

            }
            setAllToggleEventListeners(toggleSwitches[i]);
            initializeAllToggleEventListeners(i);
        }
        toggleAllSwitch.checked = allTogglesExternalServiceChecked()
    }

    const initializeAllToggleEventListeners = function (serviceId) {
        listen(
            'hr:externalService-activate-' + toggleSwitches[serviceId].id,
            function () {
                toggleSwitches[serviceId].checked = true
            },
            document
        )
    }

    const setAllToggleEventListeners = function (element) {
        listen(
            'change',
            function () {
                setCookieForSettings(element.id, element.checked)
                toggleAllSwitch.checked = allTogglesExternalServiceChecked()
                changeProviderTitle()
            },
            element
        )
    }

    const toggleAll = function () {
        for (let i = 0; i < toggleSwitchesExternal.length; ++i) {
            if (toggleSwitchesExternal[i].checked != toggleAllSwitch.checked) {
                toggleSwitchesExternal[i].checked = toggleAllSwitch.checked
                setCookieForSettings(toggleSwitchesExternal[i].id, toggleSwitchesExternal[i].checked)
            }
        }
        changeProviderTitle()
    }

    const allTogglesExternalServiceChecked = function () {
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

    const initializeEventListeners = function () {
        listen('change', toggleAll, toggleAllSwitch)
        listen("show", onDialogShow, container)
        listen("hide", onDialogHide, container)
    }

    const readAppSettingsButtonCookie = function () {
        /* Das Cookie 'appSettings' wird in der App-Logik für die Webview erzeugt. Hier nur ausgelesen, um die Option für den Settings-Button abzufragen */
        appSettingsCookie = getJSONCookie('appSettings') || {}
    }

    //Für die hs-App wird der Globale Einstellungsbutton ein- und ausgeblendet, 
    //sowie der Einstellungsbutton für einen einzelnen externen Dienst, sobald dieser einmalig oder dauerhaft aktiviert wurde
    const showSettingsButton = function () {
        let settingsButton = document.getElementById('globalSettingsButton')
        if (isWebview) {
            readAppSettingsButtonCookie()
            if (appSettingsCookie['hidePrivacySettingsButton'] === true) {
                settingsButton.classList.add('hidden')
                document.querySelectorAll('.js-settings-inner-button').forEach(function (jsSettingsButton) {
                    jsSettingsButton.classList.add('hidden')
                });
                document.querySelectorAll('.js-content-settings-button').forEach(function (jsContentSettingsButton) {
                    jsContentSettingsButton.style.display = 'none'
                });
            } else {
                settingsButton.classList.remove('hidden')
                document.querySelectorAll('.js-settings-inner-button').forEach(function (jsSettingsButton) {
                    if (jsSettingsButton.classList.contains('hidden')) {
                        jsSettingsButton.classList.remove('hidden')
                    }
                });
                document.querySelectorAll('.js-content-settings-button').forEach(function (jsContentSettingsButton) {
                    if (!jsContentSettingsButton.classList.contains('hidden')) {
                        jsContentSettingsButton.style.display = 'inline-block'
                    }
                });
            }
        }
    }

    const onDialogShow = function (event) {
        bodyElement.classList.add('optionOpen')
        const opener = event.detail == null && event.detail.target.closest('[data-a11y-dialog-show]') ? event.detail.target.closest('[data-a11y-dialog-show]') : null
        const pianoTracking = null != opener && undefined !== opener.dataset.pianoTracking ? JSON.parse(opener.dataset.pianoTracking) : { label: "Datenschutzerklärung" }
        if (undefined !== pianoTracking.secondLevelId) {
            console.log(pianoTracking)
            uxAction('Einstellungsdialog geöffnet - ' + pianoTracking.label, pianoTracking.secondLevelId)
        } else {
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

    // steuert die Darstellung des Buttons für die hs-App ///
    showSettingsButton()
    // Überprüfen ob die alten Cookies vorhanden sind
    checkForExistingCookies()
    initializeEventListeners()
    shouldDialogBeOpendOnLoad()

}

export default DataPolicySettings