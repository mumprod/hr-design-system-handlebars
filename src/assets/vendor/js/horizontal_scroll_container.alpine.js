export default function slider(container) {

    return {     
        isScrollable:false,
        arrowLeftDisplay:false,
        arrowRightDisplay:true,

        arrowsDisplay(e) { 
            console.log("arrow display: " + container);
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
            console.log("e.scrollWidth : "+e.scrollWidth+" e.clientWidth:"+e.clientWidth);
            e.scrollWidth > e.clientWidth ? this.isScrollable=true : this.isScrollable=false;
            console.log("checkIfScrollable : "+container+":"+this.isScrollable);
            this.arrowsDisplay(e);
        }
    };
}