import {composeProviders} from '@shared/react'
import {ThemeProvider} from './ThemeContext'

export const withAppProviders = composeProviders(
    ThemeProvider,
)
