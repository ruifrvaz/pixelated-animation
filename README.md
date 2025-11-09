# Pixelated Lion Presentation

A whimsical pixelated animation featuring two lions engaging in theatrical dialogue on stage. Perfect for creating fun, retro-style presentations with comic-style speech bubbles and synchronized sound effects.

**[View Live Demo →](https://ruifrvaz.github.io/pixelated-animation/)**

## 🎭 Quick Start

1. **Fork this repository** (click "Fork" button at the top)

2. **Edit the dialogue** - Open `src/assets/documents/lion-dialogues.txt` and replace with your own conversation:
   ```
   First line of dialogue (left lion)
   Second line of dialogue (right lion)
   Third line (left lion)
   Fourth line (right lion)
   ```

3. **Replace the lion sprite** (optional) - Add your own pixelated character at `src/assets/images/lion.png`

4. **Enable GitHub Pages**:
   - Go to your fork's Settings → Pages
   - Source: Select "GitHub Actions"

5. **Push your changes** - Your presentation will automatically deploy to:
   ```
   https://YOUR-USERNAME.github.io/pixelated-animation/
   ```

That's it! 🎉

## 🎨 Customization

### Change Colors
Edit `src/index.css` to modify the color palette (search for `oklch` values)

### Adjust Animation Speed
Change the text reveal speed in `src/components/SpeechBubble.tsx` (line 21, currently `30` milliseconds per character)

### Modify Dialogue Timing
Edit pause duration in `src/components/SpeechBubble.tsx` (line 24, currently `1500` milliseconds between dialogues)

## 🚀 Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to see your changes live.

## 📝 License

MIT - Feel free to use for your own presentations!
