// assets/js/puzzles/puzzle2.js

function initPuzzle(audio, movablePart, puzzles, currentPuzzleIndex) {
    // 時計が進むアニメーション
    const puzzle = puzzles[currentPuzzleIndex];
    const totalRotationTime = puzzle.revealTime; // 80秒など

    function updateClock() {
        const currentSeconds = audio.currentTime;
        const progress = currentSeconds / totalRotationTime;

        // progressに応じて時計の針を回転
        const rotationDegrees = progress * 360; // 0〜360度
        movablePart.style.transform = `rotate(${rotationDegrees}deg)`;
    }

    // audioのtimeupdateイベントにリスナーを追加
    audio.addEventListener('timeupdate', updateClock);
}
