export default () => ({
    debounce(callback, wait) {
        let timeoutId = null
        return (...args) => {
            window.clearTimeout(timeoutId)
            timeoutId = window.setTimeout(() => {
                callback.apply(null, args)
            }, wait)
        }
    },
    start() {
        let lastScrollTop = 0
        let height = window.innerHeight

        //Globale Variable, true = user initiated scroll / false = programmatic scroll via JS (e.g. click on Anchor Link)
        let userScroll = false
        window.userScroll = userScroll

        // gets fired when user initated scroll happened, global variable is used in Ticker-Topnews and other anchor links to prevent expanding of the navigation if scrollposition gets corrected by JS.
        const mouseEvent = () => {
            userScroll = true
            window.userScroll = true
        }
        // detect if the user clicked/dragged the scrollbar manually
        const clickedOnScrollbar = (mouseX) => {
            return document.documentElement.offsetWidth <= mouseX ? true : false
        }
        // if clicked on scrollbar, fire user initiated mouse event
        const mouseDownHandler = (e) => {
            clickedOnScrollbar(e.clientX) ? mouseEvent() : null
        }
        // main scroll handler, defines scroll direction, percent of viewport scrolled, visibility of navigation and subnavigation
        const scrollHandler = () => {
            let winScroll = document.body.scrollTop || document.documentElement.scrollTop
            winScroll > lastScrollTop ? (this.scrollingDown = true) : (this.scrollingDown = false)
            this.percent = Math.round((winScroll / height) * 100)
            lastScrollTop = winScroll
            this.$store.navIsVisible = !this.isNavHidden()
            this.$store.subNavIsVisible = !this.isSubNavHidden()
            //console.log('winscroll: '+winScroll+' screen height: '+height + '  percent scrolled: '+ this.percent)
            //console.log('Scroll initiated by ' + (window.userScroll == true ? "user" : "browser"));
        }
        // Listeners
        window.addEventListener('mousedown', mouseDownHandler,false)
        window.addEventListener('wheel', mouseEvent, {passive: true})
        window.addEventListener('touchmove', mouseEvent, {passive: true})
        window.addEventListener('scroll', scrollHandler, { passive: true })
    },
    //Holds the percentage of scrolled viewport
    percent: 0,

    //defines the scroll direction
    scrollingDown: true,

    //returns true if section navigation is hidden on desktop OR service navigation is hidden on mobile
    isNavHidden() {
        if (this.$screen('lg')) {
            return this.shouldSectionNavBeHidden()
        } else {
            return this.shouldServiceNavBeHidden()
        }
    },

    //returns false if subnav is visible and true if subnav is hidden
    isSubNavHidden() {
        if (this.$screen('lg')) {
            if (document.querySelector('.isSelectedAndOpen') !== null) {
                return false
            } else {
                return true
            }
        } else {
            return true
        }
    },

    // returns true if the user scrolled at least 1px from top
    shouldBrandNavBeHidden() {
        return this.percent > 0
    },

    // returns true if user scrolled >50% and scrolls down, no burger menu is open and the screen size is desktop. If scroll was initiated by script, ignore scroll direction.
    shouldSectionNavBeHidden() {
        if (window.userScroll == true) {
            return (
                this.percent > 50 &&
                this.scrollingDown &&
                this.$store.burgeropen == false &&
                this.$screen('lg')
            )
        } else {
            return this.percent > 50 && this.$store.burgeropen == false && this.$screen('lg')
        }
    },

    // returns true if user scrolled >90% and scrolls further down, no burger menu is open and the screen is NOT desktop. If scroll was initiated by script, ignore scroll direction.
    shouldServiceNavBeHidden() {
        if (window.userScroll == true) {
            return (
                this.percent > 90 &&
                !this.$screen('lg') &&
                this.scrollingDown &&
                this.$store.burgeropen == false
            )
        } else {
            return this.percent > 90 && !this.$screen('lg') && this.$store.burgeropen == false
        }
    },

    //returns true if user scrolled >50% and scrolls further down, no burger menu is open, no serviceNav is open and screen is not larger than mobile. OR: same same, but scrolling up.
    shouldServiceIconsBeHidden() {
        return (
            (this.percent > 50 &&
                !this.$screen('md') &&
                this.$store.burgeropen == false &&
                this.$store.serviceNavIsOpen == false &&
                this.scrollingDown == true) ||
            (this.percent > 50 &&
                !this.$screen('md') &&
                this.$store.burgeropen == false &&
                this.$store.serviceNavIsOpen == false &&
                this.scrollingDown == false)
        )
    },

    // returns true if user scrolled >50% and scrolls further down and is a desktop viewport
    shouldFlyoutBeHidden() {
        return this.percent > 50 && this.scrollingDown && this.$screen('lg')
    },

    // resets the navigation back to the initial state. Happens f.ex. on resize of window.
    resetNav() {
        if (window.innerWidth > 1023) {
            this.$refs.sectionnavigation.setAttribute('style', '')
        } else {
            // todo vasco: checken ob das wieder rein sollte
            // hidden needs to be set here to avoid flickering of the sectionNav on viewport change, gets removed in timeout
            // this.$refs.sectionnavigation.classList.add('hidden')
            // this.$refs.sectionnavigation.style.maxHeight="0px"
        }

        let nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight
        let nowClientWidth = document.documentElement.clientWidth || document.body.clientWidth
        let nextNowClientHeight = this.$store.clientHeight
        if (nextNowClientHeight >= nowClientHeight && this.$store.clientWidth == nowClientWidth) {
            // Event handling of keyboard pop-up
            nextNowClientHeight = nowClientHeight
            this.$store.clientWidth = nowClientWidth
        } else {
            // timeout is used to dispatch events after the resize is done
            let timeout
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                this.$refs.sectionnavigation.classList.remove('hidden')
                this.$store.burgeropen == true ? this.$dispatch('burger-close') : null
                this.$store.searchFieldOpen === true
                    ? this.$dispatch('search-mobile-click-outside')
                    : null
                this.$store.searchFieldOpen === true ? this.$dispatch('search-close') : null
                this.$store.serviceNavIsOpen === true ? this.$dispatch('close-servicemenu') : null
                this.toggleScrolling(true)
            }, 250)
            // Event handling of keyboard pop-up
            nextNowClientHeight = nowClientHeight
            this.$store.clientWidth = nowClientWidth
        }
    },

    // toggles the maxHeight of the section nav and makes sure there is enough space to display all items.
    toggleSectionNav() {
        //false = sectionNav schließt ( mobile/tablet? --> maxHeight = 0  ///  desktop? just clear maxHeight attribute )
        //true = sectionNav öffnet (maxheight = scrollheight)
        console.log('toggleSectionNav, Event: ' + this.$event.detail)
        if (this.$event.detail === false) {
            if (window.innerWidth < 1024) {
                this.$refs.sectionnavigation.style.maxHeight = '0px'
            } else {
                this.$refs.sectionnavigation.style.maxHeight = ''
            }
        } else {
            let winheightcorr =
                parseInt(window.innerHeight) - this.$refs.sectionnavigation.offsetTop
            let navheight = parseInt(this.$refs.sectionnavigation.scrollHeight)
            let brandNavHeight = this.percent > 0 ? 40 : 0

            if (navheight > winheightcorr) {
                this.$refs.sectionnavigation.style.overflowY = 'scroll'
                this.$refs.sectionnavigation.style.maxHeight = winheightcorr + brandNavHeight + 'px'
            } else {
                this.$refs.sectionnavigation.style.overflowY = 'hidden'
                this.$refs.sectionnavigation.style.maxHeight = this.$el.scrollHeight + 'px'
            }
        }
    },

    // no scrolling when overlay is visible
    disableScrolling() {
        document.body.classList.add('overflow-hidden', 'h-full', 'w-full')
        this.$refs.myOverlay.ontouchmove = (e) => e.preventDefault()
        console.log('disableScrolling')
    },

    //only scroll when no overlay is visible
    enableScrolling() {
        document.body.classList.remove('overflow-hidden', 'h-full', 'w-full')
        this.$refs.myOverlay.ontouchmove = (e) => true
        console.log('enableScrolling')
    },

    // toggles scrolling ability
    toggleScrolling(mode) {
        if (this.$screen(0) && !this.$screen('lg')) {
            mode == false ? this.disableScrolling() : this.enableScrolling()
        }
        if (this.$screen('lg') && mode == true) {
            this.enableScrolling()
        }
    },
})
