import structuredClone from 'core-js-pure/actual/structured-clone'
import navigationData from '../site_header/fixtures/site_header.json'
import mixedContent from './fixtures/page_pagination.json'
const NavigationDataWithMixedContent = structuredClone(
    Object.assign({}, navigationData.default.args, mixedContent)
)

export { NavigationDataWithMixedContent }
