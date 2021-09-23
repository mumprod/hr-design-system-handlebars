module.exports = (extRegExp, changeDependencies) => {
    const createResolveDependenciesWrapper = wrappedResolveDependencies => (
        fs,
        options,
        callback
    ) => {
        wrappedResolveDependencies(
            fs,
            options,
            afterResolveDependencies(callback)
        )
    }

    const afterResolveDependencies = callback => (errors, dependencies) => {
        callback(errors, changeDependencies(dependencies))
    }

    return result => {
        if (!result) return

        if (result.regExp === extRegExp) {
            result.resolveDependencies = createResolveDependenciesWrapper(
                result.resolveDependencies
            )
        }

        return result
    }
}
