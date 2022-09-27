export default function playaudio () {
    return {
        init: false,
        currentlyPlaying: false,
        currentTime: "00:00",
        currentTimeMs: 0,
        currentTimeS: 0,
        currentTimeM: 0,
        currentTimeH: 0,
        currentTimePercentage: 0,
        audioDuration: 0,
        pad(n, z) {
            z = z || 2;
            return ('00' + n).slice(-z);
        },
        rangeInput() {
            if(!this.init){
                //start and stop the audio
                this.playAndStop()
                this.playAndStop()
            }           
            this.$refs.audio.currentTime = (this.$refs.range.value/1000) * this.audioDuration            
        },
        updateCurrentTime(s) {
            this.currentTimeMs = s % 1000;
            s = (s - this.currentTimeMs) / 1000;
            this.currentTimeS = s % 60;
            s = (s - this.currentTimeS) / 60;
            this.currentTimeM = s % 60;
            this.currentTimeH = (s - this.currentTimeM) / 60;
            this.currentTime = this.pad(this.currentTimeM) + ':' + this.pad(this.currentTimeS) ;           
            this.currentTimePercentage = ((100 * this.$refs.audio.currentTime) / this.audioDuration) * 10
        },   
        playAndStop() {
            if (this.currentlyPlaying) {
            this.stopAudio()
            } else {
            this.startAudio()   
            }
        },
        startAudio() {
            if(!this.init) {
            this.init = true;
            this.audioDuration = this.$refs.audio.duration;
            this.initAudioEventListener()     
            }
            this.$refs.audio.play();
            this.currentlyPlaying = true;         
        },
        stopAudio() {
            this.$refs.audio.pause();
            this.currentlyPlaying = false;
        },
        initAudioEventListener() {
            this.$refs.audio.ontimeupdate = (event) => {
            this.updateCurrentTime( this.$refs.audio.currentTime * 1000)
            };  
        },
        returnString() {
            return "String"
        }
    }
}