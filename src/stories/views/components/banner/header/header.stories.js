import header from './header.hbs'
import bannerData from './../fixtures/banner.json'

const TemplateHeader = (args, { globals: { theme } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand = undefined !== theme ? theme : 'hessenschau'       
    return header({ brand, ...args })
}

export default {
    title: 'Komponenten/Banner/Header',
    argTypes: {},

    parameters: {
        layout: 'fullscreen',
        docs: {
            inlineStories: false,
            iframeHeight: 400,
        },
    },
}

export const Seitenfooter = {
    render: TemplateHeader.bind({}),
    name: 'BannerHeader',
    args: bannerData
  
}