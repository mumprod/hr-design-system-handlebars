import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from './fixtures/teaser_indextext.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/teaser/teaser_indextext }}   
  `)


const Template = (args) => {
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Teaser/Indextext',

    parameters: {
        layout: 'fullscreen',
        chromatic: {
            diffThreshold: 0.3,
            disableSnapshot: true
        },
    },

    argTypes: {
        teaserSize: {
            control: {
                type: 'select',
                options: ['50', '100'],
            },

            description: 'Teaser Größe',

            table: {
                defaultValue: {
                    summary: '100',
                },
            },
        },

        teasertype: {
            control: {
                type: 'select',
                options: ['accented', 'boxed', 'highlighted'],
            },

            description: 'Teaser Typ',

            table: {
                defaultValue: {
                    summary: 'accented',
                },
            },
        },
    },

    decorators: [
        (Story) => {
            return `<div class="grid grid-page"> 
             ${Story()} 
             </div>`
        },
    ],
}

export const TextMitHintergrund100 = {
    render: Template.bind({}),
    name: 'Text mit Hintergrund 100',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.accented.args.logicItem.includeModel
}

export const TextMitBox100 = {
    render: Template.bind({}),
    name: 'Text mit Box 100',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.boxed.args.logicItem.includeModel
}

export const HintergrundOrange100 = {
    render: Template.bind({}),
    name: 'Hintergrund orange 100',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.highlighted.args.logicItem.includeModel
}

export const TextMitBox50 = {
    render: Template.bind({}),
    name: 'Text mit Box 50',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50.boxed.args.logicItem.includeModel
}

export const TextMitHintergrund50 = {
    render: Template.bind({}),
    name: 'Text mit Hintergrund 50',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50.accented.args.logicItem.includeModel
}

export const HintergrundOrange50 = {
    render: Template.bind({}),
    name: 'Hintergrund orange 50',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50.highlighted.args.logicItem.includeModel
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
