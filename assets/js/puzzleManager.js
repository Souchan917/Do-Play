// assets/js/puzzleManager.js

export class PuzzleManager {
    constructor(puzzles, uiController, audioController, initialProgress) {
        this.puzzles = puzzles;
        this.ui = uiController;
        this.audio = audioController;
        this.currentPuzzleIndex = initialProgress.currentPuzzleIndex || 0;
        this.solvedPuzzles = initialProgress.solvedPuzzles || [];
        this.currentProgress = Math.max(...this.solvedPuzzles, this.currentPuzzleIndex) + 1;
        this.currentMovableScript = null;
        this.onProgressUpdate = null; // コールバック関数
    }

    loadPuzzle(index, direction = 'none') {
        const puzzle = this.puzzles[index];
        if (!puzzle) return;
    
        // ここから追加する新しいコード
        if (this.ui.movablePart) {
            if (puzzle.id === 3) {  // パズル3の場合
                this.ui.movablePart.style.display = 'block';
                this.ui.movablePart.style.position = 'absolute';
                this.ui.movablePart.style.width = '100%';
                this.ui.movablePart.style.height = '100%';
                this.ui.movablePart.style.top = '0';
                this.ui.movablePart.style.left = '0';
                this.ui.movablePart.style.zIndex = '2';
            } else {
                this.ui.movablePart.style.display = 'none';  // パズル3以外は非表示
            }
        }
        // ここまでが新しく追加するコード
    
        // テーマカラーの適用
        this.ui.updateBackgroundColor(puzzle.themeColor);
    
        // 以下は既存のコード
        this.ui.updateTrackInfo(puzzle.title, puzzle.subtitle);
        this.ui.displayAnswer(puzzle.answer);
        this.ui.updateImages(puzzle.baseImage);
        this.ui.updateOverlay("0");
        this.renderMarkers();
        this.loadMovableScript(puzzle);
    }

    /**
     * 解決済みのパズルに対応するマーカーをすべて追加
     */
    renderMarkers() {
        this.ui.clearMarkers();

        this.solvedPuzzles.forEach(puzzleId => {
            const puzzle = this.puzzles.find(p => p.id === puzzleId);
            if (puzzle) {
                this.ui.addMarker(puzzle.markerPositionPercent, puzzle.markerColor);
            }
        });
    }

    loadMovableScript(puzzle) {
        console.log('Loading script for puzzle:', puzzle.id);
        if (!puzzle.movableScript) {
            console.log('No movable script defined for this puzzle');
            return;
        }
    
        if (this.currentMovableScript) {
            console.log('Removing previous script');
            this.currentMovableScript.remove();
            this.currentMovableScript = null;
        }
    
        const script = document.createElement('script');
        script.src = puzzle.movableScript;
        script.type = 'module';
        script.defer = true;
    
        script.onload = () => {
            console.log('Script loaded successfully:', puzzle.movableScript);
            if (typeof initPuzzle === 'function') {
                console.log('initPuzzle function found, executing...');
                initPuzzle(this.audio.audio, this.ui.movablePart, this.puzzles, this.currentPuzzleIndex, this);
            } else {
                console.warn('initPuzzle function not found');
            }
        };
    
        script.onerror = (error) => {
            console.error('Failed to load script:', puzzle.movableScript, error);
        };
    
        document.body.appendChild(script);
        this.currentMovableScript = script;
    }

    /**
     * パズルが解決された際に呼び出すメソッド
     * @param {number} index - パズルのインデックス
     * @param {number} time - 解決時のオーディオ時間
     */
    addSolvedTime(index, time) {
        const puzzle = this.puzzles[index];
        if (puzzle && !this.solvedPuzzles.includes(puzzle.id)) {
            this.solvedPuzzles.push(puzzle.id);
            this.currentProgress = Math.max(this.currentProgress, index + 1);

            // マーカーを追加
            this.ui.addMarker(puzzle.markerPositionPercent, puzzle.markerColor);

            // 進捗更新コールバックの呼び出し
            if (this.onProgressUpdate) {
                this.onProgressUpdate(this.currentPuzzleIndex, this.solvedPuzzles);
            }
        }
    }

    nextPuzzle() {
        if (this.currentPuzzleIndex < this.puzzles.length - 1) {
            const nextIndex = this.currentPuzzleIndex + 1;
            if (nextIndex < this.currentProgress) {
                this.currentPuzzleIndex = nextIndex;
                this.loadPuzzle(this.currentPuzzleIndex, 'left');
            } else {
                const currentPuz = this.puzzles[this.currentPuzzleIndex];
                const allowedRanges = currentPuz.allowedNextTimeRanges;
                const currentSeconds = this.audio.getCurrentTime();

                const canProceed = !this.audio.audio.paused && allowedRanges.some(range => currentSeconds >= range.start && currentSeconds <= range.end);

                if (canProceed && !this.solvedPuzzles.includes(currentPuz.id)) {
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
