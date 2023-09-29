import groupTeaser from './group_teaser.hbs'
import groupTeaserAccented from './group_teaser_accented.hbs'
import teaserGroup100 from '../fixtures/teaser_group_100.json'
import teaserGroup25 from '../fixtures/teaser_group_25.json'
import teaserGroupRelatedContent100 from '../fixtures/teaser_group_related_content_100.json'
import teaserGroup100highlight from '../fixtures/teaser_group_100_highlight.json'
import teaserGroup100highlight2 from '../fixtures/teaser_group_100_highlight_2.json'

import teaserGroup100contentnav from '../fixtures/teaser_group_100_contentnav.json'

const groupTeaserTemplate = ({ text, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return groupTeaser({ text, ...args })
}

const groupTeaserAccentedTemplate = ({ text, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return groupTeaserAccented({ text, ...args })
}

export default {
    title: 'Komponenten/Teaser/Gruppen',

    argTypes: {
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

    parameters: {
        layout: 'fullscreen',
    },

    decorators: [
        (Story) => {
            return `<div class="grid my-5 grid-page">
               <div class="grid grid-cols-12 py-6 bg-white sm:px-9.5 col-full sm:col-main gap-x-6 md:gap-y-14 gap-y-6">
                 ${Story()}
               </div>
             </div>`
        },
    ],
}

export const $100GruppeMitUberschrift = {
    render: groupTeaserTemplate.bind({}),
    name: '100% Gruppe mit Überschrift',
    args: teaserGroup100.includeModel,
}
export const $25GruppeMitUberschrift = {
    render: groupTeaserTemplate.bind({}),
    name: '25% Gruppe mit Überschrift',
    args: teaserGroup25.includeModel,
}

export const $100GruppeMitUberschriftHighlight1 = {
    render: groupTeaserTemplate.bind({}),
    name: '100% Gruppe mit Überschrift Highlight 1',
    args: teaserGroup100highlight.includeModel,
}

export const $100GruppeMitUberschriftHighlight2 = {
    render: groupTeaserTemplate.bind({}),
    name: '100% Gruppe mit Überschrift Highlight 2',
    args: teaserGroup100highlight2.includeModel,
}

export const $100GruppeMitContentNavigationAufklapp = {
    render: groupTeaserAccentedTemplate.bind({}),
    name: '100% Gruppe mit Content Navigation Aufklapp',
    args: teaserGroup100contentnav.includeModel,
}

export const $100GruppeMitRelatedContent = {
    render: groupTeaserTemplate.bind({}),
    name: '100% Gruppe mit Related Content',
    args: teaserGroupRelatedContent100.includeModel,
}
