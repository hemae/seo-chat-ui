import React from 'react'
import {Theme} from '../../api'

interface UseThemeChangeOptions {
    setTheme: React.Dispatch<React.SetStateAction<Theme>>
    mode: 'system' | 'user'
}

export function useThemeChange({setTheme, mode}: UseThemeChangeOptions) {
    React.useEffect(() => {
        if (mode !== 'system') return

        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        const listener = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? 'dark' : 'light')
        }

        mq.addEventListener('change', listener)
        return () => mq.removeEventListener('change', listener)
    }, [mode, setTheme])
}
