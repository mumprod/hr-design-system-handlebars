import DomElementList from './domElementList'
import FeatureList from './featureList'

export default {
    run: (rootElement, loader) => {
        DomElementList(rootElement, '.js-load').forEach((domElement) =>
            FeatureList(domElement, 'data-hr-').forEach((feature) => feature.execute(loader))
        )
    },
}
