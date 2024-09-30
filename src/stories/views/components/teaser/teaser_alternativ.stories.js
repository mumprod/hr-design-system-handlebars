import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from './fixtures/teaser_alternative.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/teaser/teaser_alternativ }}   
  `)

const Template = (args) => {
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Teaser/Alternativ',

    parameters: {
        layout: 'fullscreen',

        chromatic: {
            viewports: [360, 1024],
            diffThreshold: 0.3,
            disableSnapshot: true
        },
    },

    argTypes: {
        teaserSize: {
            control: {
                type: 'select',
                options: ['hero', '100', '50'],
            },

            description: 'Teaser Größ',

            table: {
                defaultValue: {
                    summary: 'hero',
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

export const AlternativHero = {
    render: Template.bind({}),
    name: 'Alternativ Hero',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_hero.hero.args.logicItem.includeModel,
}

export const AlternativHeroMitKommentaren = {
    render: Template.bind({}),
    name: 'Alternativ Hero mit Kommentaren',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_hero.hero_with_comments.args.logicItem.includeModel,
}

export const AlternativHeroMitLabel = {
    render: Template.bind({}),
    name: 'Alternativ Hero mit Label',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_hero.hero_with_label.args.logicItem.includeModel,
}

export const AlternativHeroMitExternenLinkDokument = {
    render: Template.bind({}),
    name: 'Alternativ Hero mit externen Link Dokument',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_hero.hero_with_external_link.args.logicItem.includeModel,
}

export const AlternativHeroMitSendungsdokument = {
    render: Template.bind({}),
    name: 'Alternativ Hero mit Sendungsdokument',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_hero.hero_with_program.args.logicItem.includeModel,
}

export const Alternativ100 = {
    render: Template.bind({}),
    name: 'Alternativ 100',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100[100].args.logicItem.includeModel,
}

export const Alternativ100MitExternemLink = {
    render: Template.bind({}),
    name: 'Alternativ 100 mit externem Link',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100['100_with_external_link'].args.logicItem.includeModel,
}

export const Alternativ100MitFeaturedContent = {
    render: Template.bind({}),
    name: 'Alternativ 100 mit Zeilenteaser',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100['100_with_featured_content'].args
}

export const Alternativ50 = {
    render: Template.bind({}),
    name: 'Alternativ 50',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50[50].args.logicItem.includeModel,
}

export const Alternativ50OhneTeaserbild = {
    render: Template.bind({}),
    name: 'Alternativ 50 ohne Teaserbild',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50['50_without_teaserimage'].args.logicItem.includeModel,
}

export const Alternativ50MitExternemLink = {
    render: Template.bind({}),
    name: 'Alternativ 50 mit externem Link',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50['50_with_external_link'].args.logicItem.includeModel,
}

export const Alternativ50MitDownload = {
    render: Template.bind({}),
    name: 'Alternativ 50 mit Download',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50['50_with_download'].args.logicItem.includeModel,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
