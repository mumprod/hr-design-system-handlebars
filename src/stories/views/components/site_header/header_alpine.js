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
            let height = top.innerHeight

            window.addEventListener('scroll', this.debounce( () => {
                let winScroll = document.body.scrollTop || document.documentElement.scrollTop
                winScroll > lastScrollTop ? this.scrollingDown = true : this.scrollingDown = false
                //let height = document.documentElement.scrollHeight - document.documentElement.clientHeight
                this.percent = Math.round((winScroll / height) * 100)
                lastScrollTop = winScroll
                //console.log('winscroll: '+winScroll+' height: '+height + '  percent: '+ this.percent)
                this.$store.navIsVisible = !this.isNavHidden()
                this.$store.subNavIsVisible = !this.isSubNavHidden()
                //console.log(this.$store.navIsVisible);
            },50))
        },
        percent: 0,
        scrollingDown: true,
        isNavHidden() {
            if(this.$screen('lg')) {
                return this.shouldSectionNavBeHidden()
            } else {
                return this.shouldServiceNavBeHidden()
            }
        },
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
        shouldBrandNavBeHidden() {
            return this.percent > 0
        },
        shouldSectionNavBeHidden() {
            return this.percent > 50  && this.scrollingDown && this.$store.burgeropen == false && this.$screen('lg')
        },
        shouldServiceNavBeHidden() {
            return (this.percent > 90  && !this.$screen('lg') && this.scrollingDown && this.$store.burgeropen == false)
        },
        shouldServiceIconsBeHidden() {
            return (this.percent > 50 && !this.$screen('md') && this.$store.burgeropen == false && this.$store.serviceNavIsOpen == false && this.scrollingDown == true) || (this.percent > 50 && !this.$screen('md') && this.$store.burgeropen == false && this.$store.serviceNavIsOpen == false  && this.scrollingDown == false)
        },
        shouldFlyoutBeHidden() {
            return (this.percent > 50  && this.scrollingDown && this.$screen('lg') )
        },
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
        disableScrolling() {
            document.body.classList.add('overflow-hidden','h-full','w-full')
            this.$refs.myOverlay.ontouchmove = (e) => e.preventDefault();
            console.log("disableScrolling")
        },
        enableScrolling() {
            document.body.classList.remove('overflow-hidden','h-full','w-full')
            this.$refs.myOverlay.ontouchmove = (e) => true;
            console.log("enableScrolling")
        },
        toggleScrolling(mode){
            if(this.$screen(0) && !this.$screen('lg')){
                mode == false ? this.disableScrolling() : this.enableScrolling()
            }
            if(this.$screen('lg') && mode == true){
                this.enableScrolling()
            }
        }

    }))

    // context for the overlay
    Alpine.data('overlayHandler', () => ({
        shouldOverlayBeShown() {
            return (!this.$screen('lg') && ( this.$store.burgeropen == true || this.$store.serviceNavIsOpen == true || this.$store.searchFieldOpen == true  ))
        },
        overlayWasClicked() {
            this.$store.serviceNavIsOpen ? this.$store.serviceNavIsOpen = false : null
            this.$dispatch('burger-close')
            this.$dispatch('close-servicemenu')
            // this.$dispatch('toggleScrolling', true )
            this.toggleScrolling(true)
        }
    }))

    // context for all dropdowns
    Alpine.data('dropdown', () => ({
        dropped: false,
        toggle() {
            this.dropped = ! this.dropped;
        },
        toggleServiceNav(){
            this.dropped = ! this.dropped;
            this.$store.searchFieldOpen = false;

            this.$el.id != this.$store.serviceID.current ? this.$store.serviceNavIsOpen = true : this.$el.id == this.$store.serviceID.current ? this.$store.serviceNavIsOpen = !this.$store.serviceNavIsOpen : null;

            this.$store.burgeropen == true ? this.$dispatch('burger-close') : null

            console.log('currentID: '+ this.$store.serviceID.current)
            console.log('target-id: '+this.$event.target.id)
            console.log('element-id: '+this.$el.id)
            console.log('serviceNav is open:'+ this.$store.serviceNavIsOpen)

            this.$store.serviceID.current = this.$el.id

            this.toggleScrolling(!this.$store.serviceNavIsOpen)

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
        sectionNavFlyoutWatcher() {
            //Adds scrollheight of the flyout to sectionNav container to make sure all following items stay visible
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
        setFlyoutAnimationStyle() {
            //sets/cleansup the x-collapse attributes depending on window.innerWidth, gets fired @resize.window in NavigationFlyout.hbs
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
})