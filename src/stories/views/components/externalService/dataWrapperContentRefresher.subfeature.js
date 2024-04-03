        
const DataWrapperContentRefresher = function (context, uniqueID) {
        const { element: rootElement } = context
        let remainingTime
        let timer
        let iframeRefresh = document.getElementById('datawrapper-chart-' + uniqueID)
        
        const createRefresher = function (uniqueID) {
            let divCounter = document.createElement('div')
            let divOverlay = document.createElement('div')
            let divTextOverlay = document.createElement('div')
            divOverlay.id = 'overlay' + uniqueID
            divOverlay.style.position = 'absolute'
            divOverlay.style.top = '0'
            divOverlay.style.display = 'none'
            divOverlay.style.alignItems = 'center'
            divOverlay.style.justifyContent = 'center'
            divOverlay.style.backgroundColor = '#fff'
            divOverlay.style.width = '100%'
            divOverlay.style.height = 'calc(100% - 36px)'
            divOverlay.style.backgroundColor = '#d8e9f6'
            divTextOverlay.innerHTML = 'Lade Inhalt neu...'
            divTextOverlay.style.backgroundColor = '#005293'
            divTextOverlay.style.padding = '8px'
            divTextOverlay.style.color = '#fff'
            divTextOverlay.style.fontWeight = '800'
            divTextOverlay.style.fontFamily = 'RobotoSlab'
            divTextOverlay.style.borderRadius = '6px 6px 6px 6px'
            divOverlay.appendChild(divTextOverlay)
            divCounter.id = 'counter' + uniqueID
            divCounter.style.backgroundColor = '#006dc1'
            divCounter.style.color = '#fff'
            divCounter.style.fontSize = '12px'
            divCounter.style.padding = '8px'
            divCounter.style.borderRadius = '0 0 4px 4px'
            
            rootElement.style.position = 'relative'
            rootElement.appendChild(divCounter)
            rootElement.appendChild(divOverlay)
            startCountdown()
        }

        const refreshIframe = function () {
            console.log('Reload')
            iframeRefresh.style.opacity = '0'
            iframeRefresh.src =
                iframeRefresh.src.split('?')[0] + '?_=' + new Date().getTime()
            clearInterval(timer)
        }
        const startCountdown = function () {
            remainingTime = Number(iFrameConfig.refreshIntervall)
            setTimeout(function () {
                iframeRefresh.style.opacity = '1'
                document.getElementById('overlay' + uniqueID).style.display = 'none'
            }, 1000)
            timer = setInterval(function () {
                checkTimer()
            }, 1000)
        }
        const checkTimer = function () {
            if (remainingTime >= 0) {
                document.getElementById('counter' + uniqueID).innerHTML =
                    'Dieser Inhalt wird automatisch aktualisiert in ' +
                    secondsToTimeString(remainingTime) +
                    ' Min.'
                remainingTime -= 1
                if (remainingTime == -1) {
                    document.getElementById('overlay' + uniqueID).style.display = 'flex'
                    document.getElementById('counter' + uniqueID).innerHTML =
                        'Zeitintervall wird neu gestartet...'
                }
            } else {
                refreshIframe()
                startCountdown()
            }
        }
        const secondsToTimeString = function (seconds) {
            return new Date(seconds * 1000).toISOString().substr(14, 5)
        }
        return {
            createRefresher: createRefresher
        }
    }

    export default DataWrapperContentRefresher            