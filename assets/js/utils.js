// assets/js/utils.js

export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function triggerShake(element) {
    element.classList.add('shake');
    element.addEventListener('animationend', () => {
        element.classList.remove('shake');
    }, { once: true });
}

/**
 * 色を調整する関数
 * @param {string} color - HEX形式の色コード（例: "#8B0000"）
 * @param {number} factor - 明度調整の係数（0 < factor < 1）
 * @returns {string} - 調整後のHEX色コード
 */
export function adjustColor(color, factor) {
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
    return newColor;
}
