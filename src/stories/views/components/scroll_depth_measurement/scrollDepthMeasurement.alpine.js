export default function measureScrollDepth() {
    let fired = {}
    function handleIntersect(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !fired[entry.target.dataset.scrollDepth]) {
                fired[entry.target.dataset.scrollDepth] = true
                console.log(entry.target.dataset.scrollDepth)
                // Here you can send the scroll depth data to your analytics service
            }
        })
    }
    return {
        scrollDepthContainer25: this.$refs.scroll_depth_25,
        scrollDepthContainer50: this.$refs.scroll_depth_50,
        scrollDepthContainer75: this.$refs.scroll_depth_75,
        scrollDepthContainer100: this.$refs.scroll_depth_100,

        init() {
            const observer = new IntersectionObserver(handleIntersect)
            observer.observe(this.scrollDepthContainer25)
            observer.observe(this.scrollDepthContainer50)
            observer.observe(this.scrollDepthContainer75)
            observer.observe(this.scrollDepthContainer100)
        },
    }
}
