//Main Alpine Init Listener
document.addEventListener('alpine:init', () => {
    // Alpine.stores for global variables 
    Alpine.store('clientHeight', document.documentElement.clientHeight || document.body.clientHeight)
    Alpine.store('clientWidth', document.documentElement.clientWidth || document.body.clientWidth)
    Alpine.store('burgeropen', false);
    Alpine.store('searchFieldOpen', false);
    Alpine.store('serviceNavIsOpen', false);
    Alpine.store('searchID', {
        current: '{{nextRandom}}'
    });
    Alpine.store('serviceID', {
        open: false,
        current: '0'
    });
    Alpine.store('navIsVisible', true);
    Alpine.store('subNavIsVisible', false);

    // context for the main header element
    Alpine.data('mainNavigationHandler', () =>({

        debounce (callback, wait) {
            let timeoutId = null;
            return (...args) => {
                window.clearTimeout(timeoutId);
                timeoutId = window.setTimeout(() => {
                    callback.apply(null, args);
                }, wait);
            };

        },
        init(){
            let lastScrollTop = 0
            let height = window.innerHeight

            //Globale Variable, true = user initiated scroll / false = programmatic scroll via JS (e.g. click on Anchor Link)
            let userScroll = false;
            window.userScroll = userScroll;

            // gets fired when user initated scroll happened, global variable is used in Ticker-Topnews and other anchor links to prevent expanding of the navigation if scrollposition gets corrected by JS. 
            const mouseEvent = () => {
                userScroll = true;
                window.userScroll = true;
            }
            // detect if the user clicked/dragged the scrollbar manually
            const clickedOnScrollbar = mouseX => {
                return document.documentElement.offsetWidth <= mouseX ? true : false; 
            }
            // if clicked on scrollbar, fire user initiated mouse event
            const mouseDownHandler = e => {
                clickedOnScrollbar(e.clientX) ? mouseEvent() : null
            };
            // main scroll handler, defines scroll direction, percent of viewport scrolled, visibility of navigation and subnavigation
            const scrollHandler = () => {
                let winScroll = document.body.scrollTop || document.documentElement.scrollTop
                winScroll > lastScrollTop ? this.scrollingDown = true : this.scrollingDown = false
                this.percent = Math.round((winScroll / height) * 100)
                lastScrollTop = winScroll
                this.$store.navIsVisible = !this.isNavHidden()
                this.$store.subNavIsVisible = !this.isSubNavHidden()
                //console.log('winscroll: '+winScroll+' screen height: '+height + '  percent scrolled: '+ this.percent)
                //console.log('Scroll initiated by ' + (window.userScroll == true ? "user" : "browser"));
            }
            // Listeners 
            window.addEventListener('mousedown', mouseDownHandler, false)
            window.addEventListener('wheel', mouseEvent, false);
            window.addEventListener('touchmove', mouseEvent, false)
            window.addEventListener('scroll', this.debounce( scrollHandler,50), { passive: true })
        },
        //Holds the percentage of scrolled viewport
        percent: 0,

        //defines the scroll direction
        scrollingDown: true,

        //returns true if section navigation is hidden on desktop OR service navigation is hidden on mobile
        isNavHidden() {
            if(this.$screen('lg')) {
                return this.shouldSectionNavBeHidden()
            } else {
                return this.shouldServiceNavBeHidden()
            }
        },

        //returns false if subnav is visible and true if subnav is hidden
        isSubNavHidden() {
            if(this.$screen('lg')){
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
            if(window.userScroll == true){
                return this.percent > 50  && this.scrollingDown && this.$store.burgeropen == false && this.$screen('lg')
            } else {
                return this.percent > 50  && this.$store.burgeropen == false && this.$screen('lg')
            }

        },

        // returns true if user scrolled >90% and scrolls further down, no burger menu is open and the screen is NOT desktop. If scroll was initiated by script, ignore scroll direction. 
        shouldServiceNavBeHidden() {
            if(window.userScroll == true) {
                return (this.percent > 90 && !this.$screen('lg') && this.scrollingDown && this.$store.burgeropen == false)
            } else {
                return (this.percent > 90 && !this.$screen('lg') && this.$store.burgeropen == false)
            }
        },

        //returns true if user scrolled >50% and scrolls further down, no burger menu is open, no serviceNav is open and screen is not larger than mobile. OR: same same, but scrolling up. 
        shouldServiceIconsBeHidden() {
            return (this.percent > 50 && !this.$screen('md') && this.$store.burgeropen == false && this.$store.serviceNavIsOpen == false && this.scrollingDown == true) || (this.percent > 50 && !this.$screen('md') && this.$store.burgeropen == false && this.$store.serviceNavIsOpen == false  && this.scrollingDown == false)
        },

        // returns true if user scrolled >50% and scrolls further down and is a desktop viewport
        shouldFlyoutBeHidden() {
            return (this.percent > 50  && this.scrollingDown && this.$screen('lg') )
        },

        // resets the navigation back to the initial state. Happens f.ex. on resize of window.
        resetNav() {
            if(window.innerWidth > 1023) {
                this.$refs.sectionnavigation.setAttribute("style","")
            } else {
                // hidden needs to be set here to avoid flickering of the sectionNav on viewport change, gets removed in timeout
                // this.$refs.sectionnavigation.classList.add('hidden')
                // this.$refs.sectionnavigation.style.maxHeight="0px"
            }

            let nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let nowClientWidth = document.documentElement.clientWidth || document.body.clientWidth;
            let nextNowClientHeight = this.$store.clientHeight;
            if (nextNowClientHeight >= nowClientHeight && this.$store.clientWidth == nowClientWidth) {
                // Event handling of keyboard pop-up
                nextNowClientHeight = nowClientHeight
                this.$store.clientWidth = nowClientWidth
            }
            else{
                // timeout is used to dispatch events after the resize is done
                let timeout
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    this.$refs.sectionnavigation.classList.remove('hidden')
                    this.$store.burgeropen == true ? this.$dispatch('burger-close') :null
                    this.$store.searchFieldOpen === true ? this.$dispatch('search-mobile-click-outside') :null
                    this.$store.searchFieldOpen === true ? this.$dispatch('search-close') :null
                    this.$store.serviceNavIsOpen === true ? this.$dispatch('close-servicemenu') :null
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
            console.log('toggleSectionNav, Event: ' + this.$event.detail )
            if(this.$event.detail === false) {
                if (window.innerWidth < 1024) {
                    this.$refs.sectionnavigation.style.maxHeight='0px'
                } else {
                    this.$refs.sectionnavigation.style.maxHeight = ''
                }
            } else {
                let winheightcorr = parseInt(window.innerHeight) - this.$refs.sectionnavigation.offsetTop
                let navheight = parseInt(this.$refs.sectionnavigation.scrollHeight)
                let brandNavHeight = this.percent > 0 ? 40 : 0

                if(navheight > winheightcorr){
                    this.$refs.sectionnavigation.style.overflowY = 'scroll'
                    this.$refs.sectionnavigation.style.maxHeight = winheightcorr + brandNavHeight +'px'

                } else {
                    this.$refs.sectionnavigation.style.overflowY = 'hidden'
                    this.$refs.sectionnavigation.style.maxHeight = this.$el.scrollHeight + 'px'
                }
            }
        },

        // no scrolling when overlay is visible
        disableScrolling() {
            document.body.classList.add('overflow-hidden','h-full','w-full')
            this.$refs.myOverlay.ontouchmove = (e) => e.preventDefault();
            console.log("disableScrolling")
        },

        //only scroll when no overlay is visible
        enableScrolling() {
            document.body.classList.remove('overflow-hidden','h-full','w-full')
            this.$refs.myOverlay.ontouchmove = (e) => true;
            console.log("enableScrolling")
        },

        // toggles scrolling ability 
        toggleScrolling(mode){
            if(this.$screen(0) && !this.$screen('lg')){
                mode == false ? this.disableScrolling() : this.enableScrolling()
            }
            if(this.$screen('lg') && mode == true){
                this.enableScrolling()
            }
        }

    }));

    

    // context for the overlay
    Alpine.data('overlayHandler', () => ({

        // show the overlay on mobile and tablet if burger menu is open OR service nav is open OR search field is open
        shouldOverlayBeShown() {
            return (!this.$screen('lg') && ( this.$store.burgeropen == true || this.$store.serviceNavIsOpen == true || this.$store.searchFieldOpen == true  ))
        },

        // on click on overlay change global var for servicenav, dispatch events to close burger and service menu, re-enable scrolling. 
        overlayWasClicked() {
            this.$store.serviceNavIsOpen ? this.$store.serviceNavIsOpen = false : null
            this.$dispatch('burger-close')
            this.$dispatch('close-servicemenu')
            // this.$dispatch('toggleScrolling', true )
            this.toggleScrolling(true)
        }
    }))

    // context for all dropdowns, used in section nav submenus and service nav flyout submenus
    Alpine.data('dropdown', () => ({

        // state of the dropdown
        dropped: false,

        // toggle() interpolates state
        toggle() {
            this.dropped = ! this.dropped;
        },

        // toggles visibility of service nav and sets global variables in stores
        toggleServiceNav(){
            this.dropped = ! this.dropped;

            // close search if open
            this.$store.searchFieldOpen = false;

            // if clicked element is not the current serviceID, leave the servicenav open, else interpolate servicenav state  
            this.$el.id != this.$store.serviceID.current ? this.$store.serviceNavIsOpen = true : this.$el.id == this.$store.serviceID.current ? this.$store.serviceNavIsOpen = !this.$store.serviceNavIsOpen : null;

            //if burger is open, dispatch event to close it
            this.$store.burgeropen == true ? this.$dispatch('burger-close') : null

            console.log('currentID: '+ this.$store.serviceID.current)
            console.log('target-id: '+this.$event.target.id)
            console.log('element-id: '+this.$el.id)
            console.log('serviceNav is open:'+ this.$store.serviceNavIsOpen)

            //set the serviceID to the current element´s ID.
            this.$store.serviceID.current = this.$el.id

            //enable/disable scrolling 
            this.toggleScrolling(!this.$store.serviceNavIsOpen)

            //defines behaviour for servicenav on mobile viewports, taking care of viewport sizes
            let myFlyout = document.querySelector('#flyout-'+this.$el.id)
            let brandNavHeight = this.percent > 0 ? 40 : 0

            if (this.$store.serviceNavIsOpen == true && this.dropped == true) {
                window.setTimeout(function(){
                    if (myFlyout.scrollHeight > window.innerHeight-myFlyout.offsetTop) {
                        myFlyout.style.height = 'auto'
                        window.innerWidth < 768 ? myFlyout.style.maxHeight = window.innerHeight-myFlyout.offsetTop - 80 + brandNavHeight +'px' : myFlyout.style.maxHeight = window.innerHeight-myFlyout.offsetTop - 40 + brandNavHeight +'px'
                        myFlyout.style.overflowY = 'scroll'
                    } else {
                        myFlyout.style.maxHeight = ''
                        //myFlyout.style.overflowY = 'hidden'
                    }
                },150)
            }
        }
    }))

    // There are several Flyouts sharing the same functionality and context, so put the data in an Alpine.data to make it reusable
    Alpine.data('flyoutHandler', () => ({
        init() {
            //Initial: x-collapse only on mobile/tablet
            if(window.innerWidth < 1024) {
                this.$el.setAttribute("x-collapse","")
            }
        },
        
        //Adds scrollheight of the flyout to sectionNav container to make sure all following items stay visible
        sectionNavFlyoutWatcher() {
            this.$watch('dropped', value => {
                let a = this.$refs.sectionnavigation.scrollHeight + this.$el.scrollHeight;
                let brandNavHeight = this.percent > 0 ? 40 : 0
                if(window.innerWidth < 1024) {
                    if(value == true ) {

                        if (a < window.innerHeight - this.$refs.sectionnavigation.offsetTop) {
                            this.$refs.sectionnavigation.style.maxHeight = a +'px'
                            this.$refs.sectionnavigation.style.overflowY = 'hidden'
                        } else {
                            this.$refs.sectionnavigation.style.maxHeight = window.innerHeight - this.$refs.sectionnavigation.offsetTop + brandNavHeight +'px'
                            this.$refs.sectionnavigation.style.overflowY = 'scroll'
                        }
                    } else {
                        if (a < window.innerHeight - this.$refs.sectionnavigation.offsetTop) {
                            this.$refs.sectionnavigation.style.overflowY = 'hidden'
                        } else {
                            this.$refs.sectionnavigation.style.overflowY = 'scroll'
                        }
                    }
                }

            })
        },

        //sets/cleansup the x-collapse attributes depending on window.innerWidth, gets fired @resize.window in NavigationFlyout.hbs
        setFlyoutAnimationStyle() {
            if(window.innerWidth > 1023) {
                if(this.$el.hasAttribute("x-collapse.duration.500ms")) {
                    this.$el.removeAttribute("x-collapse.duration.500ms")
                    delete this.$el._x_transition;
                    this.$el.style.removeProperty('overflow');
                    this.$el.style.removeProperty('height');
                    if (! this.$el._x_isShown) this.$el.style.display = 'none'
                    if(this.$el.hasAttribute("hidden")) this.$el.removeAttribute("hidden")
                }
            } else {
                if(!this.$el.hasAttribute("x-collapse.duration.500ms")) this.$el.setAttribute("x-collapse.duration.500ms","")
            }
        }
    }))

    Alpine.data('contentNavigationHandler', () =>({    
        open: false,
        
        init(){  
        },

        shouldDropdownBeShown(teasersize,isDropdown,isMixed){  
            if (isDropdown){
                return true
            } 

            if (isMixed) {
                if (teasersize === 100 || teasersize === 66 ) {
                    if (this.$screen('lg')) return false
                    if (this.$screen('md')) return false
                    if (this.$screen('xs')) return true
                } else if (teasersize === 33 || teasersize === 25 || teasersize === 50) { 
                    return true 
                }
            }
        },

        shouldContentBeShown(teasersize,isDropdown,isMixed){
            if (isDropdown){                   
                return this.open                
            }  
            if (isMixed) {
                if (teasersize === 100 || teasersize === 66 ) {
                    if (this.$screen('lg')) return true
                    if (this.$screen('md')) return true
                    if (this.$screen('xs')) return this.open
                } else if (teasersize === 33 || teasersize === 25 || teasersize === 50) { 
                    return this.open
                }
            }

            return false 
        }
    }))  
})