export default function gallerySlider() {
    return { 
        slides: [],
        captions: [],
        currentSlideIndex: 1,
        animationEnabled: false,
        slideToRight: true,
        touchStartX: null,
        touchEndX: null,
        swipeThreshold: 50,
        previous() {
            this.animationEnabled = true;
            this.slideToRight = false;    
            this.currentSlideIndex = (this.currentSlideIndex - 1 > 0) ? this.currentSlideIndex - 1 : this.slides.length;            
        },            
        next() {                
            if (this.slides.length > 0) {
                this.animationEnabled = true;
                this.slideToRight = true;
                this.currentSlideIndex = (this.currentSlideIndex % this.slides.length) + 1;
            }
        },
        loadSlider() {
            this.slides = [...document.querySelectorAll('.gallery-slider__image')];
            this.slides.forEach((slide, index) => slide.setAttribute('x-show', `currentSlideIndex === ${index + 1}`));
            this.captions = [...document.querySelectorAll('.gallery-slider__caption')];
            this.captions.forEach((caption, index) => caption.setAttribute('x-show', `currentSlideIndex === ${index + 1}`));
        },
        handleTouchStart(event) {
            this.touchStartX = event.touches[0].clientX
        },
        handleTouchMove(event) {
            this.touchEndX = event.touches[0].clientX
        },
        handleTouchEnd() {
            if(this.touchEndX){
                if (this.touchStartX - this.touchEndX > this.swipeThreshold) {
                    this.next()
                }
                if (this.touchStartX - this.touchEndX < -this.swipeThreshold) {
                    this.previous()
                }
                this.touchStartX = null
                this.touchEndX = null
            }
        }

    };
}