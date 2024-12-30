import { formatTime, triggerShake, adjustColor } from './utils.js';

export class UIController {
    constructor(domElements) {
        this.playBtn = domElements.playBtn;
        this.playIcon = domElements.playIcon;
        this.progressFill = domElements.progressFill;
        this.progressHandle = domElements.progressHandle;
        this.currentTimeEl = domElements.currentTimeEl;
        this.totalTimeEl = domElements.totalTimeEl;
        this.currentImage = domElements.currentImage;
        this.nextImage = domElements.nextImage;
        this.puzzleOverlay = domElements.puzzleOverlay;
        this.trackTitle = domElements.trackTitle;
        this.trackArtist = domElements.trackArtist;
        this.playerContainer = domElements.playerContainer;
        this.progressBg = domElements.progressBg;
        this.prevBtn = domElements.prevBtn;
        this.nextBtn = domElements.nextBtn;
        this.answerText = domElements.answerText;
        this.movablePart = domElements.movablePart;
    }

    updatePlayButton(isPlaying) {
        try {
            if (isPlaying) {
                this.playIcon.src = "assets/images/controls/pause.png";
                this.playIcon.alt = "Pause";
                console.log('UIController: Play button updated to Pause');
            } else {
                this.playIcon.src = "assets/images/controls/play.png";
                this.playIcon.alt = "Play";
                console.log('UIController: Play button updated to Play');
            }
        } catch (error) {
            console.error('UIController:updatePlayButton: Failed to update play button', error);
        }
    }

    updateProgressBar(currentTime, duration) {
        try {
            const progressPercent = (currentTime / duration) * 100;
            this.progressFill.style.width = `${progressPercent}%`;
            this.progressHandle.style.left = `${progressPercent}%`;
            this.currentTimeEl.textContent = formatTime(currentTime);
            console.log(`UIController: Progress bar updated: ${formatTime(currentTime)} / ${formatTime(duration)}`);
        } catch (error) {
            console.error('UIController:updateProgressBar: Failed to update progress bar', error);
        }
    }

    updateTotalTime(duration) {
        try {
            this.totalTimeEl.textContent = formatTime(duration);
            console.log(`UIController: Total time updated: ${formatTime(duration)}`);
        } catch (error) {
            console.error('UIController:updateTotalTime: Failed to update total time', error);
        }
    }

    updateImages(currentSrc, nextSrc = '') {
        try {
            this.currentImage.src = currentSrc;
            this.nextImage.src = nextSrc;
            console.log(`UIController: Images updated: currentSrc=${currentSrc}, nextSrc=${nextSrc}`);
        } catch (error) {
            console.error('UIController:updateImages: Failed to update images', error);
        }
    }

    updateOverlay(opacity) {
        try {
            this.puzzleOverlay.style.opacity = opacity;
            console.log(`UIController: Overlay opacity updated to ${opacity}`);
        } catch (error) {
            console.error('UIController:updateOverlay: Failed to update overlay opacity', error);
        }
    }

    updateTrackInfo(title, subtitle) {
        try {
            this.trackTitle.textContent = title;
            this.trackArtist.textContent = subtitle;
            console.log(`UIController: Track info updated: Title=${title}, Subtitle=${subtitle}`);
        } catch (error) {
            console.error('UIController:updateTrackInfo: Failed to update track info', error);
        }
    }

    updateBackgroundColor(color) {
        try {
            this.playerContainer.style.backgroundColor = color;
            document.documentElement.style.setProperty('--theme-color', color);
            document.body.style.backgroundColor = color;
            console.log(`UIController: Background color updated to ${color}`);
        } catch (error) {
            console.error('UIController:updateBackgroundColor: Failed to update background color', error);
        }
    }

    displayAnswer(answer) {
        try {
            this.answerText.textContent = `答え: ${answer}`;
            console.log(`UIController: Answer displayed: ${answer}`);
        } catch (error) {
            console.error('UIController:displayAnswer: Failed to display answer', error);
        }
    }

    /**
     * マーカーを追加する関数
     * @param {number} markerPercent - プログレスバー上の位置（パーセンテージ）
     * @param {string} color - マーカーの色（HEX形式）
     */
    addMarker(markerPercent, color) {
        try {
            if (markerPercent < 0 || markerPercent > 100) {
                console.warn(`UIController:addMarker: 無効なマーカーパーセンテージ: ${markerPercent}`);
                return;
            }

            // 既存のマーカーをすべてクリア
            this.clearMarkers();

            // マーカーが既に存在するか確認（念のため）
            const existingMarkers = this.progressBg.querySelectorAll('.marker');
            for (let marker of existingMarkers) {
                if (parseFloat(marker.style.left) === markerPercent) {
                    console.log(`UIController:addMarker: Marker already exists at ${markerPercent}%`);
                    return;
                }
            }

            const marker = document.createElement('div');
            marker.classList.add('marker');
            marker.style.left = `${markerPercent}%`;

            // マーカーの色を設定
            marker.style.setProperty('--marker-color', color);
            marker.style.setProperty('--marker-border-color', adjustColor(color, 0.2));

            this.progressBg.appendChild(marker);
            console.log(`UIController:addMarker: Marker added at ${markerPercent}% with color ${color}`);
        } catch (error) {
            console.error('UIController:addMarker: Failed to add marker', error);
        }
    }

    clearMarkers() {
        try {
            const existingMarkers = this.progressBg.querySelectorAll('.marker');
            existingMarkers.forEach(marker => marker.remove());
            console.log('UIController: All markers cleared');
        } catch (error) {
            console.error('UIController:clearMarkers: Failed to clear markers', error);
        }
    }

    triggerShakeAnimation(button) {
        try {
            triggerShake(button);
            console.log('UIController: Shake animation triggered');
        } catch (error) {
            console.error('UIController:triggerShakeAnimation: Failed to trigger shake animation', error);
        }
    }

    /**
     * マーカーの色を調整する関数
     * @param {string} color - HEX形式の色コード
     * @param {number} factor - 明度調整の係数
     * @returns {string} - 調整後のHEX色コード
     */
    adjustMarkerColor(color, factor) {
        try {
            const adjustedColor = adjustColor(color, factor);
            console.log(`UIController: Marker color adjusted from ${color} to ${adjustedColor}`);
            return adjustedColor;
        } catch (error) {
            console.error('UIController:adjustMarkerColor: Failed to adjust marker color', error);
            return color; // 失敗した場合は元の色を返す
        }
    }
}
