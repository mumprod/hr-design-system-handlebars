const CreateWahlGemeindeErgebnis = function (embedCode) {
    let eCode = embedCode,
        cleanUrl,
        wahlKreisVersionJsonUrl,
        wahlkreis,
        wahlid,
        jsonResponse,
        iFrameElement,
        iframeHeight = 300

    const createErgebnis = function() {
        extractDataFromEmbedCode()
        initMessageEventListener()
        fetchJsonData()
    } 
    const cleanVariables = function (variable) {
        while (variable.charAt(0) === '&') {
            variable = variable.substring(1)
        }
        return variable
    }
    const extractDataFromEmbedCode = function () {
        const parts = eCode.split('*')
        if (parts.length === 4) {
            cleanUrl = cleanVariables(decodeURIComponent(parts[0].trim()))
            wahlkreis = cleanVariables(decodeURIComponent(parts[1].trim()))
            wahlid = cleanVariables(decodeURIComponent(parts[2].trim()))
            wahlKreisVersionJsonUrl = cleanVariables(decodeURIComponent(parts[3].trim()))
        }
    }
    const loadIframe = function (version, url, wahlkreis) {
        if (version) {
            let iframeUrl = url.replace('{version}', version)
            let iframe = document.createElement('iframe')
            iframe.className = ''
            iframe.style.border = 'none'
            iframe.style.height = iframeHeight + 'px'
            iframe.style.width = '100%'
            iframe.setAttribute('webkitallowfullscreen', '')
            iframe.setAttribute('mozallowfullscreen', '')
            iframe.setAttribute('allowfullscreen', '')
            iframe.setAttribute('scrolling', 'no')
            iframe.setAttribute('frameborder', '0')
            iframe.src = iframeUrl
            iframe.id = 'wahl-gemeinde-ergebnis-' + wahlkreis
            rootElement.innerHTML = ''
            rootElement.insertBefore(iframe, null)
            iFrameElement = document.getElementById('wahl-gemeinde-ergebnis-' + wahlkreis)
        } else {
            loadNoDataDiv('Es liegen zur Zeit noch keine Ergebnisse vor', 5)
        }
    }
    const loadNoDataDiv = function (text, timeout) {
        let div = document.createElement('div')
        div.className =
            'p-5 c-externalService__wahl-gemeinde-ergebnis-no-result rounded-tl-hr rounded-br-hr bg-highlight-1'
        div.innerHTML =
            '<div class="text-2xl text-clusterTeaserHeadline font-titleCluster mb-2">' +
            text +
            '</div>' +
            '<div class="flex flex-row" >' +
            '  <div class="">' +
            '    <span>Dieser Inhalt wird automatisch aktualisiert in</span>' +
            '    <span data-minutes>' +
            timeout +
            '    </span>' +
            '    <span>Min</span>' +
            '    <span data-seconds>0</span>' +
            '    <span>Sek</span>' +
            '  </div>' +
            '</div>'
        rootElement.innerHTML = ''
        rootElement.insertBefore(div, null)
        countdownMinutes(timeout, fetchJsonData)
    }
    const resizeIframe = function (newheight) {
        if (newheight !== iframeHeight) {
            iFrameElement.style.height = newheight + 'px'
            iframeHeight = newheight
        }
    }
    const processMessage = function (evt) {
        if (evt.origin !== 'https://www.tagesschau.de') {
            console.log('message', evt.origin + ' ist nicht vertrauenswürdig')
        } else {
            resizeIframe(evt.data)
        }
    }
    const initMessageEventListener = function () {
        if (window.addEventListener) {
            // For standards-compliant web browsers
            window.addEventListener('message', processMessage, false)
        } else {
            window.attachEvent('onmessage', processMessage)
        }
    }
    const fetchJsonData = function () {
        fetch(wahlKreisVersionJsonUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((jsonData) =>
                loadIframe(
                    jsonData.hasOwnProperty(wahlkreis) && jsonData[wahlkreis].v
                        ? jsonData[wahlkreis].v
                        : null,
                    cleanUrl,
                    wahlkreis,
                ),
            )
            .catch(function () {
                loadNoDataDiv('Es liegen zur Zeit noch keine Ergebnisse vor', 5)
                console.log('No JSON Data Loaded')
            })
    }

    function countdownMinutes(minutesToCountdown, callbackFunction) {
        const second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24,
            minuteElement = document.querySelector('[data-minutes]'),
            secondElement = document.querySelector('[data-seconds]')

        function AddMinutesToDate(date, minutes) {
            return new Date(date.getTime() + minutes * 60000)
        }

        let countDown = AddMinutesToDate(new Date(), minutesToCountdown),
            x = setInterval(function () {
                let now = new Date().getTime(),
                    distance = countDown - now

                if (minuteElement != null) {
                    minuteElement.innerText = Math.floor((distance % hour) / minute)
                }

                if (secondElement != null) {
                    secondElement.innerText = Math.floor((distance % minute) / second)
                }

                if (distance < 1000) {
                    callbackFunction()
                    clearInterval(x)
                }
            }, second)
    }
    return {
        createErgebnis: createErgebnis
    }

}

export default CreateWahlGemeindeErgebnis     