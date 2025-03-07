import fixtures from './fixtures/label.json'
import { getSnapshotsTemplate } from '/src/assets/js/utils.js'

const handlebars = require('hrHandlebars')

const hbsTemplates = []
hbsTemplates['label'] = handlebars.compile(`
    {{> components/label/label}}
  `)

hbsTemplates['label_with_byline'] = handlebars.compile(`
{{#> components/label/label_group _css="mb-2" _tag=_tag}}
    {{> components/label/label}}
    {{> components/label/label_byline _css="ml-2" _text=_byline}}
{{/components/label/label_group}}
`)

const Template = (args) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return hbsTemplates['label']({ ...args })
}
const Template_withByline = (args) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return hbsTemplates['label_with_byline']({ ...args })
}
const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
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
            parameters: {
                controls: {
                    sort: 'alpha',
                },
                chromatic: { disableSnapshot: true }
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
export const TickerMitByline = {
    render: Template_withByline.bind({}),
    name: 'Ticker mit Byline',

    args: {
        _type: 'ticker',
        _text: 'Ticker',
        _byline: 'Hessen am Morgen',
        _tag: "h3"
    },
}
export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
