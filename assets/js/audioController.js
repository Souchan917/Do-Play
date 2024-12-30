// assets/js/audioController.js

import { formatTime } from './utils.js';

export class AudioController {
    constructor(audioSrc, onTimeUpdate, onEnded, onPlay, onPause) {
        this.audio = new Audio(audioSrc);
        this.audio.loop = false;

        this.audio.addEventListener('loadedmetadata', () => {
            if (onTimeUpdate) onTimeUpdate(this.audio.duration);
        });

        this.audio.addEventListener('timeupdate', () => {
            if (onTimeUpdate) onTimeUpdate(this.audio.currentTime, this.audio.duration);
        });

        this.audio.addEventListener('ended', () => {
            if (onEnded) onEnded();
        });

        this.audio.addEventListener('play', () => {
            if (onPlay) onPlay();
        });

        this.audio.addEventListener('pause', () => {
            if (onPause) onPause();
        });
    }

    play() {
        return this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    togglePlay() {
        if (this.audio.paused) {
            this.play().catch(error => {
                console.error('再生に失敗しました:', error);
            });
        } else {
            this.pause();
        }
    }

    seek(time) {
        this.audio.currentTime = time;
    }

    getCurrentTime() {
        return this.audio.currentTime;
    }

    getDuration() {
        return this.audio.duration;
    }
}
