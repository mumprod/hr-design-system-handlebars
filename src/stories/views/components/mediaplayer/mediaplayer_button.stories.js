import handlebars from 'handlebars'

const buttonTemplate = (args, { globals: { customConditionalToolbar } }) => {
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    let hbsTemplate = handlebars.compile(`
    {{> components/mediaplayer/mediaplayer_button _css="!static"}}
  `)
    return hbsTemplate({ brand, ...args })
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
    },
}

export const Spielplatz = {
    render: buttonTemplate.bind({}),
    name: 'Spielplatz',

    args: {
        _icon: 'play_button',
        _label: 'Video',
        _isLivestream: false,
    },
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

    args: {
        _icon: 'play_button',
        _label: 'Video',
        _isLivestream: false,
    },
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

    args: {
        _icon: 'audio_button',
        _label: 'Audio',
        _isLivestream: false,
    },
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

    args: {
        _icon: 'podcast-button',
        _label: 'Podcast',
        _isLivestream: false,
    },
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

    args: {
        _icon: 'play_button',
        _label: 'Video - Livestream',
        _isLivestream: true,
    },
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

    args: {
        _icon: 'audio_button',
        _label: 'Audio - Livestream',
        _isLivestream: true,
    },
}
