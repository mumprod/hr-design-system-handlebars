import { download, pi, uxAction, uxNavigation } from 'base/tracking/pianoHelper.subfeature';

const ClickTracking = (context) => {
    const { options, element: elementToTrack } = context;
    const settings = options.settings || [];

    const clickHandler = (event) => {
        settings.forEach(({ type, clickLabel, secondLevelId }) => {
            /* use String.prototype.replace function with a regex and the global flag
               instead of String.prototype.replaceAll function to prevent errors in older
               browsers that don't know the replaceAll function
               see: https://www.designcise.com/web/tutorial/how-to-fix-replaceall-is-not-a-function-javascript-error
            */
            const sanitizedLabel = clickLabel.replace(/&/g, '-');
            switch (type) {
                case 'download':
                    download(sanitizedLabel, secondLevelId);
                    break;
                case 'pi':
                    pi();
                    break;
                case 'uxAction':
                    uxAction(sanitizedLabel, secondLevelId);
                    break;
                case 'uxNavigation':
                    uxNavigation(sanitizedLabel, secondLevelId);
                    break;
                default:
                    console.error('Fehler, es wurde kein Tracking Typ angegeben.');
            }
        });
    };

    elementToTrack.addEventListener('click', clickHandler);
};

export default ClickTracking;