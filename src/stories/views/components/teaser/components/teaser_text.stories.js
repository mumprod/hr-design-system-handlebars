import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from 'components/teaser/components/fixtures/teaser_text.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/teaser/components/teaser_text }}   
  `)
const Template = (args) => {
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}


export default {
    title: 'Komponenten/Teaser/Komponenten/Teasertext',
    parameters: {

        chromatic: {
            diffThreshold: 0.3,
            disableSnapshot: true
        },
    },
    argTypes: {
        _text: {
            control: 'text',
            description: 'teaserText',
        },

        _size: {
            options: ['hero', '100', '50', '33', '25'],

            control: {
                type: 'inline-radio',
            },
        },

        _font: {
            table: {
                disable: true,
            },
        },
    },
}

export const TeasertextHero = {
    render: Template.bind({}),
    name: 'Teasertext Hero',

    args: fixtures["1_hero"].args,
}

export const Teasertext50 = {
    render: Template.bind({}),
    name: 'Teasertext 50',

    args: fixtures["2_50"].args,
}

export const Teasertext33 = {
    render: Template.bind({}),
    name: 'Teasertext 33',

    args: fixtures["3_33"].args,
}

export const Teasertext25 = {
    render: Template.bind({}),
    name: 'Teasertext 25',

    args: fixtures["4_25"].args,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
