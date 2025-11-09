# Planning Guide

An animated stage scene featuring two pixelated lions entering from opposite sides to engage in a comic-style dialogue with synchronized murmuring sound effects.

**Experience Qualities**:
1. **Whimsical** - Playful pixelated art style and comic balloon dialogue create a lighthearted, retro gaming aesthetic
2. **Theatrical** - Stage-like presentation with curtain-rise entrance adds drama and anticipation to the encounter
3. **Immersive** - Synchronized letter-by-letter text reveal with murmur sounds creates engaging audiovisual feedback

**Complexity Level**: Micro Tool (single-purpose)
  - This is a self-contained animation sequence with no user interaction beyond play/replay controls

## Essential Features

**Lion Walk-In Animation**
- Functionality: Two pixelated lions enter the stage from opposite sides (left and right) and meet in the center
- Purpose: Establishes the scene and characters with theatrical flair
- Trigger: Automatically starts when page loads
- Progression: Stage curtain rises → Left lion walks from left side → Right lion walks from right side → Both lions stop and face each other → Dialogue begins
- Success criteria: Lions move smoothly across stage with pixelated sprite animation, proper timing and positioning

**Comic Dialogue System**
- Functionality: Speech bubbles appear above lions with text revealing letter-by-letter
- Purpose: Creates narrative and character interaction
- Trigger: Automatically after lions are positioned
- Progression: First lion speaks (text appears letter by letter) → Bubble persists → Second lion responds → Alternating dialogue continues
- Success criteria: Comic balloons styled authentically, text animates smoothly, proper speech bubble tails pointing to speakers

**Murmur Sound Effect**
- Functionality: Generate procedural murmur/mumble sound as each letter appears
- Purpose: Adds audio feedback and enhances immersion (like classic adventure games)
- Trigger: Plays with each letter reveal
- Progression: Sound synthesized using Web Audio API → Brief murmur tone plays → Next letter triggers next sound
- Success criteria: Sound is subtle, varies slightly per letter, doesn't overlap harshly

## Edge Case Handling

- **Audio Context Restrictions**: Handle browsers requiring user interaction to start audio by showing a "Start" button if needed
- **Animation Replay**: Provide replay button to restart the entire sequence from beginning
- **Responsive Sizing**: Scale pixel art and stage to fit different screen sizes while maintaining aspect ratio
- **Performance**: Use CSS transforms for smooth 60fps animation even with pixelated graphics

## Design Direction

The design should evoke nostalgic retro gaming aesthetics with bold pixel art, theatrical stage setting, and comic book visual language - minimal interface that lets the animation take center stage.

## Color Selection

Custom palette with high contrast pixel art aesthetic

- **Primary Color**: Stage curtain red (oklch(0.45 0.19 25)) - Communicates theatrical drama and frames the performance
- **Secondary Colors**: Golden spotlights (oklch(0.85 0.15 85)) for stage lighting accents, warm brown (oklch(0.55 0.08 60)) for lion fur
- **Accent Color**: Speech bubble white (oklch(0.98 0 0)) with black outlines - High visibility for readable dialogue
- **Foreground/Background Pairings**: 
  - Background (Black #000000): White text (oklch(0.98 0 0)) - Ratio 21:1 ✓
  - Speech Bubbles (White oklch(0.98 0 0)): Black text (oklch(0.15 0 0)) - Ratio 15:1 ✓
  - Curtain Red: White text (oklch(0.98 0 0)) - Ratio 5.2:1 ✓

## Font Selection

Pixel-style monospace fonts that reinforce retro gaming aesthetic while ensuring legibility

- **Typographic Hierarchy**: 
  - Dialogue Text: Monospace Bold/16px/tight letter spacing (pixel-perfect comic dialogue)
  - UI Controls: Sans-serif Medium/14px/normal (modern control buttons for replay)

## Animations

Animations balance between nostalgic low-framerate pixel art movement and smooth modern transitions - deliberately choppy character animation contrasts with fluid speech bubble appearances.

- **Purposeful Meaning**: Frame-by-frame pixel art walk cycles evoke classic 8-bit games, while smooth easing on bubbles adds polish
- **Hierarchy of Movement**: Lions enter first (primary action), then dialogue draws focus with letter-by-letter reveal and audio sync

## Component Selection

- **Components**: 
  - Card (for optional replay controls)
  - Button (for start/replay actions with Phosphor icons)
  - Custom canvas/div-based pixel sprites (Shadcn doesn't provide animation components)
  
- **Customizations**: 
  - Pixel art lion sprites referenced from src/assets/images/lion.png
  - Comic speech bubbles with SVG tails
  - Letter-by-letter text reveal with custom React animation
  
- **States**: 
  - Buttons: Hover shows subtle scale, active shows press effect
  - Animation: Loading → Playing → Complete states
  
- **Icon Selection**: 
  - Play icon (for start)
  - ArrowClockwise (for replay)
  
- **Spacing**: 
  - Stage centered with 2rem padding
  - Speech bubbles positioned with 1rem offset from lions
  
- **Mobile**: 
  - Stage scales down proportionally
  - Controls stack vertically on small screens
  - Touch-friendly button sizes (min 44px)
