export default () => ({
    // show the overlay on mobile and tablet if burger menu is open OR service nav is open OR search field is open
    shouldOverlayBeShown() {
        return (
            !this.$screen('lg') &&
            (this.$store.burgeropen == true ||
                this.$store.serviceNavIsOpen == true ||
                this.$store.searchFieldOpen == true)
        )
    },

    // on click on overlay change global var for servicenav, dispatch events to close burger and service menu, re-enable scrolling.
    overlayWasClicked() {
        this.$store.serviceNavIsOpen ? (this.$store.serviceNavIsOpen = false) : null
        this.$dispatch('burger-close')
        this.$dispatch('close-servicemenu')
        // this.$dispatch('toggleScrolling', true )
        this.toggleScrolling(true)
    },
})
