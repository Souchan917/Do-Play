/**
 * initPuzzle 関数
 * @param {HTMLAudioElement} audio - オーディオ要素
 * @param {HTMLElement} movablePart - 動かす部分の要素
 * @param {Array} puzzles - パズルデータの配列
 * @param {number} currentPuzzleIndex - 現在のパズルのインデックス
 * @param {PuzzleManager} puzzleManager - パズルマネージャーのインスタンス
 */
export function initPuzzle(audio, movablePart, puzzles, currentPuzzleIndex, puzzleManager) {
    console.log('puzzle3.js: initPuzzle called');

    if (!movablePart) {
        console.error('puzzle3.js: initPuzzle: movablePart element is null or undefined');
        return;
    }

    try {
        // p5.jsのスケッチを定義
        const sketch = (p) => {
            let phase = 0; // 新月から満月までのフェーズ（0から1まで）
            const duration = 5000; // アニメーションの総時間（ミリ秒）
            let startTime;

            p.setup = () => {
                try {
                    // movablePart のサイズに合わせてキャンバスを作成
                    const width = movablePart.clientWidth;
                    const height = movablePart.clientHeight;
                    p.createCanvas(width, height).parent(movablePart);
                    console.log('puzzle3.js: p5.js canvas created with width:', width, 'height:', height);

                    // 背景を透明に設定
                    p.clear();

                    // アニメーション開始時間を記録
                    startTime = p.millis();
                    console.log('puzzle3.js: p5.js setup completed at time:', startTime);
                } catch (error) {
                    console.error('puzzle3.js: p5.js setup: Failed to initialize canvas', error);
                }
            };

            p.draw = () => {
                try {
                    p.clear();

                    const elapsed = p.millis() - startTime;
                    phase = p.min(elapsed / duration, 1); // 0から1までのフェーズ

                    // 月の描画
                    drawMoon(p, phase);

                    if (phase >= 1) {
                        // アニメーションが完了したらパズルを解決
                        console.log('puzzle3.js: p5.js animation completed');
                        puzzleManager.addSolvedTime(currentPuzzleIndex, audio.currentTime);
                        p.noLoop(); // 描画を停止
                    }
                } catch (error) {
                    console.error('puzzle3.js: p5.js draw: Failed during drawing', error);
                }
            };

            /**
             * 月のフェーズを描画する関数
             * @param {p5} p - p5.jsのインスタンス
             * @param {number} phase - フェーズ（0: 新月, 1: 満月）
             */
            function drawMoon(p, phase) {
                try {
                    const centerX = p.width / 2;
                    const centerY = p.height / 2;
                    const radius = p.min(p.width, p.height) / 2 - 10;

                    // 新月から満月への変化
                    const moonFill = p.lerpColor(p.color(0), p.color(255), phase);

                    // 月の基本形状
                    p.noStroke();
                    p.fill(moonFill);
                    p.ellipse(centerX, centerY, radius * 2, radius * 2);

                    // 月のフェーズを示す影
                    p.fill(p.color(0, 0, 0, 150)); // 半透明の黒
                    const phaseShift = p.map(phase, 0, 1, -radius, radius);
                    p.ellipse(centerX + phaseShift, centerY, radius * 2, radius * 2);

                    console.log(`puzzle3.js: drawMoon: phase=${phase}, centerX=${centerX}, centerY=${centerY}, radius=${radius}, phaseShift=${phaseShift}`);
                } catch (error) {
                    console.error('puzzle3.js: drawMoon: Failed to draw moon', error);
                }
            }
        };

        // p5.jsのインスタンスを作成
        new p5(sketch);
        console.log('puzzle3.js: p5.js sketch initialized');
    } catch (error) {
        console.error('puzzle3.js: initPuzzle: Failed to initialize puzzle3', error);
    }
}
