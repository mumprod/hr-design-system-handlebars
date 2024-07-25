import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import navigation from './header.hbs'
import brandnav from './brand_navigation/brand_navigation.hbs'
import JsonData from './fixtures/site_header_default.json'
import JsonData2 from './fixtures/site_header_mit_warnung.json'
import JsonData3 from './fixtures/site_header_mit_submenu.json'
import JsonDataTopTopics from './fixtures/site_header_mit_top_topics.json'
import JsonDataHR3 from './fixtures/site_header_mit_submenu_as_flyout_no_sticky.json'

const Template = (args, { globals: { theme } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand = undefined !== theme ? theme : 'hessenschau'
    return navigation({ brand, ...args })
}
const TemplateHr3 = (args, { globals: { theme } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand = undefined !== theme ? theme : 'hr3'
    return navigation({ brand, ...args })
}

export default {
    title: 'Komponenten/Header/Header',
    argTypes: {},

    parameters: {
        chromatic: {
            viewports: [360, 768, 1024],
        },

        layout: 'fullscreen',

        docs: {
            inlineStories: false,
        },

        viewport: {
            viewports: INITIAL_VIEWPORTS,
        },
    },
}

export const Default = {
    render: Template.bind({}),
    name: 'Default',
    args: JsonData,
    parameters: {},
}

export const MitWarnung = {
    render: Template.bind({}),
    name: 'Mit Warnung',
    args: JsonData2,
}

export const MitTopTopics = {
    render: Template.bind({}),
    name: 'Mit Top Topics',
    args: JsonDataTopTopics,
}

export const MitSubnavigation = {
    render: Template.bind({}),
    name: 'Mit Subnavigation',
    args: JsonData3,
}

export const MitSubnavigationAlsFlyout = {
    render: TemplateHr3.bind({}),
    name: 'Mit Subnavigation als Flyout',
    args: JsonDataHR3,
}
