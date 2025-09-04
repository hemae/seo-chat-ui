import {localStorageFieldNames} from '@shared/utils'
import type {Theme} from '../../../api'
import {getInitialTheme} from '../getInitialTheme'

describe('getInitialTheme', () => {
    const themeModeKey = localStorageFieldNames.themeMode
    const themeValueKey = localStorageFieldNames.themeValue

    beforeEach(() => {
        localStorage.clear()
        jest.resetAllMocks()
    })

    it('should return user theme from localStorage when mode = user', () => {
        localStorage.setItem(themeModeKey, 'user')
        localStorage.setItem(themeValueKey, 'dark')

        const result = getInitialTheme()
        expect(result).toEqual<{ theme: Theme; mode: 'user' }>({theme: 'dark', mode: 'user'})

        localStorage.setItem(themeValueKey, 'light')
        const result2 = getInitialTheme()
        expect(result2).toEqual<{ theme: Theme; mode: 'user' }>({theme: 'light', mode: 'user'})
    })

    it('should fallback to light if mode=user but no themeValue is saved', () => {
        localStorage.setItem(themeModeKey, 'user')
        const result = getInitialTheme()
        expect(result).toEqual<{ theme: Theme; mode: 'user' }>({theme: 'light', mode: 'user'})
    })

    it('should return system=dark when prefers-color-scheme is dark', () => {
        localStorage.setItem(themeModeKey, 'system');

        (window.matchMedia as jest.Mock) = jest.fn().mockReturnValue({matches: true})

        const result = getInitialTheme()
        expect(result).toEqual<{ theme: Theme; mode: 'system' }>({theme: 'dark', mode: 'system'})
    })

    it('should return system=light when prefers-color-scheme is light', () => {
        localStorage.setItem(themeModeKey, 'system');

        (window.matchMedia as jest.Mock) = jest.fn().mockReturnValue({matches: false})

        const result = getInitialTheme()
        expect(result).toEqual<{ theme: Theme; mode: 'system' }>({theme: 'light', mode: 'system'})
    })

    it('should default to system=light when themeMode is not set and prefers-color-scheme is light', () => {
        (window.matchMedia as jest.Mock) = jest.fn().mockReturnValue({matches: false})

        const result = getInitialTheme()
        expect(result).toEqual<{ theme: Theme; mode: 'system' }>({theme: 'light', mode: 'system'})
    })
})
