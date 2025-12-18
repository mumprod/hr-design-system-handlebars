const DataWrapperNoResponsiveIframe = function ({
    rootElement,
    aspectRatio,
    fixedHeight,
    id,
    embedCode,
    lazyLoad,
}) {
    const createNoResponsiveIframe = function () {
        const parentDiv = document.createElement('div')
        //Auflösen nach Tailwind-Klassen //copytext__scrollWrapper
        parentDiv.className = '!h-full'
        const div = document.createElement('div')
        //Keine Aspect-Ratio ausgewählt aber eine feste Höhe
        if (aspectRatio === undefined) {
            //Auflösen nach Tailwind-Klassen //noaspect_datawrapper_cdn
            div.className = 'relative overflow-hidden w-0 border-0 !min-w-full'
            div.style.height = fixedHeight + 'px'
            div.style.width = '100%'
        }
        // Aspect-Ratio ausgewählt
        else {
            //ar-- in Tailwind-Klassen
            const aspectRatiosToCssClasses = {
                '100': 'ar-1-1',
                '16x9': 'ar-16-9',
                '9x16': 'ar-9-16',
                '16x7': 'ar-16-7',
                '7x16': 'ar-7-16',
                '4x3': 'ar-4-3',
                '100x27': 'ar-100-27',
            }
            const tailwindCSS = aspectRatiosToCssClasses[aspectRatio] || 'ar-16-9'
            div.className = `${tailwindCSS} w-full sm480:h-full h-[560px]`
        }
        var iframe = document.createElement('iframe')

        //Auflösen nach Tailwind-Klassen //ar_iframe datawrapper_cdn
        iframe.className = 'border-0 top-0 left-0 w-full h-full overflow-y-hidden'
        iframe.id = 'datawrapper-chart-' + id
        iframe.setAttribute('data-isloaded', '0')
        iframe.setAttribute('webkitallowfullscreen', '')
        iframe.setAttribute('mozallowfullscreen', '')
        iframe.setAttribute('allowfullscreen', '')
        iframe.setAttribute('scrolling', 'no')
        iframe.setAttribute('frameborder', '0')
        iframe.src = embedCode
        if (lazyLoad) {
            iframe.loading = 'lazy'
        }

        div.appendChild(iframe)
        parentDiv.appendChild(div)
        rootElement.appendChild(parentDiv)
    }
    return {
        createNoResponsiveIframe: createNoResponsiveIframe,
    }
}

export default DataWrapperNoResponsiveIframe
