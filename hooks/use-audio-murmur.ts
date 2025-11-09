import { useCallback, useRef } from 'react'

export function useAudioMurmur() {
    const audioContextRef = useRef<AudioContext | null>(null)

    const initAudio = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext()
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume()
        }
    }, [])

    const playMurmur = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext()
        }

        const ctx = audioContextRef.current
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        const frequency = 300 + Math.random() * 200
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)
        oscillator.type = 'triangle'

        gainNode.gain.setValueAtTime(0.05, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 0.05)
    }, [])

    return { initAudio, playMurmur }
}