import TrackingCookie from 'components/externalService/trackingCookieDs.subfeature'

const isTrackingAllowed = () => {
    const trackingCookie = new TrackingCookie()
    return trackingCookie.isTrackingAccepted('ati')
}

const uxAction = (label, secondLevelId) => {
    secondLevelId = secondLevelId || window.xtn2
    if (window.xt_click && isTrackingAllowed()) {
        window.xt_click('this', 'C', secondLevelId, label, 'A')
    }
}

const uxNavigation = (label, secondLevelId) => {
    secondLevelId = secondLevelId || window.xtn2
    if (window.xt_click && isTrackingAllowed()) {
        window.xt_click('this', 'C', secondLevelId, label, 'N')
    }
}

const pi = (label, secondLevelId) => {
    secondLevelId = secondLevelId || window.xtn2
    if (window.xt_click && isTrackingAllowed()) {
        window.xt_click('this', 'F', secondLevelId, label)
    }
}

const download = (label, secondLevelId) => {
    secondLevelId = secondLevelId || window.xtn2
    if (window.xt_click && isTrackingAllowed()) {
        window.xt_click('this', 'C', secondLevelId, label, 'T')
    }
}

export { isTrackingAllowed, uxAction, uxNavigation, pi, download }
