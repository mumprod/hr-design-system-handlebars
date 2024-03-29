import SettingsCookie from 'components/externalService/globalSettingsCookie.subfeature'

const isTrackingAllowed = () => {
    const settingsCookie = new SettingsCookie()
    return settingsCookie.isSettingsCookieAccepted('ati')
}

const uxAction = (label, secondLevelId) => {
    secondLevelId = undefined !== secondLevelId ? secondLevelId : typeof pageDisplayConfig !== "undefined" && pageDisplayConfig !== undefined ? pageDisplayConfig.site_level2_id:99
    if (typeof pa !== "undefined" && pa !== undefined && isTrackingAllowed()) {
        pa.sendEvent('click.action', {
            click: label,
            site_level2_id: secondLevelId,
        })
    }
}

const uxNavigation = (label, secondLevelId) => {
    secondLevelId = undefined !== secondLevelId ? secondLevelId : typeof pageDisplayConfig !== "undefined" && pageDisplayConfig !== undefined ? pageDisplayConfig.site_level2_id:99
    if (typeof pa !== "undefined" && pa !== undefined  && isTrackingAllowed()) {
        pa.sendEvent('click.navigation', {
            click: label,
            site_level2_id: secondLevelId,
        })
    }
}

const pi = () => {
    if (typeof pa !== "undefined" && pa !== undefined  && isTrackingAllowed()) {
        pa.sendEvent('page.display', pageDisplayConfig)
    }
}

const download = (label, secondLevelId) => {
    secondLevelId = undefined !== secondLevelId ? secondLevelId : typeof pageDisplayConfig !== "undefined" && pageDisplayConfig !== undefined ? pageDisplayConfig.site_level2_id:99
    if (typeof pa !== "undefined" && pa !== undefined  && isTrackingAllowed()) {
        pa.sendEvent('click.download', {
            click: label,
            site_level2_id: secondLevelId,
        })
    }
}

export { isTrackingAllowed, uxAction, uxNavigation, pi, download }
