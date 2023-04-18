import byline from './teaser_byline.hbs'
import teaserWithoutComments from '../fixtures/teaser_standard_hero_serif.json'
import teaserWithComments from '../fixtures/teaser_standard_hero_serif_comments.json'
import teaserWithoutTeaserinfo from '../fixtures/teaser_comments_without_teaserinfo.json'

const Template = ({ ...args }) => {
    return byline({ ...args })
}

export default {
    title: 'Komponenten/Teaser/Komponenten/Byline',
}

export const Default = {
    render: Template.bind({}),
    name: 'default',
    args: teaserWithoutComments.logicItem.includeModel,
}

export const WithComments = {
    render: Template.bind({}),
    name: 'with comments',
    args: teaserWithComments.logicItem.includeModel,
}

export const CommentsOnly = {
    render: Template.bind({}),
    name: 'comments only',
    args: teaserWithoutTeaserinfo.logicItem.includeModel,
}
