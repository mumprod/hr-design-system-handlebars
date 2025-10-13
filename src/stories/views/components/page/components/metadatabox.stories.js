import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from '../fixtures/metadatabox.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/page/components/metadatabox}}  
  `)

const Template = (args) => {
    console.log('Args: ', args)
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Seiten/Komponenten/Metadaten-Box',
    argTypes: {
        _showDate: {
            control: 'boolean',
            description: 'Datum anzeigen',
        },
    },
    parameters: {
        controls: {
            sort: 'alpha',
        },
        chromatic: {
            disableSnapshot: true,
        },
    },
}

export const Default = {
    render: Template.bind({}),
    decorators: [
        (Story) => {
            return `<div class="max-w-[724px] mx-auto mt-60">  
             ${Story()} 
             </div>`
        },
    ],
    name: 'Nur Datum',
    args: fixtures.metadatabox.args,
}

export const WithComments = {
    render: Template.bind({}),
    decorators: [
        (Story) => {
            return `<div class="max-w-[724px] mx-auto mt-60">  
             ${Story()} 
             </div>`
        },
    ],
    name: 'Datum und Kommentar-Link',
    args: fixtures.metadatabox_with_comments.args,
}

export const WithOneAuthor = {
    render: Template.bind({}),
    decorators: [
        (Story) => {
            return `<div class="max-w-[724px] mx-auto mt-60">  
             ${Story()} 
             </div>`
        },
    ],
    name: 'Ein Autor',
    args: fixtures.metadatabox_with_one_author.args,
}

export const WithOneGuestAuthor = {
    render: Template.bind({}),
    decorators: [
        (Story) => {
            return `<div class="max-w-[724px] mx-auto mt-60">  
             ${Story()} 
             </div>`
        },
    ],
    name: 'Ein Gastautor',
    args: fixtures.metadatabox_with_one_guest_author.args,
}

export const WithOneAuthorWithoutPicture = {
    render: Template.bind({}),
    decorators: [
        (Story) => {
            return `<div class="max-w-[724px] mx-auto mt-60">  
             ${Story()} 
             </div>`
        },
    ],
    name: 'Ein Autor ohne Bild',
    args: fixtures.metadatabox_with_one_author_and_without_picture.args,
}

export const WithMoreAuthors = {
    render: Template.bind({}),
    decorators: [
        (Story) => {
            return `<div class="max-w-[724px] mx-auto mt-60">  
             ${Story()} 
             </div>`
        },
    ],
    name: 'Mehrere Autoren',
    args: fixtures.metadatabox_with_more_authors.args,
}

export const WithOneAuthorAndComments = {
    render: Template.bind({}),
    decorators: [
        (Story) => {
            return `<div class="max-w-[724px] mx-auto mt-60">  
             ${Story()} 
             </div>`
        },
    ],
    name: 'Ein Autor und Kommentar-Link',
    args: fixtures.metadatabox_with_one_author_and_comments.args,
}

export const WithMoreAuthorsAndComments = {
    render: Template.bind({}),
    decorators: [
        (Story) => {
            return `<div class="max-w-[724px] mx-auto mt-60">  
             ${Story()} 
             </div>`
        },
    ],
    name: 'Mehrere Autoren und Kommentar-Link',
    args: fixtures.metadatabox_with_more_authors_and_comments.args,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',
    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    },
}
