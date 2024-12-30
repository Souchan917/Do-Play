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

        console.log(`PuzzleManager initialized with currentPuzzleIndex=${this.currentPuzzleIndex} and solvedPuzzles=${this.solvedPuzzles}`);
    }

    async loadPuzzle(index, direction = 'none') {
        const puzzle = this.puzzles[index];
        if (!puzzle) {
            console.error(`PuzzleManager: loadPuzzle: Puzzle at index ${index} not found`);
            return;
        }

        console.log(`PuzzleManager: Loading puzzle ${puzzle.id}: ${puzzle.title}`);

        // Movable partの表示・非表示を制御
        if (this.ui.movablePart) {
            if (puzzle.id === 3) {  // パズル3の場合
                this.ui.movablePart.style.display = 'block';
                this.ui.movablePart.style.position = 'absolute';
                this.ui.movablePart.style.width = '100%';
                this.ui.movablePart.style.height = '100%';
                this.ui.movablePart.style.top = '0';
                this.ui.movablePart.style.left = '0';
                this.ui.movablePart.style.zIndex = '2';
                console.log('PuzzleManager: Movable part displayed for puzzle 3');
            } else {
                this.ui.movablePart.style.display = 'none';  // パズル3以外は非表示
                console.log('PuzzleManager: Movable part hidden for non-puzzle 3');
            }
        } else {
            console.error('PuzzleManager: loadPuzzle: movablePart element not found');
        }

        // テーマカラーの適用
        this.ui.updateBackgroundColor(puzzle.themeColor);

        // トラック情報と答えの更新
        this.ui.updateTrackInfo(puzzle.title, puzzle.subtitle);
        this.ui.displayAnswer(puzzle.answer);
        this.ui.updateImages(puzzle.baseImage);
        this.ui.updateOverlay("0");

        // マーカーの更新: 現在のパズルのマーカーのみ表示
        this.ui.clearMarkers();
        this.ui.addMarker(puzzle.markerPositionPercent, puzzle.markerColor);

        console.log(`PuzzleManager: Marker for puzzle ${puzzle.id} added at ${puzzle.markerPositionPercent}%`);

        // 動的スクリプトのロード
        await this.loadMovableScript(puzzle);
    }

    /**
     * パズルに対応する動的スクリプトをロードし、初期化する
     * @param {Object} puzzle - パズルオブジェクト
     */
    async loadMovableScript(puzzle) {
        console.log(`PuzzleManager: Loading movable script for puzzle ${puzzle.id}`);
        if (!puzzle.movableScript) {
            console.log(`PuzzleManager: No movable script defined for puzzle ${puzzle.id}`);
            return;
        }

        // 既存のスクリプトをクリア
        if (this.currentMovableScript) {
            console.log('PuzzleManager: Resetting movable part for new script');
            this.ui.movablePart.innerHTML = '';
            this.currentMovableScript = null;
        }

        try {
            // 動的インポート: パズルスクリプトが "puzzles/puzzle3.js" の場合 "./puzzles/puzzle3.js"
            const scriptPath = `./${puzzle.movableScript}`;
            console.log(`PuzzleManager: Attempting to import script from ${scriptPath}`);
            const module = await import(scriptPath);

            if (typeof module.initPuzzle === 'function') {
                console.log(`PuzzleManager: initPuzzle function found in ${scriptPath}, executing...`);
                module.initPuzzle(this.audio.audio, this.ui.movablePart, this.puzzles, this.currentPuzzleIndex, this);
                this.currentMovableScript = module;
                console.log(`PuzzleManager: Movable script for puzzle ${puzzle.id} loaded and initialized`);
            } else {
                console.warn(`PuzzleManager: initPuzzle function not found in module: ${scriptPath}`);
            }
        } catch (error) {
            console.error(`PuzzleManager: Failed to load script: ${puzzle.movableScript}`, error);
        }
    }

    /**
     * パズルが解決された際に呼び出すメソッド
     * @param {number} index - パズルのインデックス
     * @param {number} time - 解決時のオーディオ時間
     */
    addSolvedTime(index, time) {
        try {
            const puzzle = this.puzzles[index];
            if (puzzle && !this.solvedPuzzles.includes(puzzle.id)) {
                this.solvedPuzzles.push(puzzle.id);
                this.currentProgress = Math.max(this.currentProgress, index + 1);

                // マーカーを追加
                this.ui.addMarker(puzzle.markerPositionPercent, puzzle.markerColor);
                console.log(`PuzzleManager: Puzzle ${puzzle.id} solved at time ${time} seconds`);

                // 進捗更新コールバックの呼び出し
                if (this.onProgressUpdate) {
                    this.onProgressUpdate(this.currentPuzzleIndex, this.solvedPuzzles);
                    console.log('PuzzleManager: Progress update callback invoked');
                }
            } else {
                console.warn(`PuzzleManager: addSolvedTime: Puzzle at index ${index} not found or already solved`);
            }
        } catch (error) {
            console.error('PuzzleManager:addSolvedTime: Failed to add solved time', error);
        }
    }

    nextPuzzle() {
        try {
            if (this.currentPuzzleIndex < this.puzzles.length - 1) {
                const nextIndex = this.currentPuzzleIndex + 1;
                if (nextIndex < this.currentProgress) {
                    this.currentPuzzleIndex = nextIndex;
                    console.log(`PuzzleManager: Proceeding to next puzzle at index ${nextIndex}`);
                    this.loadPuzzle(this.currentPuzzleIndex, 'left');
                } else {
                    const currentPuz = this.puzzles[this.currentPuzzleIndex];
                    const allowedRanges = currentPuz.allowedNextTimeRanges;
                    const currentSeconds = this.audio.getCurrentTime();

                    const canProceed = !this.audio.audio.paused && allowedRanges.some(range => currentSeconds >= range.start && currentSeconds <= range.end);

                    if (canProceed && !this.solvedPuzzles.includes(currentPuz.id)) {
                        this.addSolvedTime(this.currentPuzzleIndex, currentSeconds);
                        this.currentPuzzleIndex = nextIndex;
                        console.log(`PuzzleManager: Proceeding to next puzzle at index ${nextIndex} after solving`);
                        this.loadPuzzle(this.currentPuzzleIndex, 'left');
                    } else {
                        // 振動アニメーション
                        this.ui.triggerShakeAnimation(this.ui.nextBtn);
                        console.log('PuzzleManager: Cannot proceed to next puzzle');
                    }
                }
            } else {
                // 最後のパズルの場合、振動アニメーション
                this.ui.triggerShakeAnimation(this.ui.nextBtn);
                console.log('PuzzleManager: Already at the last puzzle');
            }
        } catch (error) {
            console.error('PuzzleManager:nextPuzzle: Failed to proceed to next puzzle', error);
        }
    }

    prevPuzzle() {
        try {
            if (this.currentPuzzleIndex > 0) {
                const prevIndex = this.currentPuzzleIndex - 1;
                if (prevIndex < this.currentProgress) {
                    this.currentPuzzleIndex = prevIndex;
                    console.log(`PuzzleManager: Going back to previous puzzle at index ${prevIndex}`);
                    this.loadPuzzle(this.currentPuzzleIndex, 'right');
                } else {
                    // 振動アニメーション
                    this.ui.triggerShakeAnimation(this.ui.prevBtn);
                    console.log('PuzzleManager: Cannot go back to previous puzzle');
                }
            }
        } catch (error) {
            console.error('PuzzleManager:prevPuzzle: Failed to go back to previous puzzle', error);
        }
    }
}
