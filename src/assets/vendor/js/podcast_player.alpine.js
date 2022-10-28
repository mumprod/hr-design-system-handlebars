export default function playaudio(){   
        return {
            audioDuration: 0,
            playerCount: 0,
            playlist: {},
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

                this.playlist[id] = _player
                console.log(this.playlist)
            },

            rangeInput(id) {                     
                if(this.playlist[id].init == false) {
                    this.playAndStop(id)
                    this.playAndStop(id) 
                }      
                this.playlist[id].audioElement.currentTime = (this.playlist[id].range.value/1000) * this.audioDuration                 
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
                if(this.playlist[id].init == true){
                    this.stopAudio(id)
                    this.playlist[id].button.querySelector('.js-playbutton').classList.remove('hidden')
                    this.playlist[id].button.querySelector('.js-pausebutton').classList.add('hidden')
                } else {
                    this.$dispatch('stopallotherplayers');
                    let duration = this.playlist[id].audioElement.duration
                    this.startAudio(id, duration)
                    this.playlist[id].range.parentNode.classList.remove('hidden')
                    this.playlist[id].button.querySelector('.js-playbutton').classList.add('hidden')
                    this.playlist[id].button.querySelector('.js-pausebutton').classList.remove('hidden')
                }
            },

            stopAllOtherPlayers(id){               
                console.log('stop all other players, initiated by: '+ id)
                let players = document.querySelectorAll('audio.hidden')
                for (let i=0; i<players.length; i++){
                    if (!players[i].classList.contains(id)){
                        console.log('paused: '+ players[i].classList);
                        this.playlist[id].init=false;
                        this.playlist[id].audioElement.pause()
                        this.playlist[id].button.querySelector('.js-playbutton').classList.remove('hidden')
                        this.playlist[id].button.querySelector('.js-pausebutton').classList.add('hidden')
                        this.playlist[id].range.parentNode.classList.add('hidden')
                    }
                }
            },

            startAudio(id, duration) {
                console.log('start audio '+ id + ' duration: '+ duration)
                if(this.playlist[id].init == false){
                    this.audioDuration = duration;
                    this.initAudioEventListener(id)  
                    this.playlist[id].init = true;
                }
                this.playlist[id].audioElement.play()
                this.playlist[id].currentlyPlaying = true;         
            },

            stopAudio(id) {
                console.log('stop audio '+ id)               
                this.playlist[id].audioElement.pause()
                this.playlist[id].init = false;             
            },

            initAudioEventListener(id) {               
                let _audioElement = this.playlist[id].audioElement
                let _range = this.playlist[id].range
                let _timeDisplay = this.playlist[id].timeDisplay
                _audioElement.ontimeupdate = (event) => {
                    this.updateCurrentTime(_range, _timeDisplay, _audioElement.currentTime) 
                };  
            },

            fancyTimeFormat(duration,measure) {   
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