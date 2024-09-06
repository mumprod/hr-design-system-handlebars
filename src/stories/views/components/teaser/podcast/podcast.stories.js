import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import snapshotsJson from 'components/teaser/fixtures/teaser_podcast.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['episode'] = handlebars.compile(`
    {{> components/teaser/podcast/podcast }}   
  `)
hbsTemplates['playlist'] = handlebars.compile(`
    {{> components/teaser/podcast/podcast-playlist }}   
  `)


const episodeTemplate = (args) => {
    return hbsTemplates['episode']({ ...args })
}

const playlistTemplate = (args) => {
    return hbsTemplates['playlist']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, ...args })
}

export default {
    title: 'Komponenten/Teaser/Podcast',

    parameters: {
        chromatic: {
            viewports: [360, 768, 1024],
            diffThreshold: 0.3,
            disableSnapshot: true
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
    args: snapshotsJson.episode_100.args.logicItem.includeModel,
}

export const $50EpisodePlayer = {
    render: episodeTemplate.bind({}),
    name: '50% Episode Player',
    args: snapshotsJson.episode_50.args.logicItem.includeModel,
}

export const $100ChannelPlayer = {
    render: playlistTemplate.bind({}),
    name: '100% Channel Player',
    args: snapshotsJson.playlist_100.args.logicItem.includeModel,
}

export const $50ChannelPlayer = {
    render: playlistTemplate.bind({}),
    name: '50% Channel Player',
    args: snapshotsJson.playlist_50.args.logicItem.includeModel,
}

export const $100FilterPlayer = {
    render: playlistTemplate.bind({}),
    name: '100% Filter Player',
    args: snapshotsJson.playlist_filter.args.logicItem.includeModel,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: { snapshotsJson },
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
