import { uxAction } from 'base/tracking/pianoHelper.subfeature'

export default (module) => ({
    open: false,
    sharingIsVisible: true,
    isDesktop: true,
    
    toggle() {
        
        var isMobileApple = /^iP/.test(navigator.platform) || /^Mac/.test(navigator.platform) && navigator.maxTouchPoints > 4;
        var isMobileOther= navigator.userAgent.match(/(Android)|(webOS)|(Blackberry)|(Windows Phone)/i);
        var isMobile= isMobileApple || isMobileOther;
        
        if (navigator.share && isMobile) {
            navigator.share({
                title: document.title,
                text: 'Schau mal was ich auf hessenschau.de gefunden habe!',
                url: window.location.href,
            })
            .then(() => {
                console.log('Shared successfully');
                uxAction('socialShareClick::'+module+'::nativeShare');
                console.log('tracked: socialShareClick::'+module+'::nativeShare');
            })
            .catch((error) => console.error('Sharing failed:', error));
        } else {
            if (this.$store.sharingIsOpen[module]) {
                return this.close()
            }
            this.$refs.button.focus()
            this.$store.sharingIsOpen[module] = true
        }               
    },
    close() {
        if (!this.$store.sharingIsOpen[module]) return
        this.$store.sharingIsOpen[module] = false
    }
    
})