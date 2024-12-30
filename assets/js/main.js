// assets/js/main.js

console.log('main.js loaded');

import { puzzles } from './data.js';
import { AudioController } from './audioController.js';
import { UIController } from './uiController.js';
import { PuzzleManager } from './puzzleManager.js';

console.log('Imported puzzles:', puzzles);


// DOM要素の取得
const domElements = {
    playBtn: document.getElementById('playBtn'),
    playIcon: document.getElementById('playIcon'),
    progressFill: document.getElementById('progressFill'),
    progressHandle: document.getElementById('progressHandle'),
    currentTimeEl: document.getElementById('currentTime'),
    totalTimeEl: document.getElementById('totalTime'),
    currentImage: document.getElementById('currentImage'),
    nextImage: document.getElementById('nextImage'),
    puzzleOverlay: document.getElementById('puzzleOverlay'),
    trackTitle: document.getElementById('trackTitle'),
    trackArtist: document.getElementById('trackArtist'),
    playerContainer: document.getElementById('playerContainer'),
    progressBg: document.getElementById('progressBg'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    answerText: document.getElementById('answerText'),
    movablePart: document.getElementById('movablePart')
};

// UIコントローラーの初期化
const uiController = new UIController(domElements);

// オーディオコントローラーの初期化
const audioController = new AudioController(
    'assets/audio/Unlimited Power.mp3',
    (currentTime, duration) => {
        uiController.updateProgressBar(currentTime, duration);
        if (puzzleManager) {
            const currentPuzzle = puzzles[puzzleManager.currentPuzzleIndex];
            if (currentPuzzle && currentPuzzle.revealTime && currentTime >= currentPuzzle.revealTime) {
                uiController.updateOverlay("1");
            } else {
                uiController.updateOverlay("0");
            }
        }
    },
    () => {
        // オーディオ再生終了時の処理
        uiController.updatePlayButton(false);
        // プログレスをリセットする場合はここで行う
    },
    () => {
        uiController.updatePlayButton(true);
    },
    () => {
        uiController.updatePlayButton(false);
    }
);

// パズルマネージャーの初期化
const puzzleManager = new PuzzleManager(puzzles, uiController, audioController);
puzzleManager.loadPuzzle(0);

// 再生ボタンのクリックイベント
uiController.playBtn.addEventListener('click', () => {
    audioController.togglePlay();
});

// プログレスバーのシーク機能
function seek(e) {
    const rect = domElements.progressBg.getBoundingClientRect();
    let x;
    if (e.type.startsWith('touch')) {
        x = e.touches[0].clientX - rect.left;
    } else {
        x = e.clientX - rect.left;
    }
    x = Math.max(0, Math.min(x, rect.width));
    const percent = x / rect.width;
    const seekTime = percent * audioController.getDuration();
    audioController.seek(seekTime);
}

let isDragging = false;

domElements.progressBg.addEventListener('mousedown', (e) => {
    seek(e);
    isDragging = true;
    domElements.progressBg.classList.add('dragging');
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        seek(e);
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        domElements.progressBg.classList.remove('dragging');
    }
});

domElements.progressBg.addEventListener('touchstart', (e) => {
    seek(e);
    isDragging = true;
    domElements.progressBg.classList.add('dragging');
});

domElements.progressBg.addEventListener('touchmove', (e) => {
    if (isDragging) {
        seek(e);
    }
});

domElements.progressBg.addEventListener('touchend', () => {
    if (isDragging) {
        isDragging = false;
        domElements.progressBg.classList.remove('dragging');
    }
});

// 次へボタンのクリックイベント
domElements.nextBtn.addEventListener('click', () => {
    puzzleManager.nextPuzzle();
});

// 前へボタンのクリックイベント
domElements.prevBtn.addEventListener('click', () => {
    puzzleManager.prevPuzzle();
});

// スワイプ機能
let touchStartX = 0;
let touchEndX = 0;

domElements.currentImage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
});

domElements.currentImage.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleGesture();
});

function handleGesture() {
    const diffX = touchEndX - touchStartX;
    const threshold = 50; // スワイプを検知する閾値

    if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
            // 右スワイプ
            puzzleManager.prevPuzzle();
        } else {
            // 左スワイプ
            puzzleManager.nextPuzzle();
        }
    }
}
