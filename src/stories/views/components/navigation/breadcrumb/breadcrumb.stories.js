export default {
    title: 'Komponenten/Navigation/Breadcrumb',

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
