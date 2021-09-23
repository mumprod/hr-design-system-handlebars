const ContextReplacement = require('./ContextReplacement')
const DependenciesResolver = require('./DependenciesResolver')
const FlatContextMap = require('./FlatContextMap')

// customized https://webpack.js.org/plugins/context-replacement-plugin/
class FlatContextPlugin {
    constructor(request, context, extRegExp) {
        this.replaceContext = ContextReplacement(request, context, extRegExp)
        this.addFlattenContextMapResolver = DependenciesResolver(
            extRegExp,
            FlatContextMap(extRegExp)
        )
    }

    apply(compiler) {
        compiler.hooks.contextModuleFactory.tap('FlatContextPlugin', cmf => {
            cmf.hooks.beforeResolve.tap(
                'FlatContextPlugin',
                this.replaceContext
            )
            cmf.hooks.afterResolve.tap(
                'FlatContextPlugin',
                this.addFlattenContextMapResolver
            )
        })
    }
}

module.exports = FlatContextPlugin
