import {Theme} from '../../api'
import {localStorageFieldNames} from '@shared/utils'

export const getInitialTheme = (): { theme: Theme; mode: 'system' | 'user' } => {
    const mode = (localStorage.getItem(localStorageFieldNames.themeMode) as 'system' | 'user') || 'system'

    if (mode === 'user') {
        const saved = (localStorage.getItem(localStorageFieldNames.themeValue) as Theme) || 'light'
        return {theme: saved, mode: 'user'}
    }

    return {
        theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
        mode: 'system',
    }
}
