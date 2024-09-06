import { userEvent, within, waitFor } from '@storybook/test'
import snapshotsJson from './fixtures/mediaplayer_snapshots.json'
import { getSnapshotsTemplate } from '/src/assets/js/utils.js'

const handlebars = require('hrHandlebars')

const hbsTemplates = []
hbsTemplates['mediaplayer'] = handlebars.compile(`
    {{> components/mediaplayer/media_player}}  
  `)

const Template = (args) => {
    return hbsTemplates['mediaplayer']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Mediaplayer',

    argTypes: {
        _isTeaser: {
            control: 'boolean',
            description:
                'Legt fest, ob der Player in einem Teaser verwendet wird und, falls dies der Fall ist, ein statisches Teaser-Bild vorgeschaltet bekommt.',
        },
        _uiTestHook: {
            control: 'text',
            description:
                'Hierüber kann eine CSS Hook Klasse gesetzt werden, um den Player Container in einem UI-Test einfach selektieren zu können.',
            defaultValue: {
                summary: 'ui-test-mediaplayer',
            },
        },
    },

    parameters: {
        controls: {
            sort: 'requiredFirst',
        },
        chromatic: { disableSnapshot: true }
    },
}

export const Videoplayer = {
    render: Template.bind({}),
    name: 'Videoplayer',
    decorators: [
        (Story) => {
            return `<div class="flex flex-row pt-5">
                         ${Story()} 
                     </div>`
        },
    ],
    args: snapshotsJson.video.args,
}

export const VideoplayerSettings = {
    render: Template.bind({}),
    name: 'Videoplayer Einstellungen',
    decorators: [
        (Story) => {
            return `<div class="flex flex-row pt-5">
                         ${Story()} 
                     </div>`
        },
    ],
    args: snapshotsJson.video.args,
    parameters: {
        chromatic: { disableSnapshot: false },
    },
    play: async ({ canvasElement }) => {
        let canvas = within(canvasElement)
        await userEvent.click(await canvas.findByTitle('Wiedergabe [Leertaste]'))
        userEvent.keyboard('[Space]', { delay: 1000 })
        userEvent.keyboard('{ArrowLeft}', { delay: 1500 })
        await userEvent.click(await canvas.findByTitle('Einstellungen an / aus'), { delay: 2000 })
    },
}

export const VideoplayerLive = {
    render: Template.bind({}),
    decorators: [
        (Story) => {
            return `<div class="flex flex-row pt-5">
                         ${Story()} 
                     </div>`
        },
    ],
    name: 'Videoplayer Livestream',
    args: snapshotsJson.video_livestream.args,
}

export const Audioplayer = {
    render: Template.bind({}),
    name: 'Audioplayer',
    decorators: [
        (Story) => {
            return `<div class="flex flex-row pt-5" style="height:184px;">
                         ${Story()} 
                     </div>`
        },
    ],
    args: snapshotsJson.audio.args,
}

export const AudioplayerLivestream = {
    render: Template.bind({}),
    decorators: [
        (Story) => {
            return `<div class="flex flex-row pt-5" style="height:184px;">
                         ${Story()} 
                     </div>`
        },
    ],
    name: 'Audioplayer Livestream',
    args: snapshotsJson.audio_event_livestream.args,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',
    args: snapshotsJson,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
