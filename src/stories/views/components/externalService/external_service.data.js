import structuredClone from 'core-js-pure/actual/structured-clone'
import externalServiceContent from './fixtures/external_service.json'

const ExternalServiceContent =  structuredClone(
    Object.assign({}, externalServiceContent)
)

export { ExternalServiceContent }
