import page from './page_players.hbs'
import AudioDataMixed from '../page/fixtures/page.json'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return page({ brand, ...args })
}

export default {
    title: 'Komponenten/Page/Page mit Player',
    argTypes: {},

    parameters: {
        chromatic: {
            viewports: [360, 768, 1024],
        },

        layout: 'fullscreen',

        docs: {
            inlineStories: false,
            iframeHeight: 400,
        },
    },
}

export const PlayerInteraktion = {
    render: Template.bind({}),
    name: 'Player-Interaktion',
    args: AudioDataMixed,
}
