import structuredClone from 'core-js-pure/actual/structured-clone'
import externalServiceContent from './fixtures/external_service_with_datapolicy.json'

const ExternalServiceContent =  structuredClone(
    Object.assign({}, externalServiceContent)
)

export { ExternalServiceContent }
