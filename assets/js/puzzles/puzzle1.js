// assets/js/puzzle1.js

export function initPuzzle(audio, movablePart, puzzles, currentPuzzleIndex, puzzleManager) {
    console.log('puzzle1.js: initPuzzle called');

    if (!movablePart) {
        console.error('puzzle1.js: initPuzzle: movablePart element is null or undefined');
        return;
    }

    try {
        // movablePartのサイズ設定
        movablePart.style.width = '100%';
        movablePart.style.height = '100vh'; // ビューポートの高さに合わせる

        // p5.js スケッチの初期化
        const sketch = (p) => {
            let xPos = 0;
            let yPos = 0;

            p.setup = () => {
                p.createCanvas(p.windowWidth, p.windowHeight);
                p.background('#8B0000'); // 背景を濃い赤に設定
            };

            p.draw = () => {
                p.background('#8B0000'); // 背景は赤色
                p.stroke(255);  // 白い線
                p.strokeWeight(2);
                p.noFill();

                // 動く白い線を描画
                p.beginShape();
                for (let i = 0; i < p.width; i += 10) {
                    let y = p.sin(i * 0.05 + p.frameCount * 0.1) * 100 + p.height / 2;
                    p.vertex(i, y);
                }
                p.endShape();

                // 線を移動させる
                xPos += 2;
                if (xPos > p.width) {
                    xPos = 0;
                }
            };
        };

        // p5.js スケッチを movablePart に描画
        new p5(sketch, movablePart);

        console.log('puzzle1.js: p5.js canvas initialized');

        // タイマー表示（元のコード）
        const timerDisplay = document.createElement('div');
        timerDisplay.style.fontSize = '48px';
        timerDisplay.style.color = '#00FF00'; // 緑色
        timerDisplay.style.textAlign = 'center';
        timerDisplay.textContent = '1';
        movablePart.appendChild(timerDisplay);
        console.log('puzzle1.js: Timer display element created');

        let count = 1;
        const interval = setInterval(() => {
            try {
                count += 1;
                timerDisplay.textContent = count;
                console.log(`puzzle1.js: Timer updated to ${count}`);

                // 10秒後にパズルを解決
                if (count > 10) {
                    clearInterval(interval);
                    console.log('puzzle1.js: Timer completed, solving puzzle');
                    puzzleManager.addSolvedTime(currentPuzzleIndex, audio.currentTime);
                }
            } catch (error) {
                console.error('puzzle1.js: Interval callback error:', error);
            }
        }, 1000); // 1秒ごとにカウントアップ

    } catch (error) {
        console.error('puzzle1.js: initPuzzle: Failed to initialize puzzle1', error);
    }
}
