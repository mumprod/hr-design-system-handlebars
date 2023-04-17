import { addLabel, removeLabel, changeTeaserSize } from './labelHelper'
import { addCommentLink } from './jsonHelper'
import teaser from './teaser_alternativ.hbs'
import heroTeaser_video from './fixtures/teaser_alternative_hero_serif_video.json'
import heroTeaser_audio from './fixtures/teaser_alternative_hero_serif_audio.json'
import heroTeaser_live from './fixtures/teaser_alternative_hero_serif_live.json'
import teaser100_video from './fixtures/teaser_alternative_100_serif_video.json'
import teaser100_audio from './fixtures/teaser_alternative_100_serif_audio.json'
import teaser100_live from './fixtures/teaser_alternative_100_serif_live.json'
import teaser50_video from './fixtures/teaser_alternative_50_serif_video.json'
import teaser50_audio from './fixtures/teaser_alternative_50_serif_audio.json'
import teaser50_live from './fixtures/teaser_alternative_50_serif_live.json'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return teaser({ brand, ...args })
}

export default {
    title: 'Komponenten/Teaser/AV-Alternativ',

    parameters: {
        layout: 'fullscreen',

        chromatic: {
            viewports: [360, 1024],
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
            return `<div class="grid grid-page"><div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div></div>`
        },
    ],
}

export const AlternativHeroVideo = {
    render: Template.bind({}),
    name: 'Alternativ Hero Video',
    args: heroTeaser_video.logicItem.includeModel,
}

export const AlternativHeroAudio = {
    render: Template.bind({}),
    name: 'Alternativ Hero Audio',
    args: heroTeaser_audio.logicItem.includeModel,
}

export const AlternativHeroLive = {
    render: Template.bind({}),
    name: 'Alternativ Hero Live',
    args: heroTeaser_live.logicItem.includeModel,
}

export const Alternativ100Video = {
    render: Template.bind({}),
    name: 'Alternativ 100 Video',
    args: teaser100_video.logicItem.includeModel,
}

export const Alternativ100Audio = {
    render: Template.bind({}),
    name: 'Alternativ 100 Audio',
    args: teaser100_audio.logicItem.includeModel,
}

export const Alternativ100Live = {
    render: Template.bind({}),
    name: 'Alternativ 100 Live',
    args: teaser100_live.logicItem.includeModel,
}

export const Alternativ50Video = {
    render: Template.bind({}),
    name: 'Alternativ 50 Video',
    args: teaser50_video.logicItem.includeModel,
}

export const Alternativ50Audio = {
    render: Template.bind({}),
    name: 'Alternativ 50 Audio',
    args: teaser50_audio.logicItem.includeModel,
}

export const Alternativ50Live = {
    render: Template.bind({}),
    name: 'Alternativ 50 Live',
    args: teaser50_live.logicItem.includeModel,
}
