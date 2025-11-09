import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SpeechBubbleProps {
    text: string
    side: 'left' | 'right'
    onComplete?: () => void
    playSound: () => void
}

export function SpeechBubble({ text, side, onComplete, playSound }: SpeechBubbleProps) {
    const [displayedText, setDisplayedText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex])
                playSound()
                setCurrentIndex((prev) => prev + 1)
            }, 50)
            return () => clearTimeout(timer)
        } else if (currentIndex === text.length && onComplete) {
            const completeTimer = setTimeout(onComplete, 1500)
            return () => clearTimeout(completeTimer)
        }
    }, [currentIndex, text, onComplete, playSound])

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: 'backOut' }}
            style={{
                position: 'absolute',
                bottom: '380px',
                left: side === 'left' ? '8%' : 'auto',
                right: side === 'right' ? '8%' : 'auto',
                zIndex: 10,
            }}
        >
            <div className="bg-[oklch(0.98_0_0)] border-[3px] border-[oklch(0.15_0_0)] rounded-xl px-4 py-3 shadow-[4px_4px_0_oklch(0.15_0_0)]">
                <p className="text-black font-mono font-bold text-base leading-tight min-w-[200px]">
                    {displayedText}
                    {currentIndex < text.length && (
                        <span className="inline-block w-2 h-4 bg-black ml-1 animate-pulse" />
                    )}
                </p>
            </div>
        </motion.div>
    )
}