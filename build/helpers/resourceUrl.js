module.exports = function (text, brand) {
    var resourceUrl

    if (text.includes('assets/base/')) {
        if (text.includes('assets/base/icons/logo/') && brand) {
            resourceUrl = text.replace('assets/base/icons/logo', `./brand/${brand}/icons/logo`)
        } else {
            resourceUrl = text.replace('assets/base/', './')
        }
    }
    if (text.includes('suche/index.nocache'))
        resourceUrl = text.replace('suche/index.nocache', 'suche/index.nc.html')
    if (text.includes('suche/index~suggest.jsp'))
        resourceUrl = text.replace(
            'suche/index~suggest.jsp',
            'https://hessenschau-dev-red.hr.de/suche/index~suggest.jsp'
        )

    return resourceUrl
}
