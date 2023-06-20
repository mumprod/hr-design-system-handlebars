import structuredClone from 'core-js-pure/actual/structured-clone'
import footerContentHessenschau from './fixtures/footer_hessenschau.json'
import footerContentHR1 from './fixtures/footer_hr1.json'
import footerContentHR2 from './fixtures/footer_hr2.json'
import footerContentHR3 from './fixtures/footer_hr3.json'
import footerContentHR4 from './fixtures/footer_hr4.json'
import footerContentHRINFO from './fixtures/footer_hrinfo.json'
import footerContentYOUFM from './fixtures/footer_youfm.json'
const FooterContentHessenschau =  structuredClone(
    Object.assign({}, footerContentHessenschau)
)
const FooterContentHR1 =  structuredClone(
    Object.assign({}, footerContentHR1)
)
const FooterContentHR2 =  structuredClone(
    Object.assign({}, footerContentHR2)
)
const FooterContentHR3 =  structuredClone(
    Object.assign({}, footerContentHR3)
)
const FooterContentHR4 =  structuredClone(
    Object.assign({}, footerContentHR4)
)
const FooterContentHRINFO =  structuredClone(
    Object.assign({}, footerContentHRINFO)
)
const FooterContentYOUFM =  structuredClone(
    Object.assign({}, footerContentYOUFM)
)
export { FooterContentHessenschau }
export { FooterContentHR1 }
export { FooterContentHR2 }
export { FooterContentHR3 }
export { FooterContentHR4 }
export { FooterContentHRINFO }
export { FooterContentYOUFM }

