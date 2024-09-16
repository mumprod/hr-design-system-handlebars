import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from 'components/teaser/fixtures/teaser_ticker_alternative.json'

import ticker from './teaser_ticker_alternativ.hbs'
import tickerTeaserHeroAlternativ from '../fixtures/ticker_teaser_alternativ_hero.json'
import tickerTeaserHeroAlternativAudio from '../fixtures/ticker_teaser_alternativ_hero_audio.json'
import tickerTeaser100Alternativ from '../fixtures/ticker_teaser_alternativ_100.json'


const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/teaser/ticker/teaser_ticker_alternativ }}   
  `)


const Template = (args) => {
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}


export default {
    title: 'Komponenten/Teaser/Ticker/Alternativ',

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

export const TickerTeaserAlternativHero = {
    render: Template.bind({}),
    name: 'Alternativ Hero',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_hero.hero.args.logicItem.includeModel,
}

export const TickerTeaserAlternativAudio = {
    render: Template.bind({}),
    name: 'Alternativ Hero Media',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_hero.hero_with_audio.args.logicItem.includeModel
}

export const TickerTeaserAlternativ100 = {
    render: Template.bind({}),
    name: 'Alternativ 100',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100["100"].args.logicItem.includeModel
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
