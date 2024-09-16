import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from './fixtures/teaser_event.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['standard'] = handlebars.compile(`
    {{> components/teaser/teaser_standard }}   
  `)
hbsTemplates['alternative'] = handlebars.compile(`
    {{> components/teaser/teaser_alternativ }}   
  `)


const Template = (args) => {
    return hbsTemplates['standard']({ ...args })
}

const TemplateAlternative = (args) => {
    return hbsTemplates['alternative']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Teaser/Event',

    parameters: {
        layout: 'fullscreen',

        chromatic: {
            viewports: [360, 1024],
            diffThreshold: 0.3,
            disableSnapshot: true
        },

        argTypes: {
            teaserSize: {
                control: {
                    type: 'select',
                    options: ['33', '50', '100'],
                },

                description: 'Teaser Größe',

                table: {
                    defaultValue: {
                        summary: 'hero',
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
}

export const Standard33EinzelEvent = {
    render: Template.bind({}),
    name: 'Standard 33 Einzel-Event',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_33.standard_with_single_event.args.logicItem.includeModel,
}

export const Standard33EinzelEventAbgesagt = {
    render: Template.bind({}),
    name: 'Standard 33 Einzel-Event abgesagt',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_33.standard_with_single_event_and_status.args.logicItem.includeModel,
}

export const Standard33ZweiEvents = {
    render: Template.bind({}),
    name: 'Standard 33 zwei Events',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_33.standard_with_two_events.args.logicItem.includeModel,
}

export const Standard33MehrereEvents = {
    render: Template.bind({}),
    name: 'Standard 33 mehrere Events',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_33.standard_with_multiple_events.args.logicItem.includeModel,
}

export const Standard50EinzelEvent = {
    render: Template.bind({}),
    name: 'Standard 50 Einzel-Event',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50.standard_with_single_event.args.logicItem.includeModel,
}

export const Standard100EinzelEvent = {
    render: Template.bind({}),
    name: 'Standard 100 Einzel-Event',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.standard_with_single_event.args.logicItem.includeModel,
}

export const Standard100ZweiEvents = {
    render: Template.bind({}),
    name: 'Standard 100 zwei Events',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.standard_with_two_events.args.logicItem.includeModel,
}

export const Alternativ100EinzelEvent = {
    render: TemplateAlternative.bind({}),
    name: 'Alternativ 100 Einzel-Event',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.alternative_with_single_event.args.logicItem.includeModel,
}

export const Alternativ100ZweiEvents = {
    render: TemplateAlternative.bind({}),
    name: 'Alternativ 100 zwei Events',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.alternative_with_two_events.args.logicItem.includeModel,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
