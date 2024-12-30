// assets/js/puzzleManager.js

export class PuzzleManager {
    constructor(puzzles, uiController, audioController) {
        this.puzzles = puzzles;
        this.ui = uiController;
        this.audio = audioController;
        this.currentPuzzleIndex = 0;
        this.currentProgress = 0;
        this.currentMovableScript = null;
    }

    loadPuzzle(index, direction = 'none') {
        const puzzle = this.puzzles[index];
        if (!puzzle) return;

        // テーマカラーの適用
        this.ui.updateBackgroundColor(puzzle.themeColor);

        // マーカーの色を固定色に設定（例: 白と黒）
        document.documentElement.style.setProperty('--marker-color', '#FFFFFF');
        document.documentElement.style.setProperty('--marker-border-color', '#000000');

        // トラック情報の更新
        this.ui.updateTrackInfo(puzzle.title, puzzle.subtitle);

        // 答えの表示
        this.ui.displayAnswer(puzzle.answer);

        // 画像の更新
        this.ui.updateImages(puzzle.baseImage);

        // オーバーレイの更新
        this.ui.updateOverlay("0");

        // 現在のパズルのマーカーをレンダリング
        this.renderMarkers(puzzle);

        // パズル用スクリプトのロード
        this.loadMovableScript(puzzle);
    }

    renderMarkers(currentPuzzle) {
        this.ui.clearMarkers();

        if (currentPuzzle && currentPuzzle.solvedTime !== null) {
            this.ui.addMarker(currentPuzzle.solvedTime, currentPuzzle.themeColor, this.audio.getDuration());
        }
    }

    loadMovableScript(puzzle) {
        if (!puzzle.movableScript) return;

        // 既存のスクリプトを削除
        if (this.currentMovableScript) {
            this.currentMovableScript.remove();
            this.currentMovableScript = null;
        }

        const script = document.createElement('script');
        script.src = puzzle.movableScript;
        script.type = 'module';
        script.defer = true;

        script.onload = () => {
            if (typeof initPuzzle === 'function') {
                initPuzzle(this.audio.audio, this.ui.movablePart, this.puzzles, this.currentPuzzleIndex);
            }
        };

        script.onerror = () => {
            console.error(`Failed to load script: ${puzzle.movableScript}`);
        };

        document.body.appendChild(script);
        this.currentMovableScript = script;
    }

    addSolvedTime(index, time) {
        const puzzle = this.puzzles[index];
        if (puzzle && puzzle.solvedTime === null) {
            puzzle.solvedTime = time;
            this.currentProgress = Math.max(this.currentProgress, index + 1);
            // 現在のパズルに対してのみマーカーをレンダリング
            if (this.currentPuzzleIndex === index) {
                this.renderMarkers(puzzle);
            }
        }
    }

    nextPuzzle() {
        if (this.currentPuzzleIndex < this.puzzles.length - 1) {
            const nextIndex = this.currentPuzzleIndex + 1;
            if (nextIndex <= this.currentProgress) {
                this.currentPuzzleIndex = nextIndex;
                this.loadPuzzle(this.currentPuzzleIndex, 'left');
            } else if (nextIndex === this.currentProgress + 1) {
                const currentPuz = this.puzzles[this.currentPuzzleIndex];
                const allowedRanges = currentPuz.allowedNextTimeRanges;
                const currentSeconds = this.audio.getCurrentTime();

                const canProceed = !this.audio.audio.paused && allowedRanges.some(range => currentSeconds >= range.start && currentSeconds <= range.end);

                if (canProceed && !currentPuz.solvedTime) {
                    this.addSolvedTime(this.currentPuzzleIndex, currentSeconds);
                    this.currentPuzzleIndex = nextIndex;
                    this.loadPuzzle(this.currentPuzzleIndex, 'left');
                } else {
                    // 振動アニメーション
                    this.ui.triggerShakeAnimation(this.ui.nextBtn);
                }
            }
        } else {
            // 最後のパズルの場合、振動アニメーション
            this.ui.triggerShakeAnimation(this.ui.nextBtn);
        }
    }

    prevPuzzle() {
        if (this.currentPuzzleIndex > 0) {
            const prevIndex = this.currentPuzzleIndex - 1;
            if (prevIndex < this.currentProgress) {
                this.currentPuzzleIndex = prevIndex;
                this.loadPuzzle(this.currentPuzzleIndex, 'right');
            } else {
                // 振動アニメーション
                this.ui.triggerShakeAnimation(this.ui.prevBtn);
            }
        }
    }
}
