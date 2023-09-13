import { getJSONCookie, setJSONCookie } from 'hrQuery'

const DataPolicyCookie = function () {
    const datapolicyCookieLifetime = 1000 * 60 * 60 * 24 * 365 * 10 /* 10 years */
    let cookie = {}

    const setCookieForExternalService = function (externalService, state) {
        if (state == null) {
            state = true
        }
        console.log('Schreibe Cookie: ' + externalService + ': ' + state)
        readDatapolicyCookie()
        cookie[externalService] = state
        writeCookie()
    }

    const isDatapolicyAccepted = function (externalService) {
        readDatapolicyCookie()
        return cookie[externalService] === true
    }

    const writeCookie = function () {
        setJSONCookie('datapolicy', cookie, datapolicyCookieLifetime)
    }

    const readDatapolicyCookie = function () {
        cookie = getJSONCookie('datapolicy') || {}
    }

    const isDatapolicyExistent = function (externalService) {
        readDatapolicyCookie()
        return cookie.hasOwnProperty(externalService)
    }
    return {
        setCookieForExternalService: setCookieForExternalService,
        isDatapolicyAccepted: isDatapolicyAccepted,
        isDatapolicyExistent: isDatapolicyExistent,
    }
}

export default DataPolicyCookie
