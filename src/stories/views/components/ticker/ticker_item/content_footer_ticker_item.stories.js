import contentfooter from './content_footer_ticker_item.hbs'
import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from './fixtures/content_footer_ticker_item.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/ticker/ticker_item/content_footer_ticker_item}}  
  `)

const Template = (args) => {
    console.log('Args: ', args)
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Ticker/Ticker-Item/Content-Footer',
    argTypes: {
        _css: {
            description: 'Erlaubt die Angabe zusätzlicher CSS Klassen für den Content-Footer',
            control: 'text',
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
            return `<div class="max-w-[625px] mx-auto mt-60">  
             ${Story()} 
             </div>`
        },
    ],
    name: 'Ein Autor und Program-Referenz',
    args: fixtures.content_footer_with_one_author_program_reference.args,
}

export const OneAuthorWithoutProgramReference = {
    render: Template.bind({}),
    decorators: [
        (Story) => {
            return `<div class="max-w-[625px] mx-auto mt-60">  
             ${Story()} 
             </div>`
        },
    ],
    name: 'Ein Autor ohne Program-Referenz',
    args: fixtures.content_footer_with_one_author.args,
}

export const MultipleAuthorsWithProgramReference = {
    render: Template.bind({}),
    decorators: [
        (Story) => {
            return `<div class="max-w-[625px] mx-auto mt-60">  
             ${Story()} 
             </div>`
        },
    ],
    name: 'Mehrere Autoren mit Program-Referenz',
    args: fixtures.content_footer_with_multiple_authors_program_reference.args,
}

export const MultipleAuthorsWithoutProgramReference = {
    render: Template.bind({}),
    decorators: [
        (Story) => {
            return `<div class="max-w-[625px] mx-auto mt-60">  
             ${Story()} 
             </div>`
        },
    ],
    name: 'Mehrere Autoren ohne Program-Referenz',
    args: fixtures.content_footer_with_multiple_authors.args,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',
    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    },
}
