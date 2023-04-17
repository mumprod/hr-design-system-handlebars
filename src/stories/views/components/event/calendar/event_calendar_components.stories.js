import eventCalendarHeading from './event_calendar_heading.hbs'
import eventCalendarNav from './event_calendar_nav.hbs'
import eventCalendarContent from './event_calendar_event_teaser.hbs'
import eventCalendarFooter from './event_calendar_footer.hbs'
import teaserEventCalendar100Serif from '../../teaser/fixtures/teaser_event_calendar_100_serif.json'
import eventCalendarEventTeaserData from './fixtures/event_calendar_event_teaser.json'
import eventCalendarFooterData from './fixtures/event_calendar_footer.json'

const TemplateEventCalendarHeading = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return eventCalendarHeading({ brand, ...args })
}

const TemplateEventCalendarNav = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return eventCalendarNav({ brand, ...args })
}

const TemplateEventCalendarContent = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return eventCalendarContent({ brand, ...args })
}

const TemplateEventCalendarFooter = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return eventCalendarFooter({ brand, ...args })
}

export default {
    title: 'Komponenten/Teaser/Eventkalender/Komponenten',

    parameters: {
        layout: 'fullscreen',
    },

    decorators: [
        (Story) => {
            return `<div class="grid grid-page"><div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main"><div class="col-span-12">
             ${Story()} 
             </div></div></div>`
        },
    ],
}

export const Heading = {
    render: TemplateEventCalendarHeading.bind({}),
    name: 'Heading',

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

    args: {
        title: 'Eventkalender',
    },
}

export const Navigation = {
    render: TemplateEventCalendarNav.bind({}),
    name: 'Navigation',
    args: teaserEventCalendar100Serif.logicItem.includeModel.eventCalendar.months,
}

export const Inhalt = {
    render: TemplateEventCalendarContent.bind({}),
    name: 'Inhalt',

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

    args: {
        ...eventCalendarEventTeaserData,
        _withConcertInfo: false,
        _showTeaser: true,
    },
}

export const Footer = {
    render: TemplateEventCalendarFooter.bind({}),
    name: 'Footer',
    args: eventCalendarFooterData,
}
