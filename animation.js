// Canvas setup
const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Pixel scale for retro look
const PIXEL_SIZE = 4;

// Lion pixel art sprites (16x16 pixels each)
const lionLeftSprite = [
    '0000000000000000',
    '0000YYYYY0000000',
    '000YYYYYYYY00000',
    '00YYYYYYYYYYY000',
    '0YYYYYYYYYYYY00Y',
    '0YBBYBBYYYYYY0YY',
    '0YYYYYYYYYYYY0YY',
    '0YYYNNNYYYYYY00Y',
    '00YYNNYYYYYY0000',
    '000YYYYYYYYYY000',
    '00YYYYYYYYYYYY00',
    '00YYYY00YYYYYY00',
    '0YYYY0000YYYY000',
    '0YYY000000YYY000',
    '00YY00000YYY0000',
    '0000000000000000'
];

const lionRightSprite = [
    '0000000000000000',
    '0000000YYYYY0000',
    '00000YYYYYYYY000',
    '000YYYYYYYYYYY00',
    'Y00YYYYYYYYYYYY0',
    'YY0YYYYYYBBYBY0Y',
    'YY0YYYYYYYYYYYY0',
    'Y00YYYYYYNNN YYY0',
    '0000YYYYYYYNYY00',
    '000YYYYYYYYYY000',
    '00YYYYYYYYYYYY00',
    '00YYYYYY00YYYY00',
    '000YYYY0000YYYY0',
    '000YYY000000YYY0',
    '0000YYY00000YY00',
    '0000000000000000'
];

// Color mapping
const colors = {
    '0': null, // transparent
    'Y': '#FDB813', // golden yellow
    'B': '#000000', // black (eyes)
    'N': '#8B4513'  // brown (nose)
};

// Draw pixelated sprite
function drawSprite(sprite, x, y, flipH = false) {
    sprite.forEach((row, i) => {
        for (let j = 0; j < row.length; j++) {
            const color = colors[row[j]];
            if (color) {
                const px = flipH ? (x + (15 - j) * PIXEL_SIZE) : (x + j * PIXEL_SIZE);
                const py = y + i * PIXEL_SIZE;
                ctx.fillStyle = color;
                ctx.fillRect(px, py, PIXEL_SIZE, PIXEL_SIZE);
            }
        }
    });
}

// Comic balloon drawing
function drawComicBalloon(x, y, text, width, height, tail = 'left') {
    // Balloon background
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;

    // Main balloon body
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 10);
    ctx.fill();
    ctx.stroke();

    // Balloon tail
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    if (tail === 'left') {
        ctx.moveTo(x + 20, y + height);
        ctx.lineTo(x - 10, y + height + 20);
        ctx.lineTo(x + 40, y + height);
    } else {
        ctx.moveTo(x + width - 20, y + height);
        ctx.lineTo(x + width + 10, y + height + 20);
        ctx.lineTo(x + width - 40, y + height);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Text
    ctx.fillStyle = '#000000';
    ctx.font = '20px Courier New';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    wrapText(ctx, text, x + width / 2, y + height / 2, width - 20, 24);
}

// Wrap text in balloon
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let lines = [];

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line);

    const startY = y - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, i) => {
        context.fillText(line.trim(), x, startY + (i * lineHeight));
    });
}

// Generate murmur sound using Web Audio API
let audioContext;
let isPlayingSound = false;

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playMurmurSound(duration = 50) {
    if (!audioContext || isPlayingSound) return;

    isPlayingSound = true;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Random frequency for murmur effect
    oscillator.frequency.value = 100 + Math.random() * 100;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration / 1000);

    setTimeout(() => {
        isPlayingSound = false;
    }, duration);
}

// Animation state
const animation = {
    lionLeft: { x: -100, y: 400, targetX: 150 },
    lionRight: { x: canvas.width + 100, y: 400, targetX: 550 },
    phase: 'walking', // walking, talking
    dialogue: [
        { speaker: 'left', text: 'Hello there, friend!', shown: '' },
        { speaker: 'right', text: 'Greetings! Nice day, isn\'t it?', shown: '' },
        { speaker: 'left', text: 'Indeed! Shall we chat?', shown: '' },
        { speaker: 'right', text: 'Absolutely! I love conversations!', shown: '' }
    ],
    currentDialogue: 0,
    charIndex: 0,
    lastCharTime: 0,
    charDelay: 80 // milliseconds between characters
};

// Animation loop
function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Walking phase
    if (animation.phase === 'walking') {
        // Move lions toward center
        if (animation.lionLeft.x < animation.lionLeft.targetX) {
            animation.lionLeft.x += 2;
        }
        if (animation.lionRight.x > animation.lionRight.targetX) {
            animation.lionRight.x -= 2;
        }

        // Check if both reached their positions
        if (animation.lionLeft.x >= animation.lionLeft.targetX &&
            animation.lionRight.x <= animation.lionRight.targetX) {
            animation.phase = 'talking';
            animation.lastCharTime = timestamp;
            initAudio();
        }
    }

    // Draw lions
    drawSprite(lionLeftSprite, animation.lionLeft.x, animation.lionLeft.y);
    drawSprite(lionRightSprite, animation.lionRight.x, animation.lionRight.y);

    // Talking phase
    if (animation.phase === 'talking' && animation.currentDialogue < animation.dialogue.length) {
        const currentLine = animation.dialogue[animation.currentDialogue];

        // Add character by character
        if (timestamp - animation.lastCharTime > animation.charDelay) {
            if (animation.charIndex < currentLine.text.length) {
                currentLine.shown += currentLine.text[animation.charIndex];
                animation.charIndex++;
                animation.lastCharTime = timestamp;
                playMurmurSound();
            } else {
                // Wait before next dialogue
                if (timestamp - animation.lastCharTime > 2000) {
                    animation.currentDialogue++;
                    animation.charIndex = 0;
                    if (animation.currentDialogue < animation.dialogue.length) {
                        animation.dialogue[animation.currentDialogue].shown = '';
                    }
                }
            }
        }

        // Draw speech balloons for all shown dialogue
        for (let i = 0; i <= Math.min(animation.currentDialogue, animation.dialogue.length - 1); i++) {
            const line = animation.dialogue[i];
            if (line.shown) {
                const balloonY = 200 - (i * 120);
                if (line.speaker === 'left') {
                    drawComicBalloon(animation.lionLeft.x - 20, balloonY, line.shown, 200, 80, 'left');
                } else {
                    drawComicBalloon(animation.lionRight.x - 80, balloonY, line.shown, 200, 80, 'right');
                }
            }
        }
    }

    requestAnimationFrame(animate);
}

// Start animation
requestAnimationFrame(animate);
