import ticker from './teaser_ticker_standard.hbs'
import tickerTeaserHeroStandard from '../fixtures/ticker_teaser_standard_hero.json'
import tickerTeaserHeroStandardAudio from '../fixtures/ticker_teaser_standard_hero_audio.json'
import tickerTeaser100Standard from '../fixtures/ticker_teaser_standard_100.json'
import tickerTeaser50Standard from '../fixtures/ticker_teaser_standard_50.json'
import tickerTeaser33Standard from '../fixtures/ticker_teaser_standard_33.json'
import tickerTeaser25Standard from '../fixtures/ticker_teaser_standard_25.json'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return ticker({ brand, ...args })
}

export default {
    title: 'Komponenten/Teaser/Ticker/Standard',

    parameters: {
        layout: '',
    },

    argTypes: {},

    decorators: [
        (Story) => {
            return `<div class="grid grid-page"><div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div></div>`
        },
    ],
}

export const TickerTeaserHero = {
    render: Template.bind({}),
    name: 'Standard Hero',
    args: tickerTeaserHeroStandard.logicItem.includeModel,
}

export const TickerTeaserHeroAudio = {
    render: Template.bind({}),
    name: 'Standard Hero Media',
    args: tickerTeaserHeroStandardAudio.logicItem.includeModel,
}

export const TickerTeaser100 = {
    render: Template.bind({}),
    name: 'Standard 100',
    args: tickerTeaser100Standard.logicItem.includeModel,
}

export const TickerTeaser50 = {
    render: Template.bind({}),
    name: 'Standard 50',
    args: tickerTeaser50Standard.logicItem.includeModel,
}

export const TickerTeaser33 = {
    render: Template.bind({}),
    name: 'Standard 33',
    args: tickerTeaser33Standard.logicItem.includeModel,
}

export const TickerTeaser25 = {
    render: Template.bind({}),
    name: 'Standard 25',
    args: tickerTeaser25Standard.logicItem.includeModel,
}