export default function playaudio(){
        return {
            audioDuration: 0,
            playerCount: 0,
            playlist: [],
            
            registerPlayer(duration,id){
                let _player = {}
                _player.id = id
                _player.button = document.querySelector('#playbutton'+id)
                _player.range = document.querySelector('#range'+id)
                _player.timeDisplay = document.querySelector('#timedisplay'+id)
                _player.audioElement = this.$el
                _player.audioSrc = this.$el.querySelector('source').src
                _player.duration = duration
                _player.currentlyPlaying = false
                _player.init = false
                
                this.playerCount == 0 ? _player.range.parentNode.classList.remove('hidden') : _player.range.parentNode.classList.add('hidden')
                this.playerCount++
                this.playlist.push(_player)

                console.log(this.playlist)
            },

            rangeInput(id) {               
                for (var i = 0; i < this.playlist.length; i++ ){
                    if(this.playlist[i].id == id) {    
                        if(this.playlist[i].init == false) {
                            this.playAndStop(id)
                            this.playAndStop(id) 
                        }      
                        this.playlist[i].audioElement.currentTime = (this.playlist[i].range.value/1000) * this.audioDuration
                        //this.playAndStop(id) 
                    }
                }            
            },

            setTime(duration, id) {
                console.log('time set: ' + duration)
                
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

                let el = document.getElementById("timedisplay"+id)
                let range = document.getElementById("range"+id)
                el.querySelector('#currentTime').innerHTML = "0:00"
                el.querySelector('#audioDurationFancy').innerHTML = this.fancyTimeFormat(durationSeconds)
                range.value = 0
            },

            updateCurrentTime(range,timeDisplay,newTime) {
                timeDisplay.querySelector('#currentTime').innerHTML = this.fancyTimeFormat(newTime, true)
                range.style.background = 'linear-gradient(to right, #006dc1 ' + range.value/10 + '%, white ' + range.value/10 + '% )'
                range.value = ((100 * newTime) / this.audioDuration) * 10 
            }, 

            playAndStop(id) {
                for (var i = 0; i < this.playlist.length; i++ ){
                    if(this.playlist[i].id == id) {
                        if(this.playlist[i].currentlyPlaying == true){
                            this.stopAudio(id)
                            this.playlist[i].button.querySelector('.js-playbutton').classList.remove('hidden')
                            this.playlist[i].button.querySelector('.js-pausebutton').classList.add('hidden')
                        } else {
                            let duration = this.playlist[i].audioElement.duration
                            this.startAudio(id, duration)
                            this.playlist[i].range.parentNode.classList.remove('hidden')
                            this.playlist[i].button.querySelector('.js-playbutton').classList.add('hidden')
                            this.playlist[i].button.querySelector('.js-pausebutton').classList.remove('hidden')
                        }
                    } else {
                        this.stopAudio(this.playlist[i].id)
                        let buttonContainer = document.querySelector('#playbutton'+this.playlist[i].id)
                            buttonContainer.querySelector('.js-playbutton').classList.remove('hidden')
                            buttonContainer.querySelector('.js-pausebutton').classList.add('hidden')
                        this.playlist[i].range.parentNode.classList.add('hidden')
                    }
                }

            }, 
            
            startAudio(id, duration) {
                console.log('start audio '+ id + ' duration: '+ duration)

                   
                
                for (var i = 0; i < this.playlist.length; i++ ){
                    if(this.playlist[i].id == id){
                        this.audioDuration = duration;
                        this.initAudioEventListener(id)  
                        this.playlist[i].init = true;
                        this.playlist[i].audioElement.play()
                        this.playlist[i].currentlyPlaying = true;
                       
                    } else {
                        this.playlist[i].init = false
                        this.playlist[i].audioElement.pause()
                        this.playlist[i].currentlyPlaying = false;
                        
                    }
                }         
            },

            stopAudio(id) {
                for (var i = 0; i < this.playlist.length; i++ ){
                    if(this.playlist[i].id == id){
                        this.playlist[i].audioElement.pause()
                        this.playlist[i].currentlyPlaying = false;
                    }
                }
            },

            initAudioEventListener(id) {
                for (var i = 0; i < this.playlist.length; i++ ){
                    if(this.playlist[i].id == id){
                        let _audioElement = this.playlist[i].audioElement
                        let _range = this.playlist[i].range
                        let _timeDisplay = this.playlist[i].timeDisplay

                        _audioElement.ontimeupdate = (event) => {
                            this.updateCurrentTime(_range, _timeDisplay, _audioElement.currentTime) 
                        };  
                    }
                }

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
                    hrs > 0 ? ret += " Std." : ret += " Min." 
                }
                return ret;
            } 
        }
    }