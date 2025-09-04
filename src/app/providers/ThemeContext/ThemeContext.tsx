import React from 'react'
import {emptyFunc} from '@shared/react'
import {localStorageFieldNames} from '@shared/utils'
import {Theme} from './api'
import {getInitialTheme, useThemeChange} from './lib'

interface IThemeContext {
    theme: Theme
    toggleTheme: () => void
    followSystem: () => void
}

const ThemeContext = React.createContext<IThemeContext>({
    theme: 'light',
    toggleTheme: emptyFunc('Theme', 'toggleTheme'),
    followSystem: emptyFunc('Theme', 'followSystem'),
})

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({children}) => {

    const initial = getInitialTheme()
    const [theme, setTheme] = React.useState<Theme>(initial.theme)
    const [mode, setMode] = React.useState<'system' | 'user'>(initial.mode)

    const applyTheme = React.useCallback((next: Theme, nextMode: 'system' | 'user') => {
        document.documentElement.setAttribute('data-theme', next)
        localStorage.setItem(localStorageFieldNames.themeMode, nextMode)
        if (nextMode === 'user') {
            localStorage.setItem(localStorageFieldNames.themeValue, next)
        } else {
            localStorage.removeItem(localStorageFieldNames.themeValue)
        }
    }, [])

    React.useEffect(() => {
        applyTheme(theme, mode)
    }, [theme, mode, applyTheme])

    useThemeChange({setTheme, mode})

    const toggleTheme = React.useCallback(() => {
        setMode('user')
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }, [])

    const followSystem = React.useCallback(() => {
        setMode('system')
        setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    }, [])

    const value = React.useMemo<IThemeContext>(() => {
        return {
            theme,
            toggleTheme,
            followSystem,
        }
    }, [theme, toggleTheme, followSystem])

    return (
        <ThemeContext.Provider
            value={value}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => React.useContext(ThemeContext)
