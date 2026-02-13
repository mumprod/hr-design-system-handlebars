import SettingsCookie from 'components/external-service/globalSettingsCookie.subfeature'

const pianoErrorSecondLevelId = 99

const isTrackingAllowed = () => {
    const settingsCookie = new SettingsCookie()
    return (
        !settingsCookie.isSettingsCookieExistent('ati') ||
        settingsCookie.isSettingsCookieAccepted('ati')
    )
}

const sendEvent = (eventType, event) => {
    if (typeof pa !== 'undefined' && pa !== undefined && isTrackingAllowed()) {
        pa.sendEvent(eventType, event)
    }
}

const getDefaultEvent = (label, secondLevelId) => {
    return {
        click: label,
        site_level2_id: determineSecondLevelId(secondLevelId),
    }
}

const determineSecondLevelId = (secondLevelId) => {
    return secondLevelId !== undefined
        ? secondLevelId
        : undefined !== pageDisplayConfig
        ? pageDisplayConfig.site_level2_id
        : pianoErrorSecondLevelId
}

const uxAction = (label, secondLevelId) =>
    sendEvent('click.action', getDefaultEvent(label, secondLevelId))

const uxNavigation = (label, secondLevelId) =>
    sendEvent('click.navigation', getDefaultEvent(label, secondLevelId))

const pi = () => sendEvent('page.display', pageDisplayConfig)

const download = (label, secondLevelId) =>
    sendEvent('click.download', getDefaultEvent(label, secondLevelId))

const scrollDepth = (depth) => {
    sendEvent('page.scroll', {
        scroll_depth: depth,
        page: undefined !== pageDisplayConfig ? pageDisplayConfig.page : 'unknown',
        hr_document_type:
            undefined !== pageDisplayConfig ? pageDisplayConfig.hr_document_type : 'unknown',
        hr_sophora_id:
            undefined !== pageDisplayConfig ? pageDisplayConfig.hr_sophora_id : 'unknown',
    })
}

export { isTrackingAllowed, uxAction, uxNavigation, pi, download, scrollDepth }
