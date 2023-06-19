import ticker from './teaser_ticker_alternativ.hbs'
import tickerTeaserHeroAlternativ from '../fixtures/ticker_teaser_alternativ_hero.json'
import tickerTeaserHeroAlternativAudio from '../fixtures/ticker_teaser_alternativ_hero_audio.json'
import tickerTeaser100Alternativ from '../fixtures/ticker_teaser_alternativ_100.json'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return ticker({ brand, ...args })
}

export default {
    title: 'Komponenten/Teaser/Ticker/Alternativ',

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

export const TickerTeaserAlternativHero = {
    render: Template.bind({}),
    name: 'Alternativ Hero',
    args: tickerTeaserHeroAlternativ.logicItem.includeModel,
}

export const TickerTeaserAlternativAudio = {
    render: Template.bind({}),
    name: 'Alternativ Hero Media',
    args: tickerTeaserHeroAlternativAudio.logicItem.includeModel,
}

export const TickerTeaserAlternativ100 = {
    render: Template.bind({}),
    name: 'Alternativ 100',
    args: tickerTeaser100Alternativ.logicItem.includeModel,
}

