import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from './fixtures/teaser_poster.json'

import teaser from './teaser_poster.hbs'
import teserPosterLg from './fixtures/teaser_poster_lg.json'
import teserPosterMd from './fixtures/teaser_poster_md.json'
import teserPosterMdLabel from './fixtures/teaser_poster_md_label.json'
import teserPosterMdLabelByline from './fixtures/teaser_poster_md_label_byline.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/teaser/teaser_poster }}   
  `)


const Template = (args) => {
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Teaser/Poster',

    parameters: {
        layout: 'fullscreen',

        chromatic: {
            diffThreshold: 0.3,
            disableSnapshot: true
        },
    },

    argTypes: {
        teaserSize: {
            control: {
                type: 'select',
                options: ['50', '33'],
            },

            description: 'Teaser Größe',

            table: {
                defaultValue: {
                    summary: '50',
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

export const Poster50 = {
    render: Template.bind({}),
    name: 'Poster 50',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50["50"].args.logicItem.includeModel,
}

export const Poster50MitLabel = {
    render: Template.bind({}),
    name: 'Poster 50 mit Label',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50["50_with_label"].args.logicItem.includeModel,
}

export const Poster50MitLabelByline = {
    render: Template.bind({}),
    name: 'Poster 50 mit Label und Byline',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50["50_with_label_and_byline"].args.logicItem.includeModel,
}

export const Poster33 = {
    render: Template.bind({}),
    name: 'Poster 33',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_33["33"].args.logicItem.includeModel,
}

export const Poster33MitLabel = {
    render: Template.bind({}),
    name: 'Poster 33 mit Label',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_33["33_with_label"].args.logicItem.includeModel,
}

export const Poster33MitLabelByline = {
    render: Template.bind({}),
    name: 'Poster 33 mit Label und Byline',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_33["33_with_label_and_byline"].args.logicItem.includeModel,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
