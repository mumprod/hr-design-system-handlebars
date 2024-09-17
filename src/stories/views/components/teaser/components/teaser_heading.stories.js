import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from 'components/teaser/components/fixtures/teaser_headings.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/teaser/components/teaser_heading }}   
  `)

const Template = (args) => {
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Teaser/Komponenten/Teaserheading',

    parameters: {

        chromatic: {
            diffThreshold: 0.3,
            disableSnapshot: true
        },
    },

    argTypes: {
        _topline: {
            control: 'text',
            description: 'Text der Dachzeile',
        },

        _title: {
            control: 'text',
            description: 'Text der Überschrift',
        },

        _headlineTag: {
            control: {
                type: 'select',
                options: ['span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            },

            description: 'HTML-Tag der Überschrift',

            table: {
                defaultValue: {
                    summary: 'span',
                },
            },
        },

        _fontVariant: {
            description: 'Schriftvariante',

            control: {
                type: 'inline-radio',
                options: ['serif', 'sans-serif'],
            },

            table: {
                defaultValue: {
                    summary: 'serif',
                },
            },
        },

        _size: {
            options: ['hero', '100', '50', '33', '25'],

            control: {
                type: 'select',
            },

            description: 'Größe der Überschrift',

            table: {
                defaultValue: {
                    summary: 'hero',
                },
            },
        },
    },
}

export const SerifHero = {
    render: Template.bind({}),
    name: 'Serif Hero',

    parameters: {
        docs: {
            source: {
                code: ``,
            },
        },
    },

    args: fixtures["1_hero"].args
}

export const Serif50 = {
    render: Template.bind({}),
    name: 'Serif 50',

    parameters: {
        docs: {
            source: {
                code: ``,
            },
        },
    },

    args: fixtures["2_50"].args
}

export const Serif33 = {
    render: Template.bind({}),
    name: 'Serif 33',

    parameters: {
        docs: {
            source: {
                code: ``,
            },
        },
    },

    args: fixtures["3_33"].args
}

export const Serif25 = {
    render: Template.bind({}),
    name: 'Serif 25',

    parameters: {
        docs: {
            source: {
                code: ``,
            },
        },
    },

    args: fixtures["4_25"].args
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
