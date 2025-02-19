export default function stickyPlayer() {
    return {    
        eventListenerInitialized: false,
        inViewport: true, 
        videoStarted: false,
        videoStoped: true,
        videoPlaying: false,
        videoWasStopedWhenSticky: false,
        videoWasClosedByUser: false,
        videoElement: null,

        shouldVideoBeFixed: function () {
            return (!this.inViewport && this.videoPlaying) || (!this.inViewport && this.videoWasStopedWhenSticky) 
        },
        setupVideoEventListeners: function () {
            console.log("setupVideoEventListeners");
            if(!this.eventListenerInitialized) {                          
                this.videoElement.addEventListener("play", () => {
                    console.log("video:play");
                    this.videoStarted = true;
                    this.videoPlaying = true;
                    this.videoStoped = false;
                });
                this.videoElement.addEventListener("pause", () => {
                    console.log("video:pause");
                    this.videoPlaying = false;
                    this.videoStoped = true;
                    if (!this.inViewport ) {
                        if(this.videoWasClosedByUser){
                            this.videoWasClosedByUser = false
                        } else {
                            this.videoWasStopedWhenSticky = true;
                        }                               
                    }
                });
                this.eventListenerInitialized = true;
            }
        },
        closeVideo: function () {
            this.videoWasStopedWhenSticky = false;
            this.videoWasClosedByUser = true;
            this.videoElement.pause();                 
        },
        init: function () {
            this.videoElement = this.$refs.videoElementWrapper.querySelector("video");
            if(this.videoElement) {
                this.setupVideoEventListeners();
            } else {
                console.log("No video element found in sticky player.");
                const self = this; // Save a reference to the Alpine instance
                const observer = new MutationObserver(function() {
                    console.log("MutationObserver: Mutation observed in sticky player.");
                    
                    // Re-check for the video element
                    self.videoElement = self.$refs.videoElementWrapper.querySelector("video");
                    if (self.videoElement) {
                        console.log(self.videoElement)
                        self.setupVideoEventListeners();
                        observer.disconnect(); // Stop observing after the video is found
                    }
                });

                observer.observe(this.$refs.videoElementWrapper, {
                    subtree: true,
                    childList: true
                });
            }
                    
        }
    }
}               