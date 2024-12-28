
// assets/js/script.js

// パズルデータ配列
const puzzles = [
    {
        id: 1,
        title: "問題 01",
        subtitle: "Start",
        baseImage: "assets/images/puzzles/stage1.jpg",
        overlayImage: "assets/images/puzzles/stage1_reveal.jpg",
        revealTime: 80, // 実際の再生時間に応じて調整
        themeColor: "#8B0000", // 赤
        allowedNextTimeRanges: [{start: 1, end: 10}], // 1秒から10秒
        solvedTime: null, // 解決時の時間を記録
        answer: "答え1",
        movableScript: "assets/js/puzzles/puzzle1.js", // パズル用スクリプトのパス
        movableElementSrc: "" // 今回は使用しないため空にする
    },
    {
        id: 2,
        title: "問題 02",
        subtitle: "Deep",
        baseImage: "assets/images/puzzles/stage2.jpg",
        overlayImage: "assets/images/puzzles/stage2_reveal.jpg",
        revealTime: 80,
        themeColor: "#D2691E", // オレンジ
        allowedNextTimeRanges: [{start: 10, end: 20}],
        solvedTime: null,
        answer: "答え2",
        movableScript: "assets/js/puzzles/puzzle2.js",
        movableElementSrc: ""
    },
    {
        id: 3,
        title: "問題 03",
        subtitle: "Dive",
        baseImage: "assets/images/puzzles/stage3.jpg",
        overlayImage: "assets/images/puzzles/stage3_reveal.jpg",
        revealTime: 80,
        themeColor: "#C1AB05", // 黄色
        allowedNextTimeRanges: [{start: 20, end: 30}],
        solvedTime: null,
        answer: "答え3",
        movableScript: "assets/js/puzzles/puzzle3.js",
        movableElementSrc: ""
    },
    {
        id: 4,
        title: "問題 04",
        subtitle: "Dark",
        baseImage: "assets/images/puzzles/stage4.jpg",
        overlayImage: "assets/images/puzzles/stage4_reveal.jpg",
        revealTime: 80,
        themeColor: "#009944", // 緑
        allowedNextTimeRanges: [{start: 30, end: 40}],
        solvedTime: null,
        answer: "答え4",
        movableScript: "assets/js/puzzles/puzzle4.js",
        movableElementSrc: ""
    },
    {
        id: 5,
        title: "問題 05",
        subtitle: "Light",
        baseImage: "assets/images/puzzles/stage5.jpg",
        overlayImage: "assets/images/puzzles/stage5_reveal.jpg",
        revealTime: 80,
        themeColor: "#0068B7", // 青
        allowedNextTimeRanges: [{start: 40, end: 50}],
        solvedTime: null,
        answer: "答え5",
        movableScript: "assets/js/puzzles/puzzle5.js",
        movableElementSrc: ""
    },
    {
        id: 6,
        title: "問題 06",
        subtitle: "Rise",
        baseImage: "assets/images/puzzles/stage6.jpg",
        overlayImage: "assets/images/puzzles/stage6_reveal.jpg",
        revealTime: 80,
        themeColor: "#1D2088", // インディゴ
        allowedNextTimeRanges: [{start: 50, end: 60}],
        solvedTime: null,
        answer: "答え6",
        movableScript: "assets/js/puzzles/puzzle6.js",
        movableElementSrc: ""
    },
    {
        id: 7,
        title: "問題 07",
        subtitle: "Fall",
        baseImage: "assets/images/puzzles/stage7.jpg",
        overlayImage: "assets/images/puzzles/stage7_reveal.jpg",
        revealTime: 80,
        themeColor: "#920783", // 紫
        allowedNextTimeRanges: [{start: 60, end: 70}],
        solvedTime: null,
        answer: "答え7",
        movableScript: "assets/js/puzzles/puzzle7.js",
        movableElementSrc: ""
    },
    {
        id: 8,
        title: "問題 08",
        subtitle: "End",
        baseImage: "assets/images/puzzles/stage8.jpg",
        overlayImage: "assets/images/puzzles/stage8_reveal.jpg",
        revealTime: 80,
        themeColor: "#000000", // 黒
        allowedNextTimeRanges: [{start: 70, end: 80}],
        solvedTime: null,
        answer: "答え8",
        movableScript: "assets/js/puzzles/puzzle8.js",
        movableElementSrc: ""
    }
];

