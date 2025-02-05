export default function gallerySlider(gallerySelector) {
    return { 
        slides: [],
        captions: [],
        currentSlideIndex: 1,
        animationEnabled: false,
        slideToRight: true,
        touchStartX: null,
        touchEndX: null,
        swipeThreshold: 50,
        loadedImages: [],
        loading: true,
        previous() {
            this.animationEnabled = true;
            this.slideToRight = false;    
            this.currentSlideIndex = (this.currentSlideIndex - 1 > 0) ? this.currentSlideIndex - 1 : this.slides.length;
            this.updateLoadingState(this.currentSlideIndex - 1);          
        },            
        next() {  
            if (this.slides.length > 0) {
                this.animationEnabled = true;
                this.slideToRight = true;
                this.currentSlideIndex = (this.currentSlideIndex % this.slides.length) + 1;
            }
            this.updateLoadingState(this.currentSlideIndex - 1);  
        },
        loadSlider() {
            const galleryContainer = document.querySelector(`.${gallerySelector}`);
            if (galleryContainer) {
                this.slides = [...galleryContainer.querySelectorAll('.js-gallery-slider-image')];
                this.slides.forEach((slide, index) => slide.setAttribute('x-show', `currentSlideIndex === ${index + 1}`));
                this.captions = [...galleryContainer.querySelectorAll('.js-gallery-slider-caption')];
                this.captions.forEach((caption, index) => caption.setAttribute('x-show', `currentSlideIndex === ${index + 1}`));
            }
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
        },
        handleImageLoad(event) {
           const img = event.target; 
            if (img.complete) {
                this.loading = false;
                this.loadedImages.push(img);
            }          
        },
        updateLoadingState(currentSlideIndex) {
            const currentSlide = this.slides[currentSlideIndex];
            if (currentSlide) {
                this.loading = !this.loadedImages.includes(currentSlide.querySelector('.js-gallery-image'));
            }
        }
    };
}