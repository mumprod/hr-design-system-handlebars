var handlebars = require("handlebars");

module.exports = function(context) {
    //normaler with helper code aus handlebars.js

    var options = arguments[arguments.length - 1]

    if (handlebars.Utils.isFunction(context)) {
        context = context.call(
            this,
            arguments.splice(1, arguments.length - 1)
        )
    }

    var fn = options.fn

    if (!handlebars.Utils.isEmpty(context)) {
        var data = options.data
        if (options.data && options.ids) {
            data = handlebars.Utils.createFrame(options.data)
            data.contextPath = handlebars.Utils.appendContextPath(
                options.data.contextPath,
                options.ids[0]
            )
        }

        return fn(context, {
            data: data
            //blockParams: handlebars.Utils.blockParams([context], [data && data.contextPath])
        })
    } else {
        return options.inverse(this)
    }

    return null
}