// 現在のパズルインデックス
let currentPuzzle = 0;
let currentProgress = 0; // これまでに解決した最大のパズルインデックス
let isPlaying = false;
let audio = null;
let currentMovableScript = null; // 現在ロードされているパズル用スクリプト

// DOM要素の取得
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const progressFill = document.getElementById('progressFill');
const progressHandle = document.getElementById('progressHandle');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const currentImage = document.getElementById('currentImage');
const nextImage = document.getElementById('nextImage');
const puzzleOverlay = document.getElementById('puzzleOverlay');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const playerContainer = document.getElementById('playerContainer');
const progressBg = document.getElementById('progressBg');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const answerText = document.getElementById('answerText');
const movablePart = document.getElementById('movablePart');

// スワイプ用変数
let touchStartX = 0;
let touchEndX = 0;

// DOMContentLoadedイベントで音声を初期化
window.addEventListener('DOMContentLoaded', () => {
    audio = new Audio('assets/audio/USAO_Climax.mp3');
    audio.loop = false; // ループしない

    // パズルをロード
    loadPuzzle(currentPuzzle, 'none');

    // 音声のメタデータ読み込み完了時に総時間を設定
    audio.addEventListener('loadedmetadata', () => {
        totalTimeEl.textContent = formatTime(audio.duration);
    });

    // 音声の再生位置が更新されたときにプログレスバーを更新
    audio.addEventListener('timeupdate', updateProgress);

    // 再生終了時の処理
    audio.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayButton();
        resetProgress();
    });

    // 音声再生/停止時のフラグ更新
    audio.addEventListener('play', () => {
        isPlaying = true;
        updatePlayButton();
    });

    audio.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayButton();
    });

    // 初期テーマカラーの設定
    playerContainer.style.backgroundColor = puzzles[currentPuzzle].themeColor;
    updateBackgroundColor(puzzles[currentPuzzle].themeColor);
    renderMarkers();
});

// 再生/停止の制御関数
function togglePlay() {
    if (!audio) return;

    if (isPlaying) {
        audio.pause();
    } else {
        audio.play().catch(error => {
            console.log('再生に失敗しました:', error);
        });
    }
}

// 時間をフォーマットする関数
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// プログレスバーを更新する関数
function updateProgress() {
    if (!audio.duration) return; // durationが取得できていない場合は処理を中断

    const currentSeconds = audio.currentTime;
    const duration = audio.duration;

    const progressPercent = (currentSeconds / duration) * 100;
    progressFill.style.width = `${progressPercent}%`;
    progressHandle.style.left = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentSeconds);

    // 画像の変化処理
    if (currentSeconds >= puzzles[currentPuzzle].revealTime) {
        puzzleOverlay.style.opacity = "1";
    } else {
        puzzleOverlay.style.opacity = "0";
    }

    // 各パズル用スクリプトでの動きを許可
    // movablePart.style.left = `${progressPercent}%`;
    // 各パズル用スクリプトでカスタムアニメーションを実装
}

// プログレスバーをクリックまたはタッチしたときにシークする
function seek(e) {
    const rect = progressBg.getBoundingClientRect();
    let x;
    if (e.type.startsWith('touch')) {
        x = e.touches[0].clientX - rect.left;
    } else {
        x = e.clientX - rect.left;
    }
    x = Math.max(0, Math.min(x, rect.width));
    const percent = x / rect.width;
    const seekTime = percent * audio.duration;
    audio.currentTime = seekTime;
}

