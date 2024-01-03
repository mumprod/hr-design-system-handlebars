import { getJSONCookie, setJSONCookie } from 'hrQuery'

const GlobalSettingsCookie = function () {
    const globalSettingsCookieLifetime = 1000 * 60 * 60 * 24 * 365 * 10 /* 10 years */
    let cookie = {}

    const setCookieForOptions = function (option, state) {
        if (state == null) {
            state = true
        }
        console.log('Schreibe Settings-Cookie: ' + option + ': ' + state)
        readGlobalSettingsCookie()
        cookie[option] = state
        writeGlobalSettingsCookie()
    }

    const writeGlobalSettingsCookie = function () {
        setJSONCookie('hrSettings', cookie, globalSettingsCookieLifetime)
    }

    const readGlobalSettingsCookie = function () {
        cookie = getJSONCookie('hrSettings') || {}
    }

    const isGlobalSettingsCookieExistent = function (option) {
        readGlobalSettingsCookie()
        return cookie.hasOwnProperty(option)
    }
    return {
        setCookieForOptions: setCookieForOptions,
        isGlobalSettingsCookieExistent: isGlobalSettingsCookieExistent,
    }
}

export default GlobalSettingsCookie
