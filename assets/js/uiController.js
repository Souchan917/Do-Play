// assets/js/uiController.js

import { formatTime, triggerShake, adjustColor } from './utils.js'; // adjustColorを追加

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

    addMarker(time, color, duration) {
        if (!duration) return;
        const progressPercent = (time / duration) * 100;
        const marker = document.createElement('div');
        marker.classList.add('marker');
        marker.style.left = `${progressPercent}%`;
        
        // 色を調整して視認性を確保
        const adjustedColor = adjustColor(color, 0.8); // 明度を調整
        const adjustedBorderColor = adjustColor(color, 0.2); // 明度を調整
        marker.style.background = adjustedColor;
        marker.style.border = `1px solid ${adjustedBorderColor}`;
        
        this.progressBg.appendChild(marker);
    }

    clearMarkers() {
        const existingMarkers = this.progressBg.querySelectorAll('.marker');
        existingMarkers.forEach(marker => marker.remove());
    }

    triggerShakeAnimation(button) {
        triggerShake(button);
    }
}