// シークバーのドラッグイベント
progressBg.addEventListener('mousedown', (e) => {
    seek(e);
    isDragging = true;
    progressBg.classList.add('dragging');
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        seek(e);
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        progressBg.classList.remove('dragging');
    }
});

// タッチデバイス用のシーク
progressBg.addEventListener('touchstart', (e) => {
    seek(e);
    isDragging = true;
    progressBg.classList.add('dragging');
});

progressBg.addEventListener('touchmove', (e) => {
    if (isDragging) {
        seek(e);
    }
});

progressBg.addEventListener('touchend', () => {
    if (isDragging) {
        isDragging = false;
        progressBg.classList.remove('dragging');
    }
});

// プログレスバーのドラッグ状態
let isDragging = false;

// プレイヤーコンテナをロードする関数
function loadPuzzle(index, direction = 'none') {
    const puzzle = puzzles[index];

    // テーマカラーの適用
    playerContainer.style.backgroundColor = puzzle.themeColor;
    updateBackgroundColor(puzzle.themeColor);

    // トラック情報の更新
    trackTitle.textContent = puzzle.title;
    trackArtist.textContent = puzzle.subtitle;

    // 答えの更新
    answerText.textContent = puzzle.answer;

    // 総時間の更新
    if (audio.duration) {
        totalTimeEl.textContent = formatTime(audio.duration);
    }

    // 画像のスライドトランジション
    if (direction !== 'none') {
        if (direction === 'left') {
            // 次へ: 次の画像を右からスライドイン
            nextImage.style.transition = 'transform 0.5s ease';
            nextImage.style.transform = 'translateX(100%)';
            nextImage.src = puzzle.baseImage;
            // Trigger reflow to ensure transition
            void nextImage.offsetWidth;
            nextImage.style.transform = 'translateX(0)';
            currentImage.style.transition = 'transform 0.5s ease';
            currentImage.style.transform = 'translateX(-100%)';
        } else if (direction === 'right') {
            // 前へ: 前の画像を左からスライドイン
            nextImage.style.transition = 'transform 0.5s ease';
            nextImage.style.transform = 'translateX(-100%)';
            nextImage.src = puzzle.baseImage;
            // Trigger reflow to ensure transition
            void nextImage.offsetWidth;
            nextImage.style.transform = 'translateX(0)';
            currentImage.style.transition = 'transform 0.5s ease';
            currentImage.style.transform = 'translateX(100%)';
        }

        // トランジション終了後に現在の画像を更新
        setTimeout(() => {
            currentImage.src = puzzle.baseImage;
            currentImage.style.transition = 'none';
            currentImage.style.transform = 'translateX(0)';
            nextImage.style.transform = 'translateX(0)';
        }, 500); // トランジション時間と一致させる
    } else {
        // 初期ロード時
        currentImage.src = puzzle.baseImage;
        nextImage.src = "";
    }

    // オーバーレイ画像の更新
    puzzleOverlay.src = puzzle.overlayImage;

    // シークバーに既存のマーカーをレンダリング
    renderMarkers();

    // movablePartの初期設定
    resetMovablePart(puzzle);

    // 動的にパズル用スクリプトをロード
    loadMovableScript(puzzle);
}

// パズル用のmovablePartをリセットする関数
function resetMovablePart(puzzle) {
    // movable-part内のアニメーション用要素をリセット
    const animatedShape = document.getElementById('animatedShape');
    animatedShape.style.borderRadius = '50%'; // 初期は円形
    animatedShape.style.backgroundColor = '#FFD700'; // 初期色（ゴールド）
    animatedShape.style.transform = 'none'; // 初期変形なし

    // 現在ロードされているパズル用スクリプトを解除
    if (currentMovableScript) {
        currentMovableScript.remove();
        currentMovableScript = null;
    }
}

