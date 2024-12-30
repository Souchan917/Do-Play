// assets/js/puzzles/puzzle1.js

export function initPuzzle(audio, movablePart, puzzles, currentPuzzleIndex) {
    console.log('puzzle1.js loaded and initPuzzle called');

    // パズル1の初期化ロジック
    const animatedShape = movablePart.querySelector('#animatedShape');
    if (animatedShape) {
        // アニメーションを開始
        animatedShape.style.transform = 'rotate(360deg)';
        // 他のアニメーションやイベントを追加
    }

    // 追加のロジック...
}
