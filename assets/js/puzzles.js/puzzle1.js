// assets/js/puzzles/puzzle1.js

function initPuzzle(audio, movablePart, puzzles, currentPuzzleIndex) {
    // アニメーション対象の要素を取得
    const animatedShape = document.getElementById('animatedShape');

    // 変形を開始する時間と終了する時間（再生全体に合わせる）
    const startTime = 0; // 開始時点
    const endTime = puzzles[currentPuzzleIndex].revealTime; // revealTimeに設定された時間

    // アニメーションを更新する関数
    function updateShape() {
        const currentSeconds = audio.currentTime;

        // 進行度を計算（0から1の範囲）
        let progress = (currentSeconds - startTime) / (endTime - startTime);
        progress = Math.min(Math.max(progress, 0), 1); // 0未満や1より大きい値を制限

        // border-radiusを変更（50%が円形、0%が四角形）
        animatedShape.style.borderRadius = `${50 * (1 - progress)}%`;

        // 背景色の変化（オプション）
        // 例: 円形から四角形に変化する際に色も変える場合
        // animatedShape.style.backgroundColor = `hsl(${120 * progress}, 100%, 50%)`;
    }

    // audioのtimeupdateイベントにリスナーを追加
    audio.addEventListener('timeupdate', updateShape);

    // アニメーションの最終状態を設定
    audio.addEventListener('ended', () => {
        animatedShape.style.borderRadius = '0%'; // 完全な四角形
    });
}
