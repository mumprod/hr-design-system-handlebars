module.exports = function (partialName, options) {
    var context,
        decorator,
        result,
        mergeContext = function (obj) {
            for (var k in obj) context[k] = obj[k]
        }

    if (arguments.length === 2) {
        decorator = handlebars.loadPartial(partialName)

        if (decorator) {
            context = {}
            mergeContext(this)
            mergeContext(options.hash)

            decoratorStack = options.fn

            result = decorator(context, options)

            decoratorStack = undefined

            return result
        } else {
            grunt.fail.warn(
                'Decorator: A partial with the name "' + partialName + '" doesn\'t exist.\n'
            )
        }
    }

    return options.fn(this)
}