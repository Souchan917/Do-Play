// assets/js/uiController.js

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
        if (isPlaying) {
            this.playIcon.src = "assets/images/controls/pause.png";
            this.playIcon.alt = "Pause";
        } else {
            this.playIcon.src = "assets/images/controls/play.png";
            this.playIcon.alt = "Play";
        }
    }

    updateProgressBar(currentTime, duration) {
        const progressPercent = (currentTime / duration) * 100;
        this.progressFill.style.width = `${progressPercent}%`;
        this.progressHandle.style.left = `${progressPercent}%`;
        this.currentTimeEl.textContent = formatTime(currentTime);
    }

    updateTotalTime(duration) {
        this.totalTimeEl.textContent = formatTime(duration);
    }

    updateImages(currentSrc, nextSrc = '') {
        this.currentImage.src = currentSrc;
        this.nextImage.src = nextSrc;
    }

    updateOverlay(opacity) {
        this.puzzleOverlay.style.opacity = opacity;
    }

    updateTrackInfo(title, subtitle) {
        this.trackTitle.textContent = title;
        this.trackArtist.textContent = subtitle;
    }

    updateBackgroundColor(color) {
        this.playerContainer.style.backgroundColor = color;
        document.documentElement.style.setProperty('--theme-color', color);
        document.body.style.backgroundColor = color;
    }

    displayAnswer(answer) {
        this.answerText.textContent = answer;
    }

    /**
     * マーカーを追加する関数
     * @param {number} markerPercent - プログレスバー上の位置（パーセンテージ）
     * @param {string} color - マーカーの色（HEX形式）
     */
    addMarker(markerPercent, color) {
        if (markerPercent < 0 || markerPercent > 100) {
            console.warn(`無効なマーカーパーセンテージ: ${markerPercent}`);
            return;
        }

        // 同じ位置にマーカーが既に存在するか確認
        const existingMarkers = this.progressBg.querySelectorAll('.marker');
        for (let marker of existingMarkers) {
            if (parseFloat(marker.style.left) === markerPercent) {
                // 既にマーカーが存在する場合は追加しない
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
    }

    clearMarkers() {
        const existingMarkers = this.progressBg.querySelectorAll('.marker');
        existingMarkers.forEach(marker => marker.remove());
    }

    triggerShakeAnimation(button) {
        triggerShake(button);
    }

    /**
     * マーカーの色を調整する関数
     * @param {string} color - HEX形式の色コード
     * @param {number} factor - 明度調整の係数
     * @returns {string} - 調整後のHEX色コード
     */
    adjustMarkerColor(color, factor) {
        return adjustColor(color, factor);
    }
}
