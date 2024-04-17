const DataWrapperNoResponsiveIframe = function (context, configAR, configFixedHeight, embedCode) {
    
    const { element: rootElement } = context
    let aspectRatio = configAR
    let fixedHeight = configFixedHeight

    const createNoResponsiveIframe = function () {

   
    var parentDiv = document.createElement('div')
    //Auflösen nach Tailwind-Klassen //copytext__scrollWrapper
    parentDiv.className = '!h-full'
    var div = document.createElement('div')
    //Keine Aspect-Ratio ausgewählt aber eine feste Höhe
    
    console.log(aspectRatio)
    console.log(configAR)
    if (aspectRatio === undefined) {
            //Auflösen nach Tailwind-Klassen //noaspect_datawrapper_cdn
            div.className = 'relative overflow-hidden w-0 border-0 !min-w-full'
            div.style.height = fixedHeight + 'px'
            div.style.width = '100%'
    } 
    // Aspect-Ratio ausgewählt
    else {
        //ar-- in Tailwind-Klassen
        let tailwindCSS
        switch(aspectRatio){
            case '100':
                tailwindCSS = "ar-1-1" 
            break;
            case '16x9':
                tailwindCSS = "ar-16-9" 
            break;
            case '9x16':
                tailwindCSS = "ar-9-16"
            break;
            case '16x7':
                tailwindCSS = "ar-16-7"
            break;
            case '7x16':
                tailwindCSS = "ar-7-16"
            break;
            case '4x3':
                tailwindCSS = "ar-4-3"
            break;
            case '100x27':
                tailwindCSS = "ar-100-27"
            break;
            default:
                tailwindCSS = "ar-16-9"
          }
          
            div.className = tailwindCSS + " w-full sm480:h-full h-[560px]"
    }
    var iframe = document.createElement('iframe')

    //Auflösen nach Tailwind-Klassen //ar_iframe datawrapper_cdn
    iframe.setAttribute('class', 'border-0 top-0 left-0 w-full h-full overflow-y-hidden')
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