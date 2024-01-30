import { getJSONCookie, setJSONCookie } from 'hrQuery'

const GlobalSettingsCookie = function () {
    const settingsCookieLifetime = 1000 * 60 * 60 * 24 * 365 * 10 /* 10 years */
    let cookie = {}

    const setCookieForOptions = function (option, state) {
        if (state == null) {
            state = true
        }
        console.log('Schreibe Settings-Cookie: ' + option + ': ' + state)
        readSettingsCookie()
        cookie[option] = state
        writeSettingsCookie()
    }

    const isSettingsCookieAccepted = function (externalService) {
        readSettingsCookie()
        return cookie[externalService] === true
    }

    const writeSettingsCookie = function () {
        setJSONCookie('hrSettings', cookie, settingsCookieLifetime)
    }

    const readSettingsCookie = function () {
        cookie = getJSONCookie('hrSettings') || {}
    }

    const isSettingsCookieExistent = function (option) {
        readSettingsCookie()
        return cookie.hasOwnProperty(option)
    }
    return {
        setCookieForOptions: setCookieForOptions,
        isSettingsCookieExistent: isSettingsCookieExistent,
        isSettingsCookieAccepted: isSettingsCookieAccepted
    }
}

export default GlobalSettingsCookie
