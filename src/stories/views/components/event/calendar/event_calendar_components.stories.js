import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from './fixtures/event_calendar_components.json'


const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['heading'] = handlebars.compile(`
    {{> components/event/calendar/event_calendar_heading }}   
  `)
hbsTemplates['navigation'] = handlebars.compile(`
    {{> components/event/calendar/event_calendar_nav }}   
  `)
hbsTemplates['content'] = handlebars.compile(`
    {{> components/event/calendar/event_calendar_event_teaser }}   
  `)
hbsTemplates['footer'] = handlebars.compile(`
    {{> components/event/calendar/event_calendar_footer }}   
  `)


const TemplateEventCalendarHeading = (args) => {
    return hbsTemplates['heading']({ ...args })
}

const TemplateEventCalendarNav = (args) => {
    return hbsTemplates['navigation']({ ...args })
}

const TemplateEventCalendarContent = (args, { globals: { customConditionalToolbar } }) => {
    return hbsTemplates['content']({ ...args })
}

const TemplateEventCalendarFooter = (args, { globals: { customConditionalToolbar } }) => {
    return hbsTemplates['footer']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Teaser/Eventkalender/Komponenten',

    parameters: {
        layout: 'fullscreen',
        chromatic: {
            disableSnapshot: true
        },
    },

    decorators: [
        (Story) => {
            return `<div class="grid grid-page"><div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">
             ${Story()} 
             </div></div>`
        },
    ],
}

export const Heading = {
    render: TemplateEventCalendarHeading.bind({}),
    name: 'Heading',
    decorators: [
        (Story) => {
            return `<div class="col-span-12"> 
             ${Story()} 
             </div>`
        },
    ],

    argTypes: {
        title: {
            description: 'Überschrift',

            table: {
                defaultValue: {
                    summary: 'Eventkalender',
                },
            },
        },
    },

    args: fixtures.heading.args,
}

export const Navigation = {
    render: TemplateEventCalendarNav.bind({}),
    name: 'Navigation',
    decorators: [
        (Story) => {
            return `<div class="col-span-12"> 
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.navigation.args.months,
}

export const Inhalt = {
    render: TemplateEventCalendarContent.bind({}),
    name: 'Inhalt',
    decorators: [
        (Story) => {
            return `<div class="col-span-12"> 
             ${Story()} 
             </div>`
        },
    ],

    argTypes: {
        statusDescriptionForLabelShort: {
            control: {
                type: 'select',

                labels: {
                    event_status_cancelled: 'Abgesagt!',
                    event_status_rescheduled: 'Verschoben!',
                    event_status_moved_online_short: 'Als Livestream',
                    event_status_gets_update: 'Wird aktualisiert!',
                },

                options: [
                    'event_status_cancelled',
                    'event_status_rescheduled',
                    'event_status_moved_online_short',
                    'event_status_gets_update',
                ],
            },

            description: 'Status des Events',

            table: {
                defaultValue: {
                    summary: 'event_status_cancelled',
                },
            },
        },
    },

    args: fixtures.content.args,
}

export const Footer = {
    render: TemplateEventCalendarFooter.bind({}),
    name: 'Footer',
    decorators: [
        (Story) => {
            return `<div class="col-span-12"> 
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.footer.args,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',
    decorators: [
        (Story) => {
            return `<div class="col-span-12"> 
             ${Story()} 
             </div>`
        },
    ],

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
