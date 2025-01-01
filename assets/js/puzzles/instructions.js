// assets/js/puzzles/instructions.js

export function initPuzzle(audio, movablePart, puzzles, currentPuzzleIndex, puzzleManager) {
    console.log('instructions.js: initPuzzle called');

    if (!movablePart) {
        console.error('instructions.js: initPuzzle: movablePart element is null or undefined');
        return;
    }

    try {
        // 説明用のコンテンツを表示
        const instructions = document.createElement('div');
        instructions.style.position = 'absolute';
        instructions.style.top = '50%';
        instructions.style.left = '50%';
        instructions.style.transform = 'translate(-50%, -50%)';
        instructions.style.fontSize = '24px';
        instructions.style.color = '#000000'; // 黒色
        instructions.style.textAlign = 'center';
        instructions.innerHTML = `
            <h1>ゲームの説明</h1>
            <p>このゲームは音楽に合わせてパズルを解いて進めていくゲームです。</p>
            <p>適切なタイミングでボタンを押すことで次のステージに進むことができます。</p>
            <p>全てのステージをクリアするとゲーム終了となります。</p>
            <button id="startButton">ゲームを開始する</button>
        `;
        movablePart.appendChild(instructions);
        console.log('instructions.js: Instructions displayed');

        // 開始ボタンのイベントリスナーを追加
        const startButton = document.getElementById('startButton');
        startButton.addEventListener('click', () => {
            // ステージ0をクリアとしてマークし、ステージ1に移動
            puzzleManager.addSolvedTime(currentPuzzleIndex, audio.currentTime);
            puzzleManager.nextPuzzle();
            console.log('instructions.js: Start button clicked, moving to next puzzle');
        });

    } catch (error) {
        console.error('instructions.js: initPuzzle: Failed to initialize instructions', error);
    }
}
