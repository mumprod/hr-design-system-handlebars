import makeFeature from './feature'

export default (domElement, namespace) => {
    const getFeatureFromAttribute = (attribute, callback) => {
        const fullName = attribute.nodeName || attribute.name || ''

        if (fullName.indexOf(namespace) === 0) {
            const name = fullName.replace(namespace, '')
            const value = attribute.value || attribute.nodeValue || '{}'
            callback(makeFeature(name, value, domElement))
        }
    }

    const getFeaturesFromElement = callback => {
        if (domElement && domElement.attributes) {
            let i = 0
            for (i; i < domElement.attributes.length; i++) {
                getFeatureFromAttribute(domElement.attributes[i], callback)
            }
        }
    }

    return {
        forEach: callback => {
            getFeaturesFromElement(callback)
        }
    }
}
