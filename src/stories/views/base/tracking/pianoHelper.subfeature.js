import SettingsCookie from 'components/externalService/globalSettingsCookie.subfeature';

const pianoErrorSecondLevelId = 99;

const isTrackingAllowed = () => {
    const settingsCookie = new SettingsCookie();
    return settingsCookie.isSettingsCookieAccepted('ati');
};

const sendEvent = (eventType, event) => {
    if (typeof pa !== 'undefined' && pa !== undefined && isTrackingAllowed()) {
        pa.sendEvent(eventType, event);
    }
};

const getDefaultEvent = (label, secondLevelId) => {
    return {
        click: label,
        site_level2_id: determineSecondLevelId(secondLevelId)
    }
};

const determineSecondLevelId = (secondLevelId) => {
    return secondLevelId !== undefined
        ? secondLevelId
        : undefined !== pageDisplayConfig ? pageDisplayConfig.site_level2_id : pianoErrorSecondLevelId;
};

const uxAction = (label, secondLevelId) => sendEvent('click.action', getDefaultEvent(label, secondLevelId));

const uxNavigation = (label, secondLevelId) => sendEvent('click.navigation', getDefaultEvent(label, secondLevelId));

const pi = () => sendEvent('page.display', pageDisplayConfig);

const download = (label, secondLevelId) => sendEvent('click.download', getDefaultEvent(label, secondLevelId));


export { isTrackingAllowed, uxAction, uxNavigation, pi, download };
