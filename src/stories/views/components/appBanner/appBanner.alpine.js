import { uxAction } from 'base/tracking/pianoHelper.subfeature'
import { getJSONCookie, setJSONCookie } from 'hrQuery'

export default function appBanner() {
    return {
        showBanner: false,
        deferredPrompt: null,
        isAndroid: /Android/i.test(navigator.userAgent),
        packageId: "de.hr.hessenschau",
        cookie: {},
        cookieLifetime: 1000 * 60 * 60 * 24 * 30, 
        init: function () {
            this.readTrackingCookie()
            if(this.cookie["closed"] !== true){
                if(this.isAndroid){
                    this.showBanner = true;
                    this.$store.appBannerIsVisible = true;
                }
            }    
            if(window.IS_STORYBOOK){ 
                this.showBanner = true;
                this.$store.appBannerIsVisible = true;
            }
            
        },
        installClickHandler: function(){
            this.openPlayStore()
            this.writeCookie()
            this.showBanner = false
            this.$store.appBannerIsVisible = false
        },
        closeClickHandler: function(){
            uxAction('appBanner::bannerClosed');
            this.showBanner = false
            this.$store.appBannerIsVisible = false
            this.writeCookie()
        },
        openPlayStore: function() {
            let fallbackTriggered = false;
            uxAction('appBanner::playStoreOpened');

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
        },
        writeCookie: function() {
            this.cookie["closed"] = true
            setJSONCookie('appBanner', this.cookie, this.cookieLifetime)
        },
        readTrackingCookie: function() {
            this.cookie = getJSONCookie('appBanner') || {}
        }
    }
}