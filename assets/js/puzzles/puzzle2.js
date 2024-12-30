/**
 * initPuzzle 関数
 * @param {HTMLAudioElement} audio - オーディオ要素
 * @param {HTMLElement} movablePart - 動かす部分の要素
 * @param {Array} puzzles - パズルデータの配列
 * @param {number} currentPuzzleIndex - 現在のパズルのインデックス
 * @param {PuzzleManager} puzzleManager - パズルマネージャーのインスタンス
 */
export function initPuzzle(audio, movablePart, puzzles, currentPuzzleIndex, puzzleManager) {
    console.log('puzzle2.js: initPuzzle called');

    if (!movablePart) {
        console.error('puzzle2.js: initPuzzle: movablePart element is null or undefined');
        return;
    }

    try {
        // ここにパズル2のロジックを実装
        // 例として簡単なp5.jsスケッチを作成
        const sketch = (p) => {
            p.setup = () => {
                try {
                    const width = movablePart.clientWidth;
                    const height = movablePart.clientHeight;
                    p.createCanvas(width, height).parent(movablePart);
                    p.background(100);
                    console.log('puzzle2.js: p5.js canvas created with width:', width, 'height:', height);
                } catch (error) {
                    console.error('puzzle2.js: p5.js setup: Failed to initialize canvas', error);
                }
            };

            p.draw = () => {
                try {
                    // パズル2の描画ロジック
                    // 例: 円が拡大縮小するアニメーション
                    p.background(100);
                    p.fill(0, 255, 0);
                    p.ellipse(p.width / 2, p.height / 2, p.sin(p.frameCount * 0.05) * 100 + 100, p.sin(p.frameCount * 0.05) * 100 + 100);

                    if (p.frameCount > 300) { // 5秒後にパズルを解決
                        console.log('puzzle2.js: p5.js animation completed');
                        puzzleManager.addSolvedTime(currentPuzzleIndex, audio.currentTime);
                        p.noLoop();
                    }
                } catch (error) {
                    console.error('puzzle2.js: p5.js draw: Failed during drawing', error);
                }
            };
        };

        new p5(sketch);
        console.log('puzzle2.js: p5.js sketch initialized');
    } catch (error) {
        console.error('puzzle2.js: initPuzzle: Failed to initialize puzzle2', error);
    }
}
