export default function playaudio(){
        return {
            init: false,
            currentlyPlaying: false,
            currentTime: 0,
            currentTimeMs: 0,
            currentTimeS: 0,
            currentTimeM: 0,
            currentTimeH: 0,
            currentTimePercentage: 0,
            audioDuration: 0,
            audioDurationFancy: 0,
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
                this.currentTime = this.fancyTimeFormat(s, true);
                this.$refs.range.style.background = 'linear-gradient(to right, #006dc1 ' + this.$refs.range.value/10 + '%, white ' + this.$refs.range.value/10 + '% )'
                this.currentTimePercentage = ((100 * this.$refs.audio.currentTime) / this.audioDuration) * 10 
            },   
            playAndStop() {
                if (this.currentlyPlaying) {
                this.stopAudio()
                } else {
                this.startAudio()   
                }
            },
            initTime() {
                console.log('time initialized')
                this.$refs.audio.addEventListener("durationchange", () => {console.log('duration is available'); this.setTime()});
            },
            setTime() {
                console.log('time set')
                this.audioDuration = this.$refs.audio.duration;
                this.audioDurationFancy = this.fancyTimeFormat(this.$refs.audio.duration)  
                this.removeAudioListener()  
            },
            removeAudioListener(){
                this.$refs.audio.removeEventListener("durationchange", () => {this.setTime()});
            },
            startAudio() {
                if(!this.init) {
                this.init = true;
                this.audioDuration = this.$refs.audio.duration;
                this.audioDurationFancy = this.fancyTimeFormat(this.$refs.audio.duration)
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
                    this.updateCurrentTime( this.$refs.audio.currentTime)
                };  
            },
            returnString() {
                return "String"
            },
            fancyTimeFormat(duration,measure)
            {   
                var hrs = ~~(duration / 3600);
                var mins = ~~((duration % 3600) / 60);
                var secs = ~~duration % 60;

                var ret = "";

                if (hrs > 0) {
                    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
                }

                ret += "" + mins + ":" + (secs < 10 ? "0" : "");
                ret += "" + secs;
                
                if (!measure){
                    hrs > 1 ? ret += "std" : ret += "min" 
                }
            
                return ret;
            }
            
                
            
        }
    }