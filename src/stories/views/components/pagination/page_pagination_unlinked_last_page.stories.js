import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from './fixtures/page_pagination.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/pagination/pagination _hideLastPage=true }}
`)
 


const Template = (args) => {
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Pagination/Letzte Seite nicht verlinkt',
    argTypes: {},

    parameters: {
        layout: 'fullscreen',

        docs: {
            inlineStories: false,
            iframeHeight: 400,
        },
        chromatic: {
            disableSnapshot: true
        },
    },
}

export const MitPagination = {
    render: Template.bind({}),
    name: 'Pagination mehr als 3 Seiten',
    args: fixtures.more_than_three_first.args,
}
export const MitPagination2 = {
    render: Template.bind({}),
    name: 'Pagination mehr als 3 Seiten (zweite Seite aktiv)',
    args: fixtures.more_than_three_second.args,
}
export const MitPagination3 = {
    render: Template.bind({}),
    name: 'Pagination mehr als 3 Seiten (vorletzte Seite aktiv)',
    args: fixtures.more_than_three_but_not_last.args,
}

export const MitPagination4 = {
    render: Template.bind({}),
    name: 'Pagination mehr als 3 Seiten (Seite mitten drin aktiv)',
    args: fixtures.more_than_three_one_but_not_last.args,
}

export const MitPagination5 = {
    render: Template.bind({}),
    name: 'Pagination mehr als 3 Seiten (letzte Seite aktiv)',
    args: fixtures.more_than_three_last.args,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',
    decorators: [
        (Story) => {
            return `<div class="mx-8">  
             ${Story()} 
             </div>`
        },
    ],

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
