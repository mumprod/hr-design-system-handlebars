import structuredClone from 'core-js-pure/actual/structured-clone'
import navigationData from '../site_header/fixtures/site_header_default.json'
import mixedContent from '../page/fixtures/page_pagination.json'
const NavigationDataWithMixedContent = structuredClone(
    Object.assign({}, navigationData, mixedContent)
)

export { NavigationDataWithMixedContent }
