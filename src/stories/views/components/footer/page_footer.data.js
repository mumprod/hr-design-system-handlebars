import structuredClone from 'core-js-pure/actual/structured-clone'
import footerContent from './fixtures/footer_hessenschau.json'
import footerContent_sounds from './fixtures/footer_hessenschau_mit_sounds.json'

const FooterContent =  structuredClone(
    Object.assign({}, footerContent)
)
const FooterContent_sounds =  structuredClone(
    Object.assign({}, footerContent_sounds)
)

export { FooterContent, FooterContent_sounds }

