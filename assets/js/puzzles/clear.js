// assets/js/puzzles/clear.js

export function initPuzzle(audio, movablePart, puzzles, currentPuzzleIndex, puzzleManager) {
    console.log('clear.js: initPuzzle called');

    if (!movablePart) {
        console.error('clear.js: initPuzzle: movablePart element is null or undefined');
        return;
    }

    try {
        // クリアメッセージの表示はUIControllerで行うため、ここでは特に処理は不要
        console.log('clear.js: Clear stage initialized');
    } catch (error) {
        console.error('clear.js: initPuzzle: Failed to initialize clear stage', error);
    }
}
