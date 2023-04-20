import ticker from './teaser_ticker.hbs'
import tickerTeaser100Standard from '../fixtures/ticker_teaser_standard_100.json'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return ticker({ brand, ...args })
}

export default {
    title: 'Komponenten/Teaser/Ticker',

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

export const TickerTeaser100 = {
    render: Template.bind({}),
    name: 'Standard 100',
    args: tickerTeaser100Standard.logicItem.includeModel,
}
