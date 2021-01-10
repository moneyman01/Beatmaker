class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector('.play');
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.selects = document.querySelectorAll('select');
        this.muteBtn = document.querySelectorAll('.mute');
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.tempoSlider = document.querySelector('.tempo-slider');
    }
    activePad() {
        this.classList.toggle('active');
    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        activeBars.forEach(bar => {
            bar.style.animation = 'playTrack 0.3s alternate ease-in-out 2';
            if(bar.classList.contains('active')){
                if (bar.classList.contains("kick-pad")){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains("snare-pad")){
                    this.snareAudio.play();
                    this.snareAudio.currentTime = 0;
                }
                if (bar.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        })
        this.index++;
    }
    start (){
        const interval = (60/this.bpm) * 1000;
        if(!this.isPlaying){
        this.isPlaying = setInterval(()=>{
            this.repeat();
        },interval);
        }else{
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }
    changeBtn(){
        if(!this.isPlaying){
            this.playBtn.innerHTML = 'stop';
            this.playBtn.classList.add('active');
        }else{
            this.playBtn.innerHTML = 'play';
            this.playBtn.classList.remove('active');
        }
    }
    changeOption(e){
        const bitValue = e.target.value;
        const bitName = e.target.name;
        switch(bitName){
            case "kick-select":
                this.kickAudio.src = bitValue;
                break;
            case "snare-select":
                this.snareAudio.src = bitValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = bitValue;
                break;
        }
    }
    mute(e){
        const muteOption = e.target.getAttribute("data-track");
        e.target.classList.toggle('active');
        if(e.target.classList.contains('active')){
            switch(muteOption){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;                    
            }
        }else{
            switch(muteOption){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;                    
            }
        }
    }
    changeTempo(e){
        console.log(e);
        const tempoText = document.querySelector('.tempo-nr');
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value;
    }
    updateTempo(){
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        if(this.playBtn.classList.contains('active')){
            this.start();
        }
    }
}

const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function(){
        this.style.animation = '';
    });
});
drumKit.playBtn.addEventListener('click', () => {
    drumKit.changeBtn();
    drumKit.start(); 
});
drumKit.selects.forEach((select) => {
    select.addEventListener('change', (e) => {
        drumKit.changeOption(e);
    })
})

drumKit.muteBtn.forEach((btn) =>{
    btn.addEventListener('click' ,(e) =>{
        drumKit.mute(e);
    });
});

drumKit.tempoSlider.addEventListener('input', (e) =>{
    drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener('change', (e) =>{
    drumKit.updateTempo(e);
});