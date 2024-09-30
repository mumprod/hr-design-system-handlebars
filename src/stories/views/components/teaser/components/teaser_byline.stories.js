import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from 'components/teaser/components/fixtures/teaser_byline.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
        {{> components/teaser/components/teaser_byline}} 
  `)

const Template = ({ ...args }) => {
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Teaser/Komponenten/Byline',
    parameters: {
        chromatic: {
            diffThreshold: 0.3,
            disableSnapshot: true
        },
    },
}

export const Default = {
    render: Template.bind({}),
    name: 'default',
    args: fixtures.byline_with_teaser_info.args.logicItem.includeModel,
}

export const WithComments = {
    render: Template.bind({}),
    name: 'with comments',
    args: fixtures.byline_with_comments_and_teaser_info.args.logicItem.includeModel,
}

export const CommentsOnly = {
    render: Template.bind({}),
    name: 'comments only',
    args: fixtures.byline_with_comments.args.logicItem.includeModel,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
