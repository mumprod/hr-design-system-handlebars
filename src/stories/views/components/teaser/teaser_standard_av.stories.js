import teaser from './teaser_standard.hbs'

import teaser50video from './fixtures/teaser_standard_50_serif_video.json'
import teaser25video from './fixtures/teaser_standard_25_serif_video.json'
import teaser50audio from './fixtures/teaser_standard_50_serif_audio.json'
import teaser50podcast from './fixtures/teaser_standard_50_serif_podcast.json'
import teaser25podcast from './fixtures/teaser_standard_25_serif_podcast.json'
import teaser50audioLivestream from './fixtures/teaser_standard_50_serif_audio_livestream.json'
import teaser25audio from './fixtures/teaser_standard_25_serif_audio.json'
import teaser25audioLivestream from './fixtures/teaser_standard_25_serif_audio_livestream.json'
import teaser50live from './fixtures/teaser_standard_50_serif_live.json'
import teaser25live from './fixtures/teaser_standard_25_serif_live.json'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return teaser({ brand, ...args })
}

export default {
    title: 'Komponenten/Teaser/AV-Standard',

    parameters: {
        layout: 'fullscreen',

        chromatic: {
            diffThreshold: 0.3,
        },
    },

    argTypes: {
        teaserSize: {
            control: {
                type: 'select',
                options: ['hero', '100', '50', '33', '25'],
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

export const Standard50Video = {
    render: Template.bind({}),
    name: 'Standard 50% Video',
    args: teaser50video.logicItem.includeModel,
}

export const Standard25Video = {
    render: Template.bind({}),
    name: 'Standard 25% Video',
    args: teaser25video.logicItem.includeModel,
}

export const Standard50VideoLivestream = {
    render: Template.bind({}),
    name: 'Standard 50% Video Livestream',
    args: teaser50live.logicItem.includeModel,
}

export const Standard25VideoLivestream = {
    render: Template.bind({}),
    name: 'Standard 25% Video Livestream',
    args: teaser25live.logicItem.includeModel,
}

export const Standard50Audio = {
    render: Template.bind({}),
    name: 'Standard 50% Audio',
    args: teaser50audio.logicItem.includeModel,
}

export const Standard25Audio = {
    render: Template.bind({}),
    name: 'Standard 25% Audio',
    args: teaser25audio.logicItem.includeModel,
}

export const Standard50Podcast = {
    render: Template.bind({}),
    name: 'Standard 50% Podcast',
    args: teaser50podcast.logicItem.includeModel,
}

export const Standard25Podcast = {
    render: Template.bind({}),
    name: 'Standard 25% Podcast',
    args: teaser25podcast.logicItem.includeModel,
}

export const Standard50AudioLivestream = {
    render: Template.bind({}),
    name: 'Standard 50% Audio Livestream',
    args: teaser50audioLivestream.logicItem.includeModel,
}

export const Standard25AudioLivestream = {
    render: Template.bind({}),
    name: 'Standard 25% Audio Livestream',
    args: teaser25audioLivestream.logicItem.includeModel,
}
