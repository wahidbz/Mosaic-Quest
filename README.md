# Mosaic Quest - Assets Directory

## 📁 Structure

```
assets/
├── tiles/
│   ├── tile-back.svg       → SVG tile back design (embedded in CSS/JS)
│   └── [optional custom tile images]
├── audio/
│   └── [optional custom audio files]
│       Note: All sounds are generated via Web Audio API in script.js
│       No external audio files required!
└── particles/
    ├── sparkle.svg         → Sparkle particle SVG
    └── [particle effects are Canvas-based in script.js]
```

## 🎵 Audio System
All sounds are **procedurally generated** using the Web Audio API:
- **Click**: 440Hz sine wave, 80ms
- **Match**: 523→659→784Hz arpeggio
- **Error**: 220Hz square wave
- **Win**: 5-note fanfare
- **Background Music**: Zen pentatonic scale loop

No external audio files needed! The game works completely offline.

## 🎨 Tile System
Tiles are **CSS-rendered** with:
- Unicode characters for tile faces
- CSS gradients for 3D effect
- Box-shadow for depth
- CSS animations for interactions

### Tile Suits:
- **万 (Man/Characters)**: 一二三四五六七八九 (1-9)
- **竹 (Bamboo)**: 1-9
- **筒 (Circles)**: ①②③④⑤⑥⑦⑧⑨ (1-9)
- **風 (Wind)**: 東南西北 (E/S/W/N)
- **龍 (Dragon)**: 中發白 (Red/Green/White)
- **花 (Flower)**: 🌸🌺🌻🌼
- **節 (Season)**: 春夏秋冬

## ✨ Particle System
Canvas-based particles with:
- Circles and star shapes
- Physics (gravity + velocity)
- Color randomization
- Life/fade system

## 🔧 Customization
To add custom audio files:
1. Place .mp3/.ogg files in `assets/audio/`
2. Modify `Audio` class in `script.js` to load them via `new Audio()`

To add custom tile images:
1. Place 60×72px SVG/PNG files in `assets/tiles/`
2. Modify `getTileFaceHTML()` in `script.js` to use them
