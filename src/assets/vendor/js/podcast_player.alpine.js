export default function playaudio(){   
        return {
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
                
               // this.playerCount == 0 ? _player.range.parentNode.classList.remove('hidden') : _player.range.parentNode.classList.add('hidden')
                this.playerCount++

                this.playlist[id] = _player
                
            },
            listenToGlobalStop(){
                console.log('global listener init')
                window.addEventListener('hr:global:stopOtherAVs', this.stopAllPlayersBecauseOfGlobalStop.bind(this))
            },
            rangeInput(id) {                     
                if(this.playlist[id].init == false) {
                    this.playAndStop(id)
                    this.playAndStop(id) 
                }      
                this.playlist[id].audioElement.currentTime = (this.playlist[id].range.value/1000) * this.playlist[id].audioElement.duration               
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
                    var durationSeconds = (hours * 3600  + minutes * 60 + seconds).toFixed(3);
                }
                
                let range = document.getElementById("range"+id)
                range.value = 0
                this.$el.querySelector('#currentTime').innerHTML = this.fancyTimeFormat('0',false)
                this.$el.querySelector('#audioDurationFancy').innerHTML = this.fancyTimeFormat(durationSeconds, true)
                
            },

            updateCurrentTime(range,timeDisplay,newTime, id) {

                timeDisplay.querySelector('#currentTime').innerHTML = this.fancyTimeFormat(newTime, false)
                range.style.background = 'linear-gradient(to right, #006dc1 ' + (range.value/10)  + '%, white ' + (range.value/10) + '% )'
                range.value = ((100 * newTime) / this.playlist[id].audioElement.duration) * 10
            }, 

            playAndStop(id) {
                console.log('event target: ' + this.$event.currentTarget.id)
                console.log('playlist: ', this.playlist)
                if(this.playlist[id].init == true){
                    this.stopAudio(id)
                } else {
                   // this.$dispatch('stopotherplayers',{playerId: id});
                    this.stopAllOtherPlayers(id)

                    this.startAudio(id)
                    this.playlist[id].range.parentNode.classList.remove('max-h-0')
                    this.playlist[id].range.parentNode.classList.add('max-h-9')
                    this.playlist[id].button.querySelector('.js-playbutton').classList.add('hidden')
                    this.playlist[id].button.querySelector('.js-pausebutton').classList.remove('hidden')
                    let event = new Event("hr:global:stopOtherAVs");
                    event.id = id;
                    window.dispatchEvent(event);
                }
            },

            stopAllOtherPlayers(id){  //id=2
                // let players = document.querySelectorAll('audio.hidden')


                // if(this.playerCount > 1){
                //     for (let i=0; i<players.length; i++){
                //         if ( players[i].dataset.id != id){                            
                //             this.stopAudio(players[i].dataset.id)
                            
                //             // this.playlist[players[i].dataset.id].init=false;
                //             // this.playlist[players[i].dataset.id].audioElement.pause()
                //             // this.playlist[players[i].dataset.id].button.querySelector('.js-playbutton').classList.remove('hidden')
                //             // this.playlist[players[i].dataset.id].button.querySelector('.js-pausebutton').classList.add('hidden')
                //             this.playlist[players[i].dataset.id].range.parentNode.classList.add('max-h-0')
                //             this.playlist[players[i].dataset.id].range.parentNode.classList.remove('max-h-9')
                //         }
                //     }
                // }  
                

                for (const index in this.playlist) {
                    if(index != id){
                        console.log("STOP: ", index)
                        this.stopAudio(index)
                        this.playlist[index].range.parentNode.classList.add('max-h-0')
                        this.playlist[index].range.parentNode.classList.remove('max-h-9')
                    }
                }

            },
            stopAllPlayersBecauseOfGlobalStop(event){
                this.stopAllOtherPlayers(event.id);
            },
            startAudio(id) {
                console.log('start audio '+ id )
                if(this.playlist[id].init == false){
                    this.initAudioEventListener(id)  
                    this.playlist[id].init = true;
                    
                }
                this.playlist[id].audioElement.play()
                this.playlist[id].currentlyPlaying = true;         
            },

            stopAudio(id) {      
                this.playlist[id].audioElement.pause()
                this.playlist[id].init = false; 
                this.playlist[id].currentlyPlaying = false;  
                this.playlist[id].button.querySelector('.js-playbutton').classList.remove('hidden')
                this.playlist[id].button.querySelector('.js-pausebutton').classList.add('hidden')          
            },

            initAudioEventListener(id) {               
                let _audioElement = this.playlist[id].audioElement
                let _range = this.playlist[id].range
                let _timeDisplay = this.playlist[id].timeDisplay
                _audioElement.ontimeupdate = (event) => {
                    this.updateCurrentTime(_range, _timeDisplay, _audioElement.currentTime, id) 
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

                if (measure){
                    hrs > 0 ? ret += " Std." : ret += " Min." 
                }
                return ret;
            } 
        }
    }