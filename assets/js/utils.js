export function formatTime(seconds) {
    try {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    } catch (error) {
        console.error(`formatTime: Failed to format time for seconds=${seconds}`, error);
        return "0:00";
    }
}

export function triggerShake(element) {
    if (!element) {
        console.error('triggerShake: element is null or undefined');
        return;
    }
    element.classList.add('shake');
    element.addEventListener('animationend', () => {
        element.classList.remove('shake');
    }, { once: true });
    console.log('triggerShake: Shake animation triggered');
}

/**
 * 色を調整する関数
 * @param {string} color - HEX形式の色コード（例: "#8B0000"）
 * @param {number} factor - 明度調整の係数（0 < factor < 1）
 * @returns {string} - 調整後のHEX色コード
 */
export function adjustColor(color, factor) {
    try {
        // HEX色コードをRGBに変換
        let r = parseInt(color.slice(1, 3), 16);
        let g = parseInt(color.slice(3, 5), 16);
        let b = parseInt(color.slice(5, 7), 16);

        // 明度を調整
        r = Math.min(255, Math.floor(r * factor));
        g = Math.min(255, Math.floor(g * factor));
        b = Math.min(255, Math.floor(b * factor));

        // RGBをHEXに変換
        const newColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        console.log(`adjustColor: Adjusted color from ${color} to ${newColor} with factor ${factor}`);
        return newColor;
    } catch (error) {
        console.error(`adjustColor: Failed to adjust color ${color} with factor ${factor}`, error);
        return color; // 失敗した場合は元の色を返す
    }
}
