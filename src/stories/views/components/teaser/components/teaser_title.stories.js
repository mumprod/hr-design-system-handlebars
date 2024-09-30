import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from 'components/teaser/components/fixtures/teaser_title.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/teaser/components/teaser_title }}   
  `)

const Template = (args) => {
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Teaser/Komponenten/Titel',

    parameters: {

        chromatic: {
            diffThreshold: 0.3,
            disableSnapshot: true
        },
    },

    argTypes: {
        _text: {
            control: 'text',
            description: 'Titel',
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
    },
}

export const TitelSerifHero = {
    render: Template.bind({}),
    name: 'Titel Serif - Hero',

    args: fixtures["1_hero"].args,
}

export const TitelSerifNormal = {
    render: Template.bind({}),
    name: 'Titel Serif - normal',

    args: fixtures["2_normal"].args,
}

export const TitelSerifSmall = {
    render: Template.bind({}),
    name: 'Titel Serif - small',

    args: fixtures["3_small"].args,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
