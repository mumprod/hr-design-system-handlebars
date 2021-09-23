export default (document, selector) => {
    const htmlElements = document.querySelectorAll(selector)

    return {
        forEach: callback => {
            if (htmlElements) {
                let i
                for (
                    i = htmlElements.length;
                    i--;
                    callback(htmlElements[i], i, htmlElements)
                );
            }
        }
    }
}
