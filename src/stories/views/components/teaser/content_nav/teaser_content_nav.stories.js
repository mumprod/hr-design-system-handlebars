import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from 'components/teaser/fixtures/teaser_content_nav.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/teaser/content_nav/teaser_content_nav }}   
  `)

const Template = (args) => {
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Teaser/Content-Navi',

    parameters: {
        layout: 'fullscreen',

        chromatic: {
            viewports: [360, 768, 1024],
            disableSnapshot: true
        },
    },

    argTypes: {
        realTeaserSize: {
            control: {
                type: 'select',
                options: ['100', '66', '50', '33', '25'],
            },

            description: 'Teaser Größe',

            table: {
                defaultValue: {
                    summary: '100',
                },
            },
        },

        contentNav: {
            table: {
                expanded: false,
                disable: false,
            },
        },

        teaserSize: {
            control: {
                type: 'select',
                options: ['100', '66', '50', '33', '25'],
            },

            description: 'Teaser Größe',

            table: {
                defaultValue: {
                    summary: '100',
                },
            },
        },
    },

    decorators: [
        (Story) => {
            return `<div class="grid grid-page">  
             ${Story()} 
             </div>`
        },
    ],
}

export const Liste = {
    render: Template.bind({}),
    name: 'Liste',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.list.args,
}

export const ListeMitFilter = {
    render: Template.bind({}),
    name: 'Liste mit Filter',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.list_autosuggest.args,
}

export const Fluss = {
    render: Template.bind({}),
    name: 'Fluss',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.flow.args,
}

export const FlussMitFilter = {
    render: Template.bind({}),
    name: 'Fluss mit Filter',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.flow_autosuggest.args,
}

export const Gemischt = {
    render: Template.bind({}),
    name: 'Gemischt',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.mixed.args,
}

export const GemischtMitFilter = {
    render: Template.bind({}),
    name: 'Gemischt mit Filter',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.mixed_autosuggest.args,
}

export const Dropdown = {
    render: Template.bind({}),
    name: 'Dropdown',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.dropdown.args,
}

export const DropdownMitFilter = {
    render: Template.bind({}),
    name: 'Dropdown mit Filter',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.dropdown_autosuggest.args
}

export const DropdownMitSubgruppen = {
    render: Template.bind({}),
    name: 'Dropdown mit Subgruppen',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100.dropdown_with_subgroups.args
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
