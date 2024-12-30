// assets/js/data.js

console.log('data.js loaded');

// パズルデータ配列
export const puzzles = [
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
        movableScript: "assets/js/puzzles/puzzle1.js",
        movableElementSrc: ""
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
        movableScript: "assets/js/puzzles/puzzle2.js",
        movableElementSrc: ""
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
        movableScript: "assets/js/puzzles/puzzle3.js",
        movableElementSrc: ""
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
        movableScript: "assets/js/puzzles/puzzle4.js",
        movableElementSrc: ""
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
        movableScript: "assets/js/puzzles/puzzle5.js",
        movableElementSrc: ""
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
        movableScript: "assets/js/puzzles/puzzle6.js",
        movableElementSrc: ""
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
        movableScript: "assets/js/puzzles/puzzle7.js",
        movableElementSrc: ""
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
        movableScript: "assets/js/puzzles/puzzle8.js",
        movableElementSrc: ""
    }
];
