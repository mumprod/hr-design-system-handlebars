import structuredClone from 'core-js-pure/actual/structured-clone'
import NavigationData from '../../site_header/fixtures/site_header.json'
import teaserStandard from '../../teaser/fixtures/teaser_standard.json'

import data_story from '../story/fixtures/story_with_video.json'
import data_breadcrumb from '../../navigation/breadcrumb/fixtures/breadcrumb.json'

const NavigationDataWithTeaser = structuredClone(
    Object.assign({}, NavigationData.default.args, teaserStandard.group_hero.hero.args.logicItem.includeModel)
)
const NavigationDataWithTeaser2 = structuredClone(
    Object.assign({}, NavigationData.with_warnings.args, teaserStandard.group_hero.hero.args.logicItem.includeModel)
)
const NavigationDataWithTeaser3 = structuredClone(
    Object.assign({}, NavigationData.with_submenu.args, teaserStandard.group_hero.hero.args.logicItem.includeModel)
)
const NavigationDataWithTeaser4 = structuredClone(
    Object.assign({}, NavigationData.with_top_topics.args, teaserStandard.group_hero.hero.args.logicItem.includeModel)
)
const NavigationDataWithTeaser5 = structuredClone(
    Object.assign({}, NavigationData.default.args, data_story)
)
const NavigationDataWithBreadcrumb = structuredClone(Object.assign({}, NavigationDataWithTeaser5, data_breadcrumb['5_levels'].args))
export { NavigationDataWithTeaser, NavigationDataWithTeaser2, NavigationDataWithTeaser3, NavigationDataWithTeaser4, NavigationDataWithBreadcrumb }
