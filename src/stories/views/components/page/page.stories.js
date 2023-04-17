import page from './page.hbs'
import {
    NavigationDataWithTeaser,
    NavigationDataWithTeaser2,
    NavigationDataWithTeaser3,
} from './page.data.js'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return page({ brand, ...args })
}

export default {
    title: 'Komponenten/Page/Page',
    argTypes: {},

    parameters: {
        chromatic: {
            viewports: [360, 768, 1024],
        },

        layout: 'fullscreen',

        docs: {
            inlineStories: false,
            iframeHeight: 400,
        },
    },
}

export const Default = {
    render: Template.bind({}),
    name: 'Default',
    args: NavigationDataWithTeaser,
}

export const MitWarnung = {
    render: Template.bind({}),
    name: 'Mit Warnung',
    args: NavigationDataWithTeaser2,
}

export const MitSubnavigation = {
    render: Template.bind({}),
    name: 'Mit Subnavigation',
    args: NavigationDataWithTeaser3,
}
