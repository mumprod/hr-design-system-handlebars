import snapshotsJson from './fixtures/mediaplayer_button.json'
import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
const handlebars = require('hrHandlebars')

const hbsTemplates = []
hbsTemplates['button'] = handlebars.compile(`
    {{> components/mediaplayer/mediaplayer_button _css="!static"}}
  `)

const buttonTemplate = (args) => {
    return hbsTemplates['button']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Buttons/Mediaplayer-Button',

    argTypes: {
        _label: {
            description: 'Label des Buttons (wird ausschließlich Screenreader Nutzern vorgelesen)',
            control: 'text',
        },

        _icon: {
            control: {
                type: 'select',
                options: ['play_button', 'audio_button', 'podcast-button'],
            },

            description: 'Das Icon des Buttons',
        },

        _isLivestream: {
            description:
                'Legt die Farbe des Buttons fest. Ist es ein Livestream, hat er eine andere Farbe.',
            control: 'boolean',
        },
    },

    parameters: {
        controls: {
            sort: 'alpha',
        },
        chromatic: { disableSnapshot: true }
    },
}

export const Spielplatz = {
    render: buttonTemplate.bind({}),
    name: 'Spielplatz',

    args: snapshotsJson['button-video'].args,
}

export const Video = {
    render: buttonTemplate.bind({}),
    name: 'Video',

    argTypes: {
        _icon: {
            control: false,
        },

        _label: {
            control: false,
        },

        _isLivestream: {
            control: false,
        },
    },

    args: snapshotsJson['button-video'].args,
}

export const Audio = {
    render: buttonTemplate.bind({}),
    name: 'Audio',

    argTypes: {
        _icon: {
            control: false,
        },

        _label: {
            control: false,
        },

        _isLivestream: {
            control: false,
        },
    },

    args: snapshotsJson['button-audio'].args,
}

export const Podcast = {
    render: buttonTemplate.bind({}),
    name: 'Podcast',

    argTypes: {
        _icon: {
            control: false,
        },

        _label: {
            control: false,
        },

        _isLivestream: {
            control: false,
        },
    },

    args: snapshotsJson['button-podcast'].args,
}

export const VideoLivestream = {
    render: buttonTemplate.bind({}),
    name: 'Video - Livestream',

    argTypes: {
        _icon: {
            control: false,
        },

        _label: {
            control: false,
        },

        _isLivestream: {
            control: false,
        },
    },

    args: snapshotsJson['button-video-livestream'].args,
}

export const AudioLivestream = {
    render: buttonTemplate.bind({}),
    name: 'Audio - Livestream',

    argTypes: {
        _icon: {
            control: false,
        },

        _label: {
            control: false,
        },

        _isLivestream: {
            control: false,
        },
    },

    args: snapshotsJson['button-audio-livestream'].args
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    argTypes: {
        _icon: {
            control: false,
        },

        _label: {
            control: false,
        },

        _isLivestream: {
            control: false,
        },
    },

    args: snapshotsJson,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
