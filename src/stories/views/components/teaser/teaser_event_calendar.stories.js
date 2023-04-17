import teaserEventCalendar from '../../components/teaser/teaser_event_calendar.hbs'
import teaserEventCalendar100Serif from './fixtures/teaser_event_calendar_100_serif.json'
import teaserEventCalendarWithNoFutureEventsData from './fixtures/teaser_event_calendar_100_no_future_events.json'

const TemplateEventCalendarTeaser = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return teaserEventCalendar({ brand, ...args })
}

export default {
    title: 'Komponenten/Teaser/Eventkalender',

    parameters: {
        layout: 'fullscreen',
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
            return `<div class="grid grid-page"><div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div></div>`
        },
    ],
}

export const Teaser100 = {
    render: TemplateEventCalendarTeaser.bind({}),
    name: 'Teaser 100',

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

    args: teaserEventCalendar100Serif.logicItem.includeModel,
}

export const Teaser100KeineEventsInDerZukunft = {
    render: TemplateEventCalendarTeaser.bind({}),
    name: 'Teaser 100 Keine Events in der Zukunft',

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

    args: teaserEventCalendarWithNoFutureEventsData.logicItem.includeModel,
}
