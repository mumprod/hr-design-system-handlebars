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
            const intentUrl =
                `intent://details?id=${this.packageId}` +
                `#Intent;scheme=market;package=com.android.vending;end`;

            // Try to open the Play Store app
            window.location.href = intentUrl;
            uxAction('appBanner::intentUrl');
            // Fallback to web after a short delay
            setTimeout(() => {
                uxAction('appBanner::url');
                window.location.href = `https://play.google.com/store/apps/details?id=${this.packageId}`;
                
            }, 700);
        }
    }
}