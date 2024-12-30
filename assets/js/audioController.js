// assets/js/audioController.js

export class AudioController {
    constructor(audioSrc, onTimeUpdate, onEnded, onPlay, onPause) {
        this.audio = new Audio(audioSrc);
        this.audio.preload = 'auto';
        this.audio.addEventListener('timeupdate', () => {
            onTimeUpdate(this.audio.currentTime, this.audio.duration);
        });
        this.audio.addEventListener('ended', onEnded);
        this.audio.addEventListener('play', onPlay);
        this.audio.addEventListener('pause', onPause);
    }

    togglePlay() {
        if (this.audio.paused) {
            this.audio.play();
        } else {
            this.audio.pause();
        }
    }

    getDuration() {
        return this.audio.duration;
    }

    getCurrentTime() {
        return this.audio.currentTime;
    }

    seek(time) {
        this.audio.currentTime = time;
    }
}
