import { addLabel, removeLabel, changeTeaserSize } from '../labelHelper'
import { addCommentLink } from '../jsonHelper'

import teaser from './teaser_content_nav.hbs'

import contentNavList from '../fixtures/teaser_content_nav_list_100.json'
import contentNavList_autosuggest from '../fixtures/teaser_content_nav_list_autosuggest.json'
import contentNavFlow from '../fixtures/teaser_content_nav_flow_100.json'
import contentNavFlow_autosuggest from '../fixtures/teaser_content_nav_flow_autosuggest.json'
import contentNavMixed from '../fixtures/teaser_content_nav_mixed_100.json'
import contentNavMixed_autosuggest from '../fixtures/teaser_content_nav_mixed_autosuggest.json'

import contentNavDropdown_autosuggest from '../fixtures/teaser_content_nav_dropdown_autosuggest_100.json'
import contentNavDropdown from '../fixtures/teaser_content_nav_dropdown_100.json'
import contentNavDropdown_subgroups from '../fixtures/teaser_content_nav_dropdown_subgroups.json'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return teaser({ brand, ...args })
}

export default {
    title: 'Komponenten/Teaser/Content-Navi',

    parameters: {
        layout: 'fullscreen',

        chromatic: {
            viewports: [360, 768, 1024],
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
            return `<div class="grid grid-page"><div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div></div>`
        },
    ],
}

export const Liste = {
    render: Template.bind({}),
    name: 'Liste',
    args: contentNavList,
}

export const ListeMitFilter = {
    render: Template.bind({}),
    name: 'Liste mit Filter',
    args: contentNavList_autosuggest,
}

export const Fluss = {
    render: Template.bind({}),
    name: 'Fluss',
    args: contentNavFlow,
}

export const FlussMitFilter = {
    render: Template.bind({}),
    name: 'Fluss mit Filter',
    args: contentNavFlow_autosuggest,
}

export const Gemischt = {
    render: Template.bind({}),
    name: 'Gemischt',
    args: contentNavMixed,
}

export const GemischtMitFilter = {
    render: Template.bind({}),
    name: 'Gemischt mit Filter',
    args: contentNavMixed_autosuggest,
}

export const Dropdown = {
    render: Template.bind({}),
    name: 'Dropdown',
    args: contentNavDropdown,
}

export const DropdownMitFilter = {
    render: Template.bind({}),
    name: 'Dropdown mit Filter',
    args: contentNavDropdown_autosuggest,
}

export const DropdownMitSubgruppen = {
    render: Template.bind({}),
    name: 'Dropdown mit Subgruppen',
    args: contentNavDropdown_subgroups,
}
