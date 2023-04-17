import label from './label.hbs'

const Template = ({ _type, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return label({ _type, ...args })
}

export default {
    title: 'Komponenten/Label',

    argTypes: {
        _type: {
            control: {
                type: 'select',

                labels: {
                    'analysis': 'Analyse',
                    'event': 'Event',
                    'comment': 'Kommentar',
                    'media': 'Medieninhalte',
                    'breakingnews': 'Eilmeldung',
                    'der-tag-in-hessen': 'Der Tag in Hessen',
                    'glosse': 'Glosse',
                    'fragen-und-antworten': 'Fragen und Antworten',
                    'infografik': 'Infografik',
                    'interaktiv': 'Interaktiv',
                    'program': 'Sendung',
                    'download': 'Download',
                    'pm': 'Pressemitteilung',
                    'liveticker': 'Liveticker',
                    'ticker': 'Ticker',
                    'livestream': 'Livestream',
                    'live': 'Live',
                    'livechat': 'Livechat',
                    'buliticker': 'Bundesliga-Ticker',
                    'social-tv': 'Social-TV',
                    'blog': 'Blog',
                    'kurzmeldung': 'Kurzmeldung',
                },

                options: [
                    '',
                    'analysis',
                    'blog',
                    'buliticker',
                    'der-tag-in-hessen',
                    'download',
                    'breakingnews',
                    'event',
                    'fragen-und-antworten',
                    'glosse',
                    'infografik',
                    'interaktiv',
                    'comment',
                    'live',
                    'livechat',
                    'livestream',
                    'liveticker',
                    'media',
                    'pm',
                    'program',
                    'social-tv',
                    'ticker',
                    'kurzmeldung',
                ],
            },

            description: 'Art des Labels',

            table: {
                defaultValue: {
                    summary: 'media',
                },
            },
        },

        _text: {
            control: 'text',
            description: 'Beschriftung des Labels',
        },
    },
}

export const Download = {
    render: Template.bind({}),
    name: 'Download',

    args: {
        _type: 'download',
        _text: 'Download',
    },
}

export const Eilmeldung = {
    render: Template.bind({}),
    name: 'Eilmeldung',

    args: {
        _type: 'breakingnews',
        _text: 'Eilmeldung',
    },
}

export const Event = {
    render: Template.bind({}),
    name: 'Event',

    args: {
        _type: 'event',
        _text: 'Event',
    },
}

export const Infografik = {
    render: Template.bind({}),
    name: 'Infografik',

    args: {
        _type: 'infografik',
        _text: 'Infografik',
    },
}

export const Kommentar = {
    render: Template.bind({}),
    name: 'Kommentar',

    args: {
        _type: 'comment',
        _text: 'Kommentar',
    },
}

export const Liveticker = {
    render: Template.bind({}),
    name: 'Liveticker',

    args: {
        _type: 'liveticker',
        _text: 'Liveticker',
    },
}

export const Media = {
    render: Template.bind({}),
    name: 'Media',

    args: {
        _type: 'media',
        _text: 'Media',
    },
}

export const Pressemitteilung = {
    render: Template.bind({}),
    name: 'Pressemitteilung',

    args: {
        _type: 'pm',
        _text: 'Pressemitteilung',
    },
}

export const Sendung = {
    render: Template.bind({}),
    name: 'Sendung',

    args: {
        _type: 'program',
        _text: 'Sendung',
    },
}

export const Kurzmeldung = {
    render: Template.bind({}),
    name: 'Kurzmeldung',

    args: {
        _type: 'kurzmeldung',
        _text: 'Kurzmeldung',
    },
}
