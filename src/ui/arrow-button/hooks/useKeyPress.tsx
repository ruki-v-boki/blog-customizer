import { useEffect } from "react";

export const useKeyPress = (
        ref: React.RefObject<HTMLElement>,
        key: string,
        onPress: () => void
    ) => {
    useEffect(() => {
        const element = ref.current
        if (!element) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === key) onPress()
        }

        element.addEventListener('keydown', handleKeyDown)
        return () => element.removeEventListener('keydown', handleKeyDown)
    }, [onPress])
}