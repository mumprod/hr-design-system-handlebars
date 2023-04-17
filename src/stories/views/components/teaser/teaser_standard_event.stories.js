import teaser from './teaser_standard.hbs'
import teaserAlternative from './teaser_alternativ.hbs'
import teaser33SingleEventSerif from './fixtures/teaser_standard_33_serif_single_event.json'
import teaser33SingleEventStatus from './fixtures/teaser_standard_33_serif_single_event_status.json'
import teaser33TwoEventsSerif from './fixtures/teaser_standard_33_serif_two_events.json'
import teaser33MultipleEventsSerif from './fixtures/teaser_standard_33_serif_multiple_events.json'
import teaser50SingleEventSerif from './fixtures/teaser_standard_50_serif_single_event.json'
import teaser100SingleEventSerif from './fixtures/teaser_standard_100_serif_single_event.json'
import teaser100TwoEventsSerif from './fixtures/teaser_standard_100_serif_two_events.json'
import teaserAlternative100SingleEventSerif from './fixtures/teaser_alternative_100_serif_single_event.json'
import teaserAlternative100TwoEventsSerif from './fixtures/teaser_alternative_100_serif_two_events.json'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return teaser({ brand, ...args })
}

const TemplateAlternative = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return teaserAlternative({ brand, ...args })
}

export default {
    title: 'Komponenten/Teaser/Event',

    parameters: {
        layout: 'fullscreen',

        chromatic: {
            viewports: [360, 1024],
            diffThreshold: 0.5,
        },
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
            return `<div class="grid grid-page"><div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div></div>`
        },
    ],
}

export const Standard33EinzelEvent = {
    render: Template.bind({}),
    name: 'Standard 33 Einzel-Event',
    args: teaser33SingleEventSerif.logicItem.includeModel,
}

export const Standard33EinzelEventAbgesagt = {
    render: Template.bind({}),
    name: 'Standard 33 Einzel-Event abgesagt',
    args: teaser33SingleEventStatus.logicItem.includeModel,
}

export const Standard33ZweiEvents = {
    render: Template.bind({}),
    name: 'Standard 33 zwei Events',
    args: teaser33TwoEventsSerif.logicItem.includeModel,
}

export const Standard33MehrereEvents = {
    render: Template.bind({}),
    name: 'Standard 33 mehrere Events',
    args: teaser33MultipleEventsSerif.logicItem.includeModel,
}

export const Standard50EinzelEvent = {
    render: Template.bind({}),
    name: 'Standard 50 Einzel-Event',
    args: teaser50SingleEventSerif.logicItem.includeModel,
}

export const Standard100EinzelEvent = {
    render: Template.bind({}),
    name: 'Standard 100 Einzel-Event',
    args: teaser100SingleEventSerif.logicItem.includeModel,
}

export const Standard100ZweiEvents = {
    render: Template.bind({}),
    name: 'Standard 100 zwei Events',
    args: teaser100TwoEventsSerif.logicItem.includeModel,
}

export const Alternativ100EinzelEvent = {
    render: TemplateAlternative.bind({}),
    name: 'Alternativ 100 Einzel-Event',
    args: teaserAlternative100SingleEventSerif.logicItem.includeModel,
}

export const Alternativ100ZweiEvents = {
    render: TemplateAlternative.bind({}),
    name: 'Alternativ 100 zwei Events',
    args: teaserAlternative100TwoEventsSerif.logicItem.includeModel,
}
