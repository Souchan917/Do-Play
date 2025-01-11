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
        movablePart.style.position = 'relative';
        movablePart.style.overflow = 'hidden'; // 画面外に出ないようにする

        // 動くワイヤーフレーム模様を作成
        let count = 0;
        const lineCount = 10;  // 線の数
        const lines = [];

        // 線を作成
        for (let i = 0; i < lineCount; i++) {
            const line = document.createElement('div');
            line.style.position = 'absolute';
            line.style.width = '2px';
            line.style.height = '100%';
            line.style.backgroundColor = 'white';
            line.style.left = `${(i * 100) / lineCount}%`; // 各線の配置
            line.style.zIndex = '1'; // 他の要素より前に表示
            line.style.animation = `moveLine 3s ease-in-out infinite`;
            movablePart.appendChild(line);
            lines.push(line);
        }

        // CSSアニメーションの定義
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes moveLine {
                0% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(50px); /* 上下に動く範囲を指定 */
                }
                100% {
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        console.log('puzzle1.js: Lines created and animated');

        // タイマー表示
        const timerDisplay = document.createElement('div');
        timerDisplay.style.fontSize = '48px';
        timerDisplay.style.color = '#00FF00'; // 緑色
        timerDisplay.style.textAlign = 'center';
        timerDisplay.textContent = '1';
        movablePart.appendChild(timerDisplay);
        console.log('puzzle1.js: Timer display element created');

        let countInterval = setInterval(() => {
            try {
                count += 1;
                timerDisplay.textContent = count;
                console.log(`puzzle1.js: Timer updated to ${count}`);

                // 10秒後にパズルを解決
                if (count > 10) {
                    clearInterval(countInterval);
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