// パズル用スクリプトを動的にロードする関数
function loadMovableScript(puzzle) {
    if (!puzzle.movableScript) return;

    const script = document.createElement('script');
    script.src = puzzle.movableScript;
    script.defer = true;

    // スクリプトがロードされたら初期化関数を呼び出す
    script.onload = () => {
        if (typeof initPuzzle === 'function') {
            initPuzzle(audio, movablePart, puzzles, currentPuzzle);
        }
    };

    // スクリプトの読み込みエラーをハンドリング
    script.onerror = () => {
        console.error(`Failed to load script: ${puzzle.movableScript}`);
    };

    document.body.appendChild(script);
    currentMovableScript = script;
}

// パズルをリセットする関数
function resetPuzzle() {
    resetProgress();
    // 音楽の再生位置や再生状態をリセットしない
}

// 再生ボタンのクリックイベント
playBtn.addEventListener('click', () => {
    togglePlay();
});

// 再生ボタンの状態を更新する関数
function updatePlayButton() {
    if (isPlaying) {
        playIcon.src = "assets/images/controls/pause.png"; // 再生中は一時停止アイコンに変更
        playIcon.alt = "Pause";
    } else {
        playIcon.src = "assets/images/controls/play.png"; // 停止中は再生アイコンに変更
        playIcon.alt = "Play";
    }
}

// シークバーにマーカーを追加する関数
function addMarker(time, color) {
    if (!audio.duration) return;
    const progressPercent = (time / audio.duration) * 100;
    const marker = document.createElement('div');
    marker.classList.add('marker');
    marker.style.left = `${progressPercent}%`;
    marker.style.background = color; // パズルのテーマカラーを適用
    progressBg.appendChild(marker);
}

// シークバーに既存のマーカーを表示する関数
function renderMarkers() {
    // 既存のマーカーを削除
    const existingMarkers = document.querySelectorAll('.marker');
    existingMarkers.forEach(marker => marker.remove());

    // 新しいマーカーを追加
    puzzles.forEach(puzzle => {
        if (puzzle.solvedTime !== null) {
            addMarker(puzzle.solvedTime, puzzle.themeColor);
        }
    });
}

// 次へボタンのクリックイベント
nextBtn.addEventListener('click', () => {
    if (currentPuzzle < puzzles.length - 1) {
        const nextIndex = currentPuzzle + 1;
        if (nextIndex <= currentProgress) {
            // 既に解決済みのパズルに対してはタイミングに関係なく次へ移動
            currentPuzzle = nextIndex;
            loadPuzzle(currentPuzzle, 'left');
        } else if (nextIndex === currentProgress + 1) {
            const currentPuz = puzzles[currentPuzzle];
            const allowedRanges = currentPuz.allowedNextTimeRanges;
            const currentSeconds = audio.currentTime;

            // チェック: 現在の時間が許可された範囲内かつ再生中かどうか
            const canProceed = isPlaying && allowedRanges.some(range => currentSeconds >= range.start && currentSeconds <= range.end);

            if (canProceed && !currentPuz.solvedTime) {
                // パズルを解決済みにする
                currentPuz.solvedTime = currentSeconds;
                addMarker(currentPuz.solvedTime, currentPuz.themeColor);
                currentProgress = Math.max(currentProgress, nextIndex);

                // 次のパズルに移動
                currentPuzzle = nextIndex;
                loadPuzzle(currentPuzzle, 'left');
            } else if (!canProceed && !currentPuz.solvedTime) {
                // 振動アニメーションを追加
                nextBtn.classList.add('shake');
                // アニメーションが終了したらクラスを削除
                nextBtn.addEventListener('animationend', () => {
                    nextBtn.classList.remove('shake');
                }, { once: true });
            }
        }
    } else {
        // 最後のパズルの場合、振動アニメーションを追加
        nextBtn.classList.add('shake');
        nextBtn.addEventListener('animationend', () => {
            nextBtn.classList.remove('shake');
        }, { once: true });
    }
});

