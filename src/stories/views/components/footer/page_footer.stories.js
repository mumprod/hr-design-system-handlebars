import { 
    FooterContentHessenschau,
    FooterContentHR1,
    FooterContentHR2,
    FooterContentHR3,
    FooterContentHR4,
    FooterContentHRINFO,
    FooterContentYOUFM,

} from './page_footer.data.js'
import pageFooter from './page_footer.hbs'

const TemplatePageFooter = (args, { globals: { theme } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
     let brand =
        undefined !== theme ? theme : 'hessenschau'
    return pageFooter({ brand, ...args })
}

export default {
    title: 'Komponenten/Footer',
    argTypes: {},

    parameters: {
        layout: 'fullscreen',
        docs: {
            inlineStories: false,
            iframeHeight: 400,
        },
    },
}

export const SeitenfooterHessenschau = {
    render: TemplatePageFooter.bind({}),
    name: 'Seitenfooter hessenschau',
    args: FooterContentHessenschau
}

export const SeitenfooterHR1 = {
    render: TemplatePageFooter.bind({}),
    name: 'Seitenfooter hr1',
    args: FooterContentHR1
}
export const SeitenfooterHR2 = {
    render: TemplatePageFooter.bind({}),
    name: 'Seitenfooter hr2',
    args: FooterContentHR2,
}
export const SeitenfooterHR3 = {
    render: TemplatePageFooter.bind({}),
    name: 'Seitenfooter hr3',
    args: FooterContentHR3,
}
export const SeitenfooterHR4 = {
    render: TemplatePageFooter.bind({}),
    name: 'Seitenfooter hr4',
    args: FooterContentHR4,
}
export const SeitenfooterHRINFO = {
    render: TemplatePageFooter.bind({}),
    name: 'Seitenfooter hriNFO',
    args: FooterContentHRINFO,
}
export const SeitenfooterYOUFM = {
    render: TemplatePageFooter.bind({}),
    name: 'Seitenfooter You FM',
    args: FooterContentYOUFM,
}