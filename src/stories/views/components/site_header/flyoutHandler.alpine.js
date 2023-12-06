export default () => ({
    init() {
        //Initial: x-collapse only on mobile/tablet
        if (window.innerWidth < 1024) {
            this.$el.setAttribute('x-collapse', '')
        }
    },

    //Adds scrollheight of the flyout to sectionNav container to make sure all following items stay visible
    sectionNavFlyoutWatcher() {
        this.$watch('dropped', (value) => {
            let a = this.$refs.sectionnavigation.scrollHeight + this.$el.scrollHeight
            let brandNavHeight = this.percent > 0 ? 40 : 0
            if (window.innerWidth < 1024) {
                if (value == true) { console.log("true")
                    if (a < window.innerHeight - this.$refs.sectionnavigation.offsetTop) {
                        this.$refs.sectionnavigation.style.maxHeight = a + 'px'
                        this.$refs.sectionnavigation.style.overflowY = 'hidden'
                    } else {
                        this.$refs.sectionnavigation.style.maxHeight =
                            window.innerHeight -
                            this.$refs.sectionnavigation.offsetTop +
                            brandNavHeight +
                            'px'
                        this.$refs.sectionnavigation.style.overflowY = 'scroll'
                    }
                } else { 
                    if (a < window.innerHeight - this.$refs.sectionnavigation.offsetTop) {
                        this.$refs.sectionnavigation.style.overflowY = 'hidden' 
                       
                    } else {
                        this.$refs.sectionnavigation.style.overflowY = 'scroll'
                        console.log("close is true")
                    }
                }
            }
        })
    },

    //sets/cleansup the x-collapse attributes depending on window.innerWidth, gets fired @resize.window in NavigationFlyout.hbs
    setFlyoutAnimationStyle() {
        if (window.innerWidth > 1023) {
            if (this.$el.hasAttribute('x-collapse.duration.500ms')) {
                this.$el.removeAttribute('x-collapse.duration.500ms')
                delete this.$el._x_transition
                this.$el.style.removeProperty('overflow')
                this.$el.style.removeProperty('height')
                if (!this.$el._x_isShown) this.$el.style.display = 'none'
                if (this.$el.hasAttribute('hidden')) this.$el.removeAttribute('hidden')
            }
        } else {
            if (!this.$el.hasAttribute('x-collapse.duration.500ms'))
                this.$el.setAttribute('x-collapse.duration.500ms', '')
        }
    },
})