// 前へボタンのクリックイベント
prevBtn.addEventListener('click', () => {
    if (currentPuzzle > 0) {
        const prevIndex = currentPuzzle - 1;
        if (prevIndex < currentProgress) {
            // 既に解決済みのパズルに対してはタイミングに関係なく前へ移動
            currentPuzzle = prevIndex;
            loadPuzzle(currentPuzzle, 'right');
        } else {
            // 振動アニメーションを追加
            prevBtn.classList.add('shake');
            prevBtn.addEventListener('animationend', () => {
                prevBtn.classList.remove('shake');
            }, { once: true });
        }
    } else {
        // 1問目で戻るボタンを押しても何もしない
        // 何もしない
    }
});

// スワイプ機能
currentImage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
});

currentImage.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleGesture();
});

function handleGesture() {
    const diffX = touchEndX - touchStartX;
    const threshold = 50; // スワイプを検知する閾値

    if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
            // 右スワイプ
            if (currentPuzzle > 0) {
                const prevIndex = currentPuzzle - 1;
                if (prevIndex < currentProgress) {
                    currentPuzzle = prevIndex;
                    loadPuzzle(currentPuzzle, 'right');
                } else {
                    // 振動アニメーションを追加
                    prevBtn.classList.add('shake');
                    prevBtn.addEventListener('animationend', () => {
                        prevBtn.classList.remove('shake');
                    }, { once: true });
                }
            }
        } else {
            // 左スワイプ
            if (currentPuzzle < puzzles.length - 1) {
                const nextIndex = currentPuzzle + 1;
                if (nextIndex <= currentProgress) {
                    // 既に解決済みのパズルに対してはタイミングに関係なく次へ移動
                    currentPuzzle = nextIndex;
                    loadPuzzle(currentPuzzle, 'left');
                } else if (nextIndex === currentProgress + 1) {
                    const currentPuz = puzzles[currentPuzzle];
                    const allowedRanges = currentPuz.allowedNextTimeRanges;
                    const currentSeconds = audio.currentTime;

                    // チェック: 現在の時間が許可された範囲内かつ再生中かどうか
                    const canProceed = isPlaying && allowedRanges.some(range => currentSeconds >= range.start && currentSeconds <= range.end);

                    if (canProceed && !currentPuz.solvedTime) {
                        // パズルを解決済みにする
                        currentPuz.solvedTime = currentSeconds;
                        addMarker(currentPuz.solvedTime, currentPuz.themeColor);
                        currentProgress = Math.max(currentProgress, nextIndex);

                        // 次のパズルに移動
                        currentPuzzle = nextIndex;
                        loadPuzzle(currentPuzzle, 'left');
                    } else if (!canProceed && !currentPuz.solvedTime) {
                        // 振動アニメーションを追加
                        nextBtn.classList.add('shake');
                        nextBtn.addEventListener('animationend', () => {
                            nextBtn.classList.remove('shake');
                        }, { once: true });
                    }
                }
            } else {
                // 最後のパズルの場合、振動アニメーションを追加
                nextBtn.classList.add('shake');
                nextBtn.addEventListener('animationend', () => {
                    nextBtn.classList.remove('shake');
                }, { once: true });
            }
        }
    }
}

// プレイヤーコンテナの背景色を更新する関数
function updateBackgroundColor(color) {
    document.documentElement.style.setProperty('--theme-color', color);
    // フルスクリーン背景色も更新
    document.body.style.backgroundColor = color;
}

// シークバーをリセットする関数
function resetProgress() {
    progressFill.style.width = '0%';
    progressHandle.style.left = '0%';
    currentTimeEl.textContent = '0:00';
}

// 初期ロード時にシークバーとマーカーを設定
window.addEventListener('DOMContentLoaded', () => {
    if (audio.duration) {
        totalTimeEl.textContent = formatTime(audio.duration);
    }
    renderMarkers();
});
