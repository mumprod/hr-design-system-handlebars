import { getJSONCookie, setJSONCookie } from 'hrQuery'

const TrackingCookie = function () {
    let cookie = {}
    const trackingCookieLifetime = 1000 * 60 * 60 * 24 * 365 * 10 /* 10 years */

    const setCookieForTracking = function (trackingService, state) {
        if (state == null) {
            state = true
        }
        console.log('Schreibe Cookie: ' + trackingService + ': ' + state)
        readTrackingCookie()
        cookie[trackingService] = state
        writeTrackingCookie()
    }
    const isTrackingAccepted = function (trackingService) {
        readTrackingCookie()
        return cookie[trackingService] === true
    }
    const writeTrackingCookie = function () {
        setJSONCookie('tracking', cookie, trackingCookieLifetime)
    }
    const readTrackingCookie = function () {
        cookie = getJSONCookie('tracking') || {}
    }
    const isTrackingCookieExistent = function (trackingService) {
        readTrackingCookie()
        return cookie.hasOwnProperty(trackingService)
    }
    return {
        setCookieForTracking: setCookieForTracking,
        isTrackingAccepted: isTrackingAccepted,
        isTrackingCookieExistent: isTrackingCookieExistent,
    }
}

export default TrackingCookie
