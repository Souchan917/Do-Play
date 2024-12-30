/**
 * initPuzzle 関数
 * @param {HTMLAudioElement} audio - オーディオ要素
 * @param {HTMLElement} movablePart - 動かす部分の要素
 * @param {Array} puzzles - パズルデータの配列
 * @param {number} currentPuzzleIndex - 現在のパズルのインデックス
 * @param {PuzzleManager} puzzleManager - パズルマネージャーのインスタンス
 */
export function initPuzzle(audio, movablePart, puzzles, currentPuzzleIndex, puzzleManager) {
    console.log('puzzle4.js: initPuzzle called');

    if (!movablePart) {
        console.error('puzzle4.js: initPuzzle: movablePart element is null or undefined');
        return;
    }

    try {
        // カウントアップタイマーを表示するための要素を作成
        const timerDisplay = document.createElement('div');
        timerDisplay.style.fontSize = '48px';
        timerDisplay.style.color = '#FFFFFF'; // 白色
        timerDisplay.style.textAlign = 'center';
        timerDisplay.textContent = '1';
        movablePart.appendChild(timerDisplay);
        console.log('puzzle4.js: Timer display element created');

        let count = 1;
        const interval = setInterval(() => {
            try {
                count += 1;
                timerDisplay.textContent = count;
                console.log(`puzzle4.js: Timer updated to ${count}`);

                // 10秒後にパズルを解決
                if (count > 10) {
                    clearInterval(interval);
                    console.log('puzzle4.js: Timer completed, solving puzzle');
                    puzzleManager.addSolvedTime(currentPuzzleIndex, audio.currentTime);
                }
            } catch (error) {
                console.error('puzzle4.js: Interval callback error:', error);
            }
        }, 1000); // 1秒ごとにカウントアップ

    } catch (error) {
        console.error('puzzle4.js: initPuzzle: Failed to initialize puzzle4', error);
    }
}
