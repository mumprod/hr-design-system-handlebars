module.exports = (request, context, extRegExp) => {
    return result => {
        if (!result) return

        if (request === result.request) {
            result.context = context
            result.request = ''
            result.regExp = extRegExp
        }
        console.warn(`Result: ${result}`)
        return result
    }
}
