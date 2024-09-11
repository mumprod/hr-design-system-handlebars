import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from './fixtures/teaser_standard.json'


const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/teaser/teaser_standard }}   
  `)


const Template = (args) => {
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Teaser/Standard',

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
                options: ['hero', '100', '50', '33', '25'],
            },

            description: 'Teaser Größe',

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

export const StandardHero = {
    render: Template.bind({}),
    name: 'Standard Hero',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_hero.hero.args.logicItem.includeModel,
}

export const StandardHeroMitLabel = {
    render: Template.bind({}),
    name: 'Standard Hero mit Label',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_hero.hero_with_label.args.logicItem.includeModel,
}

export const StandardHeroMitKommentaren = {
    render: Template.bind({}),
    name: 'Standard Hero Mit Kommentaren',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_hero.hero_with_comments.args.logicItem.includeModel,
}

export const StandardHeroMitExternemLink = {
    render: Template.bind({}),
    name: 'Standard Hero mit externem Link',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_hero.hero_with_external_link.args.logicItem.includeModel,
}

export const Standard100 = {
    render: Template.bind({}),
    name: 'Standard 100',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100[100].args.logicItem.includeModel,
}

export const Standard100MitExternemLink = {
    render: Template.bind({}),
    name: 'Standard 100 mit externem Link',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100['100_with_external_link'].args.logicItem.includeModel,
}

export const Standard100MitSendungsdokument = {
    render: Template.bind({}),
    name: 'Standard 100 mit Sendungsdokument',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100['100_with_program'].args.logicItem.includeModel,
}

export const Standard50 = {
    render: Template.bind({}),
    name: 'Standard 50',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50[50].args.logicItem.includeModel,
}

export const Standard50OhneTeaserbild = {
    render: Template.bind({}),
    name: 'Standard 50 ohne Teaserbild',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50['50_without_teaserimage'].args.logicItem.includeModel,
}

export const Standard50MitExternemLink = {
    render: Template.bind({}),
    name: 'Standard 50 mit externem Link',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50['50_with_external_link'].args.logicItem.includeModel,
}

export const Standard50LinkWithTwoClick = {
    render: Template.bind({}),
    name: 'Standard 50 mit zwei Klick Lösung',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50['50_with_external_link_and_user_consent'].args.logicItem.includeModel,
}

export const Standard50MitFeaturedContent = {
    render: Template.bind({}),
    name: 'Standard 50 mit Zeilenteaser',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50['50_with_featured_content'].args,
}

export const Standard33 = {
    render: Template.bind({}),
    name: 'Standard 33',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_33[33].args.logicItem.includeModel,
}

export const Standard33MitExternemLink = {
    render: Template.bind({}),
    name: 'Standard 33 mit externem Link',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_33['33_with_external_link'].args.logicItem.includeModel,
}

export const Standard25 = {
    render: Template.bind({}),
    name: 'Standard 25',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_25[25].args.logicItem.includeModel,
}

export const Standard25OhneTeaserbild = {
    render: Template.bind({}),
    name: 'Standard 25 ohne Teaserbild',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_25['25_without_teaserimage'].args.logicItem.includeModel,
}

export const Standard25MitExternemLink = {
    render: Template.bind({}),
    name: 'Standard 25 mit externem Link',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_25['25_with_external_link'].args.logicItem.includeModel,
}

export const Standard100MitDownload = {
    render: Template.bind({}),
    name: 'Standard 100 Mit Download',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100['100_with_download'].args.logicItem.includeModel,
}

export const Standard33MitLangerOrtsmarke = {
    render: Template.bind({}),
    name: 'Standard 33 mit langer Ortsmarke',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_33['33_with_long_geotag'].args.logicItem.includeModel,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
