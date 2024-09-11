import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from 'components/teaser/fixtures/teaser_cluster.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/teaser/cluster/teaser_cluster }}   
  `)

const Template = (args) => {
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Teaser/Cluster',

    parameters: {
        layout: '',
        chromatic: {
            diffThreshold: 0.3,
            disableSnapshot: true
        },
    },

    argTypes: {},

    decorators: [
        (Story) => {
            return `<div class="grid grid-page">  
             ${Story()} 
             </div>`
        },
    ],
}

export const Kurzmeldungen100 = {
    render: Template.bind({}),
    name: 'Kurzmeldungen 100',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100["100"].args,
}

export const Kurzmeldungen50 = {
    render: Template.bind({}),
    name: 'Kurzmeldungen 50',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50["50"].args,
}

export const Kurzmeldungen33 = {
    render: Template.bind({}),
    name: 'Kurzmeldungen 33',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_33["33"].args,
}

export const SchlagzeilenMitGenrebild100 = {
    render: Template.bind({}),
    name: 'Schlagzeilen mit Genrebild 100',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100["100"].args,
}

export const SchlagzeilenMitGenrebild50 = {
    render: Template.bind({}),
    name: 'Schlagzeilen mit Genrebild 50',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50["50_with_genre_image"].args,
}

export const SchlagzeilenMitGenrebild33 = {
    render: Template.bind({}),
    name: 'Schlagzeilen mit Genrebild 33',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_33["33_with_genre_image"].args,
}

export const SchlagzeilenMitTeaserbild100 = {
    render: Template.bind({}),
    name: 'Schlagzeilen mit Teaserbild 100',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100["100_with_image"].args,
}

export const SchlagzeilenMitTeaserbild50 = {
    render: Template.bind({}),
    name: 'Schlagzeilen mit Teaserbild 50',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50["50_with_image"].args,
}

export const SchlagzeilenMitTeaserbild33 = {
    render: Template.bind({}),
    name: 'Schlagzeilen mit Teaserbild 33',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_33["33_with_image"].args,
}

export const MeistgeklicktWanda100 = {
    render: Template.bind({}),
    name: 'Meistgeklickt/Wanda 100',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100["100_ordered"].args,
}

export const MeistgeklicktWanda50 = {
    render: Template.bind({}),
    name: 'Meistgeklickt/Wanda 50',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50["50_ordered"].args,
}

export const MeistgeklicktWanda33 = {
    render: Template.bind({}),
    name: 'Meistgeklickt/Wanda 33',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_33["33_ordered"].args,
}

export const TagesschauSportschau100 = {
    render: Template.bind({}),
    name: 'tagesschau/sportschau 100',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100["100_external"].args,
}

export const TagesschauSportschau50 = {
    render: Template.bind({}),
    name: 'tagesschau/sportschau 50',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_50["50_external"].args,
}

export const TagesschauSportschau33 = {
    render: Template.bind({}),
    name: 'tagesschau/sportschau 33',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_33["33_external"].args,
}

export const PodcastEpisodenClusterTeaser = {
    render: Template.bind({}),
    name: 'PodcastEpisoden ClusterTeaser',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_100["100_podcast_channel"].args,
}

export const MeistgeklicktBoxMitLangemTitel = {
    render: Template.bind({}),
    name: 'Meistgeklickt-Box mit langem Titel',
    decorators: [
        (Story) => {
            return `<div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.group_33["33_ordered_with_long_title"].args,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
