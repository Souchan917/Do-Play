// assets/js/data.js

export const puzzles = [
    // ステージ0: 説明画面
    {
        id: 0,
        title: "ゲームの説明",
        subtitle: "開始前の注意事項",
        baseImage: "assets/images/puzzles/instructions.jpg",
        overlayImage: "assets/images/puzzles/instructions_reveal.jpg",
        revealTime: null, // 説明画面ではオーバーレイは不要
        themeColor: "#F0F0F0", // 白
        allowedNextTimeRanges: [{ start: 1, end: 100 }], // 説明画面では特定のタイミングは不要
        solvedTime: null,
        answer: "",
        movableScript: "puzzles/instructions.js", // 説明用スクリプト
        movableElementSrc: "",
        markerPositionPercent: 0, // プログレスバーの0%
        markerColor: "#000000" // 黒色のマーカー
    },
    // ステージ1～8: Q1～Q8
    {
        id: 1,
        title: "問題 01",
        subtitle: "Start",
        baseImage: "assets/images/puzzles/stage1.jpg",
        overlayImage: "assets/images/puzzles/stage1_reveal.jpg",
        revealTime: 80, // 実際の再生時間に応じて調整
        themeColor: "#8B0000", // 赤
        allowedNextTimeRanges: [{ start: 1, end: 10 }], // 1秒から10秒
        solvedTime: null, // 解決時の時間を記録
        answer: "答え1",
        movableScript: "puzzles/puzzle1.js",
        movableElementSrc: "",
        markerPositionPercent: 12.5, // プログレスバーの12.5%にマーカーを配置
        markerColor: "#FF0000" // 赤色のマーカー
    },
    {
        id: 2,
        title: "問題 02",
        subtitle: "Deep",
        baseImage: "assets/images/puzzles/stage2.jpg",
        overlayImage: "assets/images/puzzles/stage2_reveal.jpg",
        revealTime: 80,
        themeColor: "#D2691E", // オレンジ
        allowedNextTimeRanges: [{ start: 10, end: 20 }],
        solvedTime: null,
        answer: "答え2",
        movableScript: "puzzles/puzzle2.js",
        movableElementSrc: "",
        markerPositionPercent: 25, // プログレスバーの25%にマーカーを配置
        markerColor: "#FFA500" // オレンジ色のマーカー
    },
    {
        id: 3,
        title: "問題 03",
        subtitle: "Dive",
        baseImage: "assets/images/puzzles/stage3.jpg",
        overlayImage: "assets/images/puzzles/stage3_reveal.jpg",
        revealTime: 80,
        themeColor: "#C1AB05", // 黄色
        allowedNextTimeRanges: [{ start: 20, end: 30 }],
        solvedTime: null,
        answer: "答え3",
        movableScript: "puzzles/puzzle3.js",
        movableElementSrc: "",
        markerPositionPercent: 37.5, // プログレスバーの37.5%にマーカーを配置
        markerColor: "#FFFF00" // 黄色のマーカー
    },
    {
        id: 4,
        title: "問題 04",
        subtitle: "Dark",
        baseImage: "assets/images/puzzles/stage4.jpg",
        overlayImage: "assets/images/puzzles/stage4_reveal.jpg",
        revealTime: 80,
        themeColor: "#009944", // 緑
        allowedNextTimeRanges: [{ start: 30, end: 40 }],
        solvedTime: null,
        answer: "答え4",
        movableScript: "puzzles/puzzle4.js",
        movableElementSrc: "",
        markerPositionPercent: 50, // プログレスバーの50%にマーカーを配置
        markerColor: "#00FF00" // 緑色のマーカー
    },
    {
        id: 5,
        title: "問題 05",
        subtitle: "Light",
        baseImage: "assets/images/puzzles/stage5.jpg",
        overlayImage: "assets/images/puzzles/stage5_reveal.jpg",
        revealTime: 80,
        themeColor: "#0068B7", // 青
        allowedNextTimeRanges: [{ start: 40, end: 50 }],
        solvedTime: null,
        answer: "答え5",
        movableScript: "puzzles/puzzle5.js",
        movableElementSrc: "",
        markerPositionPercent: 62.5, // プログレスバーの62.5%にマーカーを配置
        markerColor: "#0000FF" // 青色のマーカー
    },
    {
        id: 6,
        title: "問題 06",
        subtitle: "Rise",
        baseImage: "assets/images/puzzles/stage6.jpg",
        overlayImage: "assets/images/puzzles/stage6_reveal.jpg",
        revealTime: 80,
        themeColor: "#1D2088", // インディゴ
        allowedNextTimeRanges: [{ start: 50, end: 60 }],
        solvedTime: null,
        answer: "答え6",
        movableScript: "puzzles/puzzle6.js",
        movableElementSrc: "",
        markerPositionPercent: 75, // プログレスバーの75%にマーカーを配置
        markerColor: "#4B0082" // インディゴ色のマーカー
    },
    {
        id: 7,
        title: "問題 07",
        subtitle: "Fall",
        baseImage: "assets/images/puzzles/stage7.jpg",
        overlayImage: "assets/images/puzzles/stage7_reveal.jpg",
        revealTime: 80,
        themeColor: "#920783", // 紫
        allowedNextTimeRanges: [{ start: 60, end: 70 }],
        solvedTime: null,
        answer: "答え7",
        movableScript: "puzzles/puzzle7.js",
        movableElementSrc: "",
        markerPositionPercent: 87.5, // プログレスバーの87.5%にマーカーを配置
        markerColor: "#800080" // 紫色のマーカー
    },
    {
        id: 8,
        title: "問題 08",
        subtitle: "End",
        baseImage: "assets/images/puzzles/stage8.jpg",
        overlayImage: "assets/images/puzzles/stage8_reveal.jpg",
        revealTime: 80,
        themeColor: "#000000", // 黒
        allowedNextTimeRanges: [{ start: 70, end: 80 }],
        solvedTime: null,
        answer: "答え8",
        movableScript: "puzzles/puzzle8.js",
        movableElementSrc: "",
        markerPositionPercent: 100, // プログレスバーの100%にマーカーを配置
        markerColor: "#000000" // 黒色のマーカー
    },
    // ステージ9: クリア画面
    {
        id: 9,
        title: "クリア",
        subtitle: "おめでとうございます！",
        baseImage: "assets/images/puzzles/clear.jpg",
        overlayImage: "assets/images/puzzles/clear_reveal.jpg",
        revealTime: null, // クリア画面ではオーバーレイは不要
        themeColor: "#FFD700", // 金色
        allowedNextTimeRanges: [], // クリア画面では特定のタイミングは不要
        solvedTime: null,
        answer: "",
        movableScript: "puzzles/clear.js", // クリア用スクリプト
        movableElementSrc: "",
        markerPositionPercent: 100, // プログレスバーの100%にマーカーを配置
        markerColor: "#FFD700" // 金色のマーカー
    }
];
