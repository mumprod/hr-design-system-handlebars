import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from 'components/teaser/fixtures/teaser_ticker_standard.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/teaser/ticker/teaser_ticker_standard }}   
  `)


const Template = (args) => {
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Teaser/Ticker/Standard',

    parameters: {
        layout: '',
        chromatic: {
            diffThreshold: 0.3,
            disableSnapshot: true
        },
    },

    argTypes: {},

    decorators: [
        (Story) => {
            return `<div class="grid grid-page">  
             ${Story()} 
             </div>`
        },
    ],
}

export const TickerTeaserHero = {
    render: Template.bind({}),
    name: 'Standard Hero',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_hero.hero.args.logicItem.includeModel,
}

export const TickerTeaserHeroAudio = {
    render: Template.bind({}),
    name: 'Standard Hero Media',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_hero.hero_with_audio.args.logicItem.includeModel,
}

export const TickerTeaser100 = {
    render: Template.bind({}),
    name: 'Standard 100',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100["100"].args.logicItem.includeModel,
}

export const TickerTeaser50 = {
    render: Template.bind({}),
    name: 'Standard 50',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50["50"].args.logicItem.includeModel,
}

export const TickerTeaser33 = {
    render: Template.bind({}),
    name: 'Standard 33',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_33["33"].args.logicItem.includeModel,
}

export const TickerTeaser25 = {
    render: Template.bind({}),
    name: 'Standard 25',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_25["25"].args.logicItem.includeModel,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
