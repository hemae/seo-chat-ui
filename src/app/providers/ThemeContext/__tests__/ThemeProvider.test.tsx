import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {ThemeProvider, useTheme} from '../ThemeContext'
import {localStorageFieldNames} from '@shared/utils'

const TestConsumer = () => {
    const {theme, toggleTheme, followSystem} = useTheme()
    return (
        <div>
            <span data-testid='theme'>{theme}</span>
            <button onClick={toggleTheme}>toggle</button>
            <button onClick={followSystem}>system</button>
        </div>
    )
}

describe('ThemeProvider', () => {
    beforeEach(() => {
        localStorage.clear()
        document.documentElement.removeAttribute('data-theme')
        jest.resetAllMocks();

        (window.matchMedia as jest.Mock) = jest.fn().mockReturnValue({
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn()
        })
    })

    it('should provide initial theme from system if no localStorage', () => {
        render(
            <ThemeProvider>
                <TestConsumer/>
            </ThemeProvider>
        )

        expect(screen.getByTestId('theme')).toHaveTextContent('light')
        expect(document.documentElement.getAttribute('data-theme')).toBe('light')
        expect(localStorage.getItem(localStorageFieldNames.themeMode)).toBe('system')
        expect(localStorage.getItem(localStorageFieldNames.themeValue)).toBeNull()
    })

    it('should toggle theme and set mode=user', async () => {
        const user = userEvent.setup()

        render(
            <ThemeProvider>
                <TestConsumer/>
            </ThemeProvider>
        )

        const themeEl = screen.getByTestId('theme')
        const toggleBtn = screen.getByText('toggle')

        expect(themeEl).toHaveTextContent('light')

        await user.click(toggleBtn)
        expect(themeEl).toHaveTextContent('dark')
        expect(localStorage.getItem(localStorageFieldNames.themeMode)).toBe('user')
        expect(localStorage.getItem(localStorageFieldNames.themeValue)).toBe('dark')
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    })

    it('should follow system and remove themeValue', async () => {
        const user = userEvent.setup()

        localStorage.setItem(localStorageFieldNames.themeMode, 'user')
        localStorage.setItem(localStorageFieldNames.themeValue, 'dark')

        render(
            <ThemeProvider>
                <TestConsumer/>
            </ThemeProvider>
        )

        const systemBtn = screen.getByText('system')
        await user.click(systemBtn)

        expect(localStorage.getItem(localStorageFieldNames.themeMode)).toBe('system')
        expect(localStorage.getItem(localStorageFieldNames.themeValue)).toBeNull()
    })

    it('should update theme when system preference changes', () => {

        const addListener = jest.fn((event: string, cb: (e: MediaQueryListEvent) => void) => {
            cb({matches: true} as MediaQueryListEvent)
        });

        (window.matchMedia as jest.Mock).mockReturnValue({
            matches: false,
            addEventListener: addListener,
            removeEventListener: jest.fn(),
        })

        render(
            <ThemeProvider>
                <TestConsumer/>
            </ThemeProvider>
        )

        expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    })
})
