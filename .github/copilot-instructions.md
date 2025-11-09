# Copilot Instructions - Pixelated Lions Animation

## Project Overview
A retro-style 2D animation featuring pixelated lions with typewriter-effect dialogue and procedural audio. Built with vanilla HTML5 Canvas, CSS3, and Web Audio API.

## Architecture & Core Components

### Canvas Animation System (`animation.js`)
- **Fixed canvas dimensions**: 800x600px with 4px pixel scaling for retro aesthetic
- **Sprite-based rendering**: 16x16 character matrices using string arrays (see `lionLeftSprite`/`lionRightSprite`)
- **State machine**: `animation.phase` controls flow between 'walking' and 'talking' phases
- **Pixel-perfect movement**: 2px increments for smooth retro feel

### Sprite System
```javascript
// Pattern: String arrays represent 16x16 pixel grids
const lionLeftSprite = [
    '0000000000000000',  // Each character = 1 pixel
    '0000YYYYY0000000',   // Y=golden, B=black, N=brown, 0=transparent
    // ...
];
```

### Dialogue Engine
- **Typewriter effect**: Character-by-character reveal with 80ms delays
- **Speech balloons**: Dynamic positioning with tail direction based on speaker
- **Audio integration**: Procedural murmur sounds using Web Audio API oscillators

## Development Patterns

### Adding New Characters
1. Create 16x16 string array sprite following existing pattern
2. Add color mappings to `colors` object
3. Use `drawSprite(sprite, x, y, flipH)` for rendering

### Extending Dialogue
Modify `animation.dialogue` array:
```javascript
{ speaker: 'left'|'right', text: 'Content', shown: '' }
```

### Animation Phases
Add new phases by extending the state machine in the main `animate()` loop. Follow the walking→talking pattern for state transitions.

## File Structure & Responsibilities

- **`index.html`**: Minimal setup with canvas element and script loading
- **`animation.js`**: Complete animation logic, no external dependencies
- **`styles.css`**: Retro styling with pixelated rendering and dark theme
- **`assets/`**: Currently empty, intended for additional graphics

## Technical Constraints

- **No build system**: Direct browser execution, maintain vanilla JS compatibility
- **Pixel-perfect rendering**: Use `PIXEL_SIZE = 4` constant for all scaling
- **Audio initialization**: Requires user interaction due to browser autoplay policies
- **Canvas clearing**: Full frame clear with `ctx.clearRect(0, 0, canvas.width, canvas.height)`

## Testing & Debugging

Run directly in browser - no build process required. For development:
1. Serve via local HTTP server to avoid CORS issues
2. Use browser DevTools for animation frame debugging
3. Monitor `animation` object state in console for behavior verification

## Key Integration Points

- **Web Audio API**: Initialized on first user interaction in `initAudio()`
- **RequestAnimationFrame**: Main animation loop with timestamp-based character timing
- **Canvas 2D Context**: All rendering through `ctx` with pixel-perfect positioning

## Common Modifications

- **Speed adjustments**: Modify movement increments (currently 2px) and `charDelay` (80ms)
- **Visual styling**: Update `colors` object or add new character mappings
- **Dialogue content**: Extend `animation.dialogue` array with new speaker/text pairs
- **Canvas dimensions**: Update `canvas.width/height` but maintain 4:3 aspect ratio