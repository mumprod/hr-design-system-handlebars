import { uxAction } from 'base/tracking/pianoHelper.subfeature'

export default function appBanner() {
    return {
        showBanner: false,
        deferredPrompt: null,
        init: function () {
            window.addEventListener('beforeinstallprompt', (e) => {
                // Prevent Chrome 67 and earlier from automatically showing the prompt
                e.preventDefault();
                // Stash the event so it can be triggered later.
                this.deferredPrompt = e;
                // Update UI notify the user they can add to home screen
                this.showBanner = true;
            });
            if(window.IS_STORYBOOK){ this.showBanner = true;}
        },
        installClickHandler: function(){
            if(this.deferredPrompt){
                this.deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                this.deferredPrompt.userChoice
                    .then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        uxAction('installNativeApp::promt::accepted');
                        console.log('User accepted the A2HS prompt');
                    } else {
                        uxAction('installNativeApp::promt::dismissed');
                        console.log('User dismissed the A2HS prompt');
                    }
                    this.deferredPrompt = null;
                    });
            }
            this.showBanner = false
        },
        closeClickHandler: function(){
            uxAction('installNativeApp::bannerClosed');
            this.showBanner = false
        }
    }
}