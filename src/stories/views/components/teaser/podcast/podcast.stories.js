import podcast from './podcast.hbs'
import podcastPlaylist from './podcast-playlist.hbs'
import episodeJson from '../fixtures/teaser_podcast.json'
import episodeJson50 from '../fixtures/teaser_podcast_50.json'
import playlistJson100 from '../fixtures/teaser_podcast_playlist.json'
import playlistJson50 from '../fixtures/teaser_podcast_playlist_50.json'

const episodeTemplate = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return podcast({ brand, ...args })
}

const playlistTemplate = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return podcastPlaylist({ brand, ...args })
}

export default {
    title: 'Komponenten/Teaser/Podcast',

    parameters: {
        chromatic: {
            viewports: [360, 768, 1024],
            diffThreshold: 0.5,
        },

        layout: 'fullscreen',
    },

    argTypes: {},

    decorators: [
        (Story) => {
            return `<div class="grid grid-page">
                     <div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">
                         ${Story()} 
                     </div>
                 </div>`
        },
    ],
}

export const $100EpisodePlayer = {
    render: episodeTemplate.bind({}),
    name: '100% Episode Player',
    args: episodeJson.logicItem.includeModel,
}

export const $50EpisodePlayer = {
    render: episodeTemplate.bind({}),
    name: '50% Episode Player',
    args: episodeJson50.logicItem.includeModel,
}

export const $100ChannelPlayer = {
    render: playlistTemplate.bind({}),
    name: '100% Channel Player',
    args: playlistJson100.logicItem.includeModel,
}

export const $50ChannelPlayer = {
    render: playlistTemplate.bind({}),
    name: '50% Channel Player',
    args: playlistJson50.logicItem.includeModel,
}
