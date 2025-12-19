import { scrollDepth } from 'base/tracking/pianoHelper.subfeature'
export default function measureScrollDepth() {
    let fired = {}
    function handleIntersect(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !fired[entry.target.dataset.scrollDepth]) {
                fired[entry.target.dataset.scrollDepth] = true
                scrollDepth(entry.target.dataset.scrollDepth)
            }
        })
    }
    return {
        scrollDepthContainer0: this.$refs.scroll_depth_0,
        scrollDepthContainer25: this.$refs.scroll_depth_25,
        scrollDepthContainer50: this.$refs.scroll_depth_50,
        scrollDepthContainer75: this.$refs.scroll_depth_75,
        scrollDepthContainer100: this.$refs.scroll_depth_100,

        init() {
            const observer = new IntersectionObserver(handleIntersect)
            observer.observe(this.scrollDepthContainer0)
            observer.observe(this.scrollDepthContainer25)
            observer.observe(this.scrollDepthContainer50)
            observer.observe(this.scrollDepthContainer75)
            observer.observe(this.scrollDepthContainer100)
        },
    }
}
