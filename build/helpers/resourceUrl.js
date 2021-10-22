module.exports = function(text, options) {
    var resourceUrl

    if(text.includes('assets/base/'))
        resourceUrl = text.replace('assets/base/','./')
    if(text.includes('suche/index.nocache'))
        resourceUrl = text.replace('suche/index.nocache','suche/index.nc.html')
    if(text.includes('suche/index~suggest.jsp'))
        resourceUrl = text.replace('suche/index~suggest.jsp','https://hessenschau-dev-red.hr.de/suche/index~suggest.jsp')

    return resourceUrl

}
