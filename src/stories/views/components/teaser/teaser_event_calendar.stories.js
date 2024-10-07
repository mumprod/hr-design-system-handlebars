import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from './fixtures/teaser_event_calendar.json'


const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/teaser/teaser_event_calendar }}   
  `)


const Template = (args) => {
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Teaser/Eventkalender',

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
    },

    decorators: [
        (Story) => {
            return `<div class="grid grid-page">  
             ${Story()} 
             </div>`
        },
    ],
}

export const Teaser100 = {
    render: Template.bind({}),
    name: 'Teaser 100',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],

    args: fixtures["100"].args.logicItem.includeModel,
}

export const Teaser100KeineEventsInDerZukunft = {
    render: Template.bind({}),
    name: 'Teaser 100 Keine Events in der Zukunft',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],

    args: fixtures["100_no_future_events"].args.logicItem.includeModel,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
