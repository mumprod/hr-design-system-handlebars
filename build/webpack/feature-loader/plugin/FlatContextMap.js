const path = require('path')

module.exports = extRegExp => {
    const flattenUserRequest = userRequest =>
        './' + path.basename(userRequest).replace(extRegExp, '')

    return dependencies => {
        dependencies.forEach(dependency => {
            dependency.userRequest = flattenUserRequest(dependency.userRequest)
        })

        return dependencies
    }
}
