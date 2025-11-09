import { motion } from 'framer-motion'
import lionImage from '@/assets/images/lion.png'

interface LionProps {
    side: 'left' | 'right'
    position: number
}

export function Lion({ side, position }: LionProps) {
    return (
        <motion.div
            initial={{ x: side === 'left' ? -200 : 200, opacity: 0 }}
            animate={{ x: position, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            style={{
                position: 'absolute',
                bottom: '120px',
                left: side === 'left' ? '20%' : 'auto',
                right: side === 'right' ? '20%' : 'auto',
            }}
            className="relative"
        >
            <img
                src={lionImage}
                alt="Pixelated Lion"
                className="pixel-art"
                style={{
                    width: '240px',
                    height: 'auto',
                    transform: side === 'left' ? 'scaleX(-1)' : 'none',
                }}
            />
        </motion.div>
    )
}
