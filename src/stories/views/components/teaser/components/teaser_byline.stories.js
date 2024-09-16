import byline from './teaser_byline.hbs'
import teaserStandard from '../fixtures/teaser_standard.json'

const Template = ({ ...args }) => {
    return byline({ ...args })
}

export default {
    title: 'Komponenten/Teaser/Komponenten/Byline',
}

export const Default = {
    render: Template.bind({}),
    name: 'default',
    args: teaserStandard.group_hero.hero.args.logicItem.includeModel,
}

export const WithComments = {
    render: Template.bind({}),
    name: 'with comments',
    args: teaserStandard.group_hero.hero_with_comments.args.logicItem.includeModel,
}

export const CommentsOnly = {
    render: Template.bind({}),
    name: 'comments only',
    args: teaserStandard.group_hero.hero_with_comments_and_without_teaser_info.args.logicItem.includeModel,
}
