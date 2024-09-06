import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import navigation from './header.hbs'
import fixtures from './fixtures/site_header.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/site_header/header}}  
  `)

const Template = (args) => {
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
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
            disableSnapshot: true
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
    args: fixtures.default.args,
    parameters: {},
}

export const MitWarnung = {
    render: Template.bind({}),
    name: 'Mit Warnung',
    args: fixtures.with_warnings.args,
}

export const MitTopTopics = {
    render: Template.bind({}),
    name: 'Mit Top Topics',
    args: fixtures.with_top_topics.args,
}

export const MitSubnavigation = {
    render: Template.bind({}),
    name: 'Mit Subnavigation',
    args: fixtures.with_submenu.args,
}

export const MitSubnavigationAlsFlyout = {
    render: TemplateHr3.bind({}),
    name: 'Mit Subnavigation als Flyout',
    args: fixtures.with_submenu_as_flyout_not_sticky.args,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
