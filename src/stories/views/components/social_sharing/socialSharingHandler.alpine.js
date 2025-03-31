import { uxAction } from 'base/tracking/pianoHelper.subfeature'
import { fireEvent, getJSONCookie } from 'hrQuery'

export default (module) => ({
    open: false,
    sharingIsVisible: true,
    isDesktop: true,
    sharingModuleWasNeverShown: true,
    desktopSharingModuleWasNeverShown: true,
    copySuccess: false,
    cookie: {},
    isMobileApple: false,
    isMobileOther: false,
    isMobile: false,
    isWebview: false, 
    initBrowserDetection(){
        console.log('Pre initBrowserDetection', this.isMobileApple,this.isMobileOther,this.isMobile,this.isWebview);
        this.isMobileApple = /iP/.test(navigator.userAgent) || /Mac/.test(navigator.userAgent) && navigator.maxTouchPoints > 4;
        this.isMobileOther = /(Android|webOS|BlackBerry|Windows Phone)/i.test(navigator.userAgent);
        this.isMobile = this.isMobileApple || this.isMobileOther;

        try {
            this.isWebview = window.parent.document.documentElement.classList.contains('webview');
        } catch (e) {
            this.isWebview = false;
            console.warn("Could not access window.parent.document due to cross-origin restrictions", e);
        }
        console.log('initBrowserDetection', this.isMobileApple,this.isMobileOther,this.isMobile,this.isWebview);
    },
    readAppVersionCookie() {
        this.cookie = getJSONCookie('appSettings') || {}
    },
    nativeShare(title, url, uxActionValue) {
        console.log("Native Share", title, url, uxActionValue);
        navigator
            .share({
                title,
                url,
            })
            .then(function () {
                console.log('Native Shared successfully');
                if (uxActionValue) {
                    uxAction(uxActionValue);
                }
                console.log('tracked: '+ uxActionValue);
            })
            .catch((error) => console.error('Sharing failed:', error));
    },
    shareInWebview(title, url) {
        this.readAppVersionCookie();
        if(this.isMobileApple){
            console.log('apple mobile browser')
            this.nativeShare(title, url, 'socialShareClick::webview::nativeShareApple');
        } else if (this.isMobileOther) {
            console.log('non-apple mobile browser')
            /*Check Build Version of App*/
            if (this.cookie['fireCustomJsShareEvent'] === true) {
                /*Custom Event für App unter Android*/
                fireEvent('hr:global:shareCompactClickAndroidApp', {
                    title: title,
                    url: url,
                })
                uxAction('socialShareClick::webview::nativeShareAndroid::customEvent');
                console.log('Custom-Event für Android')
            } else {
                this.nativeShare(title, url, 'socialShareClick::webview::nativeShareAndroid::noCustomEventCookie');
            }
        }
    },
    toggle(title, url) {
        if (this.isWebview) {
            this.shareInWebview(title,url)
        }  else {  
            if (navigator.share && this.isMobile) {
                const shareTitle = title || document.title;
                const shareUrl = url || window.location.href;
                this.nativeShare(shareTitle, shareUrl, `socialShareClick::${module}::nativeShare`);
            } else {
                if (this.$store.sharingIsOpen[module]) {
                    return this.close(true)
                }
                this.$refs.button.focus()
                this.$store.sharingIsOpen[module] = true
                uxAction('socialShareClick::'+module+'::sharingIconOpen');
            }    
        }           
    },
    close(trackClick) {
        if (!this.$store.sharingIsOpen[module]) return
        this.$store.sharingIsOpen[module] = false
        if(trackClick) {
            uxAction('socialShareClick::'+module+'::sharingIconClose');
        }
    },
    sharingModuleShown(desktop){

        if(this.sharingModuleWasNeverShown && !desktop){
            console.log('Sharing Module '+module+' was shown for the first time!!!');
            //uxAction('socialShareClick::'+module+'::shown');
            this.sharingModuleWasNeverShown = false;
        }
        if(this.desktopSharingModuleWasNeverShown && desktop){
            console.log('Sharing Module '+module+'Desktop was shown for the first time!!!');
            //uxAction('socialShareClick::'+module+'Desktop::shown');
            this.desktopSharingModuleWasNeverShown = false;
        }
    },
    copyToClipboard(url) {

        navigator.clipboard
        .writeText(url)
        .then(() => {
            console.log("successfully copied");
            this.copySuccess = true
            window.setTimeout(() => {
                this.copySuccess = false
            }, 2000)
        })
        .catch(() => {
            console.log("something went wrong with copy");
        });
    }
    
})