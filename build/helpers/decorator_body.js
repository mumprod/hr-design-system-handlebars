module.exports = function () {
    return new handlebars.SafeString(decoratorStack(this))
}
