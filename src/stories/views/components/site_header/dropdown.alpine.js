export default () => ({
    // state of the dropdown
    dropped: false,
    preventDefault(prevDefault, e) {
        if (prevDefault) {
            e.preventDefault()
        }
    },
    isDesktopView() {
        return this.$screen('lg')
    },
    // toggle() interpolates state
    toggle() {
        this.dropped = !this.dropped
    },
    correctFlyoutPos() {
        if (this.$screen('lg')) {
            let elementBoundingClientRec = this.$el.getBoundingClientRect()
            let parentElementBoundingClientRec = this.$el
                .closest('.relative')
                .getBoundingClientRect()
            this.$el.parentNode.querySelector('.sb-navigation-flyout').style.left =
                elementBoundingClientRec.left - Math.abs(parentElementBoundingClientRec.left) + 'px'
        } else {
            this.$el.parentNode.querySelector('.sb-navigation-flyout').style.left = '0px'
        }
    },
    // toggles visibility of service nav and sets global variables in stores
    toggleServiceNav() {
        this.dropped = !this.dropped

        // close search if open
        this.$store.searchFieldOpen = false

        // if clicked element is not the current serviceID, leave the servicenav open, else interpolate servicenav state
        this.$el.id != this.$store.serviceID.current
            ? (this.$store.serviceNavIsOpen = true)
            : this.$el.id == this.$store.serviceID.current
            ? (this.$store.serviceNavIsOpen = !this.$store.serviceNavIsOpen)
            : null

        //if burger is open, dispatch event to close it
        this.$store.burgeropen == true ? this.$dispatch('burger-close') : null

        console.log('currentID: ' + this.$store.serviceID.current)
        console.log('target-id: ' + this.$event.target.id)
        console.log('element-id: ' + this.$el.id)
        console.log('serviceNav is open:' + this.$store.serviceNavIsOpen)

        //set the serviceID to the current element´s ID.
        this.$store.serviceID.current = this.$el.id

        //enable/disable scrolling
        this.toggleScrolling(!this.$store.serviceNavIsOpen)

        //defines behaviour for servicenav on mobile viewports, taking care of viewport sizes
        let myFlyout = document.querySelector('#flyout-' + this.$el.id)
        let brandNavHeight = this.percent > 0 ? 40 : 0

        if (this.$store.serviceNavIsOpen == true && this.dropped == true) {
            window.setTimeout(function () {
                if (myFlyout.scrollHeight > window.innerHeight - myFlyout.offsetTop) {
                    myFlyout.style.height = 'auto'
                    window.innerWidth < 768
                        ? (myFlyout.style.maxHeight =
                              window.innerHeight - myFlyout.offsetTop - 80 + brandNavHeight + 'px')
                        : (myFlyout.style.maxHeight =
                              window.innerHeight - myFlyout.offsetTop - 40 + brandNavHeight + 'px')
                    myFlyout.style.overflowY = 'scroll'
                } else {
                    myFlyout.style.maxHeight = ''
                    //myFlyout.style.overflowY = 'hidden'
                }
            }, 150)
        }
    },
})
