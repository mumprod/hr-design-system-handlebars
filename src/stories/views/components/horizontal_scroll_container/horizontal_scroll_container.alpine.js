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
        }
    };
}