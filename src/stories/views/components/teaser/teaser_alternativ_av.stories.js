import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from './fixtures/teaser_alternative_av.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/teaser/teaser_alternativ }}   
  `)

const Template = (args) => {
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Teaser/AV-Alternativ',

    parameters: {
        layout: 'fullscreen',

        chromatic: {
            viewports: [360, 1024],
            diffThreshold: 0.3,
            disableSnapshot: true
        },
    },

    argTypes: {
        teaserSize: {
            control: {
                type: 'select',
                options: ['hero', '100', '50'],
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
            return `<div class="grid grid-page"> 
             ${Story()} 
             </div>`
        },
    ],
}

export const AlternativHeroVideo = {
    render: Template.bind({}),
    name: 'Alternativ Hero Video',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_hero.video_ondemand.args.logicItem.includeModel,
}

export const AlternativHeroLive = {
    render: Template.bind({}),
    name: 'Alternativ Hero Live',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_hero.video_livestream.args.logicItem.includeModel,
}

export const AlternativHeroAudio = {
    render: Template.bind({}),
    name: 'Alternativ Hero Audio',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_hero.audio_ondemand.args.logicItem.includeModel,
}



export const AlternativHeroAudioEventLivestream = {
    render: Template.bind({}),
    name: 'Alternativ Hero Audio Livestream',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_hero.audio_event_livestream.args.logicItem.includeModel,
}

export const AlternativHeroPodcast = {
    render: Template.bind({}),
    name: 'Alternativ Hero Podcast',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_hero.podcast.args.logicItem.includeModel,
}

export const Alternativ100Video = {
    render: Template.bind({}),
    name: 'Alternativ 100 Video',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.video_ondemand.args.logicItem.includeModel,
}

export const Alternativ100Live = {
    render: Template.bind({}),
    name: 'Alternativ 100 Live',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.video_livestream.args.logicItem.includeModel,
}

export const Alternativ100Audio = {
    render: Template.bind({}),
    name: 'Alternativ 100 Audio',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.audio_ondemand.args.logicItem.includeModel,
}

export const Alternativ100AudioEventLivestream = {
    render: Template.bind({}),
    name: 'Alternativ 100 Audio Livestream',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.audio_event_livestream.args.logicItem.includeModel,
}

export const Alternativ100Podcast = {
    render: Template.bind({}),
    name: 'Alternativ 100 Podcast',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.podcast.args.logicItem.includeModel,
}

export const Alternativ50Video = {
    render: Template.bind({}),
    name: 'Alternativ 50 Video',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50.video_ondemand.args.logicItem.includeModel,
}

export const Alternativ50Live = {
    render: Template.bind({}),
    name: 'Alternativ 50 Live',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50.video_livestream.args.logicItem.includeModel,
}

export const Alternativ50Audio = {
    render: Template.bind({}),
    name: 'Alternativ 50 Audio',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50.audio_ondemand.args.logicItem.includeModel,
}

export const Alternativ50AudioEventLivestream = {
    render: Template.bind({}),
    name: 'Alternativ 50 Audio Livestream',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50.audio_event_livestream.args.logicItem.includeModel,
}

export const Alternativ50Podcast = {
    render: Template.bind({}),
    name: 'Alternativ 50 Podcast',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50.podcast.args.logicItem.includeModel,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}

