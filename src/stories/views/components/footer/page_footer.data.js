import structuredClone from 'core-js-pure/actual/structured-clone'
import footerContent from '../page/fixtures/footer.json'
const FooterContent = structuredClone(
    Object.assign({}, footerContent)
)

export { FooterContent }
