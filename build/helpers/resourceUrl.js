module.exports = function(text, options) {
    var resourceUrl

    resourceUrl = text.replace('assets/base/','./')
    return resourceUrl

}