import {renderHook} from '@testing-library/react'
import {useThemeChange} from '../useThemeChange'

describe('useThemeChange', () => {
    let mockMatchMedia: jest.Mock
    let addEventListenerSpy: jest.Mock
    let removeEventListenerSpy: jest.Mock

    beforeEach(() => {
        addEventListenerSpy = jest.fn()
        removeEventListenerSpy = jest.fn()

        mockMatchMedia = jest.fn().mockReturnValue({
            matches: false,
            addEventListener: addEventListenerSpy,
            removeEventListener: removeEventListenerSpy,
        });

        (window.matchMedia as unknown) = mockMatchMedia
    })

    it('should add listener when mode=system', () => {
        const setTheme = jest.fn()

        renderHook(() => useThemeChange({setTheme, mode: 'system'}))

        expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
        expect(addEventListenerSpy).toHaveBeenCalledTimes(1)
    })

    it('should NOT add listener when mode=user', () => {
        const setTheme = jest.fn()

        renderHook(() => useThemeChange({setTheme, mode: 'user'}))

        expect(mockMatchMedia).not.toHaveBeenCalled()
        expect(addEventListenerSpy).not.toHaveBeenCalled()
    })

    it('should call setTheme("dark") when event.matches=true', () => {
        const setTheme = jest.fn()

        renderHook(() => useThemeChange({setTheme, mode: 'system'}))

        const handler = addEventListenerSpy.mock.calls[0][1] as (e: MediaQueryListEvent) => void
        handler({matches: true} as MediaQueryListEvent)

        expect(setTheme).toHaveBeenCalledWith('dark')
    })

    it('should call setTheme("light") when event.matches=false', () => {
        const setTheme = jest.fn()

        renderHook(() => useThemeChange({setTheme, mode: 'system'}))

        const handler = addEventListenerSpy.mock.calls[0][1] as (e: MediaQueryListEvent) => void
        handler({matches: false} as MediaQueryListEvent)

        expect(setTheme).toHaveBeenCalledWith('light')
    })

    it('should remove listener on unmount', () => {
        const setTheme = jest.fn()

        const {unmount} = renderHook(() => useThemeChange({setTheme, mode: 'system'}))

        unmount()
        expect(removeEventListenerSpy).toHaveBeenCalledTimes(1)
    })
})
