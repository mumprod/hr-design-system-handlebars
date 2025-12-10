const DataWrapperContentRefresher = function ({
    rootElement,
    id,
    refreshIntervall,
    isWebcomponent,
    datapolicy,
}) {
    let remainingTime
    let timer
    let intervall = refreshIntervall
    let container
    let script
    let iframeRefresh

    if (isWebcomponent) {
        container = document.getElementById(`datawrapper-chart-${id}`)
        script = document.getElementById('datawrapper-component-js')
    } else {
        iframeRefresh = document.getElementById(`datawrapper-chart-${id}`)
    }

    const createRefresher = function () {
        console.log('Refresher bauen')
        const divCounter = document.createElement('div')
        divCounter.id = 'counter' + id
        Object.assign(divCounter.style, {
            backgroundColor: '#006dc1',
            color: '#fff',
            fontSize: '12px',
            padding: '8px',
            borderRadius: '0 0 4px 4px',
        })

        let divOverlay = document.createElement('div')
        divOverlay.id = 'overlay' + id
        Object.assign(divOverlay.style, {
            position: 'absolute',
            top: '0',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#d8e9f6',
            width: '100%',
            height: 'calc(100% - 36px)',
        })

        let divTextOverlay = document.createElement('div')
        divTextOverlay.innerHTML = 'Lade Inhalt neu...'
        Object.assign(divTextOverlay.style, {
            backgroundColor: '#005293',
            padding: '8px',
            color: '#fff',
            fontWeight: '800',
            fontFamily: 'RobotoSlab',
            borderRadius: '6px',
        })

        divOverlay.appendChild(divTextOverlay)

        rootElement.style.position = 'relative'

        if (!datapolicy) {
            rootElement.appendChild(divCounter)
            rootElement.appendChild(divOverlay)
            startCountdown()
        } else {
            rootElement.removeChild(divCounter)
            rootElement.removeChild(divOverlay)
            stopCountdown()
        }
    }

    const refreshIframe = function () {
        console.log('Reload')
        if (isWebcomponent) {
            container.style.opacity = '0'
            script.src = script.src.split('?')[0] + '?_=' + new Date().getTime()
        } else {
            iframeRefresh.style.opacity = '0'
            iframeRefresh.src = iframeRefresh.src.split('?')[0] + '?_=' + new Date().getTime()
        }
        clearInterval(timer)
    }
    const startCountdown = function () {
        remainingTime = Number(intervall)
        setTimeout(function () {
            if (isWebcomponent) {
                container.style.opacity = '1'
            } else {
                iframeRefresh.style.opacity = '1'
            }
            document.getElementById('overlay' + id).style.display = 'none'
        }, 1000)
        timer = setInterval(function () {
            checkTimer()
        }, 1000)
    }
    const stopCountdown = function () {
        clearInterval(timer)
    }
    const checkTimer = function () {
        if (document.getElementById('counter' + id) !== null) {
            if (remainingTime >= 0) {
                document.getElementById('counter' + id).innerHTML =
                    'Dieser Inhalt wird automatisch aktualisiert in ' +
                    secondsToTimeString(remainingTime) +
                    ' Min.'
                remainingTime -= 1
                if (remainingTime == -1) {
                    document.getElementById('overlay' + id).style.display = 'flex'
                    document.getElementById('counter' + id).innerHTML =
                        'Zeitintervall wird neu gestartet...'
                }
            } else {
                refreshIframe()
                startCountdown()
            }
        } else {
            console.log('Element wurde entfernt')
            clearInterval(timer)
        }
    }

    const secondsToTimeString = function (seconds) {
        return new Date(seconds * 1000).toISOString().substr(14, 5)
    }
    return {
        createRefresher: createRefresher,
    }
}

export default DataWrapperContentRefresher
