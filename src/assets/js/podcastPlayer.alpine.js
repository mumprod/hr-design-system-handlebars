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
            durationSeconds:0,
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
            setTime(duration) {
                console.log('time set' + duration)
                let parts = duration.split(':')

                if(parts.length < 3){
                    let minutes = +parts[0]
                    let seconds = +parts[1];
                    var durationSeconds = (minutes * 60 + seconds).toFixed(3);
                } else {
                    let hours = +parts[0]
                    let minutes = +parts[1]
                    let seconds = +parts[2]
                    var durationSeconds = (hours * 3600  +minutes * 60 + seconds).toFixed(3);
                }
                
                this.audioDuration = durationSeconds;
                this.audioDurationFancy = this.fancyTimeFormat(durationSeconds)  
               
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
                    hrs > 1 ? ret += " Std." : ret += " Min." 
                }
            
                return ret;
            }
            
                
            
        }
    }