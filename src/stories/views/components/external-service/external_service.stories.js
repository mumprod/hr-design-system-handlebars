import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from './fixtures/external_service.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
  {{> components/external-service/external_service }}   
`)
hbsTemplates['noDatapolicyCheck'] = handlebars.compile(`
    {{> components/external-service/external_service_with_datapolicy_check }}   
  `)



const TemplatePageExternalService = (args) => {
    return hbsTemplates['default']({ ...args })
}
const TemplatePageExternalServiceNoDatapolicyCheck = (args) => {
    return hbsTemplates['noDatapolicyCheck']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Externe Dienste',
    argTypes: {},

    parameters: {
        layout: 'fullscreen',
        docs: {
            inlineStories: false,
            iframeHeight: 400,
        },
        chromatic: {
            disableSnapshot: true
        },
    },
}

export const ExterneDiensteGiphy = {
    render: TemplatePageExternalService.bind({}),
    name: 'Externe Dienste Giphy',
    args: fixtures.Giphy.args,
}
export const ExterneDiensteFlourish = {
    render: TemplatePageExternalService.bind({}),
    name: 'Externe Dienste Flourish',
    args: fixtures.Flourish.args,
}
export const ExterneDiensteDatawrapper = {
    render: TemplatePageExternalService.bind({}),
    name: 'Externe Dienste Datawrapper MIT Responsivem Iframe',
    args: fixtures.Datawrapper_CDN.args,
}
export const ExterneDiensteDatawrapperNoResponsiveFixedHeight = {
    render: TemplatePageExternalService.bind({}),
    name: 'Externe Dienste Datawrapper OHNE Responsivem Iframe (Feste Höhe)',
    args: fixtures.Datawrapper_CDN_NoResponsiveFixedHeight.args,
}
export const ExterneDiensteDatawrapperNoResponsiveAspectRatio = {
    render: TemplatePageExternalService.bind({}),
    name: 'Externe Dienste Datawrapper OHNE Responsivem Iframe (Aspect Ratio)',
    args: fixtures.Datawrapper_CDN_NoResponsiveAspectRatio.args
}
export const ExterneDiensteDatawrapperContentRefresher = {
    render: TemplatePageExternalService.bind({}),
    name: 'Externe Dienste Datawrapper mit ContentRefresher',
    args: fixtures.Datawrapper_CDN_NoResponsiveFixedHeightReload.args,
}
export const WahlGemeindeErgebnis = {
    render: TemplatePageExternalServiceNoDatapolicyCheck.bind({}),
    name: 'Externe Dienste Wahl Gemeinde Ergebnis',
    args: fixtures.Wahl_Gemeinde_Ergebnis.args,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
