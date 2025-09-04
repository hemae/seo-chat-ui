import React from 'react'
import {Button} from '@shared/ui'
import {useTheme} from '@app/providers'

export const Chat: React.FC<React.PropsWithChildren> = () => {

    const {theme, toggleTheme} = useTheme()

    return (
        <div className='bg-bg flex flex-col items-center gap-4 mt-10'>
            <h1 className='text-2xl font-bold text-green-600'>Hello Tailwind + Styled Components!</h1>
            <Button>Styled Button</Button>
            <button className='bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600'>
                Tailwind Button
            </button>
            <Button onClick={toggleTheme}>{theme}</Button>
        </div>
    )
}
