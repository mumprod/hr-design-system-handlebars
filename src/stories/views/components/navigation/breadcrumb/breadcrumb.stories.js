import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from './fixtures/breadcrumb.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/navigation/breadcrumb/breadcrumb}}  
  `)

const Template = (args) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Navigation/Breadcrumb',

    argTypes: {
        _currentPageUrl: {
            description: 'URL der aktuellen Seite',
            control: 'text',
        },

        _currentPageTitle: {
            control: 'text',
            description: 'Titel der aktuellen Seite',
        },
        breadcrumbSsi: {
            control: 'object',
            description: 'SSI Include String aus dem Delivery',
            table: {
                category: 'Delivery',
            },
        },
        showBreadcrumbTitleAlways: {
            control: 'boolean',
            description:
                'Hierüber wird festgelegt, ob der letzte Eintrag in der Breacrumb über alle Viewports hinweg angezeigt wird oder ob dieser mobil nicht erscheinen soll.',
            table: {
                category: 'Delivery',
            },
        },
    },

    parameters: {
        controls: {
            sort: 'alpha',
        },
        chromatic: {
            disableSnapshot: true
        },
    },
    decorators: [
        (Story) => {
            return `
            <div class="breadcrumb-container grid grid-page">
                <div class="grid-cols-12 py-6 col-full sm:px-9.5 sm:col-main">  
                    ${Story()} 
                </div>
            </div>`
        },
    ],
}

export const breadcrumb2Level = {
    render: Template.bind({}),
    name: 'Breadcrumb 2 Level',
    args: fixtures['2_levels'].args,
}

export const breadcrumb3Level = {
    render: Template.bind({}),
    name: 'Breadcrumb 3 Level',
    args: fixtures['3_levels'].args,
}

export const breadcrumb4Level = {
    render: Template.bind({}),
    name: 'Breadcrumb 4 Level',
    args: fixtures['4_levels'].args,
}

export const breadcrumb5Level = {
    render: Template.bind({}),
    name: 'Breadcrumb 5 Level',
    args: fixtures['5_levels'].args,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
