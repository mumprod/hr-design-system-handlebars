import { ExternalServiceContent } from './external_service.data.js'
import externalService from './external_service_with_datapolicy_check.hbs'
import externalServiceNoDatapolicyCheck from './external_service.hbs'

const TemplatePageExternalService = (args, { globals: { theme } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand = undefined !== theme ? theme : 'hessenschau'
    return externalService({ brand, ...args })
}
const TemplatePageExternalServiceNoDatapolicyCheck = (args, { globals: { theme } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand = undefined !== theme ? theme : 'hessenschau'
    return externalServiceNoDatapolicyCheck({ brand, ...args })
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
    },
}

export const ExterneDiensteGiphy = {
    render: TemplatePageExternalService.bind({}),
    name: 'Externe Dienste Giphy',
    args: ExternalServiceContent.Giphy,
}
export const ExterneDiensteFlourish = {
    render: TemplatePageExternalService.bind({}),
    name: 'Externe Dienste Flourish',
    args: ExternalServiceContent.Flourish,
}
export const ExterneDiensteDatawrapper = {
    render: TemplatePageExternalService.bind({}),
    name: 'Externe Dienste Datawrapper MIT Responsivem Iframe',
    args: ExternalServiceContent.Datawrapper_CDN,
}
export const ExterneDiensteDatawrapperNoResponsiveFixedHeight = {
    render: TemplatePageExternalService.bind({}),
    name: 'Externe Dienste Datawrapper OHNE Responsivem Iframe (Feste Höhe)',
    args: ExternalServiceContent.Datawrapper_CDN_NoResponsiveFixedHeight,
}
export const ExterneDiensteDatawrapperNoResponsiveAspectRatio = {
    render: TemplatePageExternalService.bind({}),
    name: 'Externe Dienste Datawrapper OHNE Responsivem Iframe (Aspect Ratio)',
    args: ExternalServiceContent.Datawrapper_CDN_NoResponsiveAspectRatio,
}
export const ExterneDiensteDatawrapperContentRefresher = {
    render: TemplatePageExternalService.bind({}),
    name: 'Externe Dienste Datawrapper mit ContentRefresher',
    args: ExternalServiceContent.Datawrapper_CDN_NoResponsiveFixedHeightReload,
}
export const WahlGemeindeErgebnis = {
    render: TemplatePageExternalServiceNoDatapolicyCheck.bind({}),
    name: 'Externe Dienste Wahl Gemeinde Ergebnis',
    args: ExternalServiceContent.Wahl_Gemeinde_Ergebnis,
}
