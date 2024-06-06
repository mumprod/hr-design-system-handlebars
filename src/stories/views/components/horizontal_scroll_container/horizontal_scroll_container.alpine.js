export default function slider() {

    return {     
        isScrollable:false,
        arrowLeftDisplay:false,
        arrowRightDisplay:false,

        arrowsDisplay(e) { 
            e.scrollLeft > 1 ? this.arrowLeftDisplay=true : this.arrowLeftDisplay=false;
            e.scrollLeft + e.offsetWidth + 50 >= e.scrollWidth ? this.arrowRightDisplay=false : this.arrowRightDisplay=true;
        },

        prev(e) {
        e.scrollLeft -= 200;
        },

        next(e) {
        e.scrollLeft += 200;
        },

        updateIndex(e) {
            this.arrowsDisplay(e);
        },
        
        checkIfScrollable(e){     
            e.scrollWidth + 50 > e.clientWidth ? this.isScrollable=true : this.isScrollable=false;  
            this.arrowsDisplay(e);
        },
        throttle(f, delay) {
            let timer = 0;
            return function(...args) {
                clearTimeout(timer);
                timer = setTimeout(() => f.apply(this, args), delay);
            }
        },
        initialize(e) {
            this.checkIfScrollable(e);

            const resizeObserver = new ResizeObserver(this.throttle((entries) => {
                entries.forEach(entry => {
                    this.checkIfScrollable(e);
                });
            }, 100));
            
            resizeObserver.observe(e);
        }
    };
}