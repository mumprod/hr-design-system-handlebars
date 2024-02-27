import page from './page.hbs'
import page_pagination from '../../pagination/page_pagination.hbs'
import {
    NavigationDataWithTeaser,
    NavigationDataWithTeaser2,
    NavigationDataWithTeaser3,
    NavigationDataWithTeaser4,
} from './page.data.js'

import { NavigationDataWithMixedContent } from '../../pagination/page_pagination.data.js'

const Template = (args, { globals: { theme } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand = undefined !== theme ? theme : 'hessenschau' 
    return page({ brand, ...args })
}

const Template2 = (args, { globals: { theme } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand = undefined !== theme ? theme : 'hessenschau' 
    return page_pagination({ brand, ...args })
}

export default {
    title: 'Seiten/Index',
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

export const MitPagination = {
    render: Template2.bind({}),
    name: 'Mit Pagination',
    args: NavigationDataWithMixedContent,
}

export const MitTopTopics = {
    render: Template.bind({}),
    name: 'Mit Top-Topics',
    args: NavigationDataWithTeaser4,
}