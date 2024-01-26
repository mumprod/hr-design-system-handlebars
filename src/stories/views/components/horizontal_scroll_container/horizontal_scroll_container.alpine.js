export default function slider() {

    return {     
        isScrollable:false,
        arrowLeftDisplay:false,
        arrowRightDisplay:true,

        arrowsDisplay(e) { 
            e.scrollLeft > 1 ? this.arrowLeftDisplay=true : this.arrowLeftDisplay=false;
            e.scrollLeft + e.offsetWidth >= e.scrollWidth ? this.arrowRightDisplay=false : this.arrowRightDisplay=true;
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
            e.scrollWidth > e.clientWidth ? this.isScrollable=true : this.isScrollable=false;  
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
            console.log("log-> Init:");
            this.checkIfScrollable(e);

            const resizeObserver = new ResizeObserver(this.throttle((entries) => {
                entries.forEach(entry => {
                    this.checkIfScrollable(e);
                    console.log("log-> RESIZE");
                });
            }, 100));
            
            resizeObserver.observe(e);
        }
    };
}