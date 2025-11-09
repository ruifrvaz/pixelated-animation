import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Play, ArrowClockwise } from '@phosphor-icons/react'
import { Lion } from '@/components/Lion'
import { SpeechBubble } from '@/components/SpeechBubble'
import { useAudioMurmur } from '@/hooks/use-audio-murmur'
import dialoguesText from '@/assets/documents/lion-dialogues.txt?raw'
import curtainImage from '@/assets/images/pixelated_curtain.png'

interface Dialogue {
    speaker: 'left' | 'right'
    text: string
}

const parseDialogues = (text: string): Dialogue[] => {
    const lines = text.trim().split('\n').filter(line => line.trim())
    return lines.map((line, index) => {
        const text = line.replace(/^\d+\.\s*/, '').trim()
        return {
            speaker: index % 2 === 0 ? 'left' : 'right',
            text
        }
    })
}

function App() {
    const [animationState, setAnimationState] = useState<'idle' | 'curtain-opening' | 'playing' | 'complete'>('idle')
    const [currentDialogue, setCurrentDialogue] = useState(0)
    const [showCurtain, setShowCurtain] = useState(true)
    const [dialogues, setDialogues] = useState<Dialogue[]>([])
    const { initAudio, playMurmur } = useAudioMurmur()

    useEffect(() => {
        const parsed = parseDialogues(dialoguesText)
        setDialogues(parsed)
    }, [])

    const startAnimation = () => {
        initAudio()
        setAnimationState('curtain-opening')
        setCurrentDialogue(0)
        setShowCurtain(true)

        // Curtain opens over 2 seconds
        setTimeout(() => {
            setShowCurtain(false)
            // Start dialogue after curtain is fully open
            setTimeout(() => {
                setAnimationState('playing')
            }, 500)
        }, 2000)
    }

    const handleDialogueComplete = () => {
        if (currentDialogue < dialogues.length - 1) {
            setCurrentDialogue((prev) => prev + 1)
        } else {
            // Drop curtain after final dialogue
            setTimeout(() => {
                setShowCurtain(true)
                setTimeout(() => {
                    setAnimationState('complete')
                }, 2000)
            }, 1000)
        }
    }

    const resetAnimation = () => {
        setAnimationState('idle')
        setCurrentDialogue(0)
        setShowCurtain(true)
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
            <div className="relative w-full max-w-4xl aspect-video bg-gradient-to-b from-muted to-background border-4 border-primary rounded-lg overflow-hidden shadow-2xl">
                <AnimatePresence>
                    {showCurtain && animationState !== 'idle' && (
                        <motion.div
                            initial={{ y: animationState === 'curtain-opening' ? 0 : '-100%' }}
                            animate={{ y: animationState === 'complete' ? 0 : '-100%' }}
                            exit={{ y: '-100%' }}
                            transition={{ duration: 2, ease: 'easeInOut' }}
                            className="absolute inset-0 z-50 overflow-hidden"
                        >
                            <img
                                src={curtainImage}
                                alt="Stage Curtain"
                                className="pixel-art w-full h-full object-cover"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {animationState !== 'idle' && (
                    <>
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary/40 to-transparent" />

                        <Lion side="left" position={0} />
                        <Lion side="right" position={0} />

                        <AnimatePresence mode="wait">
                            {animationState === 'playing' && currentDialogue < dialogues.length && dialogues[currentDialogue] && (
                                <SpeechBubble
                                    key={currentDialogue}
                                    text={dialogues[currentDialogue].text}
                                    side={dialogues[currentDialogue].speaker}
                                    onComplete={handleDialogueComplete}
                                    playSound={playMurmur}
                                />
                            )}
                        </AnimatePresence>
                    </>
                )}

                {animationState === 'idle' && !showCurtain && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-muted-foreground text-lg">Ready to begin...</p>
                    </div>
                )}
            </div>

            <div className="mt-8 flex gap-4">
                {animationState === 'idle' && (
                    <Button
                        onClick={startAnimation}
                        size="lg"
                        className="gap-2 font-mono font-bold"
                    >
                        <Play weight="fill" size={20} />
                        Start Show
                    </Button>
                )}

                {(animationState === 'playing' || animationState === 'complete') && (
                    <Button
                        onClick={resetAnimation}
                        size="lg"
                        variant="secondary"
                        className="gap-2 font-mono font-bold"
                    >
                        <ArrowClockwise weight="bold" size={20} />
                        Replay
                    </Button>
                )}
            </div>
        </div>
    )
}

export default App