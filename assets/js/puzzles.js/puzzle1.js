// assets/js/puzzles/puzzle1.js

function initPuzzle(audio, movablePart, puzzles, currentPuzzleIndex) {
    // アニメーション対象の要素を取得
    const animatedShape = document.getElementById('animatedShape');

    // CSSを動的に挿入
    const style = document.createElement('style');
    style.textContent = `
        /* アニメーション用のスタイル */
        #animatedShape {
            width: 100%;
            height: 100%;
            background-color: #000000; /* 黒色 */
            border-radius: 0%; /* 四角形 */
            transition: transform 0.1s linear;
            /* その他のスタイルが必要ならここに追加 */
        }
    `;
    document.head.appendChild(style);

    // 初期状態を設定
    animatedShape.style.transform = 'rotate(0deg)';

    // アニメーションを更新する関数
    function updateRotation() {
        const currentSeconds = audio.currentTime;
        const duration = audio.duration;
        if (!duration) return;
        const progress = currentSeconds / duration; // 0から1の範囲
        const rotationDegrees = progress * 360; // 0から360度

        // 回転を適用
        animatedShape.style.transform = `rotate(${rotationDegrees}deg)`;
    }

    // 音声の再生時間に応じて回転を更新
    audio.addEventListener('timeupdate', updateRotation);

    // 音声が終了したら最終位置に設定
    audio.addEventListener('ended', () => {
        animatedShape.style.transform = 'rotate(360deg)';
    });

    // クリーンアップ: スクリプトが削除される際にイベントリスナーを解除
    // ※ これはベーススクリプトで行うか、ポリフィルが必要
}
