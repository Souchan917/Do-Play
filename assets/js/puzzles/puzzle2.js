// assets/js/puzzles/puzzle2.js

export function initPuzzle(audio, movablePart, puzzles, currentPuzzleIndex, puzzleManager) {
    console.log('puzzle2.js: initPuzzle called');

    if (!movablePart) {
        console.error('puzzle2.js: initPuzzle: movablePart element is null or undefined');
        return;
    }

    try {
        // パズル2のロジックをここに実装
        // 例: 特定のタイミングでボタンを表示し、クリックで解決

        const puzzleButton = document.createElement('button');
        puzzleButton.textContent = 'パズル2を解く';
        puzzleButton.style.position = 'absolute';
        puzzleButton.style.top = '70%';
        puzzleButton.style.left = '50%';
        puzzleButton.style.transform = 'translate(-50%, -50%)';
        puzzleButton.style.padding = '10px 20px';
        puzzleButton.style.fontSize = '18px';
        movablePart.appendChild(puzzleButton);

        // ボタンのクリックイベントでパズルを解決
        puzzleButton.addEventListener('click', () => {
            puzzleManager.addSolvedTime(currentPuzzleIndex, audio.currentTime);
            console.log('puzzle2.js: Puzzle2 solved');
        });

    } catch (error) {
        console.error('puzzle2.js: initPuzzle: Failed to initialize puzzle2', error);
    }
}
