import page from './page_icons.hbs'
import page_contd from './page_icons_contd.hbs'
import svgList from './page_icon_data.js'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    args["svgList"] = 0
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return page({ brand, ...args })
}

const TemplateContd = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return page_contd({ brand, ...args })
}
export default {
    title: 'Grundlegendes/Iconographie',
    argTypes: {},

    parameters: {
        chromatic: {
            viewports: [360, 768, 1024],
            diffThreshold: 0.3,
        },

        layout: 'fullscreen',

        docs: {
            inlineStories: false,
            iframeHeight: 400,
        },
    },
}

export const PageIconsGeneric = {
    render: Template.bind({}),
    name: 'Icons Generic',
    args: svgList
}

export const PageIconsGenericContd = {
    render: TemplateContd.bind({}),
    name: 'Icons Generic Continued'
}