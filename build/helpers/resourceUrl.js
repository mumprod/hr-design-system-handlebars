module.exports = function (text, options) {
    var resourceUrl
    // ARD PLAYER Folder
    if (text.includes('assets/vendor/ardplayer/')){
        resourceUrl = text.replace(
            'assets/',
            './'
        )
    }
    // VENDOR Folder
    if (text.includes('assets/js/vendor/')){
        resourceUrl = text.replace(
            'assets/js/vendor',
            './vendor/js'
        )
    }
    if (text.includes('assets/base/')) {
        if (text.includes('assets/base/icons/logo/') && options.hash['_brand']) {
            resourceUrl = text.replace(
                'assets/base/icons/logo',
                `./brand/${options.hash['_brand']}/icons/logo`
            )
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
