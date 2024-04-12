import structuredClone from 'core-js-pure/actual/structured-clone'
import NavigationData from '../../site_header/fixtures/site_header_default.json'
import NavigationData2 from '../../site_header/fixtures/site_header_mit_warnung.json'
import NavigationData3 from '../../site_header/fixtures/site_header_mit_submenu.json'
import NavigationData4 from '../../site_header/fixtures/site_header_mit_top_topics.json'

import hero_teaser from '../../teaser/fixtures/teaser_standard_hero_serif.json'

import data_story from '../story/fixtures/story.json'

const NavigationDataWithTeaser = structuredClone(
    Object.assign({}, NavigationData, hero_teaser.logicItem.includeModel)
)
const NavigationDataWithTeaser2 = structuredClone(
    Object.assign({}, NavigationData2, hero_teaser.logicItem.includeModel)
)
const NavigationDataWithTeaser3 = structuredClone(
    Object.assign({}, NavigationData3, hero_teaser.logicItem.includeModel)
)
const NavigationDataWithTeaser4 = structuredClone(
    Object.assign({}, NavigationData4, hero_teaser.logicItem.includeModel)
)
const NavigationDataWithTeaser5 = structuredClone(
    Object.assign({}, NavigationData, data_story)
)
export { NavigationDataWithTeaser, NavigationDataWithTeaser2, NavigationDataWithTeaser3, NavigationDataWithTeaser4,NavigationDataWithTeaser5  }
