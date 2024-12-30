export class AudioController {
    constructor(audioSrc, onTimeUpdate, onEnded, onPlay, onPause) {
        this.audio = new Audio(audioSrc);
        this.audio.preload = 'auto';
        this.audio.crossOrigin = 'anonymous'; // 必要に応じて設定

        this.onTimeUpdate = onTimeUpdate;
        this.onEnded = onEnded;
        this.onPlay = onPlay;
        this.onPause = onPause;

        this.audio.addEventListener('timeupdate', () => {
            if (this.onTimeUpdate) {
                this.onTimeUpdate(this.audio.currentTime, this.audio.duration);
                console.log(`AudioController: timeupdate event triggered at ${this.audio.currentTime} seconds`);
            }
        });

        this.audio.addEventListener('ended', () => {
            if (this.onEnded) {
                this.onEnded();
                console.log('AudioController: Audio ended');
            }
        });

        this.audio.addEventListener('play', () => {
            if (this.onPlay) {
                this.onPlay();
                console.log('AudioController: Audio playing');
            }
        });

        this.audio.addEventListener('pause', () => {
            if (this.onPause) {
                this.onPause();
                console.log('AudioController: Audio paused');
            }
        });

        // エラーハンドリング
        this.audio.addEventListener('error', (e) => {
            console.error('AudioController: Failed to load audio', e);
        });
    }

    togglePlay() {
        try {
            if (this.audio.paused) {
                this.audio.play().then(() => {
                    console.log('AudioController: Audio playback started');
                }).catch(error => {
                    console.error('AudioController: Failed to play audio', error);
                });
            } else {
                this.audio.pause();
                console.log('AudioController: Audio playback paused');
            }
        } catch (error) {
            console.error('AudioController: togglePlay failed', error);
        }
    }

    seek(time) {
        try {
            if (typeof time === 'number' && time >= 0 && time <= this.audio.duration) {
                this.audio.currentTime = time;
                console.log(`AudioController: Audio seeked to ${time} seconds`);
            } else {
                console.warn(`AudioController: Invalid seek time ${time}`);
            }
        } catch (error) {
            console.error('AudioController: Failed to seek audio', error);
        }
    }

    getDuration() {
        try {
            const duration = this.audio.duration || 0;
            console.log(`AudioController: Audio duration is ${duration} seconds`);
            return duration;
        } catch (error) {
            console.error('AudioController: Failed to get duration', error);
            return 0;
        }
    }

    getCurrentTime() {
        try {
            const currentTime = this.audio.currentTime || 0;
            console.log(`AudioController: Current audio time is ${currentTime} seconds`);
            return currentTime;
        } catch (error) {
            console.error('AudioController: Failed to get current time', error);
            return 0;
        }
    }
}
