import TrackingCookie from 'components/externalService/trackingCookie.subfeature'

const isTrackingAllowed = () => {
    const trackingCookie = new TrackingCookie()
    return trackingCookie.isTrackingAccepted('ati')
}

const uxAction = (label, secondLevelId) => {
    secondLevelId = secondLevelId || pageDisplayConfig.site_level2
    if (pa && isTrackingAllowed()) {
        pa.sendEvent('click.action', {
            click: label,
            site_level2: secondLevelId,
        })
    }
}

const uxNavigation = (label, secondLevelId) => {
    secondLevelId = secondLevelId || pageDisplayConfig.site_level2
    if (pa && isTrackingAllowed()) {
        pa.sendEvent('click.navigation', {
            click: label,
            site_level2: secondLevelId,
        })
    }
}

const pi = (label, secondLevelId) => {
    if (pa && isTrackingAllowed()) {
        pa.sendEvent('page.display', pageDisplayConfig)
    }
}

const download = (label, secondLevelId) => {
    secondLevelId = secondLevelId || pageDisplayConfig.site_level2
    if (pa && isTrackingAllowed()) {
        pa.sendEvent('click.download', {
            click: label,
            site_level2: secondLevelId,
        })
    }
}

export { isTrackingAllowed, uxAction, uxNavigation, pi, download }
