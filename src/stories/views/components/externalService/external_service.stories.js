import { 
    ExternalServiceContent
} from './external_service.data.js'
import externalService from './external_service_with_datapolicy_check.hbs'

const TemplatePageExternalService = (args, { globals: { theme } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand = undefined !== theme ? theme : 'hessenschau'       
    return externalService({ brand, ...args })
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

export const ExterneDienste = {
    render: TemplatePageExternalService.bind({}),
    name: 'Externe Dienste',
    args: ExternalServiceContent, 
}