import structuredClone from 'core-js-pure/actual/structured-clone'
import footerContent from './fixtures/footer_hessenschau.json'

const FooterContent =  structuredClone(
    Object.assign({}, footerContent)
)

export { FooterContent }

