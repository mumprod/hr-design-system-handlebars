import { FooterContent } from './page_footer.data.js'
import pageFooter from './page_footer.hbs'

const TemplatePageFooter = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
     let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
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

export const Seitenfooter = {
    render: TemplatePageFooter.bind({}),
    name: 'Seitenfooter',
    args: FooterContent,
}