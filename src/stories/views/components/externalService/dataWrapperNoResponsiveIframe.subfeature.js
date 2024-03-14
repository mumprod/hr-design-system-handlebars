const DataWrapperNoResponsiveIframe = function (context, configAR, configFixedHeight) {
    
    const { element: rootElement } = context
    let aspectRatio = configAR
    let fixedHeight = configFixedHeight

    const createNoResponsiveIframe = function () {

   
    var parentDiv = document.createElement('div')
    parentDiv.className = 'copytext__scrollWrapper'
    var div = document.createElement('div')
    //Keine Aspect-Ratio ausgewählt aber eine feste Höhe
    if (aspectRatio === undefined) {
            div.className = 'noaspect_datawrapper_cdn'
            div.style.height = fixedHeight + 'px'
            div.style.width = '100%'
    } 
    // Aspect-Ratio ausgewählt
    else {
            div.className = 'ar--' + aspectRatio + ' datawrapper_cdn'
    }
    var iframe = document.createElement('iframe')
    iframe.className = 'ar_iframe datawrapper_cdn'
    iframe.setAttribute('id', 'i_frame')
    iframe.setAttribute('data-isloaded', '0')
    iframe.setAttribute('webkitallowfullscreen', '')
    iframe.setAttribute('mozallowfullscreen', '')
    iframe.setAttribute('allowfullscreen', '')
    iframe.setAttribute('scrolling', 'no')
    iframe.setAttribute('frameborder', '0')
    iframe.src = embedCode

    div.appendChild(iframe)
    parentDiv.appendChild(div)
    rootElement.appendChild(parentDiv)
    }
    return {
        createNoResponsiveIframe: createNoResponsiveIframe
    }
}

export default DataWrapperNoResponsiveIframe      