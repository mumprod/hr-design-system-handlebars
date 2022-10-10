import { download, pi, uxAction, uxNavigation } from 'base/tracking/atiHelper.subfeature'

const ClickTracking = function (context) {
    const { options } = context,
        { element: elementToTrack } = context,
        settings = options.settings || []

    const init = function () {
        configureEventHandlers()
    }

    const configureEventHandlers = function () {
        if (window.attachEvent) {
            elementToTrack.attachEvent('click', clickHandler)
        } else {
            elementToTrack.addEventListener('click', clickHandler)
        }
    }

    const clickHandler = function (event) {
        settings.forEach(function (trackingSetting) {
            /* use String.prototype.replace function with a regex and the global flag
               instead of String.prototype.replaceAll function to prevent errors in older
               browsers that don't know the replaceAll function
               see: https://www.designcise.com/web/tutorial/how-to-fix-replaceall-is-not-a-function-javascript-error
            */
            trackingSetting.clickLabel = trackingSetting.clickLabel.replace(/&/g, '-')
            switch (trackingSetting.type) {
                case 'download':
                    download(trackingSetting.clickLabel, trackingSetting.secondLevelId)
                    break
                case 'pi':
                    pi(trackingSetting.clickLabel, trackingSetting.secondLevelId)
                    break
                case 'uxAction':
                    uxAction(trackingSetting.clickLabel, trackingSetting.secondLevelId)
                    break
                case 'uxNavigation':
                    uxNavigation(trackingSetting.clickLabel, trackingSetting.secondLevelId)
                    break
                default:
                    console.log('Fehler, es wurde kein Tracking Typ angegeben.')
                    break
            }
        })
    }

    init()
}

export default ClickTracking
