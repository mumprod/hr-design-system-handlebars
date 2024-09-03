import structuredClone from 'core-js-pure/actual/structured-clone'
import NavigationData from '../../site_header/fixtures/site_header.json'
import NavigationData2 from '../../site_header/fixtures/site_header_mit_warnung.json'
import NavigationData3 from '../../site_header/fixtures/site_header_mit_submenu.json'
import NavigationData4 from '../../site_header/fixtures/site_header_mit_top_topics.json'

import hero_teaser from '../../teaser/fixtures/teaser_standard_hero_serif.json'

import data_story from '../story/fixtures/story.json'
import data_breadcrumb from '../../navigation/breadcrumb/fixtures/breadcrumb.json'

const NavigationDataWithTeaser = structuredClone(
    Object.assign({}, NavigationData.default.args, hero_teaser.logicItem.includeModel)
)
const NavigationDataWithTeaser2 = structuredClone(
    Object.assign({}, NavigationData.with_warnings.args, hero_teaser.logicItem.includeModel)
)
const NavigationDataWithTeaser3 = structuredClone(
    Object.assign({}, NavigationData.with_submenu.args, hero_teaser.logicItem.includeModel)
)
const NavigationDataWithTeaser4 = structuredClone(
    Object.assign({}, NavigationData.with_top_topics.args, hero_teaser.logicItem.includeModel)
)
const NavigationDataWithTeaser5 = structuredClone(
    Object.assign({}, NavigationData.default.args, data_story)
)
const NavigationDataWithBreadcrumb = structuredClone(Object.assign({}, NavigationDataWithTeaser5, data_breadcrumb['5_levels'].args))
export { NavigationDataWithTeaser, NavigationDataWithTeaser2, NavigationDataWithTeaser3, NavigationDataWithTeaser4, NavigationDataWithBreadcrumb }
