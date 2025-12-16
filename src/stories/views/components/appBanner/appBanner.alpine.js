import { uxAction } from 'base/tracking/pianoHelper.subfeature'

export default function appBanner() {
    return {
        showBanner: false,
        deferredPrompt: null,
        isAndroid: /Android/i.test(navigator.userAgent),
        packageId: "de.hr.hessenschau",
        init: function () {

            if(this.isAndroid){
                this.showBanner = true;
            }
            
            if(window.IS_STORYBOOK){ this.showBanner = true;}
        },
        installClickHandler: function(){
            this.openPlayStore()
            this.showBanner = false
        },
        closeClickHandler: function(){
            uxAction('appBanner::bannerClosed');
            this.showBanner = false
        },
        openPlayStore: function() {
            let fallbackTriggered = false;

            const fallback = () => {
                if (fallbackTriggered) return;
                fallbackTriggered = true;

                window.open(`https://play.google.com/store/apps/details?id=${this.packageId}`, "googlePlayStore");
      
            };

            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                // App switch happened → cancel fallback
                fallbackTriggered = true;
                }
            }, { once: true });

            window.location.href =
                `intent://details?id=${this.packageId}` +
                `#Intent;scheme=market;package=com.android.vending;end`;

            setTimeout(fallback, 700);
        }
    }
